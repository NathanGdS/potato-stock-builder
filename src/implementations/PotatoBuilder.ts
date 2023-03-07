import { IPostgreBuilder } from "../interfaces/IPostgreBuilder";
import { PostgreSqlBuilder } from "./PostgreSqlBuilder";

export class PotatoBuilder<T> {
    private constructor(private readonly builder: T) {
        
    }

    static createBuilder<T>(builder: T) {
        return new PotatoBuilder(builder).builder;
    }

    static createPostgreBuilder() {
        return PotatoBuilder.createBuilder<IPostgreBuilder>(new PostgreSqlBuilder());
    }
}
