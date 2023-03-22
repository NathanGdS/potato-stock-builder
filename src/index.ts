import { PotatoBuilder } from "./implementations/PotatoBuilder";

const builder = PotatoBuilder.createPostgreBuilder();

const query1 = builder
        .select(['name', 'address', 'phone'])
        .from('users')
        .where([
            ['name', '!=', 'potato'],
            ['address', 'IS NOT', null],
            ['phone', 'IS NOT'],
    ])
    .limit(10)
    .getQuery();

const query2 = builder
            .select(['name'])
            .from('users')
            .getQuery();


const query3 = builder
                .select()
                .from('users')
                .limit(10)
                .getQuery()

console.log(query1)
console.log(query2)
console.log(query3)