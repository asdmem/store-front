import { AdditionalProps } from './additional-props.class';

export class Category {
  constructor(
    public id: number = 0,
    public name: string = '',
    public products: any[] = [],
    public additionalProps: AdditionalProps[] = []
  ) {}
}
