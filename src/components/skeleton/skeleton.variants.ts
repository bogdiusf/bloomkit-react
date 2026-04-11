import { cva } from "class-variance-authority";

export const skeletonVariants = cva(["bg-[var(--bloom-surface2)]", "animate-[bloom-breathe_3s_ease-in-out_infinite]"], {
  variants: {
    variant: {
      text: "h-[16px] w-full rounded-[var(--bloom-radius-sm)]",
      card: "h-[200px] w-full rounded-[var(--bloom-radius-lg)]",
      avatar: "h-[40px] w-[40px] rounded-full",
      custom: "",
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

export type SkeletonVariants = Parameters<typeof skeletonVariants>[0];
