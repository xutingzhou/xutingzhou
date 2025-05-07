---
author: ["Jimmy Xu"]
title: "Config Spring Boot Multi Module With Jpa"
date: "2023-08-09"
summary: "Config Spring Boot Multi Module With Jpa"
tags: ["Spring Boot", "JPA"]
categories: ["Learning Spring Boot"]
---

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
