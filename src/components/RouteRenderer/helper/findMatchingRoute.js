import { matchPath } from "react-router";

export function findMatchingRoute(path, routeNodes) {
  let matchResult = null;

  const traverseRoutes = (nodes, parentLayouts = []) => {
    for (const node of nodes) {
      if (node.Component && node.children) {
        traverseRoutes(node.children, [...parentLayouts, node.Component]);
      }

      if (node.path && matchPath(path, node.path)) {
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
