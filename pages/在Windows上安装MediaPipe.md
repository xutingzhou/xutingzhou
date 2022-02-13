type:: [[Note]],
category:: [[Manual]], 
tag:: [[Windows]], [[MediaPipe]],

- [官方指南](https://google.github.io/mediapipe/getting_started/install.html)
- 按官方指南操作，注意的步骤
	- 第三步 
	  ```shell
	  Install Pip and installing NumPy with Pip
	  ```
	- 第六步Set Bazel variables 
	  ```shell
	  #If installed Microsoft Visual Studio 2019 Professional
	  
	  BAZEL_VS=C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional
	  BAZEL_VC=C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\VC
	  find BAZEL_VC_FULL_VERSION on path C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\VC\Tools\MSVC
	  find BAZEL_WINSDK_FULL_VERSION on path C:\Program Files (x86)\Windows Kits\10\Include
	  ```
- 一些遇到的问题和解决方法
	- can not open “windows.h”: No such file or directory
		- Install windows 10 sdk and rename Windows.h to windows.h
		  Path of "Windows.h" is C:\\Program Files (x86)\\Windows Kits\\10\\Include\\10.0.19041.0\\um
	- building with VPN
		- build with --batch tag
		- https://github.com/bazelbuild/bazel/issues/3602