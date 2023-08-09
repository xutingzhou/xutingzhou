---
pubDatetime: 2023-08-09T09:09:00Z
title: Spring Data Jpa - Projections
postSlug: spring-data-jpa-projections
featured: true
draft: false
tags:
  - Spring
  - Jpa
description: Spring Data Jpa - Projections
---

>[Spring Data JPA - Interface-based Projections](https://www.logicbig.com/tutorials/spring-framework/spring-data/interface-based-projections.html)

## Interface-based Projections

### 1. Entity

```java
@Entity
public class Employee{
    private @Id
    @GeneratedValue
    Long id;
    private String name;
    private String dept;
    private int salary;
    .............
}
```

### 2. Projection Interface

```java
public interface EmployeeSalary {
  String getName();
  int getSalary();
}
```

### 3. Repository

```java
public interface EmployeeRepository extends CrudRepository<Employee, Long> {
  List<EmployeeSalary> findBy();
  List<EmployeeSalary> findByDept(String dept);
}
```

## Interface Based Nested Projections

### 1. Entities

```java
@Entity
public class Employee {
  @Id
  @GeneratedValue
  private Integer id;
  private String name;
  @ManyToOne(cascade = CascadeType.ALL)
  private Department department;
  private int salary;
    .............
}

@Entity
public class Department {
  @Id
  @GeneratedValue
  private Integer id;
  private String deptName;
  private String location;
    .............
}
```

### 2. Defining Projections

```java
public interface EmployeeInfo {
  String getName();
  int getSalary();
  DeptInfo getDepartment();

  interface DeptInfo {
      String getDeptName();
  }
}
```

### 3. Repository

```java
public interface EmployeeRepository extends CrudRepository<Employee, Long> {
  List<EmployeeInfo> findBy();
  List<EmployeeInfo> findBySalaryBetween(int salaryMin, int salaryMax);
  List<EmployeeInfo> findByDepartmentLocation(String location);
}
```

## Open Projections

### 1. Entities

```java
@Entity
public class Employee {
  @Id
  @GeneratedValue
  private Integer id;
  private String name;
  @ManyToOne(cascade = CascadeType.ALL)
  private Department department;
  private int salary;
    .............
}

@Entity
public class Department {
  @Id
  @GeneratedValue
  private Integer id;
  private String deptName;
  private String location;
    .............
}
```

### 2. Open Projection interface

```java
public interface EmployeeInfo {

  @Value("#{target.name+' ('+ target.department.deptName+' dept)'}")
  String getDisplayString();

  @Value("#{args[0]+': '+target.name+', '+args[1]+': '+ "
          + "target.department.deptName+', '+target.department.location}")
  String getDetailedString(String labelName, String labelDept);
}
```

### 3. Repository

```java
public interface EmployeeRepository extends CrudRepository<Employee, Long> {
  List<EmployeeInfo> findBy();
}
```

## Projections Using Default Methods

### 1. Entities

```java
@Entity
public class Employee {
  @Id
  @GeneratedValue
  private Integer id;
  private String name;
  @ManyToOne(cascade = CascadeType.ALL)
  private Department department;
  private int salary;
    .............
}

@Entity
public class Department {
  @Id
  @GeneratedValue
  private Integer id;
  private String deptName;
  private String location;
    .............
}
```

### 2. Projection interface using default method

```java
public interface EmployeeInfo {
  String getName();
  Department getDepartment();
  default String getDisplayString() {
      return String.format("Name: %s, Dept: %s", getName(),
              getDepartment().getDeptName());
  }
}
```

### 3.Repository

```java
public interface EmployeeRepository extends CrudRepository<Employee, Long> {
  List<EmployeeInfo> findBy();
}
```

## Invoking Bean Methods from Projections' SpEL expressions

### 1. Entities

```java
@Entity
public class Employee {
  @Id
  @GeneratedValue
  private Integer id;
  private String name;
  @ManyToOne(cascade = CascadeType.ALL)
  private Department department;
  private int salary;
    .............
}

@Entity
public class Department {
  @Id
  @GeneratedValue
  private Integer id;
  private String deptName;
  private String location;
    .............
}
```

### 2. The Bean

```java
@Component
public class EmployeeInfoBean {

  public String getDisplayString(Employee employee) {
      return String.format("%s (%s)", employee.getName(), employee.getDepartment().getDeptName());
  }

  public String getDetailedString(Employee employee, String labelName, String labelDept) {
      return String.format("%s: %s, %s: %s, %s",
              labelName, employee.getName(),
              labelDept, employee.getDepartment().getDeptName(),
              employee.getDepartment().getLocation());
  }
}
```

### 3. Projection interface

```java
public interface EmployeeInfo {
  @Value("#{@employeeInfoBean.getDisplayString(target)}")
  String getDisplayString();

  @Value("#{@employeeInfoBean.getDetailedString(target, args[0], args[1])}")
  String getDetailedString(String labelName, String labelDept);
}
```

## Class Based Projections

### 1. Entity

```java
@Entity
public class Employee{
  private @Id
  @GeneratedValue
  Long id;
  private String name;
  private String dept;
  private int salary;
    .............
}
```

### 2. Defining class-based projection

```java
public class EmployeeInfo {
  private String name;
  private int salary;

  public EmployeeInfo(String name, int salary) {
      this.name = name;
      this.salary = salary;
  }
    .............
}
```

### 3. Repository

```java
public interface EmployeeRepository extends CrudRepository<Employee, Long> {
  List<EmployeeInfo> findBy();
  List<EmployeeInfo> findByDept(String dept);
}
```

## Dynamic Projections

### 1. Entity

```java
@Entity
public class Employee{
  private @Id
  @GeneratedValue
  Long id;
  private String name;
  private String dept;
  private int salary;
  private String phone;
    .............
}
```

### 2. Repository

```java
public interface EmployeeRepository extends CrudRepository<Employee, Long> {

 <T> List<T> findByDept(String dept, Class<T> type);
}
```

### 3. Projection classes

```java
public class SalaryInfo {
  private String name;
  private int salary;

  public SalaryInfo(String name, int salary) {
      this.name = name;
      this.salary = salary;
  }
    .............
}

public class ContactInfo {
  private String name;
  private String phone;

  public ContactInfo(String name, String phone) {
      this.name = name;
      this.phone = phone;
  }
    .............
}
```

### 4. Example client

```java
@Component
public class ExampleClient {

  @Autowired
  private EmployeeRepository repo;

  public void run() {
      List<Employee> employees = createEmployees();
      repo.saveAll(employees);

      System.out.println(" -- finding all employees --");
      Iterable<Employee> all = repo.findAll();
      all.forEach(System.out::println);

      System.out.println(" -- finding SalaryInfo for IT dept --");
      List<SalaryInfo> list = repo.findByDept("IT", SalaryInfo.class);
      list.forEach(System.out::println);

      System.out.println(" -- finding ContactInfo for IT dept --");
      List<ContactInfo> list2 = repo.findByDept("IT", ContactInfo.class);
      list2.forEach(System.out::println);
  }

  private List<Employee> createEmployees() {
      return Arrays.asList(
              Employee.create("Diana", "Admin", 3000, "111-111-111"),
              Employee.create("Mike", "IT", 1000, "222-222-222"),
              Employee.create("Rose", "Admin", 4000, "333-333-333"),
              Employee.create("Sara", "Admin", 3500, "444-444-444"),
              Employee.create("Tanaka", "IT", 3000, "555-555-555"),
              Employee.create("Charlie", "IT", 450, "666-666-666")
      );
  }
}
```
