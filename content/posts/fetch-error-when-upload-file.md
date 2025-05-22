---
author: ["Jimmy Xu"]
title: "使用 Fetch 上传图片时报错 Error: no multipart boundary was found"
date: "2023-08-10"
summary: "使用 Fetch 上传图片时报错 Error: no multipart boundary was found"
tags: ["React", "Exception", "Fetch"]
categories: ["Learning React"]
---

## 异常描述

使用 Fetch 上传图片时报错 Error: no multipart boundary was found

## 解决方案

删除指定的 Content-Type，浏览器会自动设置

```typescript
const formData = new FormData()
formData.append('file', file, 'a.image')

fetch('https://api.aaa.com', 
  {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data" //delete 
    },
    body: formData
  }
)
```