import { createContext, useContext } from "react";
import type { NavigateOptions, To } from "react-router-dom";

export type Go = (to: To, label?: string, options?: NavigateOptions) => void;

export const CurtainContext = createContext<Go | null>(null);

export function useCurtain() {
  const ctx = useContext(CurtainContext);
  if (!ctx) throw new Error("useCurtain must be used inside <CurtainProvider>");
  return ctx;
}
