import { useId } from "react";

/**
 * Shared variant icons used by Alert and Toast components.
 * Each icon generates a unique title id so multiple instances on a page
 * don't produce duplicate DOM ids.
 */

interface VariantIconProps {
  size?: number;
}

export function SuccessIcon({ size = 20 }: VariantIconProps) {
  const titleId = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" role="img" aria-labelledby={titleId}>
      <title id={titleId}>Success</title>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 10.5L8.5 12.5L13.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ErrorIcon({ size = 20 }: VariantIconProps) {
  const titleId = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" role="img" aria-labelledby={titleId}>
      <title id={titleId}>Error</title>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function WarningIcon({ size = 20 }: VariantIconProps) {
  const titleId = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" role="img" aria-labelledby={titleId}>
      <title id={titleId}>Warning</title>
      <path d="M10 3L18 17H2L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function InfoIcon({ size = 20 }: VariantIconProps) {
  const titleId = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" role="img" aria-labelledby={titleId}>
      <title id={titleId}>Information</title>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

export type VariantIconName = "success" | "error" | "warning" | "info";

export const variantIconMap: Record<VariantIconName, React.ComponentType<VariantIconProps>> = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
};
