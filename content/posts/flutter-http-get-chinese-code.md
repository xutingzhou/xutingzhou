---
author: ["Jimmy Xu"]
title: "Flutter Http 包返回中文乱码问题"
date: "2023-08-09"
summary: "Flutter Http 包返回中文乱码问题"
tags: ["Flutter", "Exception"]
categories: ["Learning Flutter"]
---

## 异常描述

http 包返回中文乱码问题

## 解决方案

在使用[http 包](https://pub.dev/packages/http)时，返回结果的中文是乱码，需要多一层解码

```dart
final response = await _httpClient.post(
      Uri.parse("${HttpConfig.apiUrl}auth/login"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(passwordLogin.toJson()),
    );
final result = Result.fromJson(jsonDecode(const Utf8Decoder().convert(response.bodyBytes)));
```
