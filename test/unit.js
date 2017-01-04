import 'babel-polyfill';

window.__DOCS_JSON__ = {
  "docs": {
    "文档": [{
      "content": "\n\n## 目录\n\n* [例子](#example)\n* [配置选项](#config)\n\n## 例子<a name=\"example\"></a>\n\n```javascript\n{\n  \"github_url\": \"https://github.com/lanjingling0510/rainie-doc\",\n  \"name\": \"文档web自动生成工具\",\n  \"title\": \"\",\n  \"description\": \"根据代码注释自动生成说明网站\",\n  \"logo_icon\": \"\",\n  \"entry_path\": \"./src/*.js\",\n  \"categories\": [\n  \t\"介绍\",\n  \t\"API\"\n  ],\n\t\"staticDocs\": [\n\t\t{\n\t\t\t\t\"type\": \"markdown\",\n\t\t\t\t\"urlId\": \"readme\",\n\t\t\t\t\"category\": \"介绍\",\n\t\t\t\t\"title\": \"readme\",\n\t\t\t\t\"description\": \"\",\n\t\t\t\t\"path\": \"README.md\"\n\t\t}\n\t],\n  \"feature\": \"Feature.md\",\n  \"usage\": \"./docs/usage.js\"\n}\n```\n\n## 配置选项<a name=\"config\"></a>\n\n##### `github_url`\ngithub地址\n\n#### `name`\n项目名称\n\n#### `title`\n项目标题\n\n#### `description`\n项目描述\n\n#### `logo_icon`\nlogo图标地址\n\n#### `entry_path`\n需要解析的代码匹配路径\n\n#### `categories`\n网站目录\n\n#### `staticDocs`\n添加的markdown文档数组\n```javascript\n\"staticDocs\": [\n\t{\n\t\t\t\"type\": \"markdown\",\n\t\t\t\"urlId\": \"readme\",\n\t\t\t// 文档目录\n\t\t\t\"category\": \"介绍\",\n\t\t\t// 文档标题\n\t\t\t\"title\": \"readme\",\n\t\t\t// 文档描述\n\t\t\t\"description\": \"\",\n\t\t\t// 文档路径\n\t\t\t\"path\": \"README.md\"\n\t}\n],\n```\n\n#### `feature`\n项目描述特征\n\n#### `usage`\n项目用法\n",
      "type": "markdown",
      "urlId": "config",
      "category": "文档",
      "title": "配置文件说明",
      "description": "rainie-doc.json",
      "path": "./docs/Guids.md"
    }]
  },
  "feature": "# rainie-doc\n\n**前端文档网站生成工具**\n\n`rainie-doc`工具根据注释自动生成文档静态网站。\n\n<img src=\"https://raw.githubusercontent.com/lanjingling0510/rainie-doc/master/.github/preview.jpg\" style=\"width: 100%\" />\n\n\n## 特点\n\n- 借助`jsdoc`解析注释生成json数据\n- 根据json数据自动生成静态网站\n- 可添加markdown文档\n- 预留`使用说明`和`特点介绍说明`到生成页面指定位置\n\n## 文档\n\n* [使用指导](https://lanjingling0510.github.io/rainie-doc)\n\n## 介绍\n\n### 安装\n\n使用 [npm](https://www.npmjs.com/):\n\n\t$ npm install rainie-doc -g\n\n### 选项\n\n#### `-c / --config <file>`\n\n说明：配置文件路径\n\n默认值： `rainie-doc.json`\n\n```javascript\nrainieDoc -c rainie-doc.json\n```\n\n### 配置文件\n\n配置文件`rainie-doc.json`模板：\n\n```javascript\n{\n  \"github_url\": \"https://github.com/lanjingling0510/rainie-doc\",\n  \"name\": \"文档web自动生成工具\",\n  \"title\": \"\",\n  \"description\": \"根据代码注释自动生成说明网站\",\n  \"logo_icon\": \"\",\n  \"entry_path\": \"./src/*.js\",\n  \"categories\": [\n  \t\"介绍\",\n  \t\"API\"\n  ],\n\t\"staticDocs\": [\n\t\t{\n\t\t\t\t\"type\": \"markdown\",\n\t\t\t\t\"urlId\": \"readme\",\n\t\t\t\t\"category\": \"介绍\",\n\t\t\t\t\"title\": \"readme\",\n\t\t\t\t\"description\": \"\",\n\t\t\t\t\"path\": \"README.md\"\n\t\t}\n\t],\n  \"feature\": \"Feature.md\",\n  \"usage\": \"./docs/usage.js\"\n}\n\n```\n具体内容请看[配置文件说明](https://github.com/lanjingling0510/rainie-doc/#/config)\n\n## How to Contribute\n\nAnyone and everyone is welcome to contribute to this project. The best way to\nstart is by checking our [open issues](https://github.com/lanjingling0510/rainie-doc/issues),\n[submit a new issues](https://github.com/lanjingling0510/rainie-doc/issues/new?labels=bug) or\n[feature request](https://github.com/lanjingling0510/rainie-doc/issues/new?labels=enhancement),\nparticipate in discussions, upvote or downvote the issues you like or dislike.\n",
  "usage": {
    "npm": {
      "install": "npm install rainie-doc -g",
      "example": "\nrainie-doc --config ./rainie-doc.json\n        "
    }
  },
  "name": "文档web自动生成工具",
  "description": "根据代码注释自动生成说明网站",
  "github_url": "https://github.com/lanjingling0510/rainie-doc",
  "title": "",
  "logo_icon": "",
  "entry_path": ""
};

const testsContext = require.context('../app', true, /\/test\.jsx?$/);
testsContext.keys().forEach(testsContext);
