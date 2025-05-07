---
author: ["Jimmy Xu"]
title: "使用 GitHub Action 自动发布 Spring Boot 的 jar 包"
date: "2023-08-09"
summary: "使用 GitHub Action 自动发布 Spring Boot 的 jar 包"
tags: ["Spring Boot", "GitHub Action", "GitHub"]
categories: ["Learning Java"]
---

## 准备

1. Spring Boot 的可以执行 jar 包叫 bootJar，用于依赖的 Plain jar 叫 jar
2. 在项目设置中添加两个 Actions secrets

```md
USERNAME：GitHub 用户名
GITHUB_TOKEN：GitHub 的 token，有读写删 packages 的权限
```

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
            artifact jar  //Spring Boot 的用于依赖 jar
          //artifact bootJar //Spring Boot 的可执行 jar
        }
    }
}
```

## action.yml

```yml
name: Publish package to GitHub Packages
on:
  release:
    types: [created]
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

### 需要将 gradlew 设置可执行，不然会报错

```yml
- name: Make gradlew executable
  run: chmod +x ./gradlew
```

报错信息

```md
/home/runner/work/\_temp/cf1a2363-0c16-47df-b928-cfef31860ce6.sh: line 1: ./gradlew: Permission denied
或者
Error: Gradle script '/home/runner/work/gradle-lib-demo/gradle-lib-demo/gradlew' is not executable.
```

### 默认打包用于依赖的 jar 的命名会添加 plain，需要将命名中的 plain 去掉，才能在引用依赖的时候正确下载 jar 包

```gradle
jar {
    archiveClassifier = ''
}
```

## 参考

- [Publishing Java packages with Gradle](https://docs.github.com/en/actions/publishing-packages/publishing-java-packages-with-gradle#publishing-packages-to-github-packages)
- [Gradle Build Action](https://github.com/marketplace/actions/gradle-build-action)
- [Spring Boot Gradle Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/htmlsingle/)
