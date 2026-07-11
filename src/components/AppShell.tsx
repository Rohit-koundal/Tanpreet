import { ReactNode } from "react";
import { siteConfig } from "../data/siteConfig";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-stage">
      <div className="app-shell" style={{ maxWidth: siteConfig.maxAppWidth }}>
        {children}
      </div>
    </div>
  );
}
