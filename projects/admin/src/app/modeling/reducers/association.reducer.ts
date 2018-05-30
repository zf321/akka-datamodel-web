import { LoadSuccess } from './../actions/association.actions';
import { Association } from './../models/association';
import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ActionsUnion, ActionTypes } from '../actions/association.actions';


export interface State extends EntityState<Association> {
  selectedId: string | null;
}


export const adapter: EntityAdapter<Association> = createEntityAdapter<Association>({
  selectId: (ass: Association) => ass.id,
  sortComparer: false,
});


export const initialState: State = adapter.getInitialState({
  selectedId: null
});

export function reducer(
  state = initialState,
  action: ActionsUnion
): State {
  switch (action.type) {
    case ActionTypes.LoadSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        selectedId: state.selectedId,
      });
    }
    default: {
      return state;
    }
  }
}


export const getSelectedId = (state: State) => state.selectedId;

