- ```Java
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