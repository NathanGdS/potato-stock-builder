import { IBuilder } from "./IBuilder";

export interface IPostgreBuilder extends IBuilder {
    limit(max: number): this;
}