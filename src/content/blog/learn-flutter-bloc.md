---
pubDatetime: 2023-08-09T21:09:00Z
title: 学习Flutter Bloc
postSlug: learn-flutter-bloc
featured: false
draft: false
tags:
  - flutter
  - bloc
description: Flutter Bloc学习笔记
---

## Table of contents

## 官网

一个为 Dart 而生，可预测和管理状态的库。[https://bloclibrary.dev](https://bloclibrary.dev)

## 为什么要用

将展示层的代码与业务逻辑分开

## 设计时考虑到了三个核心价值

### 1. 简单

  易于理解，可供技能水平不同的开发人员使用。

### 2. 强劲

  通过将它们组成更小的组件，帮助制作出色而复杂的应用程序。

### 3. 可测试

  轻松测试应用程序的各个方面，以便我们可以自信地进行迭代。

## bloc核心思想

### 流（Streams)

流（Streams)是一系列异步的数据。[Dart官方文档](https://dart.dev/tutorials/language/streams)

### [Cubit](https://bloclibrary.dev/#/zh-cn/coreconcepts?id=cubit)

![learn-flutter-bloc_0.png](https://github.com/xutingzhou/xutingzhou/blob/main/src/assets/imgs/learn-flutter-bloc_0.png)

### [Bloc](https://bloclibrary.dev/#/zh-cn/coreconcepts?id=bloc)

![learn-flutter-bloc_1.png](https://github.com/xutingzhou/xutingzhou/blob/main/src/assets/imgs/learn-flutter-bloc_1.png)

### Cubit vs. Bloc

#### Cubit 的优势

**简单**，更容易理解，涉及的代码更少

- 创建 Cubit 时，只需要定义状态和改变状态的函数。
- 创建 Bloc 时，必须定义状态、事件和 EventHandler 实现。

#### Bloc 的优势

##### 可追溯性

- 知道状态变化的顺序以及触发这些变化的确切原因。对于对于应用程序功能至关重要的状态，使用更多事件驱动的方法来捕获状态变化之外的所有事件可能会非常有益

##### 高级的事件转换

- 需要利用反应性运算符，例如：buffer, debounceTime, throttle 等。

**_如果仍然不确定要使用哪种，请从 `Cubit` 开始，然后可以根据需要将其重构或放大为 `Bloc`。_**

## Flutter Bloc的核心理念

### Bloc Widgets

#### BlocBuilder

- 在接收到新的状态(State)时处理构建部件。

#### BlocSelector

- 和 `BlocBuilder` 类似的组件，可以选择一个基于当前 bloc 状态的新值来过滤更新。如果所选值不更改，则会阻止不必要的构建。

#### BlocProvider

- 可通过 `BlocProvider.of<T>(context)` 向其子级提供 bloc。
- 使用 `BlocProvider` 来创建新的 blocs，提供给子树。
- `BlocProvider` 默认在需要的时候创建 bloc。lazy 设置为 false，强制立即创建。

#### MultiBlocProvider

- 将多个`BlocProvider`部件合并为一个。

#### BlocListener

- 响应该状态(state)的变化。
- 应用于每次状态更改都需要发生一次的功能，例如导航，显示 SnackBar，显示 Dialog 等。

#### MultiBlocListener

- 将多个`BlocListener`部件合并为一个。

#### BlocConsumer

- 对新状态(State)做出反应。
- 仅在有必要重建UI并执行其他反应来声明bloc中的状态(State)更改时，才应使用 `BlocConsumer`。

#### RepositoryProvider

- 可通过 `RepositoryProvider.of <T>（context)` 向其子级提供存储库。
- `BlocProvider` 用于提供bloc，而 `RepositoryProvider` 仅用于存储库。

#### MultiRepositoryProvider

- 将多个 `RepositoryProvider` 部件(widgets)合并为一个。

## 架构

### 数据层（Data Layer)

- 数据层的责任是从一个或多个数据源或库中检索/处理数据。
- 是应用程序的最低层，并且与数据库，网络请求和其他异步数据源进行交互。
- 数据提供者（Data Provider)
    - 数据提供者的责任是提供原始数据。数据提供者所提供的数据应该是能在各个语言间通用。
- 数据源/库（Repository)
    - 存储库层是与Bloc层进行通信的一个或多个数据提供程序的包装。可以与多个数据提供者进行交互，并对数据执行转换，然后再将结果传递给业务逻辑层。

### Bloc 业务逻辑层 (Business Logic Layer)

- Bloc层的职责是以新状态（State) 响应表示层(Presentation)的事件(Event)。Bloc层可以依赖一个或多个存储库来检索建立应用程序状态(State)所需的数据。
- Bloc和Bloc之间的交流
    - 每个bloc都有一个状态流（Stream)，其他bloc可以订阅该状态流，以便对bloc内部的变化做出反应。

### 表现层（Presentation Layer) UI

- 表现层的职责是弄清楚如何基于一个或多个bloc的状态（State) 进行渲染。另外，它应该处理用户输入和应用程序生命周期事件。

## 命名惯例

### 事件（Event)

事件应以过去时来命名，因为从bloc的角度来看，事件是已经发生的事情。

### 命名状态（State)

状态应该是名词，因为状态只是特定时间点的快照。

## 项目结构参考案例

- 快速建包结构

```bash
flutter create --template=package package_name
```

- [brianegan/flutter_architecture_samples](https://github.com/brianegan/flutter_architecture_samples/tree/master/bloc_library)
- [flutter_shopping_cart](https://github.com/felangel/bloc/tree/master/examples/flutter_shopping_cart)
- [TDD Clean Architecture for Flutter](https://github.com/ResoCoder/flutter-tdd-clean-architecture-course)
