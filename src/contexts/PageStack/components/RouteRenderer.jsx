import routes from "@/configs/routes";
import { memo } from "react";
import { matchRoutes } from "react-router";

const RouteRenderer = memo(({ path, skip = 3, className }) => {
  const matches = matchRoutes(routes, path);
  if (!matches) return null;

  const matchedComponents = matches.map((m) => m.route.Component).filter(Boolean);
  const layoutTree = matchedComponents.slice(skip);
  if (layoutTree.length === 0) return null;

  // Dùng reduceRight để truyền style/className vào component ngoài cùng
  const nestedTree = layoutTree.reduceRight((children, Comp, index) => {
    // Component ngoài cùng sẽ nhận style/className
    if (index === 0) {
      return (
        <Comp fromRouteRenderer className={className}>
          {children}
        </Comp>
      );
    }
    return <Comp fromRouteRenderer>{children}</Comp>;
  }, null);

  return nestedTree;
});

export default RouteRenderer;
