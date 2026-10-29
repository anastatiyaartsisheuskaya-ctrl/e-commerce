import { X } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

interface SaleFilterProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function SaleFilter({ value, onChange }: SaleFilterProps) {
  return (
    <Button
      type="button"
      variant={value ? "default" : "outline"}
      aria-pressed={value}
      onClick={() => onChange(!value)}
      className="h-10 min-w-32 justify-between rounded-full px-4"
    >
      Sale
      {value && <X className="ml-3 size-4" />}
    </Button>
  );
}
