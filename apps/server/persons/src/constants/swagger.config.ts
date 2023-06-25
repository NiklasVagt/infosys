import { Options } from 'express-jsdoc-swagger';
import { swaggerConfig as swaggerConfigBase } from '@infosys/node-common';

export const swaggerConfig: Options = {
  ...swaggerConfigBase,
  info: {
    title: 'Persons API',
    version: '1.0.0',
    description: 'Persons API',
  },
};
