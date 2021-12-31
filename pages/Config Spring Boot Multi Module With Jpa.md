- Config in SpringBootApplication. Set the scanning base packages. 
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
- Config in gradle. When using the modules, Spring Boot will match urls for them. Check log in the console. 
  ```java
  dependencies {
      implementation(project(":cloud-service"))
      implementation(project(":common"))
      implementation(project(":wechat"))
  }
  ```