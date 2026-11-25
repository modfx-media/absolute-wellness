/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from "@payload-config";
import "@payloadcms/next/css";
import type { ServerFunctionClient } from "payload";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";
import Script from "next/script";

import { importMap } from "./admin/importMap.js";
import "./custom.scss";

export const dynamic = "force-dynamic";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const safariGuards = `
(function () {
  var w = window;
  if (typeof w.requestIdleCallback !== "function") {
    w.requestIdleCallback = function (cb, options) {
      var start = Date.now();
      return setTimeout(function () {
        cb({
          didTimeout: false,
          timeRemaining: function () { return Math.max(0, 50 - (Date.now() - start)); }
        });
      }, (options && options.timeout) || 1);
    };
    w.cancelIdleCallback = function (id) { clearTimeout(id); };
  }
  if (typeof Promise.withResolvers !== "function") {
    Promise.withResolvers = function () {
      var resolve, reject;
      var promise = new Promise(function (res, rej) { resolve = res; reject = rej; });
      return { promise: promise, resolve: resolve, reject: reject };
    };
  }
  if (typeof URL.canParse !== "function") {
    URL.canParse = function (url, base) {
      try { new URL(url, base); return true; } catch (e) { return false; }
    };
  }
  if (typeof URL.parse !== "function") {
    URL.parse = function (url, base) {
      try { return new URL(url, base); } catch (e) { return null; }
    };
  }
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID !== "function") {
    crypto.randomUUID = function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };
  }
  if (typeof Object.hasOwn !== "function") {
    Object.hasOwn = function (obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); };
  }
})();
`;

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    <Script id="safari-guards" strategy="beforeInteractive">
      {safariGuards}
    </Script>
    {children}
  </RootLayout>
);

export default Layout;
