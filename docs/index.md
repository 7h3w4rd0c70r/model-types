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
