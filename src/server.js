const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js'); // 确保你有合适的 webpack 配置
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8754; // HTTPS 的端口
const HTTP_PORT = 8047; // HTTP 的端口
const HOST = '192.168.200.102'; // 服务器的 IP 地址
const compiler = webpack(webpackConfig);

// SSL 证书配置
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'key', 'Nginx', 'privkey.key')), // 私钥路径
    cert: fs.readFileSync(path.join(__dirname, 'key', 'Nginx', 'fullchain.pem')) // 证书路径
};

// 使用 Webpack Dev Middleware
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
}));

// 使用 Webpack Hot Middleware
app.use(webpackHotMiddleware(compiler));

// 添加代理中间件（示例）
const apiProxy = createProxyMiddleware('/api', {
    target: 'http://backend-server.com', // 后端服务器的 URL
    changeOrigin: true,
});
app.use(apiProxy);

// 加载静态文件
app.use(express.static('dist'));

// 所有请求都将返回 index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 启动 HTTPS 服务器
https.createServer(sslOptions, app).listen(PORT, HOST, () => {
    console.log(`HTTPS server running at https://${HOST}:${PORT}`);
});

// HTTP 到 HTTPS 重定向
const httpApp = express();
httpApp.use((req, res) => {
    // 使用 301 重定向
    res.redirect(301, `https://${req.headers.host}${req.url}`);
});

// 启动 HTTP 服务器以重定向到 HTTPS
http.createServer(httpApp).listen(HTTP_PORT, () => {
    console.log(`HTTP server running and redirecting to HTTPS at http://${HOST}:${HTTP_PORT}`);
});
