import usePageStack from "../hooks/usePageStack";
import PageItem from "./PageItem";

export default function PageStackView() {
  const { pages, currentPage, layout, routes } = usePageStack();

  return pages.map((page) => (
    <PageItem
      key={page.id}
      id={page.id}
      path={page.path}
      isActive={currentPage?.id === page.id}
      routes={routes}
      layout={layout}
    />
  ));
}
