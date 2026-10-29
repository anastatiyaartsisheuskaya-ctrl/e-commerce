import { Search } from "lucide-react";

import { Input } from "@/shared/components/ui/input";

interface ProductSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProductSearchInput({
  value,
  onChange,
}: ProductSearchInputProps) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        aria-hidden="true"
        className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products..."
        aria-label="Search products by name"
        className="h-10 rounded-full bg-card pl-9"
      />
    </div>
  );
}
