/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IO_PORT: string;
  readonly VITE_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
