type:: [[Product]]
feature:: [[Framework]]

- ## Resources
	- [Tailwind CSS](https://tailwindcss.com/)
	- [Tailwind UI](https://tailwindui.com/)
	- [Headless UI](https://headlessui.dev/)
	- [Hero Icons](https://heroicons.com/)
	- [Hero Patterns](https://heropatterns.com/)
		- SVG background
-
- ## Templates
	- 左侧固定导航栏，右侧可以滚动，适用Dashboard
		- ```tsx
		  <div className="flex">
		    <aside className="h-screen flex flex-col w-64 bg-gray-100 sticky top-0">
		       {/*sidebar*/}
		    </aside>
		    <main className="flex flex-col w-full bg-white">
		       {/*content*/}
		    </main>
		  </div>
		  ```