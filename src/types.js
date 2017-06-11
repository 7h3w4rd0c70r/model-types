
export class StringType {
    _type = 'datatype'
    _name = 'String'
}

export class NumberType {
    _type = 'datatype'
    _name = 'Number'
}

export class BooleanType {
    _type = 'datatype'
    _name = 'Boolean'
}

export class ArrayType {
    _type = 'datatype'
    _name = 'Array'
}

export class DateType {
    _type = 'datatype'
    _name = 'Date'
}

export class MixedType {
    _type = 'datatype'
    _name = 'Mixed'
}

export class EnumType {
    _type = 'datatype'
    _name = 'enum'
}

export default {
    String: StringType,
    Number: NumberType,
    Date: DateType
}
