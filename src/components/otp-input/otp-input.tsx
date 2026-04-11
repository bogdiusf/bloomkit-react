import {
  type ClipboardEvent,
  forwardRef,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "../../utils/cn";
import { inputVariants } from "../input/input.variants";

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
}

export const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  ({ length = 6, value = "", onChange, onComplete, disabled = false, className, autoFocus = false }, ref) => {
    const baseId = useId();
    const [digits, setDigits] = useState<string[]>(() => {
      const arr = new Array(length).fill("");
      value.split("").forEach((char, i) => {
        if (i < length) arr[i] = char;
      });
      return arr;
    });
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
      const arr = new Array(length).fill("");
      value.split("").forEach((char, i) => {
        if (i < length) arr[i] = char;
      });
      setDigits(arr);
    }, [value, length]);

    const updateDigits = useCallback(
      (newDigits: string[]) => {
        setDigits(newDigits);
        const joined = newDigits.join("");
        onChange?.(joined);
        if (joined.length === length && newDigits.every((d) => d !== "")) {
          onComplete?.(joined);
        }
      },
      [length, onChange, onComplete]
    );

    const handleInput = useCallback(
      (index: number, char: string) => {
        if (!/^\d$/.test(char)) return;
        const newDigits = [...digits];
        newDigits[index] = char;
        updateDigits(newDigits);
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      },
      [digits, length, updateDigits]
    );

    const handleKeyDown = useCallback(
      (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
          e.preventDefault();
          const newDigits = [...digits];
          if (digits[index]) {
            newDigits[index] = "";
            updateDigits(newDigits);
          } else if (index > 0) {
            newDigits[index - 1] = "";
            updateDigits(newDigits);
            inputRefs.current[index - 1]?.focus();
          }
        } else if (e.key === "ArrowLeft" && index > 0) {
          inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      },
      [digits, length, updateDigits]
    );

    const handlePaste = useCallback(
      (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        if (!pasted) return;
        const newDigits = new Array(length).fill("");
        pasted.split("").forEach((char, i) => {
          newDigits[i] = char;
        });
        updateDigits(newDigits);
        const focusIndex = Math.min(pasted.length, length - 1);
        inputRefs.current[focusIndex]?.focus();
      },
      [length, updateDigits]
    );

    return (
      <div ref={ref} className={cn("flex items-center gap-[var(--space-sm)]", className)}>
        {digits.map((digit, index) => {
          const slotKey = `${baseId}-${index}`;
          return (
            <input
              key={slotKey}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              disabled={disabled}
              // biome-ignore lint/a11y/noAutofocus: autoFocus is intentional opt-in behavior for OTP flows
              autoFocus={autoFocus && index === 0}
              onChange={(e) => {
                const char = e.target.value.slice(-1);
                handleInput(index, char);
              }}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              className={cn(
                inputVariants(),
                "h-[52px] w-[44px] text-center",
                "text-[length:var(--bloom-text-heading)]",
                "px-0"
              )}
            />
          );
        })}
      </div>
    );
  }
);
OTPInput.displayName = "OTPInput";
