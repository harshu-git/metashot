export const config = {
  app: {
    name: 'MetaShot',
    tagline: 'Make Your Photos Meta-Ready',
    url: 'https://metashot.app', // placeholder
  },
  processing: {
    maxFileSizeMB: import.meta.env?.VITE_MAX_FILE_SIZE_MB ? Number(import.meta.env.VITE_MAX_FILE_SIZE_MB) : 25,
    defaultQuality: 92,
    defaultOutputFormat: 'image/jpeg' as const,
  },
  analytics: {
    enabled: import.meta.env?.VITE_ANALYTICS_ENABLED === 'true',
  },
  ads: {
    enabled: true,
  },
} as const;
