import { matchRoutes } from "react-router";

export default function RouteRenderer({ routes, layout, path }) {
  const matches = matchRoutes(routes, path);
  if (!matches) return null;

  // Lấy danh sách component đã match
  const matchedComponents = matches.map((m) => m.route.Component).filter(Boolean);

  let layoutTree = matchedComponents;

  // 👉 CHỈ xử lý findIndex khi có truyền layout
  if (layout) {
    const layoutIndex = matchedComponents.findIndex((Comp) => Comp === layout);

    if (layoutIndex === -1) return null;

    layoutTree = matchedComponents.slice(layoutIndex);
  }

  // 1 Tạo bản sao của layoutTree để không mutate mảng gốc
  const treeCopy = [...layoutTree];

  // 2 Đảo ngược mảng để render từ trong ra ngoài (nested)
  const reversedTree = treeCopy.reverse();

  // 3 Dùng reduce để dựng cây component lồng nhau
  let nestedTree = null;
  for (const Comp of reversedTree) {
    nestedTree = nestedTree ? <Comp>{nestedTree}</Comp> : <Comp />;
  }

  // 4 Trả về cây component hoàn chỉnh
  return nestedTree;
}
