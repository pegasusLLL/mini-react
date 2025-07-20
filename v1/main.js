// v1
// const dom = document.createElement("div");
// dom.id = "app";
// document.querySelector("#root").append(dom);

// const textNode = document.createTextNode("");
// textNode.nodeValue = "app";
// dom.append(textNode);

// v2 react -> vdom -> js object 通过js对象的方式（虚拟dom）去描述出dom的一个形状

// 类型type：创建的element是什么标签 props属性 子节点children：dom是一棵树
// const textEl = {
//   type: "TEXT_ELEMENT",
//   props: {
//     nodeValue: "app",
//     children: [],
//   },
// };

// const el = {
//   type: "div",
//   props: {
//     id: "app",
//     children: [textEl],
//   },
// };

// const dom = document.createElement(el.type);
// dom.id = "el.props.id";
// document.querySelector("#root").append(dom);

// const textNode = document.createTextNode("");
// textNode.nodeValue = textEl.props.nodeValue;
// dom.append(textNode);

// 依然是写死的，希望动态创建

// function createTextNode(text) {
//   return {
//     type: "TEXT_ELEMENT",
//     props: {
//       nodeValue: text,
//       children: [],
//     },
//   };
// }

// function createElement(type, props, ...children) {
//   return {
//     type: type,
//     props: {
//       ...props,
//       children,
//     },
//   };
// }
//到这可以实现动态创建虚拟dom
// const textEl = createTextNode("app");

// const App = createElement("div", { id: "app" }, textEl);

// const dom = document.createElement(App.type);
// dom.id = "App.props.id";
// document.querySelector("#root").append(dom);

// const textNode = document.createTextNode("");
// textNode.nodeValue = textEl.props.nodeValue;
// dom.append(textNode);

//1.创建一个节点 2.设置props 3.append：在父级进行添加，把他添加进去

// function render(el, container) {
//   const dom =
//     el.type === "TEXT_ELEMENT"
//       ? document.createTextNode("")
//       : document.createElement(el.type);
//   //设置多个属性 eg.id class
//   Object.keys(el.props).forEach((key) => {
//     if (key != "children") {
//       dom[key] = el.props[key];
//     }
//   });

//   const children = el.props.children;
//   children.forEach((child) => {
//     render(child, dom);
//   });

//   container.append(dom);
// }

// const textEl = createTextNode("app");

// const App = createElement("div", { id: "app" }, textEl);

// render(App, document.querySelector('#root'))

// 将const textEl = createTextNode("app");省去，直接在 createElement填写text节点的值
// function createTextNode(text) {
//   return {
//     type: "TEXT_ELEMENT",
//     props: {
//       nodeValue: text,
//       children: [],
//     },
//   };
// }

// function createElement(type, props, ...children) {
//   return {
//     type: type,
//     props: {
//       ...props,
//       children: children.map((child) => {
//         return typeof child === "string" ? createTextNode(child) : child;
//       }),
//     },
//   };
// }

// const App = createElement("div", { id: "app" }, "app ", "mini");
// render(App, document.querySelector("#root"));

//模仿react其余的ReactDom.createRoot
// const ReactDom = {
//   createRoot(container) {
//     return {
//       render(App) {
//         render(App, container);
//       },
//     };
//   },
// };
// const App = createElement("div", { id: "app" }, "app ", "mini");
// ReactDom.createRoot(document.querySelector("#root")).render(App);

import ReactDom from "./core/ReactDom.js";
// import React from "./core/React.js";
import App from "./App.js";
// const App = React.createElement("div", { id: "app" }, "app ", "mini");
ReactDom.createRoot(document.querySelector("#root")).render(App);
