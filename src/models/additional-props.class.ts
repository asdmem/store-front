export class AdditionalProps {
    constructor(
        public id = 0,
        public name: string = '',
        public type: Type = 0
    ) {}
}

export enum Type {
    Numeric,
    String
}
