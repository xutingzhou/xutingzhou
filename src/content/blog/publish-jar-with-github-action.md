---
pubDatetime: 2023-08-09T09:09:00Z
title: 使用GitHub Action自动发布Spring Boot的jar包
postSlug: publish-jar-with-github-action
featured: false
draft: false
tags:
  - spring boot
  - github
description: 使用GitHub Action自动发布Spring Boot的jar包
---

## Table of contents

## 准备

1. Spring Boot的可以执行jar包叫bootJar，用于依赖的Plain jar叫jar
2. 在项目设置中添加两个Actions secrets

```md
USERNAME：GitHub用户名
GITHUB_TOKEN：GitHub的token，有读写删packages的权限
``````

## Gradle Config

```gradle
plugins {
    ...
    id 'maven-publish'
}

...

bootJar {
    enabled = false
    archiveClassifier = 'boot'
}

jar {
    enabled = true
    archiveClassifier = ''
}

publishing {
    repositories {
        maven {
            name = "GitHubPackages"
            url = uri("https://maven.pkg.github.com/xutingzhou/gradle-lib-demo")
            credentials {
                username = System.getenv("USERNAME")
                password = System.getenv("GITHUB_TOKEN")
            }
        }
    }
    publications {
        gpr(MavenPublication) {
            artifact jar  //Spring Boot的用于依赖jar
          //artifact bootJar //Spring Boot的可执行jar
        }
    }
}
```

## action.yml

```yml
name: Publish package to GitHub Packages
on:
  release:
    types: [ created ]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-java@v2
        with:
          java-version: 11
          distribution: adopt
      - name: Validate Gradle wrapper
        uses: gradle/wrapper-validation-action@v1
      - name: Make gradlew executable
        run: chmod +x ./gradlew
      - name: Publish package
        uses: gradle/gradle-build-action@v2
        with:
          arguments: publish
        env:
          USERNAME: ${{ secrets.USERNAME }}
          GITHUB_TOKEN: ${{ secrets.PUBLISH_TOKEN }}
```

### 需要将gradlew设置可执行，不然会报错

```yml
    - name: Make gradlew executable
      run: chmod +x ./gradlew
```

报错信息

```md
/home/runner/work/_temp/cf1a2363-0c16-47df-b928-cfef31860ce6.sh: line 1: ./gradlew: Permission denied
或者
Error: Gradle script '/home/runner/work/gradle-lib-demo/gradle-lib-demo/gradlew' is not executable.
```
