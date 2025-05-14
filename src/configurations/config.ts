import * as process from 'node:process';

export default () => ({
  api: {
    port: process.env.PORT || 3000,
  },
});
