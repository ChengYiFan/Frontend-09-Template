学习笔记
# 发布系统

可以分为三个子系统:

1. 线上服务系统：给真正的用户提供线上服务
2. 发布系统：程序员向线上服务系统发布所用的发布系统，可以和线上服务系统同期部署，是两个独立的集群。这个涉及到一定的服务端的知识。最佳实践呢，各个公司也不太一样。最简单的应用就是单机——同级部署发布系统和线上服务器。
3. 发布工具：用命令行工具和发布系统连接。我们需要完成发布系统的模块所要完成的工作。

# 一、实现线上服务系统
## 1. 初始化Server
需要一台独立的服务器去做这个事情。有条件的可以用真实的服务器，我们这里就用虚拟机来代替真实的服务器。

虚拟机——推荐Oracle的VirtualBox虚拟机，完全开源免费的版本。演示一个Ubuntu Server的版本。基于Ubuntu Server去做开发。

### 1.1 在VirtualBox下安装Ubuntu Server
- 前期准备: 下载安装VirtualBox（ https://www.virtualbox.org/wiki/Downloads）和Ubuntu Server镜像（https://ubuntu.com/download/server）
- 首先在VirturalBox中创造一个虚拟机，点击新建，输入： Node Server；
- 环境选择Linux\Ubuntu 64\2G内存\10G硬盘-动态分配
- 启动： 选择光盘镜像——ubuntu-20.04.2-live-server-amd64.iso
- 选择语言类型为英语,不用代理,镜像地址修改一下,用默认的ubuntu.com会比较慢: mirrors.aliyun.com/ubuntu
- 其他设备选项不用修改
- 输入Name/Server name/password
- Install OpenSSH Server默认勾选上
- popular snaps in server 暂时不用选
- 开始安装可以看到完整的log
- 安装完毕后要求重启reboot,让我们去把这个光盘弹出来(它其实会自动的把光盘弹出来),然后再手工重启一次就可以了
- 重启后出现登录提示,直接输用户名和密码(不用管log,这算是一个bug),登录成功

### 1.2 安装node

ubuntu上的包管理工具是apt, 使用apt安装一下node
```
sudo apt install nodejs
```
安装完成,查看版本号`node --version`为 10.19.0

### 1.3 安装npm
```
sudo apt install npm
```
安装完成,查看版本号`npm --version`为 6.14.4

### 1.4 用npm 全局安装一个叫n的包
这个是一个Node写的Node版本管理
```
sudo npm install -g n
```
 更新node到最新版本
 ```
 sudo n latest 
 ```
 重新设置PATH`PATH=$PATH` 然后node就更新到最新版本了.

 ## 2. 利用Express,编写服务器

现在最普遍最广泛应用的服务器框架Express, 在实际情况中,每个公司的线上服务系统可能比较复杂,有的公司发展比较好的它可能线上已经有一个这样的服务器,甚至是一个集群形态的这样的服务,有的公司它可能是前后端混部的,前端写完代码要交给后端同学进行部署,这里我们简单的把一个Express服务器跑起来.然后把它部署到我们的线上的机器上.也不去考虑监控\错误恢复,还有包括线上的重启,等一系列这种业务逻辑.

一般来说,如果是前后端分离的这种业务模式,前端代码是发HTML的,而服务端数据是由HTML和JS里面再去做Ajax请求再去获取的.怎么去发静态文件,涉及到和服务端混部,这个方案还得跟服务端的同学一起去商量.前端有没有自主独立的这种发布权限?

假设前端都是有独立的发布权限的.然后另外服务器集群的情况和部署的措施其实还跟运维有关,这个都要视公司的实际情况去进行沟通.一般不是一个前端team的事情.咱们这个课程会揭示里面的原理，把整个的链路跑通。

### 创建一个简单的server
- 新建一个空目录server
- 初始化expres项目: 执行`npx express-generator` 如果要经常初始化项目可以全局安装它
- 执行`npm install`
- app.js一般不用动，页面在views目录，使用的是jade的模板，routes目录是请求的路径，它在app.js里面被引入了进来。public里面有Javascripts images stylesheets代码。最终跑起来的服务只用public里面的代码就可以了。
- `npm start`启动服务，服务的默认端口是3000，在浏览器中输入http://localhost:3000/
打开
- 把routes、views全删掉，只用public
- 在public里面创建一个index.html，随便加一个helloWorld

## 3. 把Server部署到虚拟服务器上

准备工作
- 在安装的时候已经安装了openSSH这个包，如果没有安装的话，直接`apt install openSSH`安装
- 启动服务，因为ubuntu服务默认都是不启动。
  + 执行`service ssh start`，输入password启动，默认会在22端口监听，就可以远程登录到这台server上去了。
  + **ssh就是它既可以远程登录，也是可以传文件的。**
- 要copy 22这个端口
  + 22这个端口是不会直接给虚拟机的在虚拟机里先设置一下端口转发
  + 选择设置-网络-高级-端口转发，添加一条规则：主机端口选一个不太会冲突的8022，子系统端口选22，这样宿主机上的8022端口会被转发到虚拟机上的22端口，可以用它做登录。

  <div align="center">
    <img src="./img/setport.png" width = "500" alt="setport" align=center />
  </div>

- 创建目录：/home/cici/server
- 进入到server项目目录，写scp命令
  + 一般的scp命令在mac电脑上都是有的，如果是别的环境的话，想办法装一下scp这个命令。
  + 执行 `scp -P 8022 -r ./* cici@127.0.0.1:/home/cici/server` 从8022端口拷贝本目录下的所有资源到虚拟机。出现auth的时候就说明连接成功了。输入虚拟机上的密码。就完成了拷贝。

  <div align="center">
    <img src="./img/copyfile.png" width = "500" alt="setport" align=center />
  </div>

  <div align="center">
    <img src="./img/copyfile2.png" width = "500" alt="setport" align=center />
  </div>

  + 可以拷贝完整的node_modules目录保持线上和线下的一致，也可以利用package-lock.json策略重新npm install。部署策略这里不再讨论。
- 在虚拟机上的server目录，执行一下`npm start`命令，服务启动起来了。监听的是3000端口。
- 针对虚拟机，再配置一个服务的端口映射。
  + 点击设置 -网络-高级-端口转发-添加一条规则：主机端口8080，子系统端口3000。
  + 在浏览器中输入http://localhost:8080/， 可以看到服务正常启动，能够访问了。
  + http://localhost:8080/stylesheets/style.css 也可以正常从访问

  <div align="center">
    <img src="./img/serverSus.png" width = "500" alt="setport" align=center />
  </div>

  
这样就完成了一个纯粹的静态服务系统 详见 server目录

# 二、实现发布系统
发布系统是由一个发布的服务器端和一个发布工具，它是由这样一对的项目来构成的。

## 1. 实现简单的发布工具和发布服务器
先写基本的功能，然后逐渐的扩展，让它变成一个工程上面基本可用的这样的一个东西。先搭出来基本的架子。

+ 创建两个新的项目 publish-server和publish-tool
  - publish-server 负责向真实的server去拷贝自己的文件，去发送我们想要发布的文件
+ 分别 init 以上两个项目 执行 `npm init` 

### 1.1 实现简单的 publish-server
+ publish-server 也可以用express或者koa这样的比较流行的框架，因为我们没有太多界面展示工作，所以就用纯粹的HTTP API
+ 创建server.js
  ```js
  let http = require('http');

  http.createServer(function(req, res) {
    console.log(req);
    res.end("Hello world");
  }).listen(8082);
  ```
+ 执行`node ./server.js` 在浏览器中访问 http://localhost:8082/ 可以正常访问

### 1.2 实现简单的publish-tool
+ 创建publish.js
  ```js
  let http = require('http');

  // 第一个参数是options，第二个参数是response
  let request = http.request({
    hostname: "127.0.0.1",
    port: 8082
  }, response => {
    console.log(response);
  });

  // 这个时候请求才真正的出去
  request.end();
  ```
  - 这里的response其实是一个流式的返回，现在http发送和接收的内容都非常短，都是流式处理的。所以你可能会觉得很麻烦，但是我们要做的就是要利用流式的特性，因为我们要发布的未必是一个体积很小的东西。流式处理能帮助我们，让我们计算机的效率达成最高。
+ 执行`node publish.js` 可以正常的启动, 可以看到publish-server启动的服务的确收到了request请求。这样我们客户端和服务端的基础代码就有了。


## 2. 实现发布系统功能完善-实现流式传输

发布系统肯定是要把文件通过HTTP的方式把它传给我们的发布服务器，那么publish-tool 到 publish-server 之间的传输就是一个典型的流式传输。

Node.js里面的流：不管我们把文件读出来，还是最后走网络的request response 以及最后到服务器，我们从服务端的 request 里面去读取这个数据，然后写到服务端的文件系统里，整个这个过程都是需要了解流式传输的。
+ 分两部分：
  - 一种是可读的流。
    + 也就是说可以用Node.js的代码从流里面获取数据，因为一个流一个stream，它肯定是一个对象，主要用它的两个事件：Event: 'close'和 Event: 'data
    + 当我们得到了一个流，比如说是一个文件流的时候，我们从这个文件里是逐步的去读取数据出来的。
    + 根据对stream的定义，我们是不太关心它每次读出来多少的。这时候就需要监听它的data Event。可能被一次或多次调用，然后来获取文件里面的内容。这种对小文件没有意义，但对大型文件如音视频、大的图片用这种方式处理。

    ```js
    // 修改publish.js
    let fs = require('fs');

    // 创建文件的流 vs readFile()
    let file = fs.createReadStream("./package.json");

    // 监听on('data')事件
    file.on('data', chunk => {
      console.log(chunk.toString());
    });

    file.on('end', () => {
      console.log("read finished");
    });
    ```
    执行`node publish.js`可以顺利得到package.json里面的内容。

  - 另一种是writeStream，可写的流。
    + client端的request的流就是一个只能写的流，读不出来东西。
    + 而有些流呢，可以支持一边读 一边写。
    + node的 writable的stream最重要就是write方法，就是往里写一个数据。还有一个end方法，对应流的结束，表示已经写完了。
    + write不是一个同步的API，它其实是有callback的，但是可以连续调用，排序，会把buffer起来。Event: 'drain'表示已经把调用write写的数据全写完了。
    + http的request的请求也是流式，所以可以携带比较大的数据。下面演示用request发送流式的文件。
    ```js
    let http = require('http');
    let fs = require('fs');

    // 第一个参数是options，第二个参数是response
    let request = http.request({
      hostname: "127.0.0.1",
      port: 8082,
      method: "post",
      headers: {
        'Content-Type': 'application/octet-stream',
      }
    }, response => {
      console.log(response);
    });

    // 这个时候请求才真正的出去
    // request.end();


    // 创建文件的流 vs readFile()
    let file = fs.createReadStream("./package.json");

    // 监听on('data')事件
    file.on('data', chunk => {
      console.log(chunk.toString());
      request.write(chunk);
    });

    file.on('end', (chunk) => {
      console.log("read finished");
      request.end(chunk);
    });
    ```
    + 服务端的request也是一个流，是个readable的流。接收一个incomingMessage的接口
    ```js
    let http = require('http');

    http.createServer(function(req, res) {
      console.log(req.headers);
      req.on('data', chunk => {
        console.log(chunk);
      })
      req.on('end', chunk => {
        res.end("success");
      })
      
    }).listen(8082);
    ```
    + 分别启动node server.js和node publish.js可以看到请求被正确的响应了。


## 3. 实现发布系统功能完善-实现文件写入
    
+ 修改server.js 实现文件的写入
  ```js
  let http = require('http');
  let fs = require('fs');

  http.createServer(function(req, res) {
    console.log(req.headers);

    let outFile = fs.createWriteStream("../server/public/index.html");

    req.on('data', chunk => {
      outFile.write(chunk);
    })
    req.on('end', () => {
      outFile.end();
      res.end("success");
    })
    
  }).listen(8082);
  ```

+ 修改publish.js 请求读sample.html
  ```js
  let http = require('http');
  let fs = require('fs');

  // 第一个参数是options，第二个参数是response
  let request = http.request({
    hostname: "127.0.0.1",
    port: 8082,
    method: "post",
    headers: {
      'Content-Type': 'application/octet-stream',
    }
  }, response => {
    console.log(response);
  });

  // 这个时候请求才真正的出去
  // request.end();


  // 创建文件的流 vs readFile()
  let file = fs.createReadStream("./sample.html");

  // 监听on('data')事件
  file.on('data', chunk => {
    console.log(chunk.toString());
    request.write(chunk);
  });

  file.on('end', (chunk) => {
    console.log("read finished");
    request.end(chunk);
  });

  ```
+ 重新启动 node server.js 和 node publish.js 这时可以检查到server目录下/public/index.html被替换为最新的了。

## 4. 实现发布系统功能完善-实现发布系统部署，单文件上传发布

+ 把部署工作写在 npm的command里面，包括 server 和 publish-server。

  ```js
  // publish-server/package.json
  "scripts": {
    "start": "node ./server.js",
    "publish": "scp -P 8022 -r ./* cici@127.0.0.1:/home/cici/publish-server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

  // server/package.json
  "scripts": {
    "publish": "scp -P 8022 -r ./* cici@127.0.0.1:/home/cici/server",
    "start": "node ./bin/www"
  },
  ```
+ 同时在虚拟机里启动两个服务： 进入server目录，执行`npm start&` 加&不会阻塞console。
+ 再在虚拟机上创建publish-server目录。`cd .. `，`mkdir publish-server`
+ 回到项目publish-server,执行 `npm run publish`,然后输入虚拟机的密码，胜利的传输到了服务器端。
+ 回到虚拟机publish-server目录，执行`npm start`,这样的话 虚拟机是的两个server都启动了。
+ 因为用了8082端口，所以还是要再配一个端口转发。8882->8082
  <div align="center">
    <img src="./img/add8882port.png" width = "500" alt="setport" align=center />
  </div>
+ 修改一下publish-tool 发布的端口地址，改到8882发到虚拟机上。
    ```js
    // 第一个参数是options，第二个参数是response
    let request = http.request({
      hostname: "127.0.0.1",
      port: 8882,
      method: "post",
      headers: {
        'Content-Type': 'application/octet-stream',
      }
    }, response => {
      console.log(response);
    });
    ```
+ 修改sample.html，然后重新发一下，`node publish.js`
+ 可以看到数据成功更新了。现在基本上了解了发布系统是如何工作得了。
  <div align="center">
    <img src="./img/publishSus.png" width = "500" alt="setport" align=center />
  </div>


## 5. 实现发布系统功能完善-多文件发布

到现在我们已经实现从文件到HTTP，再从HTTP到文件的流式的传输，通过对流式传输的学习，已经可以把文件传输做成可以进行单文件上传。


通常在工具链里发布都不是发布一个文件，即多文件发布。这需要用到Node压缩方面的包。一个是Archiver： https://www.npmjs.com/package/archiver ;一个是unzipper: https://www.npmjs.com/package/unzipper 是一个输出流

Node.js Stream文档：https://nodejs.org/docs/latest-v13.x/api/stream.html#stream_readable_streams

readable.pipe(destination[, options])是一个比较重要的方法，能够把一个可读的流导入到可写的流里面。流处理有一些比较麻烦的地方，比如写的时候要考虑它是否drain。读的时候倒是没有特别多的问题。但是要去监听事件也是非常麻烦。想把一个流导进另一个流的时候就可以简单的一次性的调用pipe方法。

### 1. 把代码改成pipe风格

**1.1 修改publish.js，使用pipe方法去比较快捷的去处理。**

```js
let http = require('http');
let fs = require('fs');

// 第一个参数是options，第二个参数是response
let request = http.request({
  hostname: "127.0.0.1",
  port: 8882,
  method: "post",
  headers: {
    'Content-Type': 'application/octet-stream',
  }
}, response => {
  console.log(response);
});


// 创建文件的流 vs readFile()
let file = fs.createReadStream("./sample.html");

file.pipe(request);

file.on('end', () => request.end());
```

**1.2修改publish-server/server.js,同样用pipe处理**
```js
let http = require('http');
let fs = require('fs');

http.createServer(function(req, res) {

  let outFile = fs.createWriteStream("../server/public/index.html");

  req.pipe(outFile);
  
}).listen(8082);
```


### 2 修改publish.js 获取文件大小的API： fs.stat
```js
let http = require('http');
let fs = require('fs');

fs.stat("./sample.html", (err, states) => {
  // 第一个参数是options，第二个参数是response
  let request = http.request({
    hostname: "127.0.0.1",
    port: 8882,
    method: "post",
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': states.size
    }
  }, response => {
    console.log(response);
  });


  // 创建文件的流 vs readFile()
  let file = fs.createReadStream("./sample.html");

  file.pipe(request);   // 我们需要知道这个request的大小

  file.on('end', () => request.end());
});
```

### 3. 多文件场景实现: 通过压缩包实现多文件上传

多文件的场景其实是要把一个文件夹里面的文件去压缩。

+ 在publish-tool目录中创建sample目录，放入多个文件
+ 安装archiver: `npm install --save archiver`，并在publish.js中引入，压缩目录
  ```js
  // 压缩到文件流
  const archive = archiver('zip', {
    zlib: { level:9 }
  });
  archive.directory('./sample/', false);

  archive.finalize();

  archive.pipe(fs.createWriteStream("tmp.zip")); 
  ```
+ pipe到request流，服务端
  ```js
  // publish.js
  let http = require('http');
  let fs = require('fs');
  let archiver = require('archiver');

  // 第一个参数是options，第二个参数是response
  let request = http.request({
    hostname: "127.0.0.1",
    port: 8882,
    method: "post",
    headers: {
      'Content-Type': 'application/octet-stream',
      // 'Content-Length': states.size
    }
  }, response => {
    console.log(response);
  });

  const archive = archiver('zip', {
    zlib: { level:9 }
  });
  archive.directory('./sample/', false);

  archive.finalize();
 
  archive.pipe(request);    // 压缩到request流
  ```

  ```js
  // server.js
  let http = require('http');
  let fs = require('fs');

  http.createServer(function(req, res) {

    let outFile = fs.createWriteStream("../server/public/tmp.zip");

    req.pipe(outFile);
  
  }).listen(8082);
  ```

+ 解压缩，需要用到unzipper,`npm install unzipper` 安装到服务端：publish-server
  ```js
  let http = require('http');
  // let fs = require('fs');
  let unzipper = require('unzipper');

  http.createServer(function(req, res) {

    // let outFile = fs.createWriteStream("../server/public/tmp.zip");
    // req.pipe(outFile);
    // 覆盖式发布
    req.pipe(unzipper.Extract({ path: '../server/public/' }));
    
  }).listen(8082);
  ```

  # 三、发布系统的登录和鉴权问题
  实际应用场景中，还涉及到发布鉴权问题，这就涉及到oAuth登录。

  ## 如何使用github oAuth

  + 登录到github，进入settings: https://github.com/settings/apps 
  + 选择 new github App
    - name:  cici-geek-toy-publish; 
    - homepage url: http://localhost; 
    - callback: http://localhost/auth; 
    - where can this github app be install? any account
    - Webhook 不需要勾选active
    - Expire user authorization tokens 不勾选（用户登录的token要不要过期，不用过期）
    - 然后提交
    - 拿到：App ID: 125787  Client ID: Iv1.fc827457a13e560b
  + github aAuth的API：https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
  + 首先publish-tool 进行权限的校验，打开authorize
  + 然后publish-server需要有一个auth路由，允许在这个路由下去接收code，用code + client_id + client_secret 换 token；然后用token获取用户信息，检查权限；publish 路由接受发布
    - 比较关键的问题是怎么把换取的token回传给客户端，让client端再启动一个本地服务
  + 在publish-tool，创建server,接受token,后点击发布
