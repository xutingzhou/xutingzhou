---
author: ["Jimmy Xu"]
title: "Dart 的构造函数"
date: "2023-08-09"
summary: "Dart 的构造函数"
tags: ["Dart"]
categories: ["Learning Flutter"]
---

## 4 种构造函数

```dart
///普通构造函数
ClassName(...)

///命名构造函数
Classname.identifier(...)

///常量构造函数
const ClassName(...)

///工厂构造函数
factroy ClassName(...)
```

### 默认构造函数

类没有定义构造函数，默认有一个**没有参数**的构造函数

### 普通构造函数

### 命名构造函数

### 初始化列表

- 初始化列表就是构造函数名的冒号后的部分
- 尤其是初始化那些 final 修饰的成员变量时，初始化列表很有用

**工厂构造函数，没有权利访问 this**

## 参考

- [Dart 构造函数介绍](https://www.jianshu.com/p/a0ba5f2ac5ce)
- [Colon : in Dart constructor syntax](https://stackoverflow.com/questions/56036526/colon-in-dart-constructor-syntax)
