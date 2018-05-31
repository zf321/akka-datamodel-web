import { Association } from './../models/association';
import { Category } from './../models/category';

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



export const getCategoryTree = createSelector(
  getAllCategorys,
  getAllAssociations,
  (ca, as: Association[]) => {
    if (ca && as) {
      const d = {};
      as.forEach(c => d[c.to] = c.from);
      ca.forEach(c => c['parent'] = d[c.id]);
      return fromCategory.listToTree(ca, null);
    }
    return ca;
  }
);
