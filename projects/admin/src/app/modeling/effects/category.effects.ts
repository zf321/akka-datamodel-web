import { HttpClient } from '@angular/common/http';
import { CategoryTypeSchema, CategoryType } from './../models/category';

import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as act from '../actions/category.actions';
import { ODataServiceFactory, ODataService } from 'odata-lib';
import { map, switchMap } from 'rxjs/operators';


@Injectable()
export class CategoryEffects {
  private odataSchema: ODataService<CategoryTypeSchema>;
  baseUrl = 'http://localhost:9000/api/';
  constructor(private actions$: Actions, private odataFactory: ODataServiceFactory, private http: HttpClient) {
    this.odataSchema = odataFactory.CreateService<CategoryTypeSchema>('category/');
  }


  @Effect()
  loadSchema$: Observable<Action> = this.actions$.pipe(
    ofType<act.LoadSchema>(act.ActionTypes.LoadSchema),
    // .startWith(new act.GetAllAction())
    switchMap(query => {
      return this.odataSchema.Query().Exec()
        .map(entities => new act.LoadSchemaSuccess(entities));
    }));

  @Effect()
  createSchema$: Observable<Action> = this.actions$.pipe(
    ofType<act.CreateSchema>(act.ActionTypes.CreateSchema),
    map(action => action.payload),
    switchMap(payload => {
      return this.odataSchema.Post(payload)
        .map(entity => new act.LoadSchema());
    }));

  @Effect()
  addType$: Observable<Action> = this.actions$.pipe(
    ofType<act.AddType>(act.ActionTypes.AddType),
    switchMap(payload => {
      return this.http.post(this.baseUrl + 'category/' + payload.schemaId + '/type', payload.payload)
        .map(entity => new act.LoadSchema());
    }));

}
