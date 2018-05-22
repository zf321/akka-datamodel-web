import { LoadSchemaSuccess } from './../actions/category.actions';
import { CategoryTypeSchema } from './../models/category';
import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ActionsUnion, ActionTypes } from '../actions/category.actions';


export interface State extends EntityState<CategoryTypeSchema> {
  selectedSchemaId: string | null;
}


export const adapter: EntityAdapter<CategoryTypeSchema> = createEntityAdapter<CategoryTypeSchema>({
  selectId: (schema: CategoryTypeSchema) => schema.id,
  sortComparer: false,
});


export const initialState: State = adapter.getInitialState({
  selectedSchemaId: null
});

export function reducer(
  state = initialState,
  action: ActionsUnion
): State {
  switch (action.type) {
    case ActionTypes.LoadSchemaSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        selectedSchemaId: state.selectedSchemaId,
      });
    }
    case ActionTypes.SelectSchema: {
      return {
        ...state,
        selectedSchemaId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}


export const getSelectedSchemaId = (state: State) => state.selectedSchemaId;
