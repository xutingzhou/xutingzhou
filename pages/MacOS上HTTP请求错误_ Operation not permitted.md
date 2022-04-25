title:: MacOS上HTTP请求错误: Operation not permitted

- >[macOS-specific support](https://docs.flutter.dev/desktop#entitlements-and-the-app-sandbox)
- MacOS默认在沙盘中运行app，需要添加权限。
- 在 /macos/Runner/DebugProfile.entitlements和Release.entitlements中添加
  ```
  	<key>com.apple.security.network.client</key>
      <true/>
  ```