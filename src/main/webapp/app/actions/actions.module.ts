import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BankSharedModule } from 'app/shared';

import { actionsState, ExchangeRatesComponent } from './';

@NgModule({
  imports: [BankSharedModule, RouterModule.forChild(actionsState)],
  declarations: [ExchangeRatesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BankActionsModule {}
