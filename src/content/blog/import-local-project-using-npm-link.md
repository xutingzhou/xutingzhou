---
pubDatetime: 2023-08-10T21:15:00Z
title: 使用npm link引入本地项目
postSlug: import-local-project-using-npm-link
featured: false
draft: false
tags:
  - npm
  - react
description: 使用npm link引入本地项目
---

## Table of Contents

## 需求

- 有两个项目，使用相同的UI、api，想用一套通用的代码解决问题。
- 这套通用的代码也在逐步完善，经常需要改动。

## 解决方案

使用npm link，把这套通用代码项目创建一个全局的链接，然后在那两个项目中链接。

**更新方案**

使用git template，把这套通用代码项目创建一个模板，然后在那两个项目中引用。


## 示例

### 准备

有两个项目demo和demo-common，需要在demo中link demo-common

### 步骤

1. 在demo-common项目中执行npm link，创建全局链接，可以在全局的node_modules文件夹中看到项目的快捷方式。
1. 然后在demo项目中执行npm link demo-common，就已链接完成。
1. 注意，npm link的是包名，不是文件夹名称。

## 参考

[npm-link | npm Docs (npmjs.com)](https://docs.npmjs.com/cli/v8/commands/npm-link)
