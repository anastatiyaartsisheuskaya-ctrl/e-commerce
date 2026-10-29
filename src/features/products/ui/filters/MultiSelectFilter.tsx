import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import type { FilterOption } from "../../model/types";

interface MultiSelectFilterProps {
  label: string;
  options: readonly FilterOption[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function MultiSelectFilter({
  label,
  options,
  value,
  onChange,
}: MultiSelectFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleValue(optionValue: string, checked: boolean) {
    onChange(
      checked
        ? [...value, optionValue]
        : value.filter((item) => item !== optionValue),
    );
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="h-10 min-w-36 justify-between rounded-full bg-card px-4 font-normal"
      >
        <span>
          {label}
          {value.length > 0 && (
            <span className="ml-1 text-muted-foreground">({value.length})</span>
          )}
        </span>

        <ChevronDown className="ml-3 size-4 shrink-0" />
      </Button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-72 w-56 overflow-y-auto rounded-xl border bg-popover p-3 text-popover-foreground shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">{label}</span>

            {value.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onChange([])}
                className="h-7 px-2 text-xs"
              >
                Clear
              </Button>
            )}
          </div>

          <div className="space-y-1">
            {options.map((option) => {
              const checked = value.includes(option.value);

              return (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) =>
                      toggleValue(option.value, event.target.checked)
                    }
                    className="size-4 accent-primary"
                  />

                  <span className="flex-1">{option.label}</span>

                  {checked && <X className="size-3.5 text-muted-foreground" />}
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
