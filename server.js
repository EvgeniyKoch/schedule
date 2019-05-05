const http = require('http');
const httpProxy = require('http-proxy');

const options = {
  changeOrigin: true,
  protocol: 'https',
  target: 'https://yobit.net',
  host: 'yobit.net',
};

const proxy = httpProxy.createProxyServer(options); // See (†)
proxy.on('error', function (e) {
  console.log(e);
});

proxy.on('proxyRes', function (proxyRes, req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
});


http.createServer(function (req, res) {
  proxy.web(req, res);
}).listen(8005);

console.log('server listening 8005');