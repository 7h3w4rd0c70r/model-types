
import Types from './types.js'

function parseSchema(obj) {
    let parsed = { }
    for (let i in obj) {
        if (typeof obj[i] === 'string') {
            const type = obj[i].toLowerCase()
            if (type === 'string') {
                parsed[i] = new Types.String()
            } else if (type === 'number') {
                parsed[i] = new Types.Number()
            } else if (type === 'boolean' || type === 'bool') {
                parsed[i] = new Types.Boolean()
            } else if (type === 'date') {
                parsed[i] = new Types.Date()
            } else if (type === 'array') {
                parsed[i] = new Types.Array()
            } else if (type === 'mixed' || type === 'any') {
                parsed[i] = new Types.Mixed()
            }
        } else if (typeof obj[i] === 'function') {
            if (obj[i].__type === 'DataType') {
                parsed[i] = new obj[i]()
            } else if (obj[i].name == 'String') {
                parsed[i] = new Types.String()
            } else if (obj[i].name === 'Number') {
                parsed[i] = new Types.Number()
            } else if (obj[i].name === 'Boolean') {
                parsed[i] = new Types.Boolean()
            } else if (obj[i].name === 'Date') {
                parsed[i] = new Types.Date()
            } else if (obj[i].name === 'Array') {
                parsed[i] = new Types.Array()
            } else {
                throw new Error('Invalid function used as type in model schema.')
            }
        } else if (obj[i].__type === 'datatype') {
            parsed[i] = obj[i]
        } else if (obj[i] instanceof Array) {
            if (obj[i].length == 0) {
                parsed[i] = new Types.Array()
            } else if (obj[i].length == 1) {
                parsed[i] = new Types.Array({ arraytype: obj[i][0] })
            } else {
                parsed[i] = new Types.Enum({ enums: obj[i] })
            }
        } else if (obj[i] instanceof Object) {
            if (obj[i].type) {
                if (obj[i].__type === 'datatype') {
                    parsed[i] = obj[i]
                } else if (typeof obj[i].type === 'string') {
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
                    } else if (type === 'enum') {
                        parsed[i] = new Types.Enum(obj[i])
                    }
                } else if (typeof obj[i].type === 'function') {
                    const type = obj[i].type.name
                    if (obj[i].type.__type === 'DataType') {
                        parsed[i] = new obj[i].type(obj[i])
                    } else if (type === 'String') {
                        parsed[i] = new Types.String(obj[i])
                    } else if (type === 'Number') {
                        parsed[i] = new Types.Number(obj[i])
                    } else if (type === 'Boolean') {
                        parsed[i] = new Types.Boolean(obj[i])
                    } else if (type === 'Array') {
                        parsed[i] = new Types.Array(obj[i])
                    } else if (type === 'Date') {
                        parsed[i] = new Types.Date(obj[i])
                    } else if (obj[i] instanceof Array) {
                        parsed[i] = new Types.Array(obj[i])
                    }
                } else {
                    parsed[i] = parseSchema(obj[i])
                }
            } else {
                parsed[i] = parseSchema(obj[i])
            }
        } else {
            throw new Error('Could not parse model schema.')
        }
    }
    return parsed
}

function parse(schema, state) {
    const parsed = { }
    if (!(state instanceof Object)) {
        throw new Error('model.parse expects a valid object')
    }
    for (let i in state) {
        if (schema[i]) {
            if (state[i] instanceof Object) {
                parsed[i] = parse(schema[i], state[i])
            } else {
                parsed[i] = schema[i].parse(state[i])
            }
        }
    }
    for (let i in schema) {
        if (parsed[i] === undefined) {
            if (schema[i].__type === 'datatype') {
                parsed[i] = schema[i].default
            } else if (schema[i] instanceof Object) {
                parsed[i] = parse(schema[i], { })
            }
        }
    }
    return parsed
}

function setter(obj, fields, value) {
    const updated = Object.assign({ }, obj)
    if (fields.length == 1) {
        updated[fields[0]] = value
    } else {
        updated[fields[0]] = setter(updated[fields[0]], fields.slice(1), value)
    }
    return updated
}

function createInitialState(schema) {
    const state = { }
    if (!(schema instanceof Object)) {
        throw new Error('createInitialState(schema) expects a valid object')
    }
    for (let i in schema) {
        if (schema[i].__type === 'datatype') {
            state[i] = schema[i].default
        } else if (schema[i] instanceof Object) {
            state[i] = createInitialState(schema[i])
        } else {
            throw new Error('Invalid propetry in model._schema')
        }
    }
    return state
}

class Model {
    _schema = { }
    _initialState = null
    _state = this._initialState

    get state() {
        return this.getState()
    }

    set state(state) {
        this.setState(state)
    }

    constructor(schema) {
        if (!(schema instanceof Object))
            throw new Error('Model expects a schema to be an object')
        this._schema = parseSchema(schema)
        this._state = createInitialState(this._schema)
    }

    set(field, value) {
        const fields = String(field).split('.')
        this._state = setter(this._state, fields, value)
    }

    get(field) {
        return String(field).split('.').reduce((o, i) => o[i], this._state)
    }

    setState(state) {
        this._state = this.parse(state)
    }

    getState() {
        return this._state
    }

    parse(state) {
        return parse(this._schema, state)
    }
}

function model(schema) {
    return new Model(schema)
}

export default model
