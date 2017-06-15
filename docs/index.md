---
layout: default
title: JavaScript typed models
---

# [](#header-1)Example
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

# [](#header-1)API
```javascript
import * as ModelTypes from 'model-types'
```
# [](#header-2)ModelTypes.model
ModelTypes.model is a functions, that expects exactly one parameter - an object with model schema. ModelTypes.model returns created model of specified schema.
