/* eslint-disable no-unused-vars */
import routes from "@/configs/routes";
import { memo } from "react";
import { matchRoutes } from "react-router";

const RouteRenderer = memo(({ path, skip = 3 }) => {
  const matches = matchRoutes(routes, path);
  if (!matches) return null;

  // Lấy danh sách component đã match
  const matchedComponents = matches.map((m) => m.route.Component).filter(Boolean);

  // Bỏ qua `skip` layout đầu tiên
  const layoutTree = matchedComponents.slice(skip);

  if (layoutTree.length === 0) return null;

  // Dùng reduceRight dựng cây component lồng nhau từ trong ra ngoài
  const nestedTree = layoutTree.reduceRight((children, Comp) => <Comp fromRouteRenderer={true}>{children}</Comp>, null);

  return nestedTree;
});

export default RouteRenderer;
