import { PotatoBuilder } from "./implementations/PotatoBuilder";

const query = PotatoBuilder.createPostgreBuilder();

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