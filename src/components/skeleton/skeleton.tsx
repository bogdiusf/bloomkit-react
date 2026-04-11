import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { skeletonVariants, type SkeletonVariants } from "./skeleton.variants";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & SkeletonVariants;

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(skeletonVariants({ variant }), className)}
      aria-hidden="true"
      {...props}
    />
  )
);
Skeleton.displayName = "Skeleton";
