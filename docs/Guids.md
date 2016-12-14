

## 目录

* [例子](#example)
* [配置选项](#config)

## 例子<a name="example"></a>

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

## 配置选项<a name="config"></a>

##### `github_url`
github地址

#### `name`
项目名称

#### `title`
项目标题

#### `description`
项目描述

#### `logo_icon`
logo图标地址

#### `entry_path`
需要解析的代码匹配路径

#### `categories`
网站目录

#### `staticDocs`
添加的markdown文档数组
```javascript
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
],
```

#### `feature`
项目描述特征

#### `usage`
项目用法
