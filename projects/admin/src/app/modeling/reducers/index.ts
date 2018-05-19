
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { concat } from 'rxjs/observable/concat';
import * as fromRoot from '../../reducers';

import * as fromCategory from './category.reducer';

export interface ModelingState {
  category: fromCategory.State;
}

export interface State extends fromRoot.State {
  modeling: ModelingState;
}

export const reducers: ActionReducerMap<ModelingState> = {
  category: fromCategory.reducer,
};
export const getModelingState = createFeatureSelector<ModelingState>('modeling');

/**
 * category
 */
export const getCategoryState = createSelector(
  getModelingState,
  state => state.category
);
export const {
  selectIds: getCategoryIds,
  selectEntities: getCategoryEntities,
  selectAll: getAllCategorys,
  selectTotal: getTotalCategorys,
} = fromCategory.adapter.getSelectors(getCategoryState);
