---
author: ["Jimmy Xu"]
title: "React Datepicker 设置中文"
date: "2023-08-10"
summary: "React Datepicker 设置中文"
tags: ["React"]
categories: ["Learning React"]
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
