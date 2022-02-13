type:: [[Note]],
category:: [[Web]],
tag:: [[Fetch]],
language:: [[JavaScript]], [[TypeScript]],

- 问题
	- 使用Fetch上传图片时报错Error: no multipart boundary was found
- 解决
	- 删除指定的Content-Type，浏览器会自动设置
	- ```typescript
	  const formData = new FormData()
	  formData.append('file', file, 'a.image')
	  
	  fetch('https://api.aaa.com', 
	    {
	      method: 'POST',
	      headers: {
	        "Content-Type": "multipart/form-data" //delete 
	      },
	      body: formData
	    }
	  )
	  ```