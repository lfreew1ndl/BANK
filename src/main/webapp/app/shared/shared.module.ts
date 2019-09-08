import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BankSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [BankSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [BankSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BankSharedModule {
  static forRoot() {
    return {
      ngModule: BankSharedModule
    };
  }
}
