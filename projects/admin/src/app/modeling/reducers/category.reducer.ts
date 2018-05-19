import { LoadSchemaSuccess } from './../actions/category.actions';
import { CategoryTypeSchema } from './../models/category';
import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ActionsUnion, ActionTypes } from '../actions/category.actions';


export interface State extends EntityState<CategoryTypeSchema> {
}


export const adapter: EntityAdapter<CategoryTypeSchema> = createEntityAdapter<CategoryTypeSchema>({
  selectId: (schema: CategoryTypeSchema) => schema.id,
  sortComparer: false,
});


export const initialState: State = adapter.getInitialState({
});

export function reducer(
  state = initialState,
  action: ActionsUnion
): State {
  switch (action.type) {
    case ActionTypes.LoadSchemaSuccess: {
      return adapter.addMany(action.payload, {
        ...state
      });
    }

    default: {
      return state;
    }
  }
}
