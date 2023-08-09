---
pubDatetime: 2023-08-09T21:09:00Z
title: Dart的构造函数
postSlug: dart-constructor
featured: false
draft: false
tags:
  - dart
description: Dart的构造函数
---

## Table of contents

## 4种构造函数

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
- 尤其是初始化那些final修饰的成员变量时，初始化列表很有用

**工厂构造函数，没有权利访问this**

## 参考

- [Dart构造函数介绍](https://www.jianshu.com/p/a0ba5f2ac5ce)
- [Colon : in Dart constructor syntax](https://stackoverflow.com/questions/56036526/colon-in-dart-constructor-syntax)