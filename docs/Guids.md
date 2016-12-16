# 配置文件说明

## 目录

* [例子](#example)
* [配置选项](#config)

## 例子

```javascript
{
  "github_url": "https://github.com/lanjingling0510/rainie-doc",
  "name": "文档web自动生成工具",
  "title": "",
  "description": "根据代码注释自动生成说明网站",
  "logo_icon": "",
  "entry_path": "./src/*.js",
  "categories": [
  	"介绍",
  	"API"
  ],
	"staticDocs": [
		{
				"type": "markdown",
				"urlId": "readme",
				"category": "介绍",
				"title": "readme",
				"description": "",
				"path": "README.md"
		}
	],
  "feature": "Feature.md",
  "usage": "./docs/usage.js"
}
```

## 配置选项

- `github_url` : github地址
- `name` : 项目名称
- `title`: 项目标题
- `description` : 项目描述
- `logo_icon` : logo图标地址
- `entry_path`: 需要解析的代码匹配路径

将代码注释转化成说明文档。

注意：代码注释关键词必须包括`@category`

其余的jsdoc风格的关键词主要有`@description`, `@param`, `@return`, `@example`

示例:
```javascript
// 配置
{
    // ....
    "entry_path": "./src/index.js"
}


// ./src/index.js文件

/**
 * @description 添加css类
 * @category cqaso-kit-css
 *
 * @param  {Object}  element 目标元素
 * @param  {Object}  props   css属性对象
 *
 * @example
 * const {addCss} = require('cqaso-kit-css');
 * addCss(element, {
 *   translate: '100px',
 *   rotate: '90deg'
 * });
 */
function addCss() {
    // ...
}

```

- `categories`: 网站目录
- `staticDocs`: 添加的markdown文档数组

示例:
```javascript
// 配置
{
    // ...
    "staticDocs": [
    	{
    			"type": "markdown",
    			"urlId": "readme",
    			// 文档目录
    			"category": "介绍",
    			// 文档标题
    			"title": "readme",
    			// 文档描述
    			"description": "",
    			// 文档路径
    			"path": "README.md"
    	}
}
],
```

- `feature` : 项目描述特征文件路径(\*.md)
- `usage` : 项目用法配置文件路径

示例:
```javascript
// 配置
{
    // ....
    "usage": "./usage.js"
}

// ./usage.js文件
module.exports = {
  npm: {
    install: 'npm install cqaso-kit-xxx --save',
    example: `
const transition = require('cqaso-kit-transition');
transition(element)
  .delay(600)
  .to({rotateY: '180deg'})
  .delay(600)
  .to({rotateY: '0deg'});`
  },
  bower: {
    install: 'bower install rainie-doc',
    example: `xxx`
  },
  cdn: {
    install: `<script src="http://cdn.xxx.org/xxx.min.js"></script>`,
    example: `xxx`,
    download: `http://cdn.xxx.org/v/xxx.min.js`
  }
};

```
