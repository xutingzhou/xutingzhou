title:: Jpa Exception: Failed to Lazily Initialize a Collection of Role Could Not Initialize Proxy – no Session

- **When and why dose the exception happen**
	- when two entities are in association mapping with fetch = FetchType.LAZY (for eg. OneToMany relationship) and we try to get child entity from the parent entity after session gets closed.
- **How to fix the exception**
	- Fixing by using @Transactional annotation.
	- Fixing by calling child entity in a separate method before the session is closed.
	- Fixing by defining enable_lazy_load_no_trans = true in application.properties file.
	- Fixing by fetch = FetchType.EAGER.( I think this is not a good solution. )
- >[Failed to lazily initialize a collection of role could not initialize proxy – no Session](https://www.netsurfingzone.com/hibernate/failed-to-lazily-initialize-a-collection-of-role-could-not-initialize-proxy-no-session/)