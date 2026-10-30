import { ChevronDown } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Spinner } from "@/shared/components/ui/spinner";

import type { FilterOption } from "../../model/types";

interface MultiSelectFilterProps<T extends string> {
  label: string;
  options?: readonly FilterOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
}

export function MultiSelectFilter<T extends string>({
  label,
  options,
  value,
  onChange,
}: MultiSelectFilterProps<T>) {
  function toggleOption(optionValue: T, checked: boolean) {
    const updatedValue = checked
      ? [...value, optionValue]
      : value.filter((item) => item !== optionValue);

    onChange(updatedValue);
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="h-10 min-w-32 justify-between rounded-full bg-card px-4 font-normal"
          />
        }
      >
        <span>
          {label}
          {value.length > 0 && (
            <span className="ml-1 text-primary">({value.length})</span>
          )}
        </span>

        <ChevronDown className="ml-3 size-4 shrink-0" />
      </PopoverTrigger>

      <PopoverContent align="start" className="w-56 rounded-xl p-3">
        <div className="mb-3 flex items-center justify-between">
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

        <div className="max-h-64 space-y-3 overflow-y-auto">
          {options ? (
            options.map((option, index) => {
              const id = `${label}-${index}`;
              const checked = value.includes(option.value);

              return (
                <div key={option.value} className="flex items-center gap-3">
                  <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={(checked) =>
                      toggleOption(option.value, checked === true)
                    }
                  />

                  <Label
                    htmlFor={id}
                    className="flex-1 cursor-pointer text-sm font-normal"
                  >
                    {option.label}
                  </Label>
                </div>
              );
            })
          ) : (
            <Spinner />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
