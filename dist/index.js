'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var DataType = function () {
    function DataType(args) {
        classCallCheck(this, DataType);
        this.__type = 'datatype';
        this._null = true;

        if (args.null === false) {
            this._null = false;
        } else if (args.null && args.null !== null && args.null !== true) {
            throw new Error('Invalid value for datatype.null; Can contain onlny true, false or undefined');
        }

        if (this._null === false && args.default === null) {
            throw new Error('Default value for DataType cannot be null when null is false');
        }
    }

    createClass(DataType, [{
        key: 'parse',
        value: function parse(unparsed) {
            if (this._null === false && unparsed === null) {
                throw new Error('Cannot parse value null if not null');
            }
            return unparsed;
        }
    }, {
        key: 'validate',
        value: function validate(value) {
            if (this._null === false && value === null) return false;
            return true;
        }
    }, {
        key: 'value',
        get: function get$$1() {
            return this._value;
        },
        set: function set$$1(value) {
            this._value = this.parse(value);
        }
    }, {
        key: 'default',
        get: function get$$1() {
            return this._default;
        },
        set: function set$$1(value) {
            throw new Error('Cannot set default value after initialization');
        }
    }]);
    return DataType;
}();

DataType.__type = 'DataType';


var StringType = function (_DataType) {
    inherits(StringType, _DataType);

    function StringType() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, StringType);

        var _this = possibleConstructorReturn(this, (StringType.__proto__ || Object.getPrototypeOf(StringType)).call(this, args));

        _this._name = 'String';
        _this._default = _this._null ? null : '';
        _this._value = _this._default;


        if (args.default !== undefined) {
            if (typeof args.default === 'string' || args.default === null) {
                _this._default = args.default;
            } else {
                throw new Error('Invalid default value for StringType. Expected string, but got ' + _typeof(args.default));
            }
        }

        _this._value = _this._default;
        return _this;
    }

    createClass(StringType, [{
        key: 'parse',
        value: function parse(unparsed) {
            unparsed = get(StringType.prototype.__proto__ || Object.getPrototypeOf(StringType.prototype), 'parse', this).call(this, unparsed);
            if (unparsed === undefined) {
                return this._default;
            } else {
                return String(unparsed);
            }
        }
    }, {
        key: 'validate',
        value: function validate(value) {
            return get(StringType.prototype.__proto__ || Object.getPrototypeOf(StringType.prototype), 'validate', this).call(this, value) ? value === null || typeof value === 'string' ? true : false : false;
        }
    }]);
    return StringType;
}(DataType);

var NumberType = function (_DataType2) {
    inherits(NumberType, _DataType2);

    function NumberType() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, NumberType);

        var _this2 = possibleConstructorReturn(this, (NumberType.__proto__ || Object.getPrototypeOf(NumberType)).call(this, args));

        _this2._name = 'Number';
        _this2._default = _this2._null ? null : 0;
        _this2._value = _this2._default;


        if (args.default !== undefined) {
            if (typeof args.default === 'number' || args.default === null) {
                _this2._default = args.default;
            } else {
                throw new Error('Invalid default value for NumberType. Expected number (or null, if notnull), but got ' + _typeof(args.default));
            }
        }

        _this2._value = _this2._default;
        return _this2;
    }

    createClass(NumberType, [{
        key: 'parse',
        value: function parse(unparsed) {
            unparsed = get(NumberType.prototype.__proto__ || Object.getPrototypeOf(NumberType.prototype), 'parse', this).call(this, unparsed);
            if (unparsed === undefined) {
                return this._default;
            } else if (isNaN(unparsed)) {
                throw new Error('Cannot parse a value ' + unparsed + '. Expected valid number, null (if not null) or undefined.');
            } else {
                return Number(unparsed);
            }
        }
    }, {
        key: 'validate',
        value: function validate(value) {
            return get(NumberType.prototype.__proto__ || Object.getPrototypeOf(NumberType.prototype), 'validate', this).call(this, value) ? value === null || typeof value === 'number' ? true : false : false;
        }
    }]);
    return NumberType;
}(DataType);

var BooleanType = function (_DataType3) {
    inherits(BooleanType, _DataType3);

    function BooleanType() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, BooleanType);

        var _this3 = possibleConstructorReturn(this, (BooleanType.__proto__ || Object.getPrototypeOf(BooleanType)).call(this, args));

        _this3._name = 'Boolean';
        _this3._default = _this3._null ? null : false;
        _this3._value = _this3._default;


        if (args.default !== undefined) {
            if (args.default === null || args.default === false || args.default === true) {
                _this3._default = args.default;
            } else {
                throw new Error('Invalid default value for BooleanType. Expected boolean (or null, if notnull), but got ' + _typeof(args.default));
            }
        }

        _this3._value = _this3._default;
        return _this3;
    }

    createClass(BooleanType, [{
        key: 'parse',
        value: function parse(unparsed) {
            unparsed = get(BooleanType.prototype.__proto__ || Object.getPrototypeOf(BooleanType.prototype), 'parse', this).call(this, unparsed);
            if (unparsed === undefined) {
                return this._default;
            } else {
                return isNaN(unparsed) ? Boolean(unparsed) : Boolean(Number(unparsed));
            }
        }
    }, {
        key: 'validate',
        value: function validate(value) {
            return get(BooleanType.prototype.__proto__ || Object.getPrototypeOf(BooleanType.prototype), 'validate', this).call(this, value) ? value === null || typeof value === 'boolean' ? true : false : false;
        }
    }]);
    return BooleanType;
}(DataType);

var ArrayType = function (_DataType4) {
    inherits(ArrayType, _DataType4);

    function ArrayType() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, ArrayType);

        var _this4 = possibleConstructorReturn(this, (ArrayType.__proto__ || Object.getPrototypeOf(ArrayType)).call(this, args));

        _this4._name = 'Array';
        _this4._arraytype = null;


        if (args.arraytype) {
            if (typeof args.arraytype === 'string') {
                var type = args.arraytype.toLowerCase();
                if (type === 'string') _this4._arraytype = new StringType();else if (type === 'number') _this4._arraytype = new NumberType();else if (type === 'boolean' || type === 'bool') _this4._arraytype = new BooleanType();else if (type === 'date') _this4._arraytype = new DateType();else if (type === 'mixed' || type === 'any') _this4._arraytype = new MixedType();else throw new Error('Invalid string used as arraytype');
            } else if (typeof args.arraytype === 'function') {
                if (args.arraytype.name === 'String') _this4._arraytype = new StringType();else if (args.arraytype.name === 'Number') _this4._arraytype = new NumberType();else if (args.arraytype.name === 'Date') _this4._arraytype = new DateType();else if (args.arraytype.name === 'Boolean') _this4._arraytype = new BooleanType();else throw new Error('Invalid function used as arraytype');
            } else {
                throw new Error('Invalid arraytype passed to ArrayType arguments. Expected function (String, Number, Date or Boolean), string or DataType, but got ' + args.arraytype);
            }
        } else {
            _this4._arraytype = new MixedType();
        }

        if (args.default !== undefined) {
            if (args.default instanceof Array || args.default === null) {
                _this4._default = _this4.parse(args.default);
            } else {
                throw new Error('Invalid default value for ArrayType. Expected array (or null, if notnull), but got ' + _typeof(args.default));
            }
        }

        _this4._value = _this4._default;
        return _this4;
    }

    createClass(ArrayType, [{
        key: 'parse',
        value: function parse(unparsed) {
            unparsed = get(ArrayType.prototype.__proto__ || Object.getPrototypeOf(ArrayType.prototype), 'parse', this).call(this, unparsed);
            if (!(unparsed instanceof Array)) throw new Error('ArrayType.parseArray expects an array');
            var parsed = [];
            for (var i in unparsed) {
                parsed.push(this._arraytype.parse(unparsed[i]));
            }
            return parsed;
        }
    }, {
        key: 'validate',
        value: function validate(value) {
            return get(ArrayType.prototype.__proto__ || Object.getPrototypeOf(ArrayType.prototype), 'validate', this).call(this, value) ? value === null || value instanceof Array ? true : false : false;
        }
    }]);
    return ArrayType;
}(DataType);

var DateType = function (_DataType5) {
    inherits(DateType, _DataType5);

    function DateType() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, DateType);

        var _this5 = possibleConstructorReturn(this, (DateType.__proto__ || Object.getPrototypeOf(DateType)).call(this, args));

        _this5._name = 'Date';
        _this5._default = _this5._null ? null : new Date();


        if (args.default !== undefined) {
            _this5._default = _this5.parse(args.default);
        }

        _this5._value = _this5._default;
        return _this5;
    }

    createClass(DateType, [{
        key: 'parse',
        value: function parse(unparsed) {
            unparsed = get(DateType.prototype.__proto__ || Object.getPrototypeOf(DateType.prototype), 'parse', this).call(this, unparsed);
            if (unparsed) {
                if (unparsed instanceof Date) {
                    return unparsed;
                } else if (typeof unparsed === 'string') {
                    return new Date(unparsed);
                } else if (!isNaN(unparsed)) {
                    return new Date(Number(unparsed));
                } else {
                    throw new Error('Cannot parse a value ' + unparsed + '. Expected valid date, string, number, null (if not null) or undefined.');
                }
            } else {
                return this._default;
            }
        }
    }, {
        key: 'validate',
        value: function validate(value) {
            return get(DateType.prototype.__proto__ || Object.getPrototypeOf(DateType.prototype), 'validate', this).call(this, value) ? value === null || value instanceof Date ? true : false : false;
        }
    }]);
    return DateType;
}(DataType);

var MixedType = function (_DataType6) {
    inherits(MixedType, _DataType6);

    function MixedType() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, MixedType);

        var _this6 = possibleConstructorReturn(this, (MixedType.__proto__ || Object.getPrototypeOf(MixedType)).call(this, args));

        _this6._name = 'Mixed';
        _this6._default = _this6._null ? null : {};


        if (args.default !== undefined) {
            _this6._default = _this6.parse(args.default);
        }

        _this6._value = _this6._default;
        return _this6;
    }

    createClass(MixedType, [{
        key: 'parse',
        value: function parse(unparsed) {
            unparsed = get(MixedType.prototype.__proto__ || Object.getPrototypeOf(MixedType.prototype), 'parse', this).call(this, unparsed);
            return unparsed;
        }
    }, {
        key: 'validate',
        value: function validate(value) {
            return get(MixedType.prototype.__proto__ || Object.getPrototypeOf(MixedType.prototype), 'validate', this).call(this, value);
        }
    }]);
    return MixedType;
}(DataType);

var EnumType = function (_DataType7) {
    inherits(EnumType, _DataType7);

    function EnumType() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, EnumType);

        var _this7 = possibleConstructorReturn(this, (EnumType.__proto__ || Object.getPrototypeOf(EnumType)).call(this, args));

        _this7._name = 'enum';
        _this7._enums = [];


        var enums = args.enums;
        if (!(enums instanceof Array) || enums.length == 0) {
            throw new Error('Enum constructor expects an array of at least one emun (strings/numbers)');
        }
        var type = _typeof(enums[0]);
        if (type !== 'string' && type !== 'number') {
            throw new Error('Enum value expects a string or a number, but got ' + type);
        }
        enums.map(function (en) {
            if (type !== (typeof en === 'undefined' ? 'undefined' : _typeof(en))) throw new Error('All enum values must be the same type, either strings or numbers');
        });
        _this7._enums = enums;

        if (args.default !== undefined) {
            _this7._default = _this7.parse(args.default);
        }

        _this7._value = _this7._default;
        return _this7;
    }

    createClass(EnumType, [{
        key: 'parse',
        value: function parse(unparsed) {
            unparsed = get(EnumType.prototype.__proto__ || Object.getPrototypeOf(EnumType.prototype), 'parse', this).call(this, unparsed);
            if (unparsed === undefined) {
                if (this._null === false) {
                    return this._enums[0];
                } else {
                    return null;
                }
            } else if (this._enums.indexOf(unparsed) == -1) {
                throw new Error('Value ' + unparsed + ' is not an enum.');
            } else {
                return unparsed;
            }
        }
    }, {
        key: 'validate',
        value: function validate(value) {
            return get(EnumType.prototype.__proto__ || Object.getPrototypeOf(EnumType.prototype), 'validate', this).call(this, value) ? value === null || this._enums.indexOf(value) != -1 ? true : false : false;
        }
    }]);
    return EnumType;
}(DataType);

var Types = {
    String: StringType,
    Number: NumberType,
    Boolean: BooleanType,
    Array: ArrayType,
    Date: DateType,
    Mixed: MixedType,
    Enum: EnumType
};

function parseSchema(obj) {
    var parsed = {};
    for (var i in obj) {
        if (typeof obj[i] === 'string') {
            var type = obj[i].toLowerCase();
            if (type === 'string') {
                parsed[i] = new Types.String();
            } else if (type === 'number') {
                parsed[i] = new Types.Number();
            } else if (type === 'boolean' || type === 'bool') {
                parsed[i] = new Types.Boolean();
            } else if (type === 'date') {
                parsed[i] = new Types.Date();
            } else if (type === 'array') {
                parsed[i] = new Types.Array();
            } else if (type === 'mixed' || type === 'any') {
                parsed[i] = new Types.Mixed();
            }
        } else if (typeof obj[i] === 'function') {
            if (obj[i].__type === 'DataType') {
                parsed[i] = new obj[i]();
            } else if (obj[i].name == 'String') {
                parsed[i] = new Types.String();
            } else if (obj[i].name === 'Number') {
                parsed[i] = new Types.Number();
            } else if (obj[i].name === 'Boolean') {
                parsed[i] = new Types.Boolean();
            } else if (obj[i].name === 'Date') {
                parsed[i] = new Types.Date();
            } else if (obj[i].name === 'Array') {
                parsed[i] = new Types.Array();
            } else {
                throw new Error('Invalid function used as type in model schema.');
            }
        } else if (obj[i].__type === 'datatype') {
            parsed[i] = obj[i];
        } else if (obj[i] instanceof Array) {
            if (obj[i].length == 0) {
                parsed[i] = new Types.Array();
            } else if (obj[i].length == 1) {
                parsed[i] = new Types.Array({ arraytype: obj[i][0] });
            } else {
                parsed[i] = new Types.Enum({ enums: obj[i] });
            }
        } else if (obj[i] instanceof Object) {
            if (obj[i].type) {
                if (obj[i].__type === 'datatype') {
                    parsed[i] = obj[i];
                } else if (typeof obj[i].type === 'string') {
                    var _type = obj[i].type.toLowerCase();
                    if (_type === 'string') {
                        parsed[i] = new Types.String(obj[i]);
                    } else if (_type === 'number') {
                        parsed[i] = new Types.Number(obj[i]);
                    } else if (_type === 'boolean' || _type === 'bool') {
                        parsed[i] = new Types.Boolean(obj[i]);
                    } else if (_type === 'date') {
                        parsed[i] = new Types.Date(obj[i]);
                    } else if (_type === 'array') {
                        parsed[i] = new Types.Array(obj[i]);
                    } else if (_type === 'mixed' || _type === 'any') {
                        parsed[i] = new Types.Mixed(obj[i]);
                    } else if (_type === 'enum') {
                        parsed[i] = new Types.Enum(obj[i]);
                    }
                } else if (typeof obj[i].type === 'function') {
                    var _type2 = obj[i].type.name;
                    if (obj[i].type.__type === 'DataType') {
                        parsed[i] = new obj[i].type(obj[i]);
                    } else if (_type2 === 'String') {
                        parsed[i] = new Types.String(obj[i]);
                    } else if (_type2 === 'Number') {
                        parsed[i] = new Types.Number(obj[i]);
                    } else if (_type2 === 'Boolean') {
                        parsed[i] = new Types.Boolean(obj[i]);
                    } else if (_type2 === 'Array') {
                        parsed[i] = new Types.Array(obj[i]);
                    } else if (_type2 === 'Date') {
                        parsed[i] = new Types.Date(obj[i]);
                    } else if (obj[i] instanceof Array) {
                        parsed[i] = new Types.Array(obj[i]);
                    }
                } else {
                    parsed[i] = parseSchema(obj[i]);
                }
            } else {
                parsed[i] = parseSchema(obj[i]);
            }
        } else {
            throw new Error('Could not parse model schema.');
        }
    }
    return parsed;
}

function _parse(schema, state) {
    var parsed = {};
    if (!(state instanceof Object)) {
        throw new Error('model.parse expects a valid object');
    }
    for (var i in state) {
        if (schema[i]) {
            if (state[i] instanceof Object) {
                parsed[i] = _parse(schema[i], state[i]);
            } else {
                parsed[i] = schema[i].parse(state[i]);
            }
        }
    }
    for (var _i in schema) {
        if (parsed[_i] === undefined) {
            if (schema[_i].__type === 'datatype') {
                parsed[_i] = schema[_i].default;
            } else if (schema[_i] instanceof Object) {
                parsed[_i] = _parse(schema[_i], {});
            }
        }
    }
    return parsed;
}

function setter(obj, fields, value) {
    var updated = Object.assign({}, obj);
    if (fields.length == 1) {
        updated[fields[0]] = value;
    } else {
        updated[fields[0]] = setter(updated[fields[0]], fields.slice(1), value);
    }
    return updated;
}

function createInitialState(schema) {
    var state = {};
    if (!(schema instanceof Object)) {
        throw new Error('createInitialState(schema) expects a valid object');
    }
    for (var i in schema) {
        if (schema[i].__type === 'datatype') {
            state[i] = schema[i].default;
        } else if (schema[i] instanceof Object) {
            state[i] = createInitialState(schema[i]);
        } else {
            throw new Error('Invalid propetry in model._schema');
        }
    }
    return state;
}

var Model = function () {
    function Model(schema) {
        classCallCheck(this, Model);
        this._schema = {};
        this._initialState = null;
        this._state = this._initialState;

        if (!(schema instanceof Object)) throw new Error('Model expects a schema to be an object');
        this._schema = parseSchema(schema);
        this._state = createInitialState(this._schema);
    }

    createClass(Model, [{
        key: 'set',
        value: function set$$1(field, value) {
            var fields = String(field).split('.');
            this._state = setter(this._state, fields, value);
        }
    }, {
        key: 'get',
        value: function get$$1(field) {
            return String(field).split('.').reduce(function (o, i) {
                return o[i];
            }, this._state);
        }
    }, {
        key: 'setState',
        value: function setState(state) {
            this._state = this.parse(state);
        }
    }, {
        key: 'getState',
        value: function getState() {
            return this._state;
        }
    }, {
        key: 'parse',
        value: function parse(state) {
            return _parse(this._schema, state);
        }
    }]);
    return Model;
}();

function model(schema) {
    return new Model(schema);
}

exports.StringType = StringType;
exports.NumberType = NumberType;
exports.BooleanType = BooleanType;
exports.DateType = DateType;
exports.MixedType = MixedType;
exports.ArrayType = ArrayType;
exports.EnumType = EnumType;
exports.Types = Types;
exports.model = model;
