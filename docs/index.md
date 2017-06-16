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
## [](#api-model)ModelTypes#model
type: function
expects: modelSchema /object/
returns: modelinstance

### [](#api-model-getstate)model.getState
type: function
expects: undefined
returns: object
```javascript
const task = model({
  title: String,
  done: { Boolean, default: false }
})

task.set('title', 'My new task')

console.log(task.getState())
// Prints: { title: 'My new task', done: false  }
```
