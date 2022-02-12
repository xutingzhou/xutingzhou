type:: [[Note]],
category:: [[Next.js]],

- Error Info
  ```
  Error: listen EACCES: permission denied 0.0.0.0:3000
      at Server.setupListenHandle [as _listen2] (net.js:1303:21)
      at listenInCluster (net.js:1368:12)
      at Server.listen (net.js:1454:7)
      at C:\Users\a_tin\workspace\nextjs\nextjs-blog\node_modules\next\dist\server\lib\start-server.js:45:16
      at new Promise (<anonymous>)
      at Object.startServer (C:\Users\a_tin\workspace\nextjs\nextjs-blog\node_modules\next\dist\server\lib\start-server.js:19:12)
      at nextDev (C:\Users\a_tin\workspace\nextjs\nextjs-blog\node_modules\next\dist\cli\next-dev.js:116:23)
      at C:\Users\a_tin\workspace\nextjs\nextjs-blog\node_modules\next\dist\bin\next:130:34 {
    code: 'EACCES',
    errno: -4092,
    syscall: 'listen',
    address: '0.0.0.0',
    port: 3000
  }
  ```
- Run the .bat
  ```bat
  %1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
  cd /d "%~dp0"
  net stop winnat
  net start winnat
  exit
  ```