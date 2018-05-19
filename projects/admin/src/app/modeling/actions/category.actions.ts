import { Action } from '@ngrx/store';
import { CategoryTypeSchema } from '../models/category';

export enum ActionTypes {
  CreateSchema = '[Category] CreateSchema',
  LoadSchema = '[Category] LoadSchema',
  LoadSchemaSuccess = '[Category] LoadSchema Success',
  Select = '[Category] Select',
}

export class CreateSchema implements Action {
  readonly type = ActionTypes.CreateSchema;
  constructor(public payload: CategoryTypeSchema) { }
}
export class LoadSchema implements Action {
  readonly type = ActionTypes.LoadSchema;
}

export class LoadSchemaSuccess implements Action {
  readonly type = ActionTypes.LoadSchemaSuccess;
  constructor(public payload: CategoryTypeSchema[]) { }
}
export class Select implements Action {
  readonly type = ActionTypes.Select;

  constructor(public payload: string) { }
}

export type ActionsUnion =
  | CreateSchema
  | LoadSchema
  | LoadSchemaSuccess
  | Select;
