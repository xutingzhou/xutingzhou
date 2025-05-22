---
author: ["Jimmy Xu"]
title: "IPhone 真机运行异常：无法打开“iproxy”，因为无法验证开发者"
date: "2023-08-09"
summary: "IPhone 真机运行异常：无法打开“iproxy”，因为无法验证开发者"
tags: ["Flutter", "Exception"]
categories: ["Learning Flutter"]
---

## 异常描述

IPhone 真机运行异常：无法打开“iproxy”，因为无法验证开发者

## 解决方案

```bash
 sudo xattr -d com.apple.quarantine {flutter路径}/bin/cache/artifacts/usbmuxd/iproxy
```
