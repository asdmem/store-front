import { AdditionalPropsValue } from './additional-props-value.class';
import { Category } from './category.class';
export class Product {
  constructor(
    public id: number = 0,
    public name: string = '',
    public detail: string = '',
    public price: number = 0,
    public categoryId?: number,
    public additionalPropsValues?: AdditionalPropsValue[],
    public category?: Category,
  ) {}
}
