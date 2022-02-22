- Create Dockerfile 
  [denoland/deno](https://hub.docker.com/r/denoland/deno)
  ```dockerfile
  FROM denoland/deno:1.11.5
  
  EXPOSE 8000
  
  WORKDIR /maimaiwater
  
  USER deno
  
  COPY deps.ts .
  RUN deno cache deps.ts
  
  ADD . .
  RUN deno cache server.ts
  
  CMD ["run", "--allow-net", "server.ts"]
  ```
- Build Image 
  ```shell
  docker build -t 458970/maimaiwater .
  [+] Building 41.2s (11/11) FINISHED
   => [internal] load build definition from Dockerfile                                                                                                                                                    0.0s 
   => => transferring dockerfile: 32B                                                                                                                                                                     0.0s 
   => [internal] load .dockerignore                                                                                                                                                                       0.0s 
   => => transferring context: 35B                                                                                                                                                                        0.0s 
   => [internal] load metadata for docker.io/denoland/deno:1.11.5                                                                                                                                        11.2s 
   => [1/6] FROM docker.io/denoland/deno:1.11.5@sha256:d0228fa351c6673554fae54407e444423717355430619655fee6c90600cb818e                                                                                   9.9s 
   => => resolve docker.io/denoland/deno:1.11.5@sha256:d0228fa351c6673554fae54407e444423717355430619655fee6c90600cb818e                                                                                   0.0s 
   => => sha256:d0228fa351c6673554fae54407e444423717355430619655fee6c90600cb818e 1.36kB / 1.36kB                                                                                                          0.0s 
   => => sha256:194b17b7ebf75a195ecfb023543ecbdb2c00601f488911887dde9a2ca1aac48d 4.09kB / 4.09kB                                                                                                          0.0s 
   => => sha256:b858e2d8875ff895ad25098e043bfbae23f19e4773758d8abb84df85143241c6 27.15MB / 27.15MB                                                                                                        7.4s 
   => => sha256:888befde83d760bdefee77457c3bfe419661a17a8c5e4929f1d7d1bb0e97465e 33.34MB / 33.34MB                                                                                                        8.8s 
   => => sha256:163857882ba1490eaf64c12d644c97027dc9ee88e4bbf909d9a6471ca2de8024 2.08kB / 2.08kB                                                                                                          1.3s 
   => => sha256:dd1b827b8e5ef957411e14acee1abb49551adeea96061ca298f731e8de1c2e11 329B / 329B                                                                                                              1.7s 
   => => sha256:2de869d2250a5be1cddb6b73e2c7391459514a1b073038f73f3359b3b2f64320 328B / 328B                                                                                                              2.1s 
   => => extracting sha256:b858e2d8875ff895ad25098e043bfbae23f19e4773758d8abb84df85143241c6                                                                                                               1.0s 
   => => extracting sha256:888befde83d760bdefee77457c3bfe419661a17a8c5e4929f1d7d1bb0e97465e                                                                                                               0.7s 
   => => extracting sha256:163857882ba1490eaf64c12d644c97027dc9ee88e4bbf909d9a6471ca2de8024                                                                                                               0.0s 
   => => extracting sha256:dd1b827b8e5ef957411e14acee1abb49551adeea96061ca298f731e8de1c2e11                                                                                                               0.0s 
   => [internal] load build context                                                                                                                                                                       0.0s 
   => => transferring context: 709B                                                                                                                                                                       0.0s 
   => [2/6] WORKDIR /maimaiwater                                                                                                                                                                          0.1s 
   => [3/6] COPY deps.ts .                                                                                                                                                                                0.0s 
   => [4/6] RUN deno cache deps.ts                                                                                                                                                                       12.7s 
   => [5/6] ADD . .                                                                                                                                                                                       0.0s 
   => [6/6] RUN deno cache server.ts                                                                                                                                                                      7.0s 
   => exporting to image                                                                                                                                                                                  0.2s 
   => => exporting layers                                                                                                                                                                                 0.2s 
   => => writing image sha256:5fef0f353c31fa364f73d1b900f1bbd46340c20af89fe4883f89a908b6ea2044                                                                                                            0.0s 
   => => naming to docker.io/458970/maimaiwater  
  ``` 
  #+BEGIN_NOTE
   Image name is {user_id}/{image_name}:{tag_name}. More about docker build, see [Docker Docs](https://docs.docker.com/engine/reference/commandline/build/)
  #+END_NOTE
- Push Image to Docker Hub
  ```shell
  > Executing task: docker push 458970/maimaiwater:latest <
  
  The push refers to repository [docker.io/458970/maimaiwater]
  2b517c4e4610: Pushed
  26107fed7f77: Pushed
  755596dcf343: Pushed
  c544351ca0fe: Pushed
  f39ea4fbe205: Pushed
  b17de72e2e42: Layer already exists
  46b24044b4d8: Layer already exists
  e9942ed40320: Layer already exists
  93627f1feb32: Layer already exists
  b8d33b7d28fe: Layer already exists
  latest: digest: sha256:752f31c9cb2e1b87d2c2351579ed6a2eeb721917452cfac0988811488b2edc7d size: 2406
  ```
  
  #+BEGIN_NOTE
  Use Visual Studio Code with Docker Plugin. It is easy to create and push image.
  #+END_NOTE
- Deploy 
  After pushing the image to Docker Hub, I can pull the image anywhere. It is easy and convenient to deploy with Docker.