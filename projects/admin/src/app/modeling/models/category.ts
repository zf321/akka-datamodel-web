import { Category } from './category';
export class CategoryTypeSchema {
  id: string;
  name: string;
  code: string;
  types: CategoryType[];
  isSystem: boolean;

  constructor(){
    id =
  }
}

export interface CategoryType {
  id: string;
  name: string;
  code: string;
  parent: CategoryType;
  schema: CategoryTypeSchema;
  categories: Category[];
  isSystem: boolean;
}

export interface Category {
  type: CategoryType;
  endDate: Date | string;
  fromDate: Date | string;
  id: string;
  name: string;
  parent: Category;
  code: string;
  isSystem: boolean;
}
