import 'dotenv/config';

import corsProxy from 'cors-anywhere';

const host = '0.0.0.0';
const port = 8080;

const options = {
  removeHeaders: ['cookie'],
};

const originWhitelist = process.env.CORS_PROXY_ORIGIN_WHITELIST;
if (originWhitelist !== undefined && originWhitelist.length > 0) {
  options.originWhitelist = originWhitelist.split(',');
  options.requireHeader = ['origin'];
}

corsProxy.createServer(options).listen(port, host, () => {
  console.log(`CORS proxy is now listening on http://${host}:${port}`);
});
