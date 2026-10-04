import type { MouseEvent } from "react";
import { Link, useLocation, type LinkProps } from "react-router-dom";
import { useCurtain } from "../../state/useCurtain";

type Props = LinkProps & {
  to: string;
  /** Shown on the curtain while the page swaps. */
  curtainLabel?: string;
};

/**
 * A router Link that plays the page curtain for plain left-clicks to another page.
 * Modified clicks (new tab, etc.) and same-page links behave like a normal Link.
 */
export function CurtainLink({ to, curtainLabel, onClick, ...rest }: Props) {
  const go = useCurtain();
  const { pathname } = useLocation();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (to.split("#")[0] === pathname) return;
    e.preventDefault();
    go(to, curtainLabel);
  };

  return <Link to={to} onClick={handleClick} {...rest} />;
}
