#!/usr/bin/env node
const { checkBackendData } = require('../utils/checkBackend');

(async () => {
  const ok = await checkBackendData();
  console.log(ok ? 'Backend returned data' : 'Backend did not return data');
  process.exit(ok ? 0 : 1);
})();
