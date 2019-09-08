import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { ExchangeRatesComponent } from 'app/actions';

export const exchangeRatesRoute: Route = {
  path: 'exchangeRates',
  component: ExchangeRatesComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'global.menu.actions.settings'
  },
  canActivate: [UserRouteAccessService]
};
