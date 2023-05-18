import { swaggerConfig as swaggerConfigBase } from '@infosys/node-common';

export const swaggerConfig = {
  ...swaggerConfigBase,
  info: {
    title: 'Auth API',
    version: '1.0.0',
    description: 'Auth API',
  },
};
