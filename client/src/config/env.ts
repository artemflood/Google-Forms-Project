interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export const ENV = {
  API_URL: (import.meta as ImportMeta).env.VITE_API_URL || '/graphql',
  NODE_ENV: (import.meta as ImportMeta).env.MODE || 'development',
  IS_DEV: (import.meta as ImportMeta).env.DEV,
  IS_PROD: (import.meta as ImportMeta).env.PROD,
} as const;

