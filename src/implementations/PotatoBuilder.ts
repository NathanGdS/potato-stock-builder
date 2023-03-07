import { PostgreSqlBuilder } from "./PostgreSqlBuilder";

export class PotatoBuilder<T> {
    private constructor(private readonly builder: T) {
        
    }

    static createBuilder<T>(builder: T) {
        return new PotatoBuilder(builder).builder;
    }

    static createPostgreBuilder() {
        return new PotatoBuilder(new PostgreSqlBuilder()).builder;
    }
}
