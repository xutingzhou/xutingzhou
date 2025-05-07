---
author: ["Jimmy Xu"]
title: "Spring Mvc Unit Test With Spring Security"
date: "2023-08-09"
summary: "Spring Mvc Unit Test With Spring Security"
tags: ["Spring Boot", "Sprint MVC", "Unit Test", "Spring Security"]
categories: ["Learning Java"]
---

## 例子

```java
@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc
@ContextConfiguration(classes = {AuthController.class})
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private AuthService authService;

    @Test
    @WithMockUser
    void loginPassword() throws Exception {
        Faker faker = new Faker();
        Mockito.when(authService.loginPassword(Mockito.any(PasswordLogin.class)))
                .thenReturn(new UserToken(true, faker.random().hex(32), faker.random().hex(8)));

        mockMvc.perform(
                        post("/api/{version}/auth/login", "v1")
                                .with(csrf())
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(
                                        new PasswordLogin().setPassword(faker.random().hex(8)).setUsername(faker.random().hex(8))
                                ))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code", is(200)));
    }
}

```

## 问题汇总

### 1. java.lang.IllegalStateException: Failed to load ApplicationContext

```java
@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc
@ContextConfiguration(classes = {AuthController.class}) //required
class AuthControllerTest {
    ...
}
```

### 2. Response Status 403，跨域问题

```java
...
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
...

  mockMvc.perform(
                post("/api/{version}/auth/login", "v1")
                    .with(csrf()) //required
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(
                            new PasswordLogin().setPassword(faker.random().hex(8)).setUsername(faker.random().hex(8))
                    ))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code", is(200)));

```

### 3. Response Status 401 Unauthorized

```java
@Test
@WithMockUser //required
void loginPassword() throws Exception {
    ...
}
```
