export interface CategoryTypeSchema {
  id: string;
  name: string;
  code: string;
  isSystem: boolean;
}

export interface CategoryType {
  id: string;
  name: string;
  parent: CategoryType;
  schema: CategoryTypeSchema;
  code: string;
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

export interface CategoryClassification {
  id: string;
  relateId: string;
  category: Category;
  fromDate: Date | string;
  endDate: Date | string;
  code: string;
  isSystem: boolean;
}
