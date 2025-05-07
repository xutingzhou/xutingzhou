---
author: ["Jimmy Xu"]
title: "使用 npm link 引入本地项目"
date: "2023-08-10"
summary: "使用 npm link 引入本地项目"
tags: ["npm", "react"]
categories: ["Learning React"]
---

## 需求

- 有两个项目，使用相同的 UI、api，想用一套通用的代码解决问题。
- 这套通用的代码也在逐步完善，经常需要改动。

## 解决方案

使用 npm link，把这套通用代码项目创建一个全局的链接，然后在那两个项目中链接。

**更新方案**

使用 git template，把这套通用代码项目创建一个模板，然后在那两个项目中引用。

## 示例

### 准备

有两个项目 demo 和 demo-common，需要在 demo 中 link demo-common

### 步骤

1. 在 demo-common 项目中执行 npm link，创建全局链接，可以在全局的 node_modules 文件夹中看到项目的快捷方式。
1. 然后在 demo 项目中执行 npm link demo-common，就已链接完成。
1. 注意，npm link 的是包名，不是文件夹名称。

## 参考

[npm-link | npm Docs (npmjs.com)](https://docs.npmjs.com/cli/v8/commands/npm-link)
