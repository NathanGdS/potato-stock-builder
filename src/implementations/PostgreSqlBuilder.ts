import { BUILDER_CHARACTERS } from "../constants";
import { IPostgreBuilder } from "../interfaces/IPostgreBuilder";
import { addDoubleComma } from "../utils/addDoubleComma";
import { addEmptySpace } from "../utils/addEmptySpace";
import { addSimpleComma } from "../utils/addSimpleComma";

export class PostgreSqlBuilder implements IPostgreBuilder {
    constructor(
        private query: string = ""
    ) { }

    select(data: Array<String>): this {
        let fields = '';
        data.forEach((e, index, arr) => {
            fields+= `${addDoubleComma(e as string)}`;
            if(index +1 == arr.length) {
                fields+= BUILDER_CHARACTERS.EMPTY_SPACE;
            } else {
                fields+= BUILDER_CHARACTERS.COMMA_AND_EMPTY_SPACE;
            }
        })
        this.query += `${BUILDER_CHARACTERS.SELECT} ${fields}`;
        return this;
    }

    from(data: string): this {
        this.query += `${BUILDER_CHARACTERS.FROM} ${addDoubleComma(data)} `;
        return this;
    }

    where(conditions: Array<any[]>): this {
        let fields = '';
        conditions.forEach((e, index, arr) => {
            const field = e[0].trim();
            const operator = e[1].trim();
            let value = e[2];

            if(value == undefined || value == null) {
                value = BUILDER_CHARACTERS.NULL;
            }

            const checkValue = (value:string) => {
                if(typeof value === 'string' && value != BUILDER_CHARACTERS.NULL) {
                    return `${addSimpleComma(value)}`;
                }
                return value;
            }

            fields += `${addDoubleComma(field)} ${operator} ${checkValue(value)}`
            fields = addEmptySpace(fields);
            if(!(index +1 == arr.length)) {
                fields+= addEmptySpace(BUILDER_CHARACTERS.AND);
            }
        })
        this.query += `${BUILDER_CHARACTERS.WHERE} ${fields}`;
        return this;
    }

    limit(max: number): this {
        this.query += `${BUILDER_CHARACTERS.LIMIT} ${max}`;
        return this;
    }

    getQuery(): string {
        const oldQuery = this.query;
        this.reset();
        return oldQuery;
    }

    private reset(): void {
        this.query = '';
    }

}
