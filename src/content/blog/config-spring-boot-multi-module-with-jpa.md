---
pubDatetime: 2023-08-09T09:09:00Z
title: Config Spring Boot Multi Module With Jpa
postSlug: config-spring-boot-multi-module-with-jpa
featured: false
draft: false
tags:
  - spring boot
  - jpa
description: Config Spring Boot Multi Module With Jpa
---

## Table of contents

## Steps

### 1. Config in SpringBootApplication. Set the scanning base packages

```java
//find all repositories extending JpaRepository in the packages
@EnableJpaRepositories(basePackages = "com.base")
//find all entities in the packages
@EntityScan(basePackages = "com.base")
@SpringBootApplication(scanBasePackages = "com.base")
public class CoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(CoreApplication.class, args);
    }

}
```

### 2. Config in gradle. When using the modules, Spring Boot will match urls for them. Check log in the console

```java
dependencies {
    implementation(project(":cloud-service"))
    implementation(project(":common"))
    implementation(project(":wechat"))
}
```
