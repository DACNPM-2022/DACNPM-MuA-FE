/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://mua-dacnpm-be-l.herokuapp.com/',//'http://localhost:5000',
      changeOrigin: true,
    })
  );
};