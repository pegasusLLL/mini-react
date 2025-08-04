import React from "./core/React.js";
// 解析jsx文件时需要导入react
import ReactDom from "./core/ReactDom.js";
import App from "./App.jsx";
ReactDom.createRoot(document.querySelector("#root")).render(App);
// 把这个App的对象形式改为组件形式,再把文件改为jsx
// ReactDom.createRoot(document.querySelector("#root")).render(<App></App>);