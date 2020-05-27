# vArrayBuffer: ArrayBuffer with variable size
[![npm version](https://badge.fury.io/js/v-array-buffer.svg)](https://www.npmjs.com/package/v-array-buffer)

Native JavaScript ArrayBuffer DataView only supports 8, 16, or 32 bit size. (1, 2, 4byte respetively).
VArrayBuffer extends them, by supporting variable size of the bit from 1 to 32.
Currently it only supports unsigned integer for the data elements,
and the buffer is not compatible with the native DataView even in the 8, 16, or 32-bit.

Run demo on [RunKit](https://runkit.com/prev/v-array-buffer).


## How to install

```bash
npm i --save v-array-buffer
```

## How to use

### Convert data list to the buffer

```javascript
const input = [6, 2, 4, 0, 3, 1, 2, 0, 7];	
const bufferView = VArrayBuffer.from(3, input);
console.log(bufferView.buffer);
```

### Convert buffer to the data list

```javascript
const bufferView = new VArrayBuffer(3, buffer);
const decoded = bufferView.decode();
console.log(decoded); 
```
