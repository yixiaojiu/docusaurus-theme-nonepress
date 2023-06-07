import React from "react";

import clsx from "clsx";

import { ThemeClassNames } from "@docusaurus/theme-common";

import type { Props } from "@theme/DocSidebarItem/Html";

export default function DocSidebarItemHtml({
  item,
  level,
  index,
}: Props): JSX.Element {
  const { value, defaultStyle, className } = item;
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        defaultStyle && ["", ""],
        className,
      )}
      key={index}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}
