import { Application } from 'express';
import { Options } from 'express-jsdoc-swagger';
import initSwaggerFactory from 'express-jsdoc-swagger';
import { EventEmitter } from 'stream';
import { JsonObject } from 'swagger-ui-express';

export class SwaggerService {
  private emitter: EventEmitter;

  constructor(private app: Application, private options: Options) {
    const initSwagger = initSwaggerFactory(app);
    this.emitter = initSwagger(options);

    // remove broken descriptions
    this.emitter.on('finish', (doc) => {
      Object.values<JsonObject>(doc.components.schemas).forEach(
        (schema) => (schema.description = '')
      );
    });
  }

  public setupRedirect(from = '/api'): void {
    const to = this.options.swaggerUIPath;
    if (!to) return;

    console.info(`Find Swagger UI at ${from}`);

    this.app.get(from, (req, res) => res.redirect(to));
  }
}
