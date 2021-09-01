import React, { PropsWithChildren } from "react";

import Link from "@docusaurus/Link";
import type { Props } from "@theme/Logo";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { DocusaurusContext } from "@docusaurus/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import type { ThemeConfig } from "@theme/hooks/useThemeConfig";

function Logo(props: Props): JSX.Element {
  const { imageClassName, children, ...propsRest } = props;
  const {
    isClient,
    siteConfig: { themeConfig },
  } = useDocusaurusContext() as DocusaurusContext;
  const { logo = { src: "" } } = themeConfig as ThemeConfig;

  const logoLink = useBaseUrl(logo.href || "/");
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
  return (
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo.target && { target: logo.target })}
    >
      {logo.src && (
        <ThemedImage
          key={isClient.toString()}
          className={imageClassName}
          sources={sources}
          alt={logo.alt}
        />
      )}
      {children}
    </Link>
  );
}

export default Logo;
