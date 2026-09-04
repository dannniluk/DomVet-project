export function resolveAssetPath(path: string): string {
  if (!path || /^(https?:|data:|blob:)/.test(path)) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
