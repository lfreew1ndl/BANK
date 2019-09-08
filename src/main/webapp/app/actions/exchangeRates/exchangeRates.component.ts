import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JhiAlertService, JhiEventManager, JhiLanguageService } from 'ng-jhipster';
import { MatTableModule } from '@angular/material/table';
import { AccountService, JhiLanguageHelper } from 'app/core';
import { Currency, ICurrency } from 'app/shared/model/currency.model';
import { Subscription } from 'rxjs';
import { CurrencyService } from 'app/entities/currency';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';

export class PeriodicElement {
  name: string;
  price: number;
  symbol: string;
}

@Component({
  selector: 'jhi-settings',
  templateUrl: './ExchangeRates.component.html'
})
export class ExchangeRatesComponent implements OnInit, OnDestroy {
  currencies: ICurrency[];
  currentAccount: any;
  eventSubscriber: Subscription;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  currenciesValues: PeriodicElement[] = [];
  dataSource = new MatTableDataSource(this.currenciesValues);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    protected currencyService: CurrencyService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.currencyService
      .query()
      .pipe(
        filter((res: HttpResponse<ICurrency[]>) => res.ok),
        map((res: HttpResponse<ICurrency[]>) => res.body)
      )
      .subscribe(
        (res: ICurrency[]) => {
          this.currencies = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCurrencies();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICurrency) {
    return item.id;
  }

  registerChangeInCurrencies() {
    this.eventSubscriber = this.eventManager.subscribe('currencyListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  onCurrencyChange(value) {
    this.currencies.forEach(e => {
      let periodicElement = new PeriodicElement();
      periodicElement.name = e.name;
      periodicElement.price = e.value;
      this.currenciesValues.push(periodicElement);
    });
  }
}
