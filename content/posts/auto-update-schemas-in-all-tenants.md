---
author: ["Jimmy Xu"]
title: "Spring Boot 多租户结构中，Hibernate ddl-auto 无法更新所有的 schema"
date: "2023-08-09"
summary: "Spring Boot 多租户结构中，Hibernate ddl-auto 无法更新所有的 schema"
tags: ["JPA", "Spring Boot", "Exception"]
categories: ["Learning Spring Boot"]
---

## 异常描述

Spring Boot 多租户结构中，Hibernate ddl-auto 无法更新所有的 schema，只能更新最后一个租户的数据库 schema。

## 解决方案

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
