
import Types from './types.js'

function parseSchema(obj) {
    let parsed = { }
    for (let i in obj) {
        if (typeof obj[i] === 'string') {
            const type = obj[i].toLowerCase()
            if (type === 'string') parsed[i] = new Types.String()
            else if (type === 'number') parsed[i] = new Types.Number()
            else if (type === 'boolean' || type === 'bool') parsed[i] = new Types.Boolean()
            else if (type === 'date') parsed[i] = new Types.Date()
            else if (type === 'array') parsed[i] = new Types.Array()
            else if (type === 'mixed' || type === 'any') parsed[i] = new Types.Mixed()
        } else if (typeof obj[i] === 'function') {
            if (obj[i].__type === 'DataType') parsed[i] = new obj[i]()
            else if (obj[i].name == 'String') parsed[i] = new Types.String()
            else if (obj[i].name === 'Number') parsed[i] = new Types.Number()
            else if (obj[i].name === 'Boolean') parsed[i] = new Types.Boolean()
            else if (obj[i].name === 'Date') parsed[i] = new Types.Date()
            else if (obj[i].name === 'Array') parsed[i] = new Types.Array()
            else throw new Error('Invalid function used as type in model schema.')
        } else if (obj[i].__type === 'datatype') {
            parsed[i] = obj[i]
        } else if (obj[i] instanceof Object) {
            if (obj[i].type) {
                if (typeof obj[i].type === 'string') {
                    const type = obj[i].type.toLowerCase()
                    if (type === 'string') {
                        parsed[i] = new Types.String(obj[i])
                    } else if (type === 'number') {
                        parsed[i] = new Types.Number(obj[i])
                    } else if (type === 'boolean' || type === 'bool') {
                        parsed[i] = new Types.Boolean(obj[i])
                    } else if (type === 'date') {
                        parsed[i] = new Types.Date(obj[i])
                    } else if (type === 'array') {
                        parsed[i] = new Types.Array(obj[i])
                    } else if (type === 'mixed' || type === 'any') {
                        parsed[i] = new Types.Mixed(obj[i])
                    }
                } else if (typeof obj[i].type === 'function') {
                    const type = obj[i].name
                    if (type === 'string') {
                        parsed[i] = new Types.String()
                    } else if (type === 'number') {
                        parsed[i] = new Types.Number()
                    } else if (type === 'boolean') {
                        parsed[i] = new Types.Boolean()
                    } else if (type === 'date') {
                        parsed[i] = new Types.Date()
                    } else if (obj[i] instanceof Array) {
                        parsed[i] = new Types.Array()
                    }
                }
            } else {
                parsed[i] = parseSchema(obj[i])
            }
        } else if (obj[i] instanceof Array) {
            if (obj[i].length == 0) {
                parsed[i] = new Types.Array()
            } else if (obj[i].length == 1) {
                parsed[i] = new Types.Array(obj[i][0])
            } else {
                parsed[i] = new Types.Enum({ enums: obj[i] })
            }
        } else {
            throw new Error('Could not parse model schema.')
        }
    }
    return parsed
}

class Model {
    _schema = null

    constructor(schema) {
        if (!(schema instanceof Object))
            throw new Error('Model expects a schema to be an object')
        this._schema = parseSchema(schema)
    }
}

function model(schema) {
    return new Model(schema)
}

export default model
