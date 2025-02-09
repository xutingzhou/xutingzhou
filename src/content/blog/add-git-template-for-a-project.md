---
pubDatetime: 2023-08-11T21:09:00Z
title: 为项目添加git template，并从远程仓库拉取更新
postSlug: add-git-template-for-a-project
featured: false
draft: false
tags:
  - git
description: 为项目添加git template，并从远程仓库拉取更新
---

## Table of Contents

## 添加远程模板仓库

```shell
git remote add template [template repo url]
```

## 拉取所有更新

```shell
git fetch --all
```

## 与远程仓库模板的指定分支合并

``` shell
git merge template/[branch name]
# 如果有报错`fatal: refusing to merge unrelated histories`，请加上`--allow-unrelated-histories`
```

[Managing remote repositories - GitHub Docs](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories)
