import clsx from "clsx";
import React, { PropsWithChildren, useEffect } from "react";

import {
  isSamePath,
  useCollapsible,
  Collapsible,
  useLocalPathname,
} from "@docusaurus/theme-common";
import Link from "@docusaurus/Link";
import NavbarItem from "@theme/NavbarItem";
import { NavbarLink, NavbarDropdown } from "../../useThemeConfig";

function isItemActive(item: NavbarLink, localPathname: string): boolean {
  if (isSamePath(item.to, localPathname)) {
    return true;
  }
  // if (
  //   item.activeBaseRegex &&
  //   new RegExp(item.activeBaseRegex).test(localPathname)
  // ) {
  //   return true;
  // }
  // if (item.activeBasePath && localPathname.startsWith(item.activeBasePath)) {
  //   return true;
  // }
  return false;
}

function containsActiveItems(
  items: readonly NavbarLink[],
  localPathname: string
): boolean {
  return items.some((item) => isItemActive(item, localPathname));
}

export default function NavbarDropdownMobile(
  props: PropsWithChildren<NavbarDropdown>
): JSX.Element {
  const { label, icon, className, items } = props;

  const localPathname = useLocalPathname();
  const containsActive = containsActiveItems(items, localPathname);
  const { collapsed, toggleCollapsed, setCollapsed } = useCollapsible({
    initialState: () => !containsActive,
  });

  // Expand/collapse if any item active after a navigation
  useEffect(() => {
    if (containsActive) {
      setCollapsed(!containsActive);
    }
  }, [localPathname, containsActive]);

  return (
    <li className={className}>
      {/* <Link
        ref={element}
        className="flex items-center justify-between px-3 py-3 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-900 dark:hover:opacity-100 text-base font-medium uppercase"
      >
        <span className="truncate">
          {icon && <i className={clsx(icon, "mr-2 align-middle")}></i>}
          {label}
        </span>
        <i className="fas fa-angle-right"></i>
      </Link> */}
      <Link
        role="button"
        className="flex items-center justify-between px-3 py-3 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-900 dark:hover:opacity-100 text-base font-medium uppercase"
        onClick={(e) => {
          e.preventDefault();
          toggleCollapsed();
        }}
      >
        <span className="truncate">
          {icon && <i className={clsx(icon, "mr-2 align-middle")}></i>}
          {label}
        </span>
        <span
          className={clsx("transform ease-in-out duration-100", {
            "-rotate-90": collapsed,
          })}
        >
          <i className="fas fa-angle-down transform"></i>
        </span>
      </Link>
      <Collapsible lazy as="ul" className="block ml-4" collapsed={collapsed}>
        {items.map((item, i) => (
          <NavbarItem key={i} item={item} isMobile />
        ))}
      </Collapsible>
    </li>
  );
}
