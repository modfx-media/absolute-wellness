import net from "net";
import { neonConfig } from "@neondatabase/serverless";
import { WebSocketServer } from "ws";

const globalState = globalThis as typeof globalThis & {
  __awcPgWsProxy?: { port: number };
};

function postgresTarget(connectionString: string): { host: string; port: number } | null {
  try {
    const url = new URL(connectionString.replace(/^postgres(ql)?:/i, "http:"));
    if (url.hostname !== "localhost" && url.hostname !== "127.0.0.1") return null;
    return { host: url.hostname, port: url.port ? Number(url.port) : 5432 };
  } catch {
    return null;
  }
}

/**
 * @vercel/postgres talks to Postgres over a Neon WebSocket. Neon hosts expose
 * that socket. A local Postgres does not, so local URLs get a tiny bridge.
 * Hosted Neon URLs are left on the default secure socket.
 */
export function prepareVercelPostgresConnection(connectionString: string | undefined): void {
  if (!connectionString) return;
  const target = postgresTarget(connectionString);
  if (!target) return;

  const port = Number(process.env.LOCAL_PG_WS_PROXY_PORT || 4444);
  neonConfig.useSecureWebSocket = false;
  neonConfig.wsProxy = () => `127.0.0.1:${port}/v2`;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
  if ("forceDisablePgSSL" in neonConfig) {
    neonConfig.forceDisablePgSSL = true;
  }

  if (globalState.__awcPgWsProxy) return;

  const server = new WebSocketServer({ host: "127.0.0.1", port, path: "/v2" });
  server.on("connection", (socket) => {
    const tcp = net.connect(target.port, target.host);
    const pending: Buffer[] = [];
    let ready = false;
    tcp.on("connect", () => {
      ready = true;
      for (const chunk of pending) tcp.write(chunk);
      pending.length = 0;
    });
    socket.on("message", (data) => {
      const chunk = Buffer.isBuffer(data) ? data : Buffer.from(data as ArrayBuffer);
      if (ready) tcp.write(chunk);
      else pending.push(chunk);
    });
    tcp.on("data", (chunk) => {
      if (socket.readyState === socket.OPEN) socket.send(chunk);
    });
    const closeBoth = () => {
      tcp.destroy();
      if (socket.readyState === socket.OPEN) socket.close();
    };
    socket.on("close", () => tcp.end());
    socket.on("error", closeBoth);
    tcp.on("error", closeBoth);
    tcp.on("close", () => {
      if (socket.readyState === socket.OPEN) socket.close();
    });
  });
  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code !== "EADDRINUSE") {
      console.error("[cms] local postgres websocket bridge failed", error);
    }
  });
  globalState.__awcPgWsProxy = { port };
}
