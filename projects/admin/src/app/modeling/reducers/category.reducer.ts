import { LoadSuccess } from './../actions/category.actions';
import { Category } from './../models/category';
import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ActionsUnion, ActionTypes } from '../actions/category.actions';


export interface State extends EntityState<Category> {
  selectedId: string | null;
}


export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  selectId: (schema: Category) => schema.id,
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
    case ActionTypes.Select: {
      return {
        ...state,
        selectedId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}


export const getSelectedId = (state: State) => state.selectedId;


export function listToTree(data, options) {
  options = options || {};
  const ID_KEY = options.idKey || 'id';
  const PARENT_KEY = options.parentKey || 'parent';
  const CHILDREN_KEY = options.childrenKey || 'children';

  const tree = [];
  const childrenOf = {};
  let item, id, parentId;

  for (let i = 0, length = data.length; i < length; i++) {
    item = data[i];
    id = item[ID_KEY];
    parentId = item[PARENT_KEY] || 0;
    // every item may have children
    childrenOf[id] = childrenOf[id] || [];
    // init its children
    item[CHILDREN_KEY] = childrenOf[id];
    if (parentId !== 0) {
      // init its parent's children object
      childrenOf[parentId] = childrenOf[parentId] || [];
      // push it into its parent's children object
      childrenOf[parentId].push(item);
    } else {
      tree.push(item);
    }
  }

  return tree;
}
