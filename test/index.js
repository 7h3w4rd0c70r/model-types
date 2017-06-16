
import { Types, model as Model } from '../src/index.js'

const model = Model({
    name: new Types.String({ default: 'Patrik' }),
    age: Number,
    home: {
        address: String,
        city: String
    },
    admin: Boolean,
    role: {
        type: 'enum',
        enums: ['admin','user'],
        default: 'user',
        null: false
    }
})

console.log(model.getState())
