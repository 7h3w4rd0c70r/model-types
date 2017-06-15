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
    adress: { type: String, default: '' },
    city: String
  },
  notes: Types.Mixed
})
```

# [](#header-1)API

# [](#header-2)model
model is a functions, that expects exactly one parameter - an object with model schema
model returns created model of specified schema
