import * as Popover from "@radix-ui/react-popover";
import { useMemo, useState } from "react";
import { cn } from "../../utils/cn";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DatePicker({ value, onChange, placeholder = "Select date", className }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => value ?? new Date());
  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const { emptyCells, dayCells } = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const empties = DAY_NAMES.slice(0, firstDay);
    const nums = Array.from({ length: daysInMonth }, (_, idx) => idx + 1);
    return { emptyCells: empties, dayCells: nums };
  }, [viewYear, viewMonth]);

  const isSelected = (day: number) => {
    if (!value) return false;
    return value.getFullYear() === viewYear && value.getMonth() === viewMonth && value.getDate() === day;
  };

  const prevMonth = () => setViewDate(new Date(viewYear, viewMonth - 1, 1));
  const nextMonth = () => setViewDate(new Date(viewYear, viewMonth + 1, 1));

  const selectDay = (day: number) => {
    const selected = new Date(viewYear, viewMonth, day);
    onChange?.(selected);
    setOpen(false);
  };

  const formattedValue = value
    ? value.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-[var(--space-sm)]",
            "h-[44px] px-[var(--space-lg)]",
            "rounded-[var(--bloom-radius)] bg-[var(--bloom-surface)]",
            "border border-[var(--bloom-surface2)]",
            "text-[length:var(--bloom-text-body)] font-[family-name:var(--bloom-font)] color-[var(--bloom-text)]",
            "transition-all duration-[var(--bloom-duration)] ease-[var(--bloom-ease)]",
            "focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-[var(--bloom-accent1)]/20",
            !formattedValue && "color-[var(--bloom-text-secondary)]",
            className
          )}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 6h12" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {formattedValue ?? placeholder}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          className={cn(
            "bloom z-50 w-[280px]",
            "rounded-[var(--bloom-radius-lg)]",
            "bg-[var(--bloom-surface)] p-[var(--space-lg)]",
            "shadow-[var(--bloom-shadow-hover)]",
            "border border-[var(--bloom-surface2)]",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          )}
        >
          <div className="flex items-center justify-between mb-[var(--space-md)]">
            <button
              type="button"
              onClick={prevMonth}
              className="p-[var(--space-xs)] rounded-full hover:bg-[var(--bloom-surface2)] transition-colors"
              aria-label="Previous month"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M10 4l-4 4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-body)] font-medium color-[var(--bloom-text)]">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-[var(--space-xs)] rounded-full hover:bg-[var(--bloom-surface2)] transition-colors"
              aria-label="Next month"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-[2px] mb-[var(--space-xs)]">
            {DAY_NAMES.map((d) => (
              <div
                key={d}
                className="text-center text-[length:var(--bloom-text-micro)] color-[var(--bloom-text-secondary)] font-medium py-[var(--space-xs)]"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-[2px]">
            {emptyCells.map((weekday) => (
              <div key={`empty-${viewYear}-${viewMonth}-${weekday}`} />
            ))}
            {dayCells.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => selectDay(day)}
                className={cn(
                  "h-[36px] w-[36px] rounded-full",
                  "flex items-center justify-center",
                  "text-[length:var(--bloom-text-caption)] font-[family-name:var(--bloom-font)]",
                  "transition-colors duration-[var(--bloom-duration-fast)]",
                  "hover:bg-[var(--bloom-accent1)]/20",
                  isSelected(day) ? "bg-[var(--bloom-accent1-deep)] color-white" : "color-[var(--bloom-text)]"
                )}
              >
                {day}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
