- 在使用[http包](https://pub.dev/packages/http)时，返回结果的中文是乱码，需要多一层解码
  ```dart
   final response = await _httpClient.post(
        Uri.parse("${HttpConfig.apiUrl}auth/login"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(passwordLogin.toJson()),
      );
  final result = Result.fromJson(jsonDecode(const Utf8Decoder().convert(response.bodyBytes)));
  ```
- 关键解码`Utf8Decoder().convert(response.bodyBytes)`