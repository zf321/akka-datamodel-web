import { Association } from './../models/association';
import { CategoryTypeSchema } from './../models/category';

import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { concat } from 'rxjs/observable/concat';
import * as fromRoot from '../../reducers';

import * as fromCategory from './category.reducer';
import * as fromAssociation from './association.reducer';

export interface ModelingState {
  category: fromCategory.State;
  association: fromAssociation.State;
}

export interface State extends fromRoot.State {
  modeling: ModelingState;
}

export const reducers: ActionReducerMap<ModelingState> = {
  category: fromCategory.reducer,
  association: fromAssociation.reducer,
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

export const getSelectedSchemaId = createSelector(
  getCategoryState,
  fromCategory.getSelectedSchemaId
);

export const getSelectedSchema = createSelector(
  getCategoryState,
  getSelectedSchemaId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  });

/**
 * association
 */
export const getAssociationState = createSelector(
  getModelingState,
  state => state.association
);

export const {
  selectIds: getAssociationIds,
  selectEntities: getAssociationEntities,
  selectAll: getAllAssociations,
  selectTotal: getTotalAssociations,
} = fromAssociation.adapter.getSelectors(getAssociationState);
