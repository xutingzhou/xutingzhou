- 学习参考了[漩涡的note](https://note.xuanwo.io/#/page/iteration)
- Iteration 是来自 Github Project 的概念，用来指代一个固定时间的迭代周期，一般为两周。作为一个简单的任务管理模型使用。
-
- {{{query (page-property type Iteration)}}}
  query-properties:: [:page :date]
  query-sort-by:: date
  query-sort-desc:: true
-
- [[Github]] 支持在 filter 中使用
	- `iteration:"@current"` 来标记当前 iteration 了
		- 此外还有 `@next` 和 `@previous` 分别代替下一个和上一个周期