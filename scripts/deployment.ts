/** Local path only: production assets must stay on the site's own origin. */
export function pagesBase(value = '/permesso-modulo-tool/'): string {
  if (!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(value) || value.split('/').some((part) => part === '.' || part === '..')) {
    throw new Error('VITE_BASE_PATH must be an absolute local directory path with a trailing slash')
  }
  return value
}
