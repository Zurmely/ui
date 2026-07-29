const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an app route for raw href attributes (GitHub Pages subpath). */
export function withBasePath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return basePath ? `${basePath}${normalized}` : normalized;
}

/** BrowserRouter basename derived from Vite base config. */
export function routerBasename(): string | undefined {
  return basePath || undefined;
}
