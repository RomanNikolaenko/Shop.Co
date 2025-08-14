import { join } from 'node:path';
import { fileURLToPath } from 'url'; // для перетворення import.meta.url на шлях
import { AngularAppEngine, createRequestHandler } from '@netlify/angular-runtime';
import express from 'express';

// Визначаємо шлях до папки dist/browser
const __dirname = fileURLToPath(new URL('.', import.meta.url)); // отримуємо директорію
const browserDistFolder = join(__dirname, '../browser'); // шлях до dist/browser

const app = express();
const angularApp = new AngularAppEngine();

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
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 * Переписано на async/await для коректної роботи з promise/no-callback-in-promise
 */
app.use(async (req, res, next) => {
  try {
    const response = await angularApp.handle(req);
    if (response) {
      res.status(response.status || 200);
      res.send(response.body);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

/**
 * Request handler used by the Netlify CLI (for dev-server and during build)
 * or Firebase Cloud Functions.
 */
export const reqHandler = createRequestHandler(app);
