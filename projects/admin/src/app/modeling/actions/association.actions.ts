import { Action } from '@ngrx/store';
import { Association } from '../models/association';

export enum ActionTypes {
  Create = '[Association] Create',
  Load = '[Association] Load',
  LoadSuccess = '[Association] Load Success',
}

export class Create implements Action {
  readonly type = ActionTypes.Create;
  constructor(public payload: Association) { }
}
export class Load implements Action {
  readonly type = ActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(public payload: Association[]) { }
}

export type ActionsUnion =
  | Create
  | Load
  | LoadSuccess
  ;
