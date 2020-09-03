import express from 'express';
import { makeHuddleRoute } from './features/huddle/routes/huddle.routes';
import { createHuddle } from './core/locators';

const app = express();

app.use(express.json());

app.use(
  '/huddle',
  makeHuddleRoute({
    createhuddle: createHuddle,
  })
);

export { app };
