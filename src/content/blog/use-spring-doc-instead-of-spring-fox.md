---
pubDatetime: 2023-08-09T21:09:00Z
title: Use Spring Doc instead of Spring Fox
postSlug: use-spring-doc-instead-of-spring-fox
featured: false
draft: false
tags:
  - spring
description: Use Spring Doc instead of Spring Fox
---

## Table of contents

## 起因

新建项目，运行后报错“Failed to start bean 'documentationPluginsBootstrapper';”。面向搜索引擎编程，看了[Springboot 2.6.0 / Spring fox 3 - Failed to start bean 'documentationPluginsBootstrapper'](https://stackoverflow.com/questions/70036953/springboot-2-6-0-spring-fox-3-failed-to-start-bean-documentationpluginsboot)，说是a bug in SpringFox，查了下包也没有新的。看了采纳的回答“Consider migration to springdoc”。

## 解决

官方指南，看这个就够了。[springdoc-openapi v1.6.8](https://springdoc.org/#migrating-from-springfox)
