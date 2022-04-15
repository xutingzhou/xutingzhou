- https://kotlinlang.org/docs/learning-materials-overview.html
-
- Basic syntax
	- Creating classes and instances
		- Inheritance between classes is declared by a colon (`:`).
		- Classes are `final` by default
		- to make a class inheritable, mark it as `open`.
	- Ranges
		- ```Kotlin
		  for(x in 1..10 step 2){
		    print(x)
		  }
		  
		  for(x in 9 downTo 0 step 3){
		    print(x)
		  }
		  ```
	- Nullable values and null checks
		- A reference must be explicitly marked as nullable when `null` value is possible. Nullable type names have `?` at the end.
	- Type checks and automatic casts
		- The `is` operator checks if an expression is an instance of a type. If an immutable local variable or property is checked for a specific type, there's no need to cast it explicitly.
-
-