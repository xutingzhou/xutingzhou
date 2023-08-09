---
pubDatetime: 2023-08-09T21:09:00Z
title: Java问题汇总
postSlug: collection-of-java-problems
featured: true
draft: false
tags:
  - java
  - exception
  - problem collection
description: 一些遇到的问题和异常
---

## Table of contents

## 1. Jpa Exception: Failed to Lazily Initialize a Collection of Role Could Not Initialize Proxy – no Session

### When and why dose the exception happen

when two entities are in association mapping with fetch = FetchType.LAZY (for eg. OneToMany relationship) and we try to get child entity from the parent entity after session gets closed.

### How to fix the exception

- Fixing by using @Transactional annotation.
- Fixing by calling child entity in a separate method before the session is closed.
- Fixing by defining enable_lazy_load_no_trans = true in application.properties file.
- Fixing by fetch = FetchType.EAGER.( I think this is not a good solution. )

>[Failed to lazily initialize a collection of role could not initialize proxy – no Session](https://www.netsurfingzone.com/hibernate/failed-to-lazily-initialize-a-collection-of-role-could-not-initialize-proxy-no-session/)

## 2. Spring Boot 多租户结构中，Hibernate ddl-auto 无法更新所有的schema

### 问题描述

增加或修改entity，只能更新最后一个数据库的schema

### 解决

```java
@Configuration
public class AutoDDLConfig {

    private final JpaProperties jpaProperties;
    private final TenantDatabaseConfigQueryService tenantDatabaseConfigQueryService;

    public AutoDDLConfig(JpaProperties jpaProperties,
                         TenantDatabaseConfigQueryService tenantDatabaseConfigQueryService) {
        this.jpaProperties = jpaProperties;
        this.tenantDatabaseConfigQueryService = tenantDatabaseConfigQueryService;
    }

    @Bean
    public void autoDDL() {
        Set<TenantDatabaseConfig> tenantDatabaseConfigs = tenantDatabaseConfigQueryService.getAll();
        for (TenantDatabaseConfig tenantDatabaseConfig : tenantDatabaseConfigs) {
            DriverManagerDataSource dataSource = new DriverManagerDataSource();
            dataSource.setDriverClassName(tenantDatabaseConfig.getDriverClassName());
            dataSource.setSchema(tenantDatabaseConfig.getIdCode());
            dataSource.setUrl(tenantDatabaseConfig.getUrl());
            dataSource.setUsername(tenantDatabaseConfig.getUsername());
            dataSource.setPassword(tenantDatabaseConfig.getPassword());

            LocalContainerEntityManagerFactoryBean emfBean = new LocalContainerEntityManagerFactoryBean();
            emfBean.setDataSource(dataSource);
            emfBean.setPackagesToScan("com.xxx.common.model", "com.xxx.wechat");
            emfBean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
            emfBean.setPersistenceProviderClass(HibernatePersistenceProvider.class);
            Map<String, Object> hibernateProps = new LinkedHashMap<>(jpaProperties.getProperties());
            hibernateProps.put(Environment.DIALECT, "org.hibernate.dialect.MySQL5InnoDBDialect");
            hibernateProps.put(Environment.HBM2DDL_AUTO, "update");
            hibernateProps.put(Environment.PHYSICAL_NAMING_STRATEGY, "org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy");
            hibernateProps.put(Environment.IMPLICIT_NAMING_STRATEGY, "org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy");
            hibernateProps.put(Environment.ENABLE_LAZY_LOAD_NO_TRANS, true);
            hibernateProps.put(Environment.DEFAULT_SCHEMA, tenantDatabaseConfig.getIdCode());
            emfBean.setJpaPropertyMap(hibernateProps);
            emfBean.setPersistenceUnitName(dataSource.toString());
            emfBean.afterPropertiesSet();
        }
    }

}

```
