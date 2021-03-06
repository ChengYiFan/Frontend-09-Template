学习笔记
# 测试工具

测试工具是供应链里面重要的一环，使用单元测试的一般场景：
+ 公司的商业项目
+ 高度复用的组件和库

测试框架写一个成本也不是特别高。

当前流行的测试工具及配套设施：
+ Mocha: https://mochajs.org/   https://mochajs.cn/
+ Jest


## 1. Mocha

mocha是一个功能丰富的javascript测试框架，运行在node.js和浏览器中，使异步测试变得简单有趣。Mocha测试连续运行，允许灵活和准确的报告，同时将未捕获的异常映射到正确的测试用例。

### 1.1 安装

- 新建test-demo空文件夹
- 执行npm init
- 然后执行 `npm install --global mocha` or `npm install --save-dev mocha`

### 1.2 配置

+ 写一个简单的加法函数，然后配置test/test.js去做测试。
```js
function add(a, b) {
  return a + b;
}

module.exports = add;
```

```js
// test.js
var assert = require('assert');

var add = require('../add.js');

describe("add function testing", function(){
  it('1+2 should be 3', function() {
    assert.equal(add(1,2), 3);
  });
  
  it('-1+2 should be -3', function() {
    assert.equal(add(-5,2), -3);
  });
});

```

+ 然后执行`macha`命令测试通过。

### 1.3 解决以node模式exports的问题

一个简单的思路就是使用webpack，然后以build后dist目录里的内容进行单元测试。但是测试依赖build并不太好。同时，如果后面做code coverage相关的工作，依赖dist里面的内容的话，又增加了一些麻烦。


babel解决方案：使用babel register。只需要require一下就可以使用了。

+ 首先安装@babel/core和@babel/register两个模块。
```
npm install --save-dev @babel/core @babel/register
```

+ babel的config文件
安装 `npm install @babel/preset-env --save-dev`
```
{
  "presets": ["@babel/preset-env"]
}
```

+ 将module.exports/require方式改为export/import

+ 然后执行`mocha --require @babel/register` 或 `、./node_modules/.bin/mocha --require @babel/register` 成功

+ 将命令放入package.json scripts里面
```
  "scripts": {
    "test": "mocha --require @babel/register"
  },
```

## 2. code coverage

code coverage 是单元测试的一个重要的指标。 表示我们的测试到底覆盖了多少原文件里的代码。mocha里天然是没有这个工具的，需要其他工具配合使用。

+ test case写的好不好
+ 有没有测全

### 2.1 code coverage相关的工具——nyc

istanbuljs，它的命令行工具就叫nyc。地址：https://www.npmjs.com/package/nyc

它可以帮我们在一个复杂的文件里面，计算最终测试覆盖的比例。



+ 安装 `npm i -D nyc or yarn add -D nyc`

+ 增加 scripts:
```
  "scripts": {
    "test": "mocha --require @babel/register",
    "coverage": "nyc npm run test"
  },
```

+ 执行：`npm run coverage`

|File    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
|--------|---------|----------|---------|---------|-------------------
|Files |     100 |      100 |     100 |     100 |  |
|add.js |     100 |      100 |     100 |     100 |  |

+ 为了更好的支持babel提高准确度，增加.nycrc配置，安装 @istanbuljs/nyc-config-babel 参见：https://www.npmjs.com/package/@istanbuljs/nyc-config-babel
```
// .nycrc
{
    "extends": "@istanbuljs/nyc-config-babel"
}
```

+ 安装babel-plugin-istanbul: `npm install -D babel-plugin-istanbul` 并添加到bablerc的plugin里，参见：https://www.npmjs.com/package/babel-plugin-istanbul
```
{
  "presets": ["@babel/preset-env"],
  "plugins": ["istanbul"]
}
```

以上详见test-demo




## 3. 实践：对html-parser进行单元测试

通过实际的例子来看单元测试对质量的提升有多大的作用。

新建文件夹，进入到html-parser目录
+ 将之前课程的parser.js拷贝到html-parser\src，并修改module.exports为export。
+ 执行`npm init`
+ 将test-demo里package.json里的依赖包与scripts拷贝到当前目录下的package.json中
+ 将test-demo目录下的.babelrc和.nycrc同时拷贝到当前目录
+ 创建test目录，同时在test目录下创建parser-test.js
  ```
  var assert = require('assert');

  import { parseHTML } from '../src/parser.js';

  describe("parseHTML function testing", function(){
    it('<a>abc</a>', function() {
      parseHTML('<a>abc</a>');
      assert.equal(1, 1);
    });
  });
  ...
  ```

  详见： html-parser/test/parser-test.js

## 4. 所有工具与generator的集成

将第17周的generator-vue拷贝到本周目录，重命名为generator-toytool，然后集成测试框架和coverage，都跑起来。

+ 首先，修改index.js的package.json设置
```js
this.npmInstall(['mocha', 'nyc'], { 'save-dev': true });   // 安装最新版本的mocha,nyc
this.npmInstall(['@babel/core', 'babel-loader', '@babel/preset-env', '@babel/register', 'babel-plugin-istanbul'], { 'save-dev': true });   // 安装babel系列
this.npmInstall(['@istanbuljs/nyc-config-babel'], { 'save-dev': true });   // 安装istanbuljs系列
```
+ 将html-parser里的.babelrc和.nycrc拷贝过来，放到template目录下，并在index.js里添加fs的拷贝。
```js
this.fs.copyTpl(
  this.templatePath('.babelrc'),
  this.destinationPath('.babelrc'),
);
this.fs.copyTpl(
  this.templatePath('.nycrc'),
  this.destinationPath('.nycrc'),
);
```

+ 新建sample-test.js并编写测试用例, 添加到copy。
```js
this.fs.copyTpl(
  this.templatePath('sample-test.js'),
  this.destinationPath('test/sample-test.js'),
);
```

+ webpack里加上js的babel-loader

+ 增加scripts
```js
"scripts": {
    "build": "webpack",
    "test": "mocha --require @babel/register",
    "coverage": "nyc mocha --require @babel/register"
  },
```

+ 执行 `npm link`
+ 新建toytool-demo目录，进入并执行`yo toytool`, 安装成功后执行`npm test` 提示成功。然后执行`npm run coverage` 和 `npm build` 可以得到coverage和build成功。

以上详见 generator-toytool 和 toytool-demo
