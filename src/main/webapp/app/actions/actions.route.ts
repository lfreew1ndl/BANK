import { Routes } from '@angular/router';

import { exchangeRatesRoute } from './';

const ACTIONS_ROUTES = [exchangeRatesRoute];

export const actionsState: Routes = [
  {
    path: '',
    children: ACTIONS_ROUTES
  }
];
