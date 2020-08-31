# JWT认证实践

了解JWT认证过程以及node的api开发。

## 概念
JWT是一个开放标准，它定义了一张用于简洁，自包含用于通信双方之间以JSON对象的形式安全传递的方法。JWT可以使用HMAC算法或者RSA的公钥密钥来进行签名。它具有两个特点：
- 简洁：可以通过URL、POST参数或者在HTTP header传送，而且数据量小，传输速度快。
- 自包含：消息体（payload）中包含了所有用户所需要的信息，避免了多次查询数据库。

## 流程
- 用户在客户端填写用户名和密码；
- 通过post方法提交到服务端；
- 服务端校验通过后，根据用户如角色、登录时间、用户id等生成JWT；
- 服务端将生成JWT通过set-cookie的方式设置在客户端的cookie上；
- 之后客户端每一次的请求都可以带上这个cookie，然后服务端通过这个cookie来验证请求的合法性。

## 组成
- Header头部
  ```json
  {
    "alg": "HS256",  // 采用加密算法 
    "typ": "JWT"     // token类型
  }
  ```
  它会使用 Base64 编码组成 JWT 结构的第一部分,如果使用Node.js，可以用Node.js的包base64url来得到这个字符串。

- Payload消息体
  ```json
  {
    "iss": "urnotzane JWT",    // 签发者
    "iat": 1441593502,         // 令牌生成时间
    "exp": 1441594722,         // 令牌过期时间
  }
  ```
  它会使用 Base64 编码组成 JWT 结构的第二部分。

- Signature签名
  前两部分使用Base64编码的，即前端可以解开知道里面的信息。Signature需要使用编码后的header和payload以及我们提供的一个密钥，然后使用header中指定的算法进行签名。签名的作用是保证JWT没有被篡改过。

这三部分连在一起就是JWT。

## 使用

Authorization: Bearer <JWT>