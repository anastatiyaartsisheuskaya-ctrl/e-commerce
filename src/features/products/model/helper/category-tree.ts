import type { CategoriesHierarchyResponse } from "../types";

export interface CategoryNode {
  name: string;
  path: string;
  children: CategoryNode[];
}

export function buildCategoryTree(
  categories: CategoriesHierarchyResponse,
): CategoryNode[] {
  const categoryNames = Object.keys(categories);

  const childNames = new Set(Object.values(categories).flat());

  const rootNames = categoryNames.filter((name) => !childNames.has(name));

  function buildNode(
    name: string,
    path: string,
    ancestors: Set<string>,
  ): CategoryNode {
    if (ancestors.has(name)) {
      return { name, path, children: [] };
    }

    const nextAncestors = new Set(ancestors);
    nextAncestors.add(name);

    const children = [...new Set(categories[name] ?? [])];

    return {
      name,
      path,
      children: children.map((child) =>
        buildNode(child, `${path}/${child}`, nextAncestors),
      ),
    };
  }

  return (rootNames.length ? rootNames : categoryNames).map((name) =>
    buildNode(name, name, new Set()),
  );
}
