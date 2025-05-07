---
author: ["Jimmy Xu"]
title: "为项目添加 git template，并从远程仓库拉取更新"
date: "2023-08-11"
summary: "为项目添加 git template，并从远程仓库拉取更新"
tags: ["git"]
categories: ["git"]
---

## 添加远程模板仓库

```shell
git remote add template [template repo url]
```

## 拉取所有更新

```shell
git fetch --all
```

## 与远程仓库模板的指定分支合并

```shell
git merge template/[branch name]
# 如果有报错`fatal: refusing to merge unrelated histories`，请加上`--allow-unrelated-histories`
```

[Managing remote repositories - GitHub Docs](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories)
