import { HttpClient } from '@angular/common/http';
import { Association } from './../models/association';

import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as act from '../actions/association.actions';
import { ODataServiceFactory, ODataService } from 'odata-lib';
import { map, switchMap } from 'rxjs/operators';


@Injectable()
export class AssociationEffects {
  private odata: ODataService<Association>;
  constructor(private actions$: Actions, private odataFactory: ODataServiceFactory, private http: HttpClient) {
    this.odata = odataFactory.CreateService<Association>('association/');
  }


  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<act.Load>(act.ActionTypes.Load),
    // .startWith(new act.GetAllAction())
    switchMap(query => {
      return this.odata.Query().Exec()
        .map(entities => new act.LoadSuccess(entities));
    }));

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType<act.Create>(act.ActionTypes.Create),
    map(action => action.payload),
    switchMap(payload => {
      return this.odata.Post(payload)
        .map(entity => new act.Load());
    }));

}
