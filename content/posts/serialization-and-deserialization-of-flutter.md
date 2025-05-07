---
author: ["Jimmy Xu"]
title: "Flutter 的序列化和反序列化"
date: "2023-08-09"
summary: "Flutter 的序列化和反序列化"
tags: ["Flutter"]
categories: ["Learning Flutter"]
---

## (De)Serialization

- `@JsonSerializable` to label classes which can be serialized
- `@JsonKey` to provide string representations of field names
- `@JsonValue` to provide string representations of field values
- Implement `JSONConverter` to convert object representations into JSON representations
