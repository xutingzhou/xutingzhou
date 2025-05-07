---
author: ["Jimmy Xu"]
title: "Copy a List to Another List in Java"
date: "2023-08-09"
summary: "Copy a List to Another List in Java"
tags: ["Java"]
categories: ["Learning Java"]
---

> [Copy a List to Another List in Java](https://www.baeldung.com/java-copy-list-to-another)

## 1. Constructor

```java
List<T> copy = new ArrayList<>(list);
```

## 2. AddAll

```java
List<T> copy = new ArrayList<>();
copy.addAll(list);
```

## 3. Collections.copy

```java
List<Integer> source = Arrays.asList(1, 2, 3);
List<Integer> dest = Arrays.asList(5, 6, 7, 8, 9, 10);
Collections.copy(dest, source);
```

## 4. Using Stream in Java 8

```java
List<String> copy = list.stream().collect(Collectors.toList());
```

## 5. In Java 10

```java
List<T> copy = List.copyOf(list);
```
