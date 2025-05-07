---
author: ["Jimmy Xu"]
title: "使用 Fly.io 部署 OpenCat for Team"
date: "2023-08-11"
summary: "使用 Fly.io 部署 OpenCat for Team"
tags: ["fly.io", "OpenCat"]
categories: ["Tool Guide"]
---

## 原因

因为国内无法直接访问 openai，openai 也不支持国内区域。部署后，可以让朋友们一起使用，免去了一些复杂过程。

## OpenCat

[OpenCat on the App Store](https://apps.apple.com/us/app/opencat/id6445999201)

- 一款 ChatGPT 客户端，支持 mac 和 iOS
- 支持 docker`私有部署`，部署后可以分享给朋友使用

## [Fly.io](https://fly.io/)

- [免费计划](https://fly.io/docs/about/pricing/#plans)可以使用 3 个共享 cpu 的虚拟机，3GB 储存和 160GB 下行数据，足够支持我们部署后的使用

## 准备

- 至少一个 openai 的 key，多个可以轮询
- [Fly.io](https://fly.io/) 账号
- 若要使用微软 TTS 功能，需要 [Azure](https://azure.microsoft.com/zh-cn/) 账号

## 私有部署

### 1. 配置文件

使用[𝔽𝕣𝕠𝕤𝕥 𝕄𝕚𝕟𝕘](https://twitter.com/frostming90)分享的[配置](https://gist.github.com/frostming/05f41d3e35bf798fd224bc23fc07fcd6)

```toml
kill_signal = "SIGINT"
kill_timeout = 5
primary_region = "sin"
processes = []

[build]
  image = "bayedev/opencatd"

[mount]
  source = "opencat"
  destination = "/opt/db"

[experimental]
  auto_rollback = true

[[services]]
  internal_port = 80
  protocol = "tcp"

  [services.concurrency]
    hard_limit = 25
    soft_limit = 20
    type = "connections"

  [[services.ports]]
    force_https = true
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

  [[services.tcp_checks]]
    grace_period = "1s"
    interval = "15s"
    restart_limit = 0
    timeout = "2s"
```

### 2. 安装 fly 的命令行工具

[Install flyctl · Fly Docs](https://fly.io/docs/hands-on/install-flyctl/)

```bash
#Mac
brew install flyctl

#Linux
curl -L https://fly.io/install.sh | sh

#Windows
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

```

### 3. 登录 fly

```bash
fly auth login
```

### 4. 本地建立目录，创建 fly.tomal 文件并复制上面的配置内容

### 5. 创建和部署 App

**创建的区域节点尽量选择美国的**

```bash
fly launch --copy-config
fly vol create opencat --size 1
fly deploy
```

### 6. 绑定域名

Fly.io 提供 SSL 证书，在 dashboard 中配置一下

### 7. 在 OpenCat 中配置

- 在 OpenCat 中创建团队，填入绑上的域名，填上 openai 的 key 就能直接使用了
- 若要使用微软的 TTS，登录 Azure 后，创建[语音资源](https://portal.azure.com/#create/Microsoft.CognitiveServicesSpeechServices)，在 OpenCat 配置中选择区域，填上 token
