---
author: ["Jimmy Xu"]
title: "激活 Google TV"
date: "2023-08-09"
summary: "激活 Google TV"
tags: ["device", "Google"]
categories: ["device"]
---

## 准备

- Google TV
- 网络畅通的路由器

## 激活

我以为连着 VPN 就行了，发现连不上 WIFI，网上查了下，说是第一次要访问 time.android.com，走的是 udp，我把 VPN 改成 UDP 的，还是不行，就用了另外一种方法，在路由器上把 time.android.com 指向阿里的 ntp 服务器 203.107.6.88，设置好了 ping 一下，没问题，就开始设置，一路畅通。

[DNSMasq Local Network](https://wiki.dd-wrt.com/wiki/index.php/DNSMasq_-_DNS_for_your_local_network_-_HOWTO)
