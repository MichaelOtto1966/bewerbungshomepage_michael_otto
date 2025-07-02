--- 
title: Die Datei package.json zur Info
description: Die package.json zur Info, damit nicht alles abgeschrieben werden muss
img: irgendeinbild.jpg
date: 30.03.2022
---

# Die Datei package.json

Diese Datei ist meine **package.json**. Ggf. sind Anpassungen an Eure Umgebung notwendig.

```
{
  "//1": "describes your app and its dependencies",
  "//2": "https://docs.npmjs.com/files/package.json",
  "//3": "updating this file will download and update your packages",
  "name": "bewerbungshomepage-node-js",
  "version": "0.0.1",
  "description": "A simple Node app for a Markdown-Blog.",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.17.3",
    "nodemailer": "^6.7.3",
    "body-parser": "^1.19.2",
    "express-device": "^0.4.2",
    "endb": "^1.3.0",
    "sql": "^0.78.0",
    "cors": "^2.8.5",
    "ejs": "^3.1.6",
    "markdown-it": "^12.3.2",
    "canvas": "^2.9.1",
    "gray-matter": "^4.0.3",
    "multiparty": "^4.2.3",
    "dotenv": "^16.0.0",
    "sqlite3": "^5.0.2",
    "zero-md": "^2.3.4"
  },
  "engines": {
    "node": "12.x"
  },
  "repository": {
    "url": "https://glitch.com/edit/#!/bewerbungshomepage-with-blog"
  },
  "license": "MIT",
  "keywords": [
    "node",
    "glitch",
    "nodemailer",
    "express"
  ]
}
```