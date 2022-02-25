- [[Logseq]] 自带的导出HTML功能，需要手动导出。搜索后找到了 [Logseg Publish Action](https://github.com/pengx17/logseq-publish)，原来官方文档也是用这个Action。学习参考了几个使用这个action的例子，最终实现了每次push后，自动发布到[[Vercel]]。
-
- 在 [[Vercel]]中随便用个模板建个项目，然后把git的连接断开就不会自动build了
- action配置参考[旋涡的publish.yml](https://github.com/Xuanwo/Xuanwo/blob/master/.github/workflows/publish.yml)
  ```yml
  name: Publish
  
  on:
   push:
      branches: [ main ]
  
  jobs:
    build:
      runs-on: ubuntu-latest
  
      steps:
        - uses: actions/checkout@v2
  
        - name: Logseq Publish
          uses: pengx17/logseq-publish@main
          with:
            dest: www
        - name: Deploy to vercel
          env:
            VERCEL_ORG_ID: ${{secrets.VERCEL_ORG_ID}}
            VERCEL_PROJECT_ID: ${{secrets.VERCEL_PROJECT_ID}}
          run: |
            npm i -g vercel
            vercel --token=${{ secrets.VERCEL_TOKEN }} --prod --scope xutingzhou www
  ```