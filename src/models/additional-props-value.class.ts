import { Product } from './product.class';
import { AdditionalProps } from './additional-props.class';
export class AdditionalPropsValue {
  constructor(
    public id: number = 0,
    public value = '',
    public additionalPropsId = 0,
    public productId: number = 0,
    public product?: Product,
    public additionalProps?: AdditionalProps
  ) {}
}