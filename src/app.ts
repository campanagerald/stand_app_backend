import express from 'express';
import { makeHuddleRoute } from './features/huddle/routes/huddle.routes';
import { createHuddle, signup } from './core/locators';
import { makeRegistrationRoutes } from './features/registration/routes/registration.routes';

const app = express();

app.use(express.json());

const BASE_URL = '/api';

app.use(
  BASE_URL,
  makeHuddleRoute({
    createhuddle: createHuddle,
  })
);

app.use(
  BASE_URL,
  makeRegistrationRoutes({
    signup: signup,
  })
);

export { app };
