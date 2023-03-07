export interface IBuilder {
    select(data: Array<String>): this;
    from(data: string): this;
    where(conditions: Array<any[]>): this;
    getQuery(): string;
}