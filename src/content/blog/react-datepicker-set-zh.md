---
pubDatetime: 2023-08-10T21:20:00Z
title: React Datepicker 设置中文
postSlug: react-datepicker-set-zh
featured: false
draft: false
tags:
  - react
description: React Datepicker 设置中文
---

[React Datepicker](https://reactdatepicker.com/)

```typescript
import DatePicker, { registerLocale } from "react-datepicker";
import zhCN from "date-fns/locale/zh-CN"; // the locale you want
registerLocale("zhCN", zhCN);

<DatePicker
    dateFormat="yyyy-MM-dd"
    locale="zhCN"
    ...
/>
```
