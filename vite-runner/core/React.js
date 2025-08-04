function createTextNode(text) {
  console.log("heiheihei!!!!!!!");
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
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "string" ? createTextNode(child) : child;
      }),
    },
  };
}

function render(el, container) {
  // 主入口，在这赋值，赋完值之后，在workLoop中执行该任务
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el],
    },
  };
}

let nextWorkOfUnit = null;
// 设置一个当前的任务，一开始是null
function workLoop(deadline) {
  let shouldYield = false;
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit);
    // 将当前的任务传过来，执行任务，执行完之后，将下一个任务返回，然后再重新赋值

    shouldYield = deadline.timeRemaining() < 1;
  }

  requestIdleCallback(workLoop);
}

function createDom(type) {
  // 1. 创建dom
  return type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(type);
}

function updateProps(dom, props) {
  // 2. 处理props
  Object.keys(props).forEach((key) => {
    if (key !== "children") {
      dom[key] = props[key];
    }
  });
}

function initChildren(fiber) {
  //转换链表 设置好指针
  // 遍历所有的孩子节点
  const children = fiber.props.children;
  let prevChild = null;
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevChild.sibling = newFiber;
    }
    prevChild = newFiber;
  });
}

function performWorkOfUnit(fiber) {
  // 1. 创建dom
  if (!fiber.dom) {
    
    const dom = (fiber.dom = createDom(fiber.type));

    fiber.parent.dom.append(dom);

    updateProps(dom, fiber.props);
  }

  initChildren(fiber)

  // 4. 返回下一个要执行的任务
  if (fiber.child) {
    return fiber.child;
  }

  if (fiber.sibling) {
    return fiber.sibling;
  }

  return fiber.parent?.sibling;
}

requestIdleCallback(workLoop);

const React = {
  render,
  createElement,
};

export default React;
