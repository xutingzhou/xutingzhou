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
- Collections
	- Mutability
		- Unlike in Java, in Kotlin you `explicitly declare` mutable or read-only collections depending on your needs.
		- ```Kotlin
		  val numbers = mutableListOf("one", "two", "three", "four")
		  numbers.add("five")            // This is OK
		  val immutableNumbers = listOf("one", "two")
		  //immutableNumbers.add("five") // Compilation error - Unresolved reference: add
		  ```
	- Covariance
		- In Kotlin, read-only collection types are covariant.
		- The collection types have the same subtyping relationship as the element types.
		- Maps are covariant on the value type, but not on the key type.
		- Mutable collections aren't covariant – this would lead to runtime failures.
	- Ranges and progressions
		- In Kotlin, you can create intervals using ranges.
		- In Kotlin, you operate with a range as a whole object.
		- ```Kotlin
		  class Version(val major: Int, val minor: Int): Comparable<Version> {
		      override fun compareTo(other: Version): Int {
		          if (this.major != other.major) {
		              return this.major - other.major
		          }
		          return this.minor - other.minor
		      }
		  }
		  
		  fun main() {
		      val versionRange = Version(1, 11)..Version(1, 30)
		  
		      println(Version(0, 9) in versionRange)
		      println(Version(1, 20) in versionRange)
		  }
		  ```
	- Collection transformation operations
		- Zip elements
			- `zip()` returns the List of [Pair](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-pair/) objects.
			- ```Kotlin
			  fun main() {
			      // Kotlin
			      val colors = listOf("red", "brown")
			      val animals = listOf("fox", "bear", "wolf")
			  
			      println(colors.zip(animals) { color, animal -> 
			          "The ${animal.replaceFirstChar { it.uppercase() }} is $color" })
			  }
			  
			  //[The Fox is red, The Bear is brown]
			  ```
		- Associate elements
			- ```Kotlin
			  fun main() {
			      // Kotlin
			      val numbers = listOf("one", "two", "three", "four")
			      println(numbers.associateWith { it.length })
			  }
			  
			  //{one=3, two=3, three=5, four=4}
			  ```