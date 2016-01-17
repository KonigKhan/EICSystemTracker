// Typings for Systemjs

interface System {
  import(name: string): Promise<any>;
  defined: any;
  amdDefine: () => void;
  amdRequire: () => void;
  baseURL: string;
  config(config: SystemConfig): System;
  defaultJSExtensions: boolean;
}

interface SystemConfig {
    // Path mappings for module names not found directly under
    // baseUrl.
    map?: { [key: string]: any; };
    paths?: { [key: string]: any; };
    traceurOptions?: any;
    // TODO: Add more as needed...
}

interface KeyValuePair {
    [key: string]: string;
}

declare var System: System;

declare module "systemjs" {
  export = System;
}