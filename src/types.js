
class DataType {
    static __type = 'DataType'
    __type = 'datatype'
    _null = true

    constructor(args) {
        if (args.null === false) {
            this._null = false
        } else if (args.null && args.null !== null && args.null !== true)  {
            throw new Error('Invalid value for datatype.null; Can contain onlny true, false or undefined')
        }

        if (this._null === false && args.default === null) {
            throw new Error('Default value for DataType cannot be null when null is false')
        }
    }

    parse(unparsed) {
        if (this._null === false && unparsed === null) {
            throw new Error('Cannot parse value null if not null')
        }
        return unparsed
    }

    validate(value) {
        if (this._null === false && value === null)
            return false
        return true
    }

    get value() {
        return this._value
    }

    set value(value) {
        this._value = this.parse(value)
    }

    get default() {
        return this._default
    }

    set default(value) {
        throw new Error('Cannot set default value after initialization')
    }
}

export class ObjectId extends DataType {
    _name = 'ObjectId'
    _default = this._null ? null : ''
    _value = this._default

    constructor(args = { }) {
        super(args)

        if (args.default !== undefined) {
            if (this.validate(args.default)) {
                this._default = args.default
            } else {
                throw new Error('Invalid default value for StringType. Expected string, but got ' + typeof args.default)
            }
        }

        this._value = this._default
    }

    parse(unparsed) {
        unparsed = super.parse(unparsed)
        if (unparsed === undefined) {
            return this._default
        } else {
            if (typeof unparsed === 'number') {
                return unparsed
            } else {
                return String(unparsed)
            }
        }
    }

    validate(value) {
        return super.validate(value) ? (value === null || typeof value === 'string' || typeof value === 'number' ? true : false) : false
    }
}

export class StringType extends DataType {
    _name = 'String'
    _default = this._null ? null : ''
    _value = this._default

    constructor(args = { }) {
        super(args)

        if (args.default !== undefined) {
            if (this.validate(args.default)) {
                this._default = args.default
            } else {
                throw new Error('Invalid default value for StringType. Expected string, but got ' + typeof args.default)
            }
        }

        this._value = this._default
    }

    parse(unparsed) {
        unparsed = super.parse(unparsed)
        if (unparsed === undefined) {
            return this._default
        } else {
            return String(unparsed)
        }
    }

    validate(value) {
        return super.validate(value) ? (value === null || typeof value === 'string' ? true : false) : false
    }
}

export class NumberType extends DataType {
    _name = 'Number'
    _default = this._null ? null : 0
    _value = this._default

    constructor(args = { }) {
        super(args)

        if (args.default !== undefined) {
            if (typeof args.default === 'number' || args.default === null) {
                this._default = args.default
            } else {
                throw new Error('Invalid default value for NumberType. Expected number (or null, if notnull), but got ' + typeof args.default)
            }
        }

        this._value = this._default
    }

    parse(unparsed) {
        unparsed = super.parse(unparsed)
        if (unparsed === undefined) {
            return this._default
        } else if (isNaN(unparsed)) {
            throw new Error('Cannot parse a value ' + unparsed + '. Expected valid number, null (if not null) or undefined.')
        } else {
            return Number(unparsed)
        }
    }

    validate(value) {
        return super.validate(value) ? (value === null || typeof value === 'number' ? true : false) : false
    }
}

export class BooleanType extends DataType {
    _name = 'Boolean'
    _default = this._null ? null : false
    _value = this._default

    constructor(args = { }) {
        super(args)

        if (args.default !== undefined) {
            if (args.default === null || args.default === false || args.default === true) {
                this._default = args.default
            } else {
                throw new Error('Invalid default value for BooleanType. Expected boolean (or null, if notnull), but got ' + typeof args.default)
            }
        }

        this._value = this._default
    }

    parse(unparsed) {
        unparsed = super.parse(unparsed)
        if (unparsed === undefined) {
            return this._default
        } else {
            return isNaN(unparsed) ? Boolean(unparsed) : Boolean(Number(unparsed))
        }
    }

    validate(value) {
        return super.validate(value) ? (value === null || typeof value === 'boolean' ? true : false) : false
    }
}

export class ArrayType extends DataType {
    _name = 'Array'
    _arraytype = null

    constructor(args = { }) {
        super(args)

        if (args.arraytype) {
            if (typeof args.arraytype === 'string') {
                const type = args.arraytype.toLowerCase()
                if (type === 'string') this._arraytype = new StringType()
                else if (type === 'number') this._arraytype = new NumberType()
                else if (type === 'boolean' || type === 'bool') this._arraytype = new BooleanType()
                else if (type === 'date') this._arraytype = new DateType()
                else if (type === 'mixed' || type === 'any') this._arraytype = new MixedType()
                else throw new Error('Invalid string used as arraytype')
            } else if (typeof args.arraytype === 'function') {
                if (args.arraytype.name === 'String') this._arraytype = new StringType()
                else if (args.arraytype.name === 'Number') this._arraytype = new NumberType()
                else if (args.arraytype.name === 'Date') this._arraytype = new DateType()
                else if (args.arraytype.name === 'Boolean') this._arraytype = new BooleanType()
                else throw new Error('Invalid function used as arraytype')
            } else {
                throw new Error('Invalid arraytype passed to ArrayType arguments. Expected function (String, Number, Date or Boolean), string or DataType, but got ' + args.arraytype)
            }
        } else {
            this._arraytype = new MixedType()
        }

        if (args.default !== undefined) {
            if (args.default instanceof Array || args.default === null) {
                this._default = this.parse(args.default)
            } else {
                throw new Error('Invalid default value for ArrayType. Expected array (or null, if notnull), but got ' + typeof args.default)
            }
        }

        this._value = this._default
    }

    parse(unparsed) {
        unparsed = super.parse(unparsed)
        if (!(unparsed instanceof Array))
            throw new Error('ArrayType.parseArray expects an array')
        const parsed = [ ]
        for (let i in unparsed) {
            parsed.push(this._arraytype.parse(unparsed[i]))
        }
        return parsed
    }

    validate(value) {
        return super.validate(value) ? (value === null || value instanceof Array ? true : false) : false
    }
}

export class DateType extends DataType {
    _name = 'Date'
    _default = this._null ? null : new Date()

    constructor(args = { }) {
        super(args)

        if (args.default !== undefined) {
            this._default = this.parse(args.default)
        }

        this._value = this._default
    }

    parse(unparsed) {
        unparsed = super.parse(unparsed)
        if (unparsed) {
            if (unparsed instanceof Date) {
                return unparsed
            } else if (typeof unparsed === 'string') {
                return new Date(unparsed)
            } else if (!isNaN(unparsed)) {
                return new Date(Number(unparsed))
            } else {
                throw new Error('Cannot parse a value ' + unparsed + '. Expected valid date, string, number, null (if not null) or undefined.')
            }
        } else {
            return this._default
        }
    }

    validate(value) {
        return super.validate(value) ? (value === null || value instanceof Date ? true : false) : false
    }
}

export class MixedType extends DataType {
    _name = 'Mixed'
    _default = this._null ? null : { }

    constructor(args = { }) {
        super(args)

        if (args.default !== undefined) {
            this._default = this.parse(args.default)
        }

        this._value = this._default
    }

    parse(unparsed) {
        unparsed = super.parse(unparsed)
        return unparsed
    }

    validate(value) {
        return super.validate(value)
    }
}

export class EnumType extends DataType {
    _name = 'enum'
    _enums = [ ]

    constructor(args = { }) {
        super(args)

        const enums = args.enums
        if (!(enums instanceof Array) || enums.length == 0) {
            throw new Error('Enum constructor expects an array of at least one emun (strings/numbers)')
        }
        const type = typeof enums[0]
        if (type !== 'string' && type !== 'number') {
            throw new Error('Enum value expects a string or a number, but got ' + type)
        }
        enums.map(en => {
            if (type !== typeof en)
                throw new Error('All enum values must be the same type, either strings or numbers')
        })
        this._enums = enums

        if (args.default !== undefined) {
            this._default = this.parse(args.default)
        }

        this._value = this._default
    }

    parse(unparsed) {
        unparsed = super.parse(unparsed)
        if (unparsed === undefined) {
            if (this._null === false) {
                return this._enums[0]
            } else {
                return null
            }
        } else if (this._enums.indexOf(unparsed) == -1) {
            throw new Error('Value ' + unparsed + ' is not an enum.')
        } else {
            return unparsed
        }
    }

    validate(value) {
        return super.validate(value) ? (value === null || this._enums.indexOf(value) != -1 ? true : false) : false
    }
}

export default {
    ObjectId: ObjectId,
    String: StringType,
    Number: NumberType,
    Boolean: BooleanType,
    Array: ArrayType,
    Date: DateType,
    Mixed: MixedType,
    Enum: EnumType
}
