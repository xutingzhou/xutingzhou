- 在项目设置中添加两个Actions secrets
	- USERNAME：GitHub用户名
	- GITHUB_TOKEN：GitHub的token，有读写删packages的权限
- gradle config
  ```gradle
  plugins {
      ...
      id 'maven-publish'
  }
  
  ...
  
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
              artifact bootJar //Spring Boot的可执行jar
            //  artifact jar  //Spring Boot的用于依赖jar
          }
      }
  }
  ```
- action yml
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
- #+BEGIN_TIP
  需要将gradlew设置可执行
  ```yml
      - name: Make gradlew executable
        run: chmod +x ./gradlew
  ```
  不然会报错
  ```
  /home/runner/work/_temp/cf1a2363-0c16-47df-b928-cfef31860ce6.sh: line 1: ./gradlew: Permission denied
  或者
  Error: Gradle script '/home/runner/work/gradle-lib-demo/gradle-lib-demo/gradlew' is not executable.
  ```
  #+END_TIP
- 参考资源
	- [Publishing Java packages with Gradle](https://docs.github.com/en/actions/publishing-packages/publishing-java-packages-with-gradle#publishing-packages-to-github-packages)
	- [Gradle Build Action](https://github.com/marketplace/actions/gradle-build-action)