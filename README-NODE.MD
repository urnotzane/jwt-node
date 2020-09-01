# typescript的node服务端开发
虽然简单，但最主要的是动手能力。

## 步骤
- 将所有ts文件编译为js；
- webpack的本地服务由webpack-dev-middleware配置；
- 通过编译后的webpack配置文件打包src里的前端页面；
- 启动编译后的node服务端文件。

## 优化
- 格式化接口返回的数据：
  ```json
  {
    "data": "",
    "success": true,
    "code": 200,
    "message": ""
  }
  ```

## express中间件
用来拦截请求，如果请求未登录或登录态失效则返回401：
```typescript
export const verifyTokenMiddleware:RequestHandler = (req, res, next) => {
  const { cookies, headers } = req;
  if (req.url.indexOf('/login') > -1) {
    next();
    return;
  }
  const { token } = cookies;
  verifyToken(headers.authorization || token, (error) => {
    if (error) {
      res.status(401).send({
        data: undefined,
        success: false,
        code: 401,
        message: error.message,
      });
    } else {
      next();
    }
  })
}
```