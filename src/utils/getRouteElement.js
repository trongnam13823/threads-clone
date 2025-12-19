import routes from "@/configs/routes";
import { createElement } from "react";
import { matchPath } from "react-router";

/**
 * Tìm route phù hợp với path và thu thập các layouts cha
 */
function findMatchingRoute(path, routeNodes) {
  let matchResult = null;

  const traverseRoutes = (nodes, parentLayouts = []) => {
    for (const node of nodes) {
      const hasLayoutAndChildren = node.Component && node.children;

      if (hasLayoutAndChildren) {
        traverseRoutes(node.children, [...parentLayouts, node.Component]);
      }

      const isPathMatch = node.path && matchPath(path, node.path);

      if (isPathMatch) {
        matchResult = {
          layouts: parentLayouts,
          Page: node.Component,
        };
        return;
      }
    }
  };

  traverseRoutes(routeNodes);
  return matchResult;
}

/**
 * Tạo cây component từ Page và các Layouts
 */
function buildComponentTree(Page, layouts, outerLayoutProps) {
  if (layouts.length === 0) {
    return createElement(Page, outerLayoutProps);
  }

  const [outerLayout, ...innerLayouts] = layouts;
  const pageElement = createElement(Page);

  const innerTree = innerLayouts.reduce(
    (children, Layout) => createElement(Layout, {}, children),
    pageElement,
  );

  return createElement(outerLayout, outerLayoutProps, innerTree);
}

/**
 * Lấy element của route dựa trên path
 * @param {string} path - Đường dẫn cần tìm
 * @param {number} start - Vị trí bắt đầu slice layouts (mặc định: 1)
 * @param {object} props - Props truyền vào outer layout
 */
export default function getRouteElement({ path, start = 1, props = {} }) {
  const matchResult = findMatchingRoute(path, routes);

  if (!matchResult) {
    return null;
  }

  const { layouts, Page } = matchResult;
  const effectiveLayouts = layouts.slice(start).reverse();

  return buildComponentTree(Page, effectiveLayouts, props);
}
