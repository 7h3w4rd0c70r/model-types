---
layout: default
title: JavaScript typed models
---

# [](#example)Example
```javascript
import { Types, model } from 'model-types'

const user = model({
  name: String,
  age: Number,
  oldEnough: Boolean,
  home: {
    address: { type: String, default: '' },
    city: String
  },
  notes: Types.Mixed
})
```

# [](#api)API
```javascript
import * as ModelTypes from 'model-types'
```
## [](#api-model)ModelTypes#model(_schema_)
type: _function_
expects: _object_
returns: _model_
```javascript
const task = model({
  title: {
    type: String,
    default: ''
  },
  content: String,
  done: {
    type: Boolean,
    default: false
  }
})
```

### [](#api-model-getstate)model.getState
type: _function_
expects: _undefined_
returns: _object_
```javascript

console.log(task.getState())
// prints: { title: '', content: null, done: false }
```

### [](#api-model-setstate)model.setState
type: _function_
expects: _object_
returns: _undefined_
```javascript

```
