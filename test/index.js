
import { Types, model as Model } from '../src/index.js'

const model = Model({
    name: new Types.String({ default: 'Patrik' }),
    age: Number,
    home: {
        address: String,
        city: String
    },
    admin: Boolean
})

console.log(model._schema.name.value)
