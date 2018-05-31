import { Action } from '@ngrx/store';
import { Category } from '../models/category';

export enum ActionTypes {
  Create = '[Category] Create',
  Load = '[Category] Load',
  LoadSuccess = '[Category] Load Success',
  Select = '[Category] Select',
  AddChild = '[Category] AddChild',
  Delete = '[Category] Delete',
}

export class Create implements Action {
  readonly type = ActionTypes.Create;
  constructor(public payload: Category) { }
}
export class Load implements Action {
  readonly type = ActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(public payload: Category[]) { }
}
export class Select implements Action {
  readonly type = ActionTypes.Select;

  constructor(public payload: string) { }
}
export class AddChild implements Action {
  readonly type = ActionTypes.AddChild;

  constructor(public id: string, public payload: Category) { }
}
export class Delete implements Action {
  readonly type = ActionTypes.Delete;

  constructor(public payload: Category) { }
}

export type ActionsUnion =
  | Create
  | Load
  | LoadSuccess
  | Select
  | Delete;
