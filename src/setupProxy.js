// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

const propsId = process.env.REACT_APP_PROPS_DEPLOY_ID;
const leadsId = process.env.REACT_APP_LEADS_DEPLOY_ID;

if (!propsId || !leadsId) {
  console.error('❌  Faltan variables: REACT_APP_PROPS_DEPLOY_ID o REACT_APP_LEADS_DEPLOY_ID');
  process.exit(1);
}

const origin = 'https://script.google.com';
const propsPath = `/macros/s/${propsId}/exec`;
const leadsPath = `/macros/s/${leadsId}/exec`;      

module.exports = (app) => {
  app.use(
    '/api/props',
    createProxyMiddleware({
      target: origin,
      changeOrigin: true,
      /*
       * /api/props?foo=bar  ➜  /macros/s/<id>/exec?foo=bar
       */
      pathRewrite: (_path, req) => {
        const query = req.url.split('?')[1] || '';
        const newPath = `${propsPath}${query ? '?' + query : ''}`;
        return newPath;
      },
      logLevel: 'debug'      
    })
  );
  // Proxy para leads
  app.use(
    '/api/leads',
    createProxyMiddleware({
      target: origin,
      changeOrigin: true,
      pathRewrite: (_path, req) => {
        const query = req.url.split('?')[1] || '';
        return `${leadsPath}${query ? '?' + query : ''}`;
      },
      logLevel: 'debug',
    })
  );
};
