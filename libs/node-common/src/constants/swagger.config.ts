import { Options } from 'express-jsdoc-swagger';

export const swaggerConfig: Omit<Options, 'info'> = {
  baseDir: __dirname,
  filesPattern: './**/*.{js,ts}',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  swaggerUiOptions: {},
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  swaggerUIPath: '/api/docs',
};
