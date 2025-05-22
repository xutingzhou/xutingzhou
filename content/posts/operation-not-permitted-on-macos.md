---
author: ["Jimmy Xu"]
title: "MacOS 上 HTTP 请求错误：Operation not permitted"
date: "2023-08-09"
summary: "MacOS 上 HTTP 请求错误：Operation not permitted"
tags: ["Flutter", "Exception"]
categories: ["Learning Flutter"]
---

## 异常描述

MacOS 上 HTTP 请求错误：Operation not permitted

## 解决方案

>[macOS-specific support](https://docs.flutter.dev/desktop#entitlements-and-the-app-sandbox)

MacOS 默认在沙盘中运行 app，需要添加权限。
在 /macos/Runner/DebugProfile.entitlements 和 Release.entitlements 中添加

```md
	<key>com.apple.security.network.client</key>
    <true/>
```