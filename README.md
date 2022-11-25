### 一个简单的grpcweb应用例子
---

##### 目录结构
    - helloworld                          项目根路径
      --client                            
        ---client.js                      客户端文件
      --dist                              打包后目录
        ---index.html                     web端首页
        ---main.js                        打包后的client.js文件
      --proto                             proto文件以及编译后文件存放位置
        ---helloworld.proto               proto文件
        ---helloworld_pb.js               编译后文件 包含HelloRequest和HelloReply类
        ---helloworld_grpc_web_pb.js      编译后文件 包含GreeterClient类
      --server
        ---server.js                      服务端文件



##### 必要包引入
    "google-protobuf": "^3.21.2",
    "grpc-web": "^1.4.2",

    /*node服务端需要*/

    "@grpc/grpc-js": "~1.0.5",
    "@grpc/proto-loader": "~0.5.4",
    "async": "~1.5.2",


##### 服务器代码启动
    在集成终端进入server目录，执行node server.js 启动服务端代码，服务端代码运行在9090端口

##### 浏览器端发起请求
在package.json所在目录下执行打包命令

    npm run dev
    
执行之后dist文件会生成main.js和自动引入main.js的index.html,在浏览器端打开dist目录下的index.html，打开f12，即可看到服务端相应

##### 解决跨域问题
官方给出的是yaml配置代理，使用docker去跑，我电脑安不了docker，目前使用grpcwebproxy来实现代理

由于客户端请求的为8080接口，服务端监听的为9090接口，所以需要运行代理，将8080端口转发到9090接口
下载grpcwebproxy.exe文件，配置环境变量，保证在其他目录可执行改命令，执行命令：
    grpcwebproxy --allow_all_origins --backend_addr=localhost:9090 --run_tls_server=false --server_http_debug_port=8080
把客户端8080端口的请求的转发服务端9090，设置允许跨域

##### 生成*_pb.js和*_grpc_web_pb.js文件
首先需要安装[protocolbuffer](https://github.com/protocolbuffers/protobuf/releases)和[protoc-gen-grpc-web](https://github.com/grpc/grpc-web/releases) plugin，记得配环境变量

然后在proto文件所在目录下执行命令

- 生成pb文件：protoc --js_out=import_style=commonjs,binary:. helloworld.proto
- 生成grpc_web_pb文件：protoc --grpc-web_out=import_style=commonjs,mode=grpcwebtext:. helloworld.proto

问题：****Protocol Buffers**** 最新版本protoc 3.21.5中将js拆分出去了，在运行上述命令时会报错，无法生成文件，拆分出去的新项目目前还没有明确的使用方法，现在用的是protoc 3.15.8
