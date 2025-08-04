function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type: type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "string" ? createTextNode(child) : child;
      }),
    },
  };
}

function render(el, container) {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el],
  }
  }}

  // const dom =
  //   el.type === "TEXT_ELEMENT"
  //     ? document.createTextNode("")
  //     : document.createElement(el.type);

  // Object.keys(el.props).forEach((key) => {
  //   if (key != "children") {
  //     dom[key] = el.props[key];
  //   }
  // });

  // const children = el.props.children;
  // children.forEach((child) => {
  //   render(child, dom);
  // });

  // container.append(dom);


let nextWorkOfUnit = null;
// 设置当前的任务，在render（主入口）中，给workOfUnit赋值
function workLoop(deadline) {

  let shouldYield = false;
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)
    // 把当前任务传过来，传过来之后，执行当前任务，执行完之后，返回下一个任务，重新赋值
    shouldYield = deadline.timeRemaining() < 1;
  }

  requestIdleCallback(workLoop);
}

function performWorkOfUnit(workOfUnit) {
  // 1.创建 dom
  if(!work.dom) {
const dom = (work.dom = 
    work.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(work.type));
// dom创建完毕要添加到父级容器
work.parent.dom.appendChild(dom);
  // 2.处理 props
Object.keys(work.props).forEach((key) => {
    if (key != "children") {
      dom[key] = work.props[key];
    }
  });}
  // 3.转换链表 设置好指针（语雀第二种方式的过程）
// 首先遍历所有的孩子节点,对第一个节点，需要给他绑到当前节点的child属性上
const children = work.props.children;
let prevChild = null;
children.forEach((child,index)=> {
const newWork = {
  type: child.type,
  props: child.props,
  child: null,
  parent: work,
  sibling: null,
  dom: null,

}
if(index === 0) {
  work.child = newWork;
}else{
  prevChild.sibling = newWork;
}
prevChild = newWork;
})


  // 4.返回下一个任务
// 处理完a之后，下一个是b，对于d来讲下一个是d，对d来讲没有child，要返回e
if(work.child) {
  return work.child;
}
if(work.sibling) {
  return work.sibling;
}
return work.parent?.sibling;

}
const React = {
  render,
  createElement,
};


export default React;
