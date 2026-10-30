import { useMemo } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";

import { useCategoriesHierarchyQuery } from "../model/query";
import { buildCategoryTree } from "../model/helper/category-tree";
import type { CategoryNode } from "../model/helper/category-tree";

interface CategoriesSidebarProps {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

interface CategoryListProps {
  nodes: CategoryNode[];
  selectedCategories: string[];
  onToggle: (category: string) => void;
  depth?: number;
}

function CategoryList({
  nodes,
  selectedCategories,
  onToggle,
  depth = 0,
}: CategoryListProps) {
  const defaultOpenItems = nodes
    .filter(
      (node) =>
        node.children.length > 0 &&
        (node.name === "Accessories" || node.name === "Belts"),
    )
    .map((node) => node.path);

  return (
    <Accordion multiple defaultValue={defaultOpenItems} className="w-full">
      {nodes.map((node) => {
        const isSelected = selectedCategories.includes(node.name);
        const hasChildren = node.children.length > 0;

        const buttonClassName = `
          flex min-h-10 w-full items-center text-left
          text-sm transition-colors hover:text-primary
          ${depth === 0 ? "font-semibold" : "font-normal text-muted-foreground"}
          ${isSelected ? "text-primary" : ""}
        `;

        return (
          <AccordionItem
            key={node.path}
            value={node.path}
            className={depth === 0 ? "border-b border-border" : "border-b-0"}
          >
            <div
              className={`flex items-center gap-2 ${
                depth === 0 ? "min-h-13.5" : "min-h-9"
              }`}
            >
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onToggle(node.name)}
                className={buttonClassName}
              >
                {node.name}
              </button>

              {hasChildren && (
                <AccordionTrigger
                  aria-label={`Expand ${node.name} subcategories`}
                  className="flex-none p-2 hover:no-underline"
                >
                  <span className="sr-only">Expand {node.name}</span>
                </AccordionTrigger>
              )}
            </div>

            {hasChildren && (
              <AccordionContent className="pb-2">
                <div className="pl-2">
                  <CategoryList
                    nodes={node.children}
                    selectedCategories={selectedCategories}
                    onToggle={onToggle}
                    depth={depth + 1}
                  />
                </div>
              </AccordionContent>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export function CategoriesSidebar({
  selectedCategories,
  onChange,
}: CategoriesSidebarProps) {
  const {
    data: categories,
    isPending,
    isError,
  } = useCategoriesHierarchyQuery();

  const categoryTree = useMemo(
    () => (categories ? buildCategoryTree(categories) : []),
    [categories],
  );

  function handleCategoryToggle(category: string) {
    const isSelected = selectedCategories.includes(category);

    onChange(
      isSelected
        ? selectedCategories.filter((item) => item !== category)
        : [...selectedCategories, category],
    );
  }

  return (
    <aside className="w-full shrink-0 md:w-55">
      <h2 className="mb-3 text-xs font-medium text-muted-foreground">
        Categories
      </h2>

      {isPending && (
        <div className="space-y-5">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="h-8 animate-pulse rounded bg-muted" />
          ))}
        </div>
      )}

      {isError && (
        <p role="alert" className="text-sm text-destructive">
          Unable to load categories.
        </p>
      )}

      {!isPending && !isError && categoryTree.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No categories available.
        </p>
      )}

      {!isPending && !isError && categoryTree.length > 0 && (
        <CategoryList
          nodes={categoryTree}
          selectedCategories={selectedCategories}
          onToggle={handleCategoryToggle}
        />
      )}
    </aside>
  );
}
