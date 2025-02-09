---
pubDatetime: 2023-08-09T21:09:00Z
title: 激活 Google TV
postSlug: activate-google-tv
featured: false
draft: false
tags:
  - google tv
description: 激活 Google TV
---

## Table of contents

## 准备

- Google TV
- 网络畅通的路由器

## 激活

我以为连着VPN就行了，发现连不上WIFI，网上查了下，说是第一次要访问time.android.com，走的是udp，我把VPN改成UDP的，还是不行，就用了另外一种方法，在路由器上把time.android.com指向阿里的ntp服务器203.107.6.88，设置好了ping一下，没问题，就开始设置，一路畅通。

[DNSMasq Local Network](https://wiki.dd-wrt.com/wiki/index.php/DNSMasq_-_DNS_for_your_local_network_-_HOWTO)
