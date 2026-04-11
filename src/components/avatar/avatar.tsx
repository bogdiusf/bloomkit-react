import { forwardRef, useState, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { avatarVariants, type AvatarVariants } from "./avatar.variants";

export type AvatarProps = HTMLAttributes<HTMLDivElement> &
  AvatarVariants & {
    initials?: string;
    src?: string;
    alt?: string;
  };

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, initials, src, alt, ...props }, ref) => {
    const [imgError, setImgError] = useState(false);
    const showImage = src && !imgError;

    return (
      <div ref={ref} className={cn(avatarVariants({ size }), className)} {...props}>
        <span aria-hidden={showImage || undefined}>{initials}</span>
        {showImage && (
          <img
            src={src}
            alt={alt ?? initials ?? ""}
            onError={() => setImgError(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex -space-x-2", className)}
      {...props}
    />
  )
);
AvatarGroup.displayName = "AvatarGroup";
