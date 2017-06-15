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
## [](#modeltypes-model)ModelTypes.model
ModelTypes.model is a functions, that expects exactly one parameter - an object with model schema. ModelTypes.model returns an instance of model of specified schema.

### []ModelTypes.model.getState
function - returns an object, that represents the current state of model.
```javascript
const task = model({
  title: String,
  done: { Boolean, default: false }
})

task.set('title', 'My new task')

console.log(task.getState())
// Prints: { title: 'My new task', done: false  }
```
