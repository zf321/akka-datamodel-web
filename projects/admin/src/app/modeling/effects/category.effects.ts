import { HttpClient } from '@angular/common/http';
import { Category } from './../models/category';

import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as act from '../actions/category.actions';
import * as actAssociation from '../actions/association.actions';
import { ODataServiceFactory, ODataService } from 'odata-lib';
import { map, switchMap, startWith } from 'rxjs/operators';


@Injectable()
export class CategoryEffects {
  private odata: ODataService<Category>;
  baseUrl = 'http://localhost:9000/api/';
  constructor(private actions$: Actions, private odataFactory: ODataServiceFactory, private http: HttpClient) {
    this.odata = odataFactory.CreateService<Category>('category/');
  }


  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<act.Load>(act.ActionTypes.Load),
    startWith(new act.Load()),
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

  @Effect()
  addChild$: Observable<Action> = this.actions$.pipe(
    ofType<act.AddChild>(act.ActionTypes.AddChild),
    switchMap(payload => {
      return this.http.post(this.baseUrl + 'category/' + payload.id + '', payload.payload)
        .map(e => new act.Load())
        .map(e => new actAssociation.Load());
    }));
}
