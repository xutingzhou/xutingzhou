- [React Datepicker](https://reactdatepicker.com/)
- ```typescript
  import DatePicker, { registerLocale } from "react-datepicker";
  import zhCN from "date-fns/locale/zh-CN"; // the locale you want
  registerLocale("zhCN", zhCN);
  
  <DatePicker
  	dateFormat="yyyy-MM-dd"
  	locale="zhCN"
  	...
  />
  ```