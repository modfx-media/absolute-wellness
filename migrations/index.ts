import * as migration_20261125_184325_initial from './20261125_184325_initial';

export const migrations = [
  {
    up: migration_20261125_184325_initial.up,
    down: migration_20261125_184325_initial.down,
    name: '20261125_184325_initial'
  },
];
