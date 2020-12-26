# time-oset

Sets in ES6 are sorted by insertion order. TimeOrderedSet is a class that extends Set with Array methods

# Installation

```sh
npm i --save time-oset
```

# Usage

#### Supports both ESM and CommonJS

```js
// esm
import TimeOrderedSet from 'time-oset`
// commonjs
const TimeOrderedSet = require('time-oset').default
```

#### Array Methods

##### every

##### filter

##### find

##### findIndex

##### forEach

##### indexOf

##### join

##### lastIndexOf

##### map

##### pop

##### push

##### reduce

##### reduceRight

##### shift

##### splice

##### unshift

#### Set Properties

##### size

#### Set Methods

##### clear

##### delete

##### forEach (overriden to callback with values and indexes)

##### has

##### [Symbol.iterator]

##### keys (overriden to yield indexes)

##### values

##### entries (overriden to yield indexes and values)

# License

MIT
