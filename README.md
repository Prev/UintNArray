# UintNArray: UintArray with variable size
[![npm version](https://badge.fury.io/js/uint-n-array.svg)](https://www.npmjs.com/package/uint-n-array)

Native JavaScript UintArray only supports 8, 16, or 32 bit sizes (Uint8Array, Uint16Array, and Uint32Array respetively).
UintNArray extends them, by supporting variable size of the bit from 1 to 32.

Run demo on [RunKit](https://runkit.com/prev/uint-n-array).

## How to install

```bash
npm i --save uint-n-array
```

## How to use

### Import Package

```javascript
const UintNArray = require('uint-n-array').default;

or

import UintNArray from 'uint-n-array';
```

### Convert data list to the buffer

```javascript
const input = [6, 2, 4, 0, 3, 1, 2, 0, 7];	
// UintArray with n=3
const buffer = UintNArray.encode(3, input);
console.log(buffer);
```

### Convert buffer to the data list

```javascript
// UintArray with n=14
const decoded = UintNArray.decode(14, buffer);
console.log(decoded); 
```
