---
pubDatetime: 2023-08-09T21:09:00Z
title: Flutter 问题汇总
postSlug: collection-of-flutter-problems
featured: true
draft: false
tags:
  - flutter
  - exception
  - problem collection
description: 一些遇到的问题和异常
---

## Table of contents

## 1. IPhone真机运行异常：无法打开“iproxy”，因为无法验证开发者

```bash
 sudo xattr -d com.apple.quarantine {flutter路径}/bin/cache/artifacts/usbmuxd/iproxy
```

## 2. MacOS上HTTP请求错误: Operation not permitted

>[macOS-specific support](https://docs.flutter.dev/desktop#entitlements-and-the-app-sandbox)

MacOS默认在沙盘中运行app，需要添加权限。
在 /macos/Runner/DebugProfile.entitlements和Release.entitlements中添加

```md
	<key>com.apple.security.network.client</key>
    <true/>
```

## 3. http包返回中文乱码问题

在使用[http包](https://pub.dev/packages/http)时，返回结果的中文是乱码，需要多一层解码

```dart
final response = await _httpClient.post(
      Uri.parse("${HttpConfig.apiUrl}auth/login"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(passwordLogin.toJson()),
    );
final result = Result.fromJson(jsonDecode(const Utf8Decoder().convert(response.bodyBytes)));
```
