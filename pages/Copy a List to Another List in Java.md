- >[Copy a List to Another List in Java](https://www.baeldung.com/java-copy-list-to-another)
-
- Constructor
	- ```java
	  List<T> copy = new ArrayList<>(list);
	  ```
- AddAll
	- ```java
	  List<T> copy = new ArrayList<>();
	  copy.addAll(list);
	  ```
- Collections.copy
	- ```java
	  List<Integer> source = Arrays.asList(1, 2, 3);
	  List<Integer> dest = Arrays.asList(5, 6, 7, 8, 9, 10);
	  Collections.copy(dest, source);
	  ```
- Using Stream in Java 8
	- ```java
	  List<String> copy = list.stream().collect(Collectors.toList());
	  ```
- In Java 10
	- ```java
	  List<T> copy = List.copyOf(list);
	  ```