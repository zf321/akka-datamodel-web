import { Category } from './category';
export interface CategoryTypeSchema {
  id: string;
  name: string;

}

export interface CategoryType {
  id: string;
  name: string;
}

export interface Category {
  endDate: Date | string;
  fromDate: Date | string;
  id: string;
  name: string;
}
