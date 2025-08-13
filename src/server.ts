import { join } from 'node:path';

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, { static as expressStatic } from 'express';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  expressStatic(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 * Переписано на async/await для коректної роботи з promise/no-callback-in-promise
 */
app.use(async(req, res, next) => {
  try {
    const response = await angularApp.handle(req);
    if (response) {
      writeResponseToNodeResponse(response, res);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable,
 * or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORTSERVER'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listen on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the  ngular CL I (for dev-server and during build)
 * or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
