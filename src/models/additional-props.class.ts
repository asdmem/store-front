export class AdditionalProps {
    constructor(
        public name: string = '',
        public type: Type = 0
    ) {}
}

enum Type {
    Numeric,
    String
}
