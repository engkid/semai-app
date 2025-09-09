"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  label?: string;
  scheme: string; // e.g. "myapp://"
  path?: string; // e.g. "open" -> myapp://open
  params?: Record<string, string | number | boolean | undefined | null>;
  callbackParam?: string; // e.g. "callback" to append callback URL
  callbackUrl?: string; // if not provided, defaults to current page URL
  androidStoreUrl?: string; // Play Store fallback URL
  iosStoreUrl?: string; // App Store fallback URL
  webFallbackUrl?: string; // Generic web fallback
  className?: string;
  children?: React.ReactNode; // optional custom button content
};

function isIOS(ua: string) {
  return /(iPhone|iPad|iPod)/i.test(ua);
}

function isAndroid(ua: string) {
  return /Android/i.test(ua);
}

function buildDeepLink({
  scheme,
  path,
  params,
}: Pick<Props, "scheme" | "path" | "params">) {
  const base = scheme.endsWith("://") ? scheme : `${scheme}://`;
  const pathname = path ? (path.startsWith("/") ? path.slice(1) : path) : "";
  const url = new URL(`${base}${pathname}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

export default function DeepLinkButton({
  label = "Open in App",
  scheme,
  path,
  params,
  callbackParam,
  callbackUrl,
  androidStoreUrl,
  iosStoreUrl,
  webFallbackUrl,
  className,
  children,
}: Props) {
  const onClick = React.useCallback(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";

    const finalCallbackUrl =
      callbackUrl ||
      (typeof window !== "undefined" ? window.location.href : undefined);

    const allParams = {
      ...(params || {}),
      ...(callbackParam && finalCallbackUrl
        ? { [callbackParam]: finalCallbackUrl }
        : {}),
    } as Record<string, string>;

    const deepLink = buildDeepLink({ scheme, path, params: allParams });

    // Try opening the app
    const start = Date.now();
    const timeout = 1200; // ms

    // Navigate to the deep link
    window.location.href = deepLink;

    // Fallback to the appropriate store or web after a short delay
    const timer = setTimeout(() => {
      const visible = typeof document !== "undefined" && document.visibilityState === "visible";
      const elapsed = Date.now() - start;
      if (visible && elapsed >= timeout - 50) {
        if (isIOS(ua) && iosStoreUrl) {
          window.location.href = iosStoreUrl;
        } else if (isAndroid(ua) && androidStoreUrl) {
          window.location.href = androidStoreUrl;
        } else if (webFallbackUrl) {
          window.location.href = webFallbackUrl;
        }
      }
    }, timeout);

    // Cleanup if page gets hidden (likely app opened)
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        clearTimeout(timer);
        document.removeEventListener("visibilitychange", onVisibility);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
  }, [
    scheme,
    path,
    params,
    callbackParam,
    callbackUrl,
    androidStoreUrl,
    iosStoreUrl,
    webFallbackUrl,
  ]);

  return (
    <Button onClick={onClick} className={className}>
      {children ?? label}
    </Button>
  );
}

