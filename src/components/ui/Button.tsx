import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

type SharedButtonProps = {
  children?: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

type ButtonElementProps = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

type AnchorElementProps = SharedButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonElementProps | AnchorElementProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-[#14120a] shadow-gold hover:bg-gold-bright active:bg-gold-deep active:text-ink",
  secondary:
    "border border-line-strong bg-surface text-ink hover:border-gold/50 hover:bg-surface-2 active:bg-surface",
  ghost:
    "bg-transparent text-ink-dim hover:bg-surface-2 hover:text-ink active:bg-surface",
  danger:
    "bg-danger text-[#1c0b06] shadow-sm hover:brightness-110 active:brightness-95",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 py-2 text-sm",
  md: "min-h-12 px-5 py-3 text-base",
  lg: "min-h-14 px-6 py-4 text-lg",
  icon: "size-11 p-0",
};

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}: ButtonProps) {
  const classes = joinClasses(
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href) {
    const anchorProps = props as AnchorElementProps;
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
