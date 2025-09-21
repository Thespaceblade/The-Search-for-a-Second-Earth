import * as React from "react";

export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        "rounded-xl border border-white/10 bg-white/5 text-white shadow-sm " +
        className
      }
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={"p-4 " + className} {...props} />;
}

export function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={"px-4 pb-4 " + className} {...props} />;
}

export function CardFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={"px-4 pb-4 pt-2 " + className} {...props} />;
}

