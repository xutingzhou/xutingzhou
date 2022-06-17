- [官网](https://redux-toolkit.js.org/)
-
- 与 [[Redux]]配合使用，解决使用 [[Redux]]时，配置繁琐和模板代码太多的问题。
-
- ### [Usage With TypeScript](https://redux-toolkit.js.org/usage/usage-with-typescript)
	- ```TypeScript
	  export const store = configureStore({
	     ...
	  });
	  
	  export type RootState = ReturnType<typeof store.getState>
	  export type AppDispatch = typeof store.dispatch
	  export const useAppDispatch = () => useDispatch<AppDispatch>()
	  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
	  ```
-
- ### [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
	- 获取和缓存数据
	- [Code Splitting](https://redux-toolkit.js.org/rtk-query/usage/code-splitting)
		- 分割代码，规范代码结构，减少模板代码
	- 数据持久化
		- [Persistence and Rehydration](https://redux-toolkit.js.org/rtk-query/usage/persistence-and-rehydration)
		- [Redux Persist](https://github.com/rt2zz/redux-persist)
			- ```TypeScript
			  const persistConfig = {
			      key: 'root',
			      storage,
			      whitelist: ['auth', 'router'],
			  }
			  
			  export const store = configureStore({
			      reducer: persistReducer(persistConfig, combineReducers({
			          auth: authReducer,
			          router: routerReducer,
			          district: districtReducer,
			          [authApi.reducerPath]: authApi.reducer,
			          [userApi.reducerPath]: userApi.reducer,
			      })),
			      middleware: getDefaultMiddleware =>
			          getDefaultMiddleware({serializableCheck: false})
			              .concat(
			                  authApi.middleware,
			                  userApi.middleware,
			              ),
			  });
			  
			  export const persist = persistStore(store);
			  ```
		- [Queries](https://redux-toolkit.js.org/rtk-query/usage/queries)
			- 使用Hook一定要导入这个包
				- ```TypeScript
				  import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
				  ```