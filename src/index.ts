const BUILDER_CHARACTERS = {
    SELECT: 'SELECT',
    FROM: 'FROM',
    AND: 'AND',
    WHERE: 'WHERE',
    LIMIT: 'LIMIT',
    NULL: 'NULL',
    EMPTY_SPACE: ' ',
    COMMA_AND_EMPTY_SPACE: ', '
}


class Builder {
    constructor(
        private query: string = ""
    ) { }

    select(data: Array<String>): this {
        let fields = '';
        data.forEach((e, index, arr) => {
            fields+= `${this.addDoubleComma(e as string)}`;
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
        this.query += `${BUILDER_CHARACTERS.FROM} ${this.addDoubleComma(data)} `;
        return this;
    }

    where(conditions: Array<any[]>): this {
        let fields = '';
        conditions.forEach((e, index, arr) => {
            const field = e[0].trim();
            const operator = e[1].trim()
            let value = e[2];

            if(value == undefined || value == null) {
                value = BUILDER_CHARACTERS.NULL;
            }

            const checkValue = (value:string) => {
                if(typeof value === 'string' && value !='NULL') {
                    return `${this.addSimpleComma(value)}`;
                }
                return value
            }

            fields += `${this.addDoubleComma(field)} ${operator} ${checkValue(value)}`
            fields = this.addSpace(fields);
            if(!(index +1 == arr.length)) {
                fields+= this.addSpace(BUILDER_CHARACTERS.AND);
            }
        })
        this.query += `${BUILDER_CHARACTERS.WHERE} ${fields}`;
        return this;
    }

    limit(max: number): this {
        this.query += `${BUILDER_CHARACTERS.LIMIT} ${max}`;
        return this;
    }

    private addSpace(data: string): string {
        return data+= BUILDER_CHARACTERS.EMPTY_SPACE;
    }

    private addDoubleComma(data: string): string {
        return `"${data}"`;
    }

    private addSimpleComma(data: string): string {
        return `'${data}'`;
    }

    getQuery() {
        return this.query;
    }

}


const query = new Builder();

const rawQuery = query
        .select(['name', 'address', 'phone'])
        .from('users')
        .where([
            ['name', '!=', 'potato'],
            ['address', 'IS NOT', null],
            ['phone', 'IS NOT'],
    ])
    .limit(10)
    .getQuery();
console.log(rawQuery)