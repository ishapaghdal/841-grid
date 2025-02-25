import type * as React from "react";

import { cn } from "../../lib/utils";

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  return <span>{children}</span>;
};

const TooltipTrigger = ({ children }: { children: React.ReactNode }) => {
  return <span>{children}</span>;
};

const TooltipContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=open]:animate-out data-[state=open]:fade-out-0 data-[state=open]:zoom-out-95",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
