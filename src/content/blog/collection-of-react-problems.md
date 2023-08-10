---
pubDatetime: 2023-08-10T21:20:00Z
title: React 问题汇总
postSlug: collection-of-react-problems
featured: true
draft: false
tags:
  - react
  - exception
  - problem collection
description: 一些遇到的问题和异常
---

## Table of contents

## 1. 使用Fetch上传图片时报错Error: no multipart boundary was found

删除指定的Content-Type，浏览器会自动设置

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
