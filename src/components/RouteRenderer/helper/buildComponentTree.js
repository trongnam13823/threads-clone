import { createElement } from "react";

export function buildComponentTree(Page, layouts) {
  const pageElement = createElement(Page);

  return layouts.reduce((children, Layout) => createElement(Layout, null, children), pageElement);
}
