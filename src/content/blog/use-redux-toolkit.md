---
pubDatetime: 2023-08-10T21:20:00Z
title: Redux Toolkit 使用笔记
postSlug: use-redux-toolkit
featured: false
draft: false
tags:
  - react
  - redux
description: Redux Toolkit 使用笔记
---

## Table of contents

## [官网](https://redux-toolkit.js.org/)

与 [Redux](https://redux.js.org/) 配合使用，解决使用 Redux 时，配置繁琐和模板代码太多的问题。

## 使用心得

### [Usage With TypeScript](https://redux-toolkit.js.org/usage/usage-with-typescript)

```typescript
export const store = configureStore({
   ...
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)

获取和缓存数据

#### [Code Splitting](https://redux-toolkit.js.org/rtk-query/usage/code-splitting)

分割代码，规范代码结构，减少模板代码

#### 数据持久化

##### 1. [Persistence and Rehydration](https://redux-toolkit.js.org/rtk-query/usage/persistence-and-rehydration)

##### 2. [Redux Persist](https://github.com/rt2zz/redux-persist)

```typescript
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

##### 3. [Queries](https://redux-toolkit.js.org/rtk-query/usage/queries)

```typescript
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"; //使用Hook一定要导入这个包
```

##### 4. [Customizing queries](https://redux-toolkit.js.org/rtk-query/usage/customizing-queries)

自己实现一个baseQuery就可以添加header，解析自定义返回值和异常处理

```typescript
const myFetchBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta> = async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
        baseUrl: apiUrl,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    })(args, api, extraOptions);
    return new Promise<any>((resolve, reject) => {
        let response: Result<any>;
        const {error} = result;
        if (error) {
            response = (error.data) as Result<any>
        } else {
            response = (result.data) as unknown as Result<any>;
        }
        const {data, code, msg} = response;
        if (code >= 200 && code < 300) {
            result.data = data;
            resolve(result);
        } else {
            showError(msg ?? "");
            reject(msg);
        }
    });
}
```
