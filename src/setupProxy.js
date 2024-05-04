const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', 
    createProxyMiddleware({
      target: 'https://budget-application-m7296.ondigitalocean.app:5001', 
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', 
      },
      secure: false,
    })
  );
};

