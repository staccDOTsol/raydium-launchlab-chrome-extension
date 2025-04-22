/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(/*! base64-js */ "./node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js")
const ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/.pnpm/ieee754@1.2.1/node_modules/ieee754/index.js")
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ "./node_modules/.pnpm/css-loader@6.11.0_webpack@5.99.6/node_modules/css-loader/dist/cjs.js!./src/extension/content/twitter-inject.css":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@6.11.0_webpack@5.99.6/node_modules/css-loader/dist/cjs.js!./src/extension/content/twitter-inject.css ***!
  \********************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_11_0_webpack_5_99_6_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/.pnpm/css-loader@6.11.0_webpack@5.99.6/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/.pnpm/css-loader@6.11.0_webpack@5.99.6/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_6_11_0_webpack_5_99_6_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_11_0_webpack_5_99_6_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_11_0_webpack_5_99_6_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/.pnpm/css-loader@6.11.0_webpack@5.99.6/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/.pnpm/css-loader@6.11.0_webpack@5.99.6/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_6_11_0_webpack_5_99_6_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_11_0_webpack_5_99_6_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_11_0_webpack_5_99_6_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_11_0_webpack_5_99_6_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Twitter injected styles */

.wumbo2-profile-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #734be0;
  color: white;
  border-radius: 20px;
  padding: 8px 16px;
  margin: 8px 0;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.2s ease;
}

.wumbo2-profile-button:hover {
  background-color: #6340c3;
}

/* Token display in feed */
.wumbo2-token-display {
  display: flex;
  align-items: center;
  background-color: rgba(115, 75, 224, 0.1);
  border-radius: 16px;
  padding: 8px 12px;
  margin-top: 8px;
  margin-bottom: 12px;
}

.wumbo2-token-price {
  font-weight: bold;
  color: #734be0;
}

.wumbo2-token-change {
  margin-left: 8px;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 12px;
}

.wumbo2-token-change.positive {
  background-color: rgba(76, 175, 80, 0.2);
  color: #2e7d32;
}

.wumbo2-token-change.negative {
  background-color: rgba(244, 67, 54, 0.2);
  color: #c62828;
}

.wumbo2-token-actions {
  margin-left: auto;
  display: flex;
  gap: 8px;
}

.wumbo2-token-action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  border-radius: 16px;
  padding: 4px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.wumbo2-token-buy-button {
  background-color: #4caf50;
  color: white;
}

.wumbo2-token-buy-button:hover {
  background-color: #43a047;
}

.wumbo2-token-sell-button {
  background-color: #f44336;
  color: white;
}

.wumbo2-token-sell-button:hover {
  background-color: #e53935;
}

/* Twitter content script styling */

/* Profile token button */
.wumbo-token-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 0 16px;
  height: 32px;
  margin-left: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;
  outline: none;
  background-color: #8c52ff;
  color: white;
  font-size: 14px;
}

.wumbo-token-button:hover {
  background-color: #7a41e6;
}

.wumbo-icon {
  margin-right: 8px;
  font-size: 16px;
}

/* Tweet token button */
.wumbo-tweet-button-container {
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.wumbo-tweet-token-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  width: 32px;
  height: 32px;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;
  outline: none;
  background-color: transparent;
  color: rgb(83, 100, 113);
}

.wumbo-tweet-token-button:hover {
  background-color: rgba(140, 82, 255, 0.1);
  color: #8c52ff;
}

.wumbo-tweet-token-button .wumbo-icon {
  margin-right: 0;
}

/* Token display */
.wumbo-token-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
  padding: 8px 12px;
  border-radius: 12px;
  background-color: rgba(140, 82, 255, 0.08);
  border: 1px solid rgba(140, 82, 255, 0.2);
}

.wumbo-token-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wumbo-token-symbol {
  font-weight: bold;
  font-size: 16px;
  color: #8c52ff;
}

.wumbo-token-price {
  font-weight: bold;
}

.wumbo-token-change {
  font-size: 14px;
  padding: 2px 8px;
  border-radius: 12px;
}

.wumbo-token-change.positive {
  background-color: rgba(0, 186, 124, 0.1);
  color: rgb(0, 186, 124);
}

.wumbo-token-change.negative {
  background-color: rgba(244, 63, 94, 0.1);
  color: rgb(244, 63, 94);
}

.wumbo-token-actions {
  display: flex;
  gap: 8px;
}

.wumbo-token-action-button {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.wumbo-token-buy-button {
  background-color: rgb(0, 186, 124);
  color: white;
}

.wumbo-token-buy-button:hover {
  background-color: rgb(0, 170, 114);
}

.wumbo-token-sell-button {
  background-color: rgb(244, 63, 94);
  color: white;
}

.wumbo-token-sell-button:hover {
  background-color: rgb(224, 43, 74);
}

/* Buy/sell modal */
.wumbo-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 23, 42, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.wumbo-modal {
  background-color: white;
  border-radius: 16px;
  width: 400px;
  max-width: 90%;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.wumbo-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
}

.wumbo-modal-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.wumbo-modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #64748b;
}

.wumbo-modal-body {
  padding: 20px;
}

.wumbo-input-group {
  margin-bottom: 16px;
}

.wumbo-input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 14px;
}

.wumbo-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 16px;
}

.wumbo-price-estimate {
  background-color: #f8fafc;
  padding: 12px;
  border-radius: 8px;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}

.wumbo-estimate-value {
  font-weight: bold;
}

.wumbo-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
}

.wumbo-modal-button {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  font-size: 14px;
}

.wumbo-cancel-button {
  background-color: #f1f5f9;
  color: #64748b;
}

.wumbo-cancel-button:hover {
  background-color: #e2e8f0;
}

.wumbo-confirm-button {
  background-color: #8c52ff;
  color: white;
}

.wumbo-confirm-button:hover {
  background-color: #7a41e6;
}

/* Success notification */
.wumbo-success-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  max-width: 300px;
  animation: slide-in 0.3s ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.wumbo-notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #10b981;
  color: white;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
}

.wumbo-notification-content {
  flex: 1;
}

.wumbo-notification-title {
  font-weight: bold;
  margin-bottom: 4px;
  color: #0f172a;
}

.wumbo-notification-message {
  font-size: 14px;
  color: #64748b;
}

.wumbo-notification-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  font-size: 16px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  padding: 0;
  border-radius: 50%;
}

.wumbo-notification-close:hover {
  background-color: #f1f5f9;
  color: #64748b;
}

/* Tokenization context badge */
.tokenize-context-info {
  background-color: rgba(140, 82, 255, 0.08);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid rgba(140, 82, 255, 0.2);
}

.tokenize-context-badge {
  display: inline-block;
  background-color: #8c52ff;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
}

.tokenize-context-description {
  margin: 0;
  color: #475569;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .wumbo-success-notification {
    background-color: #1e293b;
  }
  
  .wumbo-notification-title {
    color: #f8fafc;
  }
  
  .wumbo-notification-message {
    color: #cbd5e1;
  }
  
  .wumbo-notification-close {
    color: #94a3b8;
  }
  
  .wumbo-notification-close:hover {
    background-color: #334155;
  }
  
  .wumbo-modal {
    background-color: #1e293b;
    color: #f8fafc;
  }
  
  .wumbo-modal-header {
    border-bottom-color: #334155;
  }
  
  .wumbo-modal-footer {
    border-top-color: #334155;
  }
  
  .wumbo-input {
    background-color: #0f172a;
    border-color: #334155;
    color: #f8fafc;
  }
  
  .wumbo-price-estimate {
    background-color: #0f172a;
    color: #f8fafc;
  }
}

/* Enhanced price chart styling */
.wumbo-price-chart-container {
  position: relative;
  height: 200px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.wumbo-price-bar {
  flex: 1;
  margin: 0 1px;
  min-width: 4px;
  border-radius: 2px 2px 0 0;
  background-color: #ccc;
  transition: height 0.3s ease;
}

.wumbo-price-bar.up {
  background-color: #4caf50;
}

.wumbo-price-bar.down {
  background-color: #f44336;
}

.wumbo-price-bar:hover {
  transform: scaleY(1.05);
}

.wumbo-price-range {
  position: absolute;
  left: -50px;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 10px;
  color: #777;
}

.wumbo-time-labels {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -20px;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #777;
}

.wumbo-price-info {
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  color: #333;
}

/* Percentage buttons styling */
.wumbo-percentage-buttons {
  margin: 15px 0;
}

.wumbo-percentage-buttons label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

.wumbo-button-group {
  display: flex;
  gap: 5px;
}

.wumbo-percentage-button {
  flex: 1;
  padding: 8px 0;
  background-color: #f5f8fa;
  border: 1px solid #e1e8ed;
  border-radius: 4px;
  font-size: 14px;
  color: #1da1f2;
  cursor: pointer;
  transition: all 0.2s;
}

.wumbo-percentage-button:hover {
  background-color: #e8f5fe;
  border-color: #1da1f2;
}

.wumbo-percentage-button:active {
  transform: scale(0.98);
}

/* Token selection styling */
.wumbo-multiple-tokens {
  padding: 10px 0;
}

.wumbo-token-list {
  max-height: 300px;
  overflow-y: auto;
  margin-top: 10px;
}

.wumbo-token-option {
  padding: 12px;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.wumbo-token-option:hover {
  background-color: #f5f8fa;
  border-color: #1da1f2;
}

.wumbo-token-name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}

.wumbo-token-price,
.wumbo-token-marketcap,
.wumbo-token-volume {
  font-size: 14px;
  color: #657786;
  margin-top: 3px;
}

/* Token details display */
.wumbo-token-price-chart {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  background-color: #f8f9fa;
} `, "",{"version":3,"sources":["webpack://./src/extension/content/twitter-inject.css"],"names":[],"mappings":"AAAA,4BAA4B;;AAE5B;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,yBAAyB;EACzB,YAAY;EACZ,mBAAmB;EACnB,iBAAiB;EACjB,aAAa;EACb,eAAe;EACf,iBAAiB;EACjB,eAAe;EACf,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA,0BAA0B;AAC1B;EACE,aAAa;EACb,mBAAmB;EACnB,yCAAyC;EACzC,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,eAAe;EACf,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,wCAAwC;EACxC,cAAc;AAChB;;AAEA;EACE,wCAAwC;EACxC,cAAc;AAChB;;AAEA;EACE,iBAAiB;EACjB,aAAa;EACb,QAAQ;AACV;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,eAAe;EACf,iBAAiB;EACjB,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;EACf,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,yBAAyB;AAC3B;;AAEA,mCAAmC;;AAEnC,yBAAyB;AACzB;EACE,oBAAoB;EACpB,mBAAmB;EACnB,uBAAuB;EACvB,qBAAqB;EACrB,eAAe;EACf,YAAY;EACZ,iBAAiB;EACjB,iBAAiB;EACjB,eAAe;EACf,iCAAiC;EACjC,YAAY;EACZ,aAAa;EACb,yBAAyB;EACzB,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,iBAAiB;EACjB,eAAe;AACjB;;AAEA,uBAAuB;AACvB;EACE,aAAa;EACb,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,uBAAuB;EACvB,qBAAqB;EACrB,WAAW;EACX,YAAY;EACZ,UAAU;EACV,eAAe;EACf,iCAAiC;EACjC,YAAY;EACZ,aAAa;EACb,6BAA6B;EAC7B,wBAAwB;AAC1B;;AAEA;EACE,yCAAyC;EACzC,cAAc;AAChB;;AAEA;EACE,eAAe;AACjB;;AAEA,kBAAkB;AAClB;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,cAAc;EACd,iBAAiB;EACjB,mBAAmB;EACnB,0CAA0C;EAC1C,yCAAyC;AAC3C;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;AACV;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,wCAAwC;EACxC,uBAAuB;AACzB;;AAEA;EACE,wCAAwC;EACxC,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,QAAQ;AACV;;AAEA;EACE,iBAAiB;EACjB,oBAAoB;EACpB,eAAe;EACf,iBAAiB;EACjB,eAAe;EACf,YAAY;EACZ,oBAAoB;AACtB;;AAEA;EACE,kCAAkC;EAClC,YAAY;AACd;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,kCAAkC;EAClC,YAAY;AACd;;AAEA;EACE,kCAAkC;AACpC;;AAEA,mBAAmB;AACnB;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,uCAAuC;EACvC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,cAAc;EACd,gBAAgB;EAChB,mFAAmF;AACrF;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,gCAAgC;AAClC;;AAEA;EACE,SAAS;EACT,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,eAAe;EACf,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,yBAAyB;EACzB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,kBAAkB;EAClB,gBAAgB;EAChB,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,yBAAyB;EACzB,SAAS;EACT,kBAAkB;EAClB,6BAA6B;AAC/B;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,yBAAyB;AAC3B;;AAEA,yBAAyB;AACzB;EACE,eAAe;EACf,YAAY;EACZ,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,aAAa;EACb,yBAAyB;EACzB,kBAAkB;EAClB,0CAA0C;EAC1C,cAAc;EACd,gBAAgB;EAChB,0CAA0C;AAC5C;;AAEA;EACE;IACE,2BAA2B;IAC3B,UAAU;EACZ;EACA;IACE,wBAAwB;IACxB,UAAU;EACZ;AACF;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,YAAY;EACZ,kBAAkB;EAClB,kBAAkB;EAClB,cAAc;AAChB;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,eAAe;EACf,cAAc;EACd,eAAe;EACf,WAAW;EACX,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,iBAAiB;EACjB,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,cAAc;AAChB;;AAEA,+BAA+B;AAC/B;EACE,0CAA0C;EAC1C,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,yCAAyC;AAC3C;;AAEA;EACE,qBAAqB;EACrB,yBAAyB;EACzB,YAAY;EACZ,eAAe;EACf,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,SAAS;EACT,cAAc;AAChB;;AAEA,0BAA0B;AAC1B;EACE;IACE,yBAAyB;EAC3B;;EAEA;IACE,cAAc;EAChB;;EAEA;IACE,cAAc;EAChB;;EAEA;IACE,cAAc;EAChB;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;IACzB,cAAc;EAChB;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;IACzB,qBAAqB;IACrB,cAAc;EAChB;;EAEA;IACE,yBAAyB;IACzB,cAAc;EAChB;AACF;;AAEA,iCAAiC;AACjC;EACE,kBAAkB;EAClB,aAAa;EACb,aAAa;EACb,qBAAqB;EACrB,8BAA8B;EAC9B,gBAAgB;EAChB,oBAAoB;EACpB,6BAA6B;AAC/B;;AAEA;EACE,OAAO;EACP,aAAa;EACb,cAAc;EACd,0BAA0B;EAC1B,sBAAsB;EACtB,4BAA4B;AAC9B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,MAAM;EACN,SAAS;EACT,aAAa;EACb,sBAAsB;EACtB,8BAA8B;EAC9B,eAAe;EACf,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,OAAO;EACP,QAAQ;EACR,aAAa;EACb,aAAa;EACb,8BAA8B;EAC9B,eAAe;EACf,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,WAAW;AACb;;AAEA,+BAA+B;AAC/B;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,eAAe;EACf,WAAW;AACb;;AAEA;EACE,aAAa;EACb,QAAQ;AACV;;AAEA;EACE,OAAO;EACP,cAAc;EACd,yBAAyB;EACzB,yBAAyB;EACzB,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,yBAAyB;EACzB,qBAAqB;AACvB;;AAEA;EACE,sBAAsB;AACxB;;AAEA,4BAA4B;AAC5B;EACE,eAAe;AACjB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,yBAAyB;EACzB,kBAAkB;EAClB,mBAAmB;EACnB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,yBAAyB;EACzB,qBAAqB;AACvB;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,kBAAkB;AACpB;;AAEA;;;EAGE,eAAe;EACf,cAAc;EACd,eAAe;AACjB;;AAEA,0BAA0B;AAC1B;EACE,cAAc;EACd,aAAa;EACb,yBAAyB;EACzB,kBAAkB;EAClB,yBAAyB;AAC3B","sourcesContent":["/* Twitter injected styles */\n\n.wumbo2-profile-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #734be0;\n  color: white;\n  border-radius: 20px;\n  padding: 8px 16px;\n  margin: 8px 0;\n  cursor: pointer;\n  font-weight: bold;\n  font-size: 14px;\n  transition: all 0.2s ease;\n}\n\n.wumbo2-profile-button:hover {\n  background-color: #6340c3;\n}\n\n/* Token display in feed */\n.wumbo2-token-display {\n  display: flex;\n  align-items: center;\n  background-color: rgba(115, 75, 224, 0.1);\n  border-radius: 16px;\n  padding: 8px 12px;\n  margin-top: 8px;\n  margin-bottom: 12px;\n}\n\n.wumbo2-token-price {\n  font-weight: bold;\n  color: #734be0;\n}\n\n.wumbo2-token-change {\n  margin-left: 8px;\n  font-size: 12px;\n  padding: 2px 6px;\n  border-radius: 12px;\n}\n\n.wumbo2-token-change.positive {\n  background-color: rgba(76, 175, 80, 0.2);\n  color: #2e7d32;\n}\n\n.wumbo2-token-change.negative {\n  background-color: rgba(244, 67, 54, 0.2);\n  color: #c62828;\n}\n\n.wumbo2-token-actions {\n  margin-left: auto;\n  display: flex;\n  gap: 8px;\n}\n\n.wumbo2-token-action-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: bold;\n  border-radius: 16px;\n  padding: 4px 12px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.wumbo2-token-buy-button {\n  background-color: #4caf50;\n  color: white;\n}\n\n.wumbo2-token-buy-button:hover {\n  background-color: #43a047;\n}\n\n.wumbo2-token-sell-button {\n  background-color: #f44336;\n  color: white;\n}\n\n.wumbo2-token-sell-button:hover {\n  background-color: #e53935;\n}\n\n/* Twitter content script styling */\n\n/* Profile token button */\n.wumbo-token-button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 9999px;\n  padding: 0 16px;\n  height: 32px;\n  margin-left: 12px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.2s;\n  border: none;\n  outline: none;\n  background-color: #8c52ff;\n  color: white;\n  font-size: 14px;\n}\n\n.wumbo-token-button:hover {\n  background-color: #7a41e6;\n}\n\n.wumbo-icon {\n  margin-right: 8px;\n  font-size: 16px;\n}\n\n/* Tweet token button */\n.wumbo-tweet-button-container {\n  display: flex;\n  align-items: center;\n  margin-left: 8px;\n}\n\n.wumbo-tweet-token-button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 9999px;\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  cursor: pointer;\n  transition: background-color 0.2s;\n  border: none;\n  outline: none;\n  background-color: transparent;\n  color: rgb(83, 100, 113);\n}\n\n.wumbo-tweet-token-button:hover {\n  background-color: rgba(140, 82, 255, 0.1);\n  color: #8c52ff;\n}\n\n.wumbo-tweet-token-button .wumbo-icon {\n  margin-right: 0;\n}\n\n/* Token display */\n.wumbo-token-display {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 12px 0;\n  padding: 8px 12px;\n  border-radius: 12px;\n  background-color: rgba(140, 82, 255, 0.08);\n  border: 1px solid rgba(140, 82, 255, 0.2);\n}\n\n.wumbo-token-info {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.wumbo-token-symbol {\n  font-weight: bold;\n  font-size: 16px;\n  color: #8c52ff;\n}\n\n.wumbo-token-price {\n  font-weight: bold;\n}\n\n.wumbo-token-change {\n  font-size: 14px;\n  padding: 2px 8px;\n  border-radius: 12px;\n}\n\n.wumbo-token-change.positive {\n  background-color: rgba(0, 186, 124, 0.1);\n  color: rgb(0, 186, 124);\n}\n\n.wumbo-token-change.negative {\n  background-color: rgba(244, 63, 94, 0.1);\n  color: rgb(244, 63, 94);\n}\n\n.wumbo-token-actions {\n  display: flex;\n  gap: 8px;\n}\n\n.wumbo-token-action-button {\n  padding: 4px 12px;\n  border-radius: 999px;\n  font-size: 14px;\n  font-weight: bold;\n  cursor: pointer;\n  border: none;\n  transition: all 0.2s;\n}\n\n.wumbo-token-buy-button {\n  background-color: rgb(0, 186, 124);\n  color: white;\n}\n\n.wumbo-token-buy-button:hover {\n  background-color: rgb(0, 170, 114);\n}\n\n.wumbo-token-sell-button {\n  background-color: rgb(244, 63, 94);\n  color: white;\n}\n\n.wumbo-token-sell-button:hover {\n  background-color: rgb(224, 43, 74);\n}\n\n/* Buy/sell modal */\n.wumbo-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(15, 23, 42, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 10000;\n}\n\n.wumbo-modal {\n  background-color: white;\n  border-radius: 16px;\n  width: 400px;\n  max-width: 90%;\n  overflow: hidden;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);\n}\n\n.wumbo-modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 20px;\n  border-bottom: 1px solid #e2e8f0;\n}\n\n.wumbo-modal-header h2 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: bold;\n}\n\n.wumbo-modal-close {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #64748b;\n}\n\n.wumbo-modal-body {\n  padding: 20px;\n}\n\n.wumbo-input-group {\n  margin-bottom: 16px;\n}\n\n.wumbo-input-group label {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: bold;\n  font-size: 14px;\n}\n\n.wumbo-input {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  font-size: 16px;\n}\n\n.wumbo-price-estimate {\n  background-color: #f8fafc;\n  padding: 12px;\n  border-radius: 8px;\n  margin-top: 16px;\n  display: flex;\n  justify-content: space-between;\n}\n\n.wumbo-estimate-value {\n  font-weight: bold;\n}\n\n.wumbo-modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 20px;\n  border-top: 1px solid #e2e8f0;\n}\n\n.wumbo-modal-button {\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-weight: bold;\n  cursor: pointer;\n  border: none;\n  font-size: 14px;\n}\n\n.wumbo-cancel-button {\n  background-color: #f1f5f9;\n  color: #64748b;\n}\n\n.wumbo-cancel-button:hover {\n  background-color: #e2e8f0;\n}\n\n.wumbo-confirm-button {\n  background-color: #8c52ff;\n  color: white;\n}\n\n.wumbo-confirm-button:hover {\n  background-color: #7a41e6;\n}\n\n/* Success notification */\n.wumbo-success-notification {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  display: flex;\n  align-items: center;\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  z-index: 10000;\n  max-width: 300px;\n  animation: slide-in 0.3s ease-out forwards;\n}\n\n@keyframes slide-in {\n  from {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n\n.wumbo-notification-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  background-color: #10b981;\n  color: white;\n  border-radius: 50%;\n  margin-right: 12px;\n  flex-shrink: 0;\n}\n\n.wumbo-notification-content {\n  flex: 1;\n}\n\n.wumbo-notification-title {\n  font-weight: bold;\n  margin-bottom: 4px;\n  color: #0f172a;\n}\n\n.wumbo-notification-message {\n  font-size: 14px;\n  color: #64748b;\n}\n\n.wumbo-notification-close {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #94a3b8;\n  font-size: 16px;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: 12px;\n  padding: 0;\n  border-radius: 50%;\n}\n\n.wumbo-notification-close:hover {\n  background-color: #f1f5f9;\n  color: #64748b;\n}\n\n/* Tokenization context badge */\n.tokenize-context-info {\n  background-color: rgba(140, 82, 255, 0.08);\n  border-radius: 8px;\n  padding: 12px;\n  margin-bottom: 16px;\n  border: 1px solid rgba(140, 82, 255, 0.2);\n}\n\n.tokenize-context-badge {\n  display: inline-block;\n  background-color: #8c52ff;\n  color: white;\n  font-size: 12px;\n  font-weight: bold;\n  padding: 4px 8px;\n  border-radius: 4px;\n  margin-bottom: 8px;\n}\n\n.tokenize-context-description {\n  margin: 0;\n  color: #475569;\n}\n\n/* Dark mode adjustments */\n@media (prefers-color-scheme: dark) {\n  .wumbo-success-notification {\n    background-color: #1e293b;\n  }\n  \n  .wumbo-notification-title {\n    color: #f8fafc;\n  }\n  \n  .wumbo-notification-message {\n    color: #cbd5e1;\n  }\n  \n  .wumbo-notification-close {\n    color: #94a3b8;\n  }\n  \n  .wumbo-notification-close:hover {\n    background-color: #334155;\n  }\n  \n  .wumbo-modal {\n    background-color: #1e293b;\n    color: #f8fafc;\n  }\n  \n  .wumbo-modal-header {\n    border-bottom-color: #334155;\n  }\n  \n  .wumbo-modal-footer {\n    border-top-color: #334155;\n  }\n  \n  .wumbo-input {\n    background-color: #0f172a;\n    border-color: #334155;\n    color: #f8fafc;\n  }\n  \n  .wumbo-price-estimate {\n    background-color: #0f172a;\n    color: #f8fafc;\n  }\n}\n\n/* Enhanced price chart styling */\n.wumbo-price-chart-container {\n  position: relative;\n  height: 200px;\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  margin-top: 20px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #ddd;\n}\n\n.wumbo-price-bar {\n  flex: 1;\n  margin: 0 1px;\n  min-width: 4px;\n  border-radius: 2px 2px 0 0;\n  background-color: #ccc;\n  transition: height 0.3s ease;\n}\n\n.wumbo-price-bar.up {\n  background-color: #4caf50;\n}\n\n.wumbo-price-bar.down {\n  background-color: #f44336;\n}\n\n.wumbo-price-bar:hover {\n  transform: scaleY(1.05);\n}\n\n.wumbo-price-range {\n  position: absolute;\n  left: -50px;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  font-size: 10px;\n  color: #777;\n}\n\n.wumbo-time-labels {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: -20px;\n  display: flex;\n  justify-content: space-between;\n  font-size: 10px;\n  color: #777;\n}\n\n.wumbo-price-info {\n  text-align: center;\n  margin-top: 10px;\n  font-weight: bold;\n  color: #333;\n}\n\n/* Percentage buttons styling */\n.wumbo-percentage-buttons {\n  margin: 15px 0;\n}\n\n.wumbo-percentage-buttons label {\n  display: block;\n  margin-bottom: 5px;\n  font-size: 14px;\n  color: #555;\n}\n\n.wumbo-button-group {\n  display: flex;\n  gap: 5px;\n}\n\n.wumbo-percentage-button {\n  flex: 1;\n  padding: 8px 0;\n  background-color: #f5f8fa;\n  border: 1px solid #e1e8ed;\n  border-radius: 4px;\n  font-size: 14px;\n  color: #1da1f2;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.wumbo-percentage-button:hover {\n  background-color: #e8f5fe;\n  border-color: #1da1f2;\n}\n\n.wumbo-percentage-button:active {\n  transform: scale(0.98);\n}\n\n/* Token selection styling */\n.wumbo-multiple-tokens {\n  padding: 10px 0;\n}\n\n.wumbo-token-list {\n  max-height: 300px;\n  overflow-y: auto;\n  margin-top: 10px;\n}\n\n.wumbo-token-option {\n  padding: 12px;\n  border: 1px solid #e1e8ed;\n  border-radius: 8px;\n  margin-bottom: 10px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.wumbo-token-option:hover {\n  background-color: #f5f8fa;\n  border-color: #1da1f2;\n}\n\n.wumbo-token-name {\n  font-weight: bold;\n  font-size: 16px;\n  margin-bottom: 5px;\n}\n\n.wumbo-token-price,\n.wumbo-token-marketcap,\n.wumbo-token-volume {\n  font-size: 14px;\n  color: #657786;\n  margin-top: 3px;\n}\n\n/* Token details display */\n.wumbo-token-price-chart {\n  margin: 20px 0;\n  padding: 10px;\n  border: 1px solid #e1e8ed;\n  border-radius: 8px;\n  background-color: #f8f9fa;\n} "],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/.pnpm/css-loader@6.11.0_webpack@5.99.6/node_modules/css-loader/dist/runtime/api.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@6.11.0_webpack@5.99.6/node_modules/css-loader/dist/runtime/api.js ***!
  \*********************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/.pnpm/css-loader@6.11.0_webpack@5.99.6/node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@6.11.0_webpack@5.99.6/node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \****************************************************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/.pnpm/ieee754@1.2.1/node_modules/ieee754/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/.pnpm/ieee754@1.2.1/node_modules/ieee754/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js ***!
  \****************************************************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*********************************************************************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*************************************************************************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***************************************************************************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \********************************************************************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**************************************************************************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/extension/content/twitter-inject.css":
/*!**************************************************!*\
  !*** ./src/extension/content/twitter-inject.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/.pnpm/style-loader@3.3.4_webpack@5.99.6/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_11_0_webpack_5_99_6_node_modules_css_loader_dist_cjs_js_twitter_inject_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/.pnpm/css-loader@6.11.0_webpack@5.99.6/node_modules/css-loader/dist/cjs.js!./twitter-inject.css */ "./node_modules/.pnpm/css-loader@6.11.0_webpack@5.99.6/node_modules/css-loader/dist/cjs.js!./src/extension/content/twitter-inject.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_3_3_4_webpack_5_99_6_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_6_11_0_webpack_5_99_6_node_modules_css_loader_dist_cjs_js_twitter_inject_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_css_loader_6_11_0_webpack_5_99_6_node_modules_css_loader_dist_cjs_js_twitter_inject_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_pnpm_css_loader_6_11_0_webpack_5_99_6_node_modules_css_loader_dist_cjs_js_twitter_inject_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_pnpm_css_loader_6_11_0_webpack_5_99_6_node_modules_css_loader_dist_cjs_js_twitter_inject_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other entry modules.
(() => {
/*!*********************************!*\
  !*** ./src/browser-polyfill.js ***!
  \*********************************/
// This file provides polyfills for browser environments
__webpack_require__(/*! buffer */ "./node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js");
__webpack_require__(/*! process */ "./node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");

// Make Buffer available globally
if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || (__webpack_require__(/*! buffer */ "./node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js").Buffer);
}

// Make process available globally
if (typeof window !== 'undefined') {
  window.process = window.process || __webpack_require__(/*! process */ "./node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
}

})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!*****************************************!*\
  !*** ./src/process-browser-polyfill.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// This file provides a polyfill for the process/browser module
// Some libraries may expect this to be available globally

// Create a simple process object with the necessary properties
const process = {
  env: {},
  browser: true,
  nextTick: function(callback) {
    setTimeout(callback, 0);
  }
};

// Expose the process object globally depending on environment
// Use self for service workers, window for browser context
if (typeof self !== 'undefined') {
  self.process = process;
} else if (typeof window !== 'undefined') {
  window.process = process;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (process);

})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*************************************************!*\
  !*** ./src/extension/content/twitter-inject.ts ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _twitter_inject_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./twitter-inject.css */ "./src/extension/content/twitter-inject.css");
// Content script for Twitter (X) integration - Direct injection version

// Configuration
const WUMBO_BUTTON_CLASS = 'wumbo-token-button';
const WUMBO_PROFILE_BUTTON_ID = 'wumbo-profile-token-button';
const WUMBO_TWEET_BUTTON_CLASS = 'wumbo-tweet-token-button';
const WUMBO_TOKEN_DISPLAY_CLASS = 'wumbo-token-display';
const WUMBO_TOKENIZE_MODAL_ID = 'wumbo-tokenize-modal';
// Raydium API endpoints
const RAYDIUM_API_BASE = 'https://launch-mint-v1.raydium.io';
const RAYDIUM_HISTORY_API_BASE = 'https://launch-history-v1.raydium.io';
const RAYDIUM_FORUM_API_BASE = 'https://launch-forum-v1.raydium.io';
// Twitter handle for the authenticated user
let currentTwitterHandle = null;
// Track mutation observer
let observer = null;
// Store tokenized items
let tokenizedItems = null;
// Initialize the content script
async function initialize() {
    console.log('Wumbo: Twitter content script initialized');
    // Get the current Twitter handle
    await getCurrentTwitterHandle();
    // Fetch tokenized items
    await fetchTokenizedItems();
    // Create and start the observer to watch for DOM changes
    startObserver();
    // Do an initial injection
    injectWumboButtons();
    // Check for tokenized items every minute
    setInterval(fetchTokenizedItems, 60000);
    // Check for Twitter handle changes (in case user switches accounts)
    setInterval(getCurrentTwitterHandle, 30000);
}
// Get the current Twitter handle
async function getCurrentTwitterHandle() {
    try {
        // Try to find the currently logged-in user's handle from the DOM
        // This varies depending on Twitter's UI, but looking for the account switcher is one approach
        const accountSwitcher = document.querySelector('a[data-testid="AppTabBar_Profile_Link"]');
        if (accountSwitcher) {
            // The href attribute contains the path to the user's profile
            const href = accountSwitcher.getAttribute('href');
            if (href && href.startsWith('/')) {
                // Extract the handle from the path (removing the leading slash)
                const handle = href.substring(1);
                if (handle && !handle.includes('/')) {
                    currentTwitterHandle = handle;
                    console.log('Wumbo: Current Twitter handle:', currentTwitterHandle);
                    return;
                }
            }
        }
        // Try another selector if the above didn't work
        const userCell = document.querySelector('[data-testid="UserCell"]');
        if (userCell) {
            const usernameElement = userCell.querySelector('[data-testid="UserName"]')?.querySelectorAll('span')?.[1];
            if (usernameElement) {
                const handle = usernameElement.textContent?.replace('@', '');
                if (handle) {
                    currentTwitterHandle = handle;
                    console.log('Wumbo: Current Twitter handle:', currentTwitterHandle);
                    return;
                }
            }
        }
        // If all else fails, ask the background script
        const response = await chrome.runtime.sendMessage({ type: 'GET_PRIVY_STATE' });
        if (response?.success && response.data.twitterConnected && response.data.userInfo?.twitterHandle) {
            currentTwitterHandle = response.data.userInfo.twitterHandle;
            console.log('Wumbo: Current Twitter handle from background:', currentTwitterHandle);
        }
    }
    catch (error) {
        console.error('Wumbo: Error getting current Twitter handle', error);
    }
}
// Fetch tokenized items
async function fetchTokenizedItems() {
    try {
        // First try to get from background script (cached data)
        const cachedResponse = await chrome.runtime.sendMessage({ type: 'GET_TOKENIZED_ITEMS' });
        if (cachedResponse?.success) {
            tokenizedItems = cachedResponse.data;
        }
        // Then fetch fresh data from Raydium API directly
        await fetchRaydiumTokens();
        // Re-inject UI elements with updated data
        injectTokenizedItemsUI();
    }
    catch (error) {
        console.error('Wumbo: Error fetching tokenized items', error);
    }
}
// Fetch tokens from Raydium API
async function fetchRaydiumTokens() {
    try {
        // Get tokens from Twitter platform
        const response = await fetch(`${RAYDIUM_API_BASE}/get/list?sort=marketCap&size=100&mintType=default&includeNsfw=false&platformId=PlatformWhiteList`);
        const data = await response.json();
        if (!data || !data.data || !Array.isArray(data.data)) {
            console.error('Wumbo: Invalid response from Raydium API');
            return;
        }
        // Initialize tokenized items if not already
        if (!tokenizedItems) {
            tokenizedItems = {
                profiles: {},
                posts: {}
            };
        }
        // Process tokens
        for (const token of data.data) {
            if (!token.meta || !token.meta.twitterInfo)
                continue;
            const twitterInfo = token.meta.twitterInfo;
            if (twitterInfo.tweetId) {
                // This is a tweet token
                tokenizedItems.posts[twitterInfo.tweetId] = {
                    tokenMint: token.meta.mint,
                    symbol: token.meta.symbol,
                    price: token.meta.price || 0,
                    priceChange: token.meta.priceChange24h || 0,
                    marketCap: token.meta.marketCap || 0
                };
            }
            else if (twitterInfo.handle) {
                // This is a profile token
                tokenizedItems.profiles[twitterInfo.handle] = {
                    tokenMint: token.meta.mint,
                    symbol: token.meta.symbol,
                    price: token.meta.price || 0,
                    priceChange: token.meta.priceChange24h || 0,
                    marketCap: token.meta.marketCap || 0
                };
            }
        }
        // Try to fetch more pages if available
        if (data.nextPageId) {
            await fetchRaydiumTokensNextPage(data.nextPageId);
        }
    }
    catch (error) {
        console.error('Wumbo: Error fetching tokens from Raydium API', error);
    }
}
// Fetch additional pages of tokens
async function fetchRaydiumTokensNextPage(nextPageId) {
    try {
        const response = await fetch(`${RAYDIUM_API_BASE}/get/list?sort=marketCap&size=100&mintType=default&includeNsfw=false&platformId=PlatformWhiteList&nextPageId=${nextPageId}`);
        const data = await response.json();
        if (!data || !data.data || !Array.isArray(data.data)) {
            return;
        }
        // Process tokens
        for (const token of data.data) {
            if (!token.meta || !token.meta.twitterInfo)
                continue;
            const twitterInfo = token.meta.twitterInfo;
            if (twitterInfo.tweetId && tokenizedItems) {
                // This is a tweet token
                tokenizedItems.posts[twitterInfo.tweetId] = {
                    tokenMint: token.meta.mint,
                    symbol: token.meta.symbol,
                    price: token.meta.price || 0,
                    priceChange: token.meta.priceChange24h || 0,
                    marketCap: token.meta.marketCap || 0
                };
            }
            else if (twitterInfo.handle && tokenizedItems) {
                // This is a profile token
                tokenizedItems.profiles[twitterInfo.handle] = {
                    tokenMint: token.meta.mint,
                    symbol: token.meta.symbol,
                    price: token.meta.price || 0,
                    priceChange: token.meta.priceChange24h || 0,
                    marketCap: token.meta.marketCap || 0
                };
            }
        }
        // Recursively fetch more pages if available
        if (data.nextPageId) {
            await fetchRaydiumTokensNextPage(data.nextPageId);
        }
    }
    catch (error) {
        console.error('Wumbo: Error fetching next page of tokens', error);
    }
}
// Fetch token price history
async function fetchTokenPriceHistory(tokenMint) {
    try {
        // First, find the pool ID for this token
        const response = await fetch(`${RAYDIUM_API_BASE}/get/by/mints?ids=${tokenMint}`);
        const data = await response.json();
        if (!data || !data.data || !data.data[0] || !data.data[0].poolId) {
            return null;
        }
        const poolId = data.data[0].poolId;
        // Then fetch the kline (price history) data
        const klineResponse = await fetch(`${RAYDIUM_HISTORY_API_BASE}/kline?poolId=${poolId}&interval=1h&limit=24`);
        const klineData = await klineResponse.json();
        if (!klineData || !klineData.data || !Array.isArray(klineData.data)) {
            return null;
        }
        return klineData.data;
    }
    catch (error) {
        console.error('Wumbo: Error fetching token price history', error);
        return null;
    }
}
// Start mutation observer to watch for Twitter UI changes
function startObserver() {
    if (observer) {
        observer.disconnect();
    }
    observer = new MutationObserver((mutations) => {
        // Check if we need to inject our UI elements
        if (shouldInjectButtons(mutations)) {
            injectWumboButtons();
            // Also inject tokenized items UI if we have data
            if (tokenizedItems) {
                injectTokenizedItemsUI();
            }
        }
    });
    // Start observing the document with the configured parameters
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
// Determine if we should inject buttons based on mutations
function shouldInjectButtons(mutations) {
    for (const mutation of mutations) {
        // Look for added nodes that might be tweets or profile headers
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            for (const node of Array.from(mutation.addedNodes)) {
                if (node instanceof HTMLElement) {
                    // Check if this is a tweet
                    if (node.querySelector('article[data-testid="tweet"]')) {
                        return true;
                    }
                    // Check if this is a profile header
                    if (node.querySelector('[data-testid="primaryColumn"] [data-testid="UserName"]')) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
// Main function to inject Wumbo buttons
function injectWumboButtons() {
    try {
        // Inject button on profile pages
        injectProfileButton();
        // Inject buttons on tweets
        injectTweetButtons();
    }
    catch (error) {
        console.error('Wumbo: Error injecting buttons', error);
    }
}
// Inject tokenized items UI
function injectTokenizedItemsUI() {
    try {
        if (!tokenizedItems)
            return;
        // Inject token info on profiles
        injectProfileTokenInfo();
        // Inject token info on tweets
        injectTweetTokenInfo();
    }
    catch (error) {
        console.error('Wumbo: Error injecting tokenized items UI', error);
    }
}
// Extract profile information
function getProfileInfo() {
    try {
        const profileHeader = document.querySelector('[data-testid="primaryColumn"] [data-testid="UserName"]');
        if (!profileHeader)
            return {};
        // Get display name
        const displayName = profileHeader.querySelector('h1')?.innerText || '';
        // Get username
        const usernameElement = profileHeader.querySelector('[data-testid="UserName"]')?.querySelectorAll('span')?.[1];
        const username = usernameElement?.textContent?.replace('@', '') || '';
        // Get profile URL
        const profileUrl = window.location.href;
        // Get profile image
        const profileImage = document.querySelector('img[data-testid="Profile-image"]')?.getAttribute('src') || '';
        return {
            displayName,
            username,
            profileUrl,
            profileImage
        };
    }
    catch (error) {
        console.error('Wumbo: Error extracting profile info', error);
        return {};
    }
}
// Get tweet information from a tweet element
function getTweetInfo(tweetElement) {
    // Get tweet author
    const authorElement = tweetElement.querySelector('[data-testid="User-Name"]');
    const authorName = authorElement ? authorElement.textContent?.trim() || 'Unknown Author' : 'Unknown Author';
    const authorHandle = authorElement ? authorElement.querySelector('a[href^="/"]:last-of-type')?.getAttribute('href')?.split('/').pop() || '' : '';
    // Get tweet text
    const tweetTextElement = tweetElement.querySelector('[data-testid="tweetText"]');
    const tweetText = tweetTextElement ? tweetTextElement.textContent?.trim() || '' : '';
    // Try to get tweet ID from the tweet element
    // Method 1: Look for time element with a link to the tweet
    let tweetId = '';
    const timeElement = tweetElement.querySelector('time');
    if (timeElement) {
        const parentAnchor = timeElement.closest('a');
        if (parentAnchor && parentAnchor.href) {
            const match = parentAnchor.href.match(/\/status\/(\d+)/);
            if (match && match[1]) {
                tweetId = match[1];
            }
        }
    }
    // Method 2: Look for any link with status in it
    if (!tweetId) {
        const statusLinks = tweetElement.querySelectorAll('a[href*="/status/"]');
        for (const link of statusLinks) {
            const match = link.href.match(/\/status\/(\d+)/);
            if (match && match[1]) {
                tweetId = match[1];
                break;
            }
        }
    }
    console.log(`Tweet info extracted - ID: ${tweetId}, Author: ${authorName} (@${authorHandle}), Text: "${tweetText.substring(0, 50)}${tweetText.length > 50 ? '...' : ''}"`);
    return {
        authorName,
        authorHandle,
        tweetText,
        tweetId
    };
}
// Inject button on profile pages
function injectProfileButton() {
    // Check if we're on a profile page
    const profileHeader = document.querySelector('[data-testid="primaryColumn"] [data-testid="UserName"]');
    if (!profileHeader)
        return;
    // Check if button already exists
    if (document.getElementById(WUMBO_PROFILE_BUTTON_ID))
        return;
    // Find the user actions area (where Follow button is)
    const userActionsArea = profileHeader.closest('[data-testid="primaryColumn"]')?.querySelector('[data-testid="placementTracking"]');
    if (!userActionsArea)
        return;
    // Get username to use in the button
    const usernameElement = profileHeader.querySelector('[data-testid="UserName"]')?.querySelectorAll('span')?.[1];
    const username = usernameElement?.textContent || 'this profile';
    // Create our button
    const button = document.createElement('button');
    button.id = WUMBO_PROFILE_BUTTON_ID;
    button.className = WUMBO_BUTTON_CLASS;
    button.innerHTML = `<span class="wumbo-icon">🪙</span> Tokenize ${username}`;
    // Add click handler
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Get profile information
        const profileInfo = getProfileInfo();
        // Open tokenize modal directly in the page
        openTokenizeModal('profile', profileInfo);
    });
    // Insert button next to Follow button
    userActionsArea.appendChild(button);
}
// Inject token info on profile pages
function injectProfileTokenInfo() {
    if (!tokenizedItems)
        return;
    // Get profile info
    const profileInfo = getProfileInfo();
    if (!profileInfo.username)
        return;
    // Check if this profile is tokenized
    const profileToken = tokenizedItems.profiles[profileInfo.username];
    if (!profileToken)
        return;
    // Look for the bio section to insert token info
    const bioSection = document.querySelector('[data-testid="UserDescription"]');
    if (!bioSection)
        return;
    // Check if we already injected token info
    const existingTokenInfo = document.querySelector(`.${WUMBO_TOKEN_DISPLAY_CLASS}[data-token-mint="${profileToken.tokenMint}"]`);
    if (existingTokenInfo)
        return;
    // Create token display element
    const tokenDisplay = document.createElement('div');
    tokenDisplay.className = WUMBO_TOKEN_DISPLAY_CLASS;
    tokenDisplay.dataset.tokenMint = profileToken.tokenMint;
    // Format price change
    const priceChangeClass = profileToken.priceChange >= 0 ? 'positive' : 'negative';
    const priceChangeSign = profileToken.priceChange >= 0 ? '+' : '';
    tokenDisplay.innerHTML = `
    <div class="wumbo-token-info">
      <span class="wumbo-token-symbol">${profileToken.symbol}</span>
      <span class="wumbo-token-price">$${profileToken.price.toFixed(4)}</span>
      <span class="wumbo-token-change ${priceChangeClass}">${priceChangeSign}${profileToken.priceChange.toFixed(2)}%</span>
    </div>
    <div class="wumbo-token-actions">
      <button class="wumbo-token-action-button wumbo-token-buy-button" data-token-mint="${profileToken.tokenMint}">Buy</button>
      <button class="wumbo-token-action-button wumbo-token-sell-button" data-token-mint="${profileToken.tokenMint}">Sell</button>
    </div>
  `;
    // Add click handlers for buy/sell buttons
    const buyButton = tokenDisplay.querySelector('.wumbo-token-buy-button');
    buyButton?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openTokenBuyModal(profileToken.tokenMint, profileToken.symbol, 'profile');
    });
    const sellButton = tokenDisplay.querySelector('.wumbo-token-sell-button');
    sellButton?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openTokenSellModal(profileToken.tokenMint, profileToken.symbol, 'profile');
    });
    // Insert after bio
    bioSection.parentNode?.insertBefore(tokenDisplay, bioSection.nextSibling);
}
// Extract tweet ID from current URL
function getTweetIdFromUrl() {
    const url = window.location.href;
    const tweetIdMatch = url.match(/\/status\/(\d+)/);
    const tweetId = tweetIdMatch ? tweetIdMatch[1] : '';
    if (tweetId) {
        console.log(`Extracted tweet ID from page URL: ${tweetId}`);
    }
    else {
        console.warn(`Could not extract tweet ID from URL: ${url}`);
    }
    return tweetId;
}
// Inject button on tweets
function injectTweetButtons() {
    // Find all tweets without our button
    const tweets = document.querySelectorAll('article[data-testid="tweet"]:not(.wumbo-processed)');
    tweets.forEach(tweet => {
        // Mark this tweet as processed
        tweet.classList.add('wumbo-processed');
        // Find the tweet actions area (reply, retweet, like buttons)
        const actionsBar = tweet.querySelector('[role="group"]');
        if (!actionsBar)
            return;
        // Create button container (similar to the other action buttons)
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'wumbo-tweet-button-container';
        // Create the token button
        const button = document.createElement('button');
        button.className = `${WUMBO_BUTTON_CLASS} ${WUMBO_TWEET_BUTTON_CLASS}`;
        button.innerHTML = `<span class="wumbo-icon">🪙</span>`;
        button.title = 'Tokenize this post';
        // Add click handler
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Extract tweet info
            const tweetInfo = getTweetInfo(tweet);
            // If tweet ID is missing, try to get it from the page URL
            if (!tweetInfo.tweetId) {
                tweetInfo.tweetId = getTweetIdFromUrl();
            }
            // Open tokenize modal directly in the page
            openTokenizeModal('post', tweetInfo);
        });
        // Add button to container and container to actions bar
        buttonContainer.appendChild(button);
        actionsBar.appendChild(buttonContainer);
    });
}
// Inject token info on tweets
function injectTweetTokenInfo() {
    if (!tokenizedItems)
        return;
    // Find all tweets
    const tweets = document.querySelectorAll('article[data-testid="tweet"]');
    tweets.forEach(tweet => {
        // Extract tweet info
        const tweetInfo = getTweetInfo(tweet);
        if (!tweetInfo.tweetId)
            return;
        // Check if this tweet is tokenized
        const tweetToken = tokenizedItems?.posts[tweetInfo.tweetId];
        if (!tweetToken)
            return;
        // Check if we already injected token info
        const existingTokenInfo = tweet.querySelector(`.${WUMBO_TOKEN_DISPLAY_CLASS}[data-token-mint="${tweetToken.tokenMint}"]`);
        if (existingTokenInfo)
            return;
        // Look for the tweet text to insert token info after
        const tweetText = tweet.querySelector('[data-testid="tweetText"]');
        if (!tweetText)
            return;
        // Create token display element
        const tokenDisplay = document.createElement('div');
        tokenDisplay.className = WUMBO_TOKEN_DISPLAY_CLASS;
        tokenDisplay.dataset.tokenMint = tweetToken.tokenMint;
        // Format price change
        const priceChangeClass = tweetToken.priceChange >= 0 ? 'positive' : 'negative';
        const priceChangeSign = tweetToken.priceChange >= 0 ? '+' : '';
        tokenDisplay.innerHTML = `
      <div class="wumbo-token-info">
        <span class="wumbo-token-symbol">${tweetToken.symbol}</span>
        <span class="wumbo-token-price">$${tweetToken.price.toFixed(4)}</span>
        <span class="wumbo-token-change ${priceChangeClass}">${priceChangeSign}${tweetToken.priceChange.toFixed(2)}%</span>
      </div>
      <div class="wumbo-token-actions">
        <button class="wumbo-token-action-button wumbo-token-buy-button" data-token-mint="${tweetToken.tokenMint}">Buy</button>
        <button class="wumbo-token-action-button wumbo-token-sell-button" data-token-mint="${tweetToken.tokenMint}">Sell</button>
      </div>
    `;
        // Add click handlers for buy/sell buttons
        const buyButton = tokenDisplay.querySelector('.wumbo-token-buy-button');
        buyButton?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openTokenBuyModal(tweetToken.tokenMint, tweetToken.symbol, 'post');
        });
        const sellButton = tokenDisplay.querySelector('.wumbo-token-sell-button');
        sellButton?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openTokenSellModal(tweetToken.tokenMint, tweetToken.symbol, 'post');
        });
        // Insert after tweet text
        tweetText.parentNode?.insertBefore(tokenDisplay, tweetText.nextSibling);
    });
}
// Open modal to buy token
function openTokenBuyModal(tokenMint, symbol, type) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'wumbo-modal-overlay';
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'wumbo-modal';
    // Modal content
    modal.innerHTML = `
    <div class="wumbo-modal-header">
      <h2>Buy ${symbol} Token</h2>
      <button class="wumbo-modal-close">&times;</button>
    </div>
    <div class="wumbo-modal-body">
      <div class="wumbo-input-group">
        <label for="amount">Amount to Buy</label>
        <input type="number" id="amount" class="wumbo-input" min="0.01" step="0.01" value="1" />
      </div>
      
      <div class="wumbo-percentage-buttons">
        <label>Quick SOL %:</label>
        <div class="wumbo-button-group">
          <button class="wumbo-percentage-button" data-percent="25">25%</button>
          <button class="wumbo-percentage-button" data-percent="50">50%</button>
          <button class="wumbo-percentage-button" data-percent="75">75%</button>
          <button class="wumbo-percentage-button" data-percent="100">100%</button>
        </div>
      </div>
      
      <div class="wumbo-price-estimate">
        <span>Estimated Price: </span>
        <span class="wumbo-estimate-value">$0.00</span>
      </div>
      
      <div class="wumbo-price-chart" id="price-chart">
        <div class="wumbo-loading-chart">Loading price data...</div>
      </div>
    </div>
    <div class="wumbo-modal-footer">
      <button class="wumbo-modal-button wumbo-cancel-button">Cancel</button>
      <button class="wumbo-modal-button wumbo-confirm-button">Buy Tokens</button>
    </div>
  `;
    // Add modal to overlay and overlay to body
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    // Handle close button
    const closeButton = modal.querySelector('.wumbo-modal-close');
    closeButton?.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    // Handle cancel button
    const cancelButton = modal.querySelector('.wumbo-cancel-button');
    cancelButton?.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    // Get wallet balance for percentage calculations
    let walletBalance = 0;
    chrome.runtime.sendMessage({ type: 'GET_PRIVY_WALLET' }, (response) => {
        if (response?.success && response.data?.balance) {
            walletBalance = response.data.balance;
            // Update percentage buttons with actual SOL amounts
            const percentageButtons = modal.querySelectorAll('.wumbo-percentage-button');
            percentageButtons.forEach(button => {
                const percent = parseInt(button.dataset.percent || '0');
                const amount = (walletBalance * percent / 100).toFixed(2);
                button.setAttribute('title', `${amount} SOL`);
            });
        }
    });
    // Handle percentage buttons
    const percentageButtons = modal.querySelectorAll('.wumbo-percentage-button');
    percentageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const percent = parseInt(button.dataset.percent || '0');
            const amount = walletBalance * percent / 100;
            // Update the amount input
            const amountInput = modal.querySelector('#amount');
            if (amountInput) {
                amountInput.value = amount.toFixed(2);
                // Trigger the change event to update price estimate
                amountInput.dispatchEvent(new Event('input'));
            }
        });
    });
    // Handle buy button
    const confirmButton = modal.querySelector('.wumbo-confirm-button');
    confirmButton?.addEventListener('click', async () => {
        const amountInput = modal.querySelector('#amount');
        const amount = amountInput?.value ? parseFloat(amountInput.value) : 0;
        if (amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        // Check if we have a Twitter handle
        if (!currentTwitterHandle) {
            alert('No Twitter handle found. Please connect your Twitter account first.');
            return;
        }
        try {
            // Update UI to show processing
            const footer = modal.querySelector('.wumbo-modal-footer');
            if (footer) {
                footer.innerHTML = `
          <div class="wumbo-processing">
            <div class="wumbo-spinner"></div>
            <span>Processing transaction...</span>
          </div>
        `;
            }
            // Call the background script to execute the buy transaction
            const response = await chrome.runtime.sendMessage({
                type: 'BUY_TOKEN',
                data: {
                    tokenMint,
                    amount,
                    slippagePercent: 1 // Default slippage 1%
                }
            });
            if (response.success) {
                // Close modal
                document.body.removeChild(overlay);
                // Show success toast
                showTransactionSuccess(symbol, amount, 'buy');
            }
            else {
                // Show error
                if (footer) {
                    footer.innerHTML = `
            <div class="wumbo-error-message">
              <p>Transaction failed: ${response.error}</p>
              <button class="wumbo-modal-button wumbo-try-again-button">Try Again</button>
            </div>
          `;
                    // Add try again handler
                    const tryAgainButton = footer.querySelector('.wumbo-try-again-button');
                    tryAgainButton?.addEventListener('click', () => {
                        if (footer) {
                            footer.innerHTML = `
                <button class="wumbo-modal-button wumbo-cancel-button">Cancel</button>
                <button class="wumbo-modal-button wumbo-confirm-button">Buy Tokens</button>
              `;
                            // Re-add event listeners
                            const newCancelButton = footer.querySelector('.wumbo-cancel-button');
                            newCancelButton?.addEventListener('click', () => {
                                document.body.removeChild(overlay);
                            });
                            const newConfirmButton = footer.querySelector('.wumbo-confirm-button');
                            newConfirmButton?.addEventListener('click', () => {
                                confirmButton.click();
                            });
                        }
                    });
                }
            }
        }
        catch (error) {
            alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            // Reset the footer
            const footer = modal.querySelector('.wumbo-modal-footer');
            if (footer) {
                footer.innerHTML = `
          <button class="wumbo-modal-button wumbo-cancel-button">Cancel</button>
          <button class="wumbo-modal-button wumbo-confirm-button">Buy Tokens</button>
        `;
                // Re-add event listeners
                const newCancelButton = footer.querySelector('.wumbo-cancel-button');
                newCancelButton?.addEventListener('click', () => {
                    document.body.removeChild(overlay);
                });
                const newConfirmButton = footer.querySelector('.wumbo-confirm-button');
                newConfirmButton?.addEventListener('click', () => {
                    confirmButton.click();
                });
            }
        }
    });
    // Update price estimate when amount changes
    const amountInput = modal.querySelector('#amount');
    const estimateValue = modal.querySelector('.wumbo-estimate-value');
    if (amountInput && estimateValue) {
        // Get token price from our tokenized items
        let tokenPrice = 0;
        // Find the token price
        if (type === 'profile' && tokenizedItems) {
            for (const handle in tokenizedItems.profiles) {
                if (tokenizedItems.profiles[handle].tokenMint === tokenMint) {
                    tokenPrice = tokenizedItems.profiles[handle].price;
                    break;
                }
            }
        }
        else if (tokenizedItems) {
            for (const tweetId in tokenizedItems.posts) {
                if (tokenizedItems.posts[tweetId].tokenMint === tokenMint) {
                    tokenPrice = tokenizedItems.posts[tweetId].price;
                    break;
                }
            }
        }
        const updateEstimate = () => {
            const amount = parseFloat(amountInput.value) || 0;
            const price = amount * tokenPrice;
            estimateValue.textContent = `$${price.toFixed(4)}`;
        };
        // Initial update
        updateEstimate();
        // Update on change
        amountInput.addEventListener('input', updateEstimate);
    }
    // Fetch and display price history
    const priceChart = modal.querySelector('#price-chart');
    if (priceChart) {
        fetchTokenPriceHistory(tokenMint).then(priceData => {
            if (!priceData || priceData.length === 0) {
                priceChart.innerHTML = '<div class="wumbo-no-price-data">No price history available</div>';
                return;
            }
            // Enhanced chart visualization with colored bars
            let chartHtml = '<div class="wumbo-price-chart-container">';
            // Extract prices and find min/max
            const prices = priceData.map((d) => parseFloat(d.close));
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            const range = maxPrice - minPrice;
            // Add price range indicators
            chartHtml += `
        <div class="wumbo-price-range">
          <div class="wumbo-price-max">${maxPrice.toFixed(6)}</div>
          <div class="wumbo-price-min">${minPrice.toFixed(6)}</div>
        </div>
      `;
            // Create bars with up/down coloring
            for (let i = 0; i < prices.length; i++) {
                const height = range > 0 ? ((prices[i] - minPrice) / range * 80) : 50; // 80% max height
                const isUp = i > 0 ? prices[i] >= prices[i - 1] : true;
                chartHtml += `<div class="wumbo-price-bar ${isUp ? 'up' : 'down'}" style="height: ${height}%;" title="$${prices[i].toFixed(6)}"></div>`;
            }
            // Add time labels (simplified)
            chartHtml += `
        <div class="wumbo-time-labels">
          <span>24h ago</span>
          <span>Now</span>
        </div>
      `;
            chartHtml += '</div>';
            priceChart.innerHTML = chartHtml;
        }).catch(() => {
            priceChart.innerHTML = '<div class="wumbo-no-price-data">Failed to load price history</div>';
        });
    }
}
// Open token sell modal
function openTokenSellModal(tokenMint, symbol, type) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'wumbo-modal-overlay';
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'wumbo-modal';
    // Modal content
    modal.innerHTML = `
    <div class="wumbo-modal-header">
      <h2>Sell ${symbol} Token</h2>
      <button class="wumbo-modal-close">&times;</button>
    </div>
    <div class="wumbo-modal-body">
      <div class="wumbo-input-group">
        <label for="amount">Amount to Sell</label>
        <input type="number" id="amount" class="wumbo-input" min="0.01" step="0.01" value="1" />
      </div>
      
      <div class="wumbo-percentage-buttons">
        <label>Quick Token %:</label>
        <div class="wumbo-button-group">
          <button class="wumbo-percentage-button" data-percent="25">25%</button>
          <button class="wumbo-percentage-button" data-percent="50">50%</button>
          <button class="wumbo-percentage-button" data-percent="75">75%</button>
          <button class="wumbo-percentage-button" data-percent="100">100%</button>
        </div>
      </div>
      
      <div class="wumbo-price-estimate">
        <span>Estimated Price: </span>
        <span class="wumbo-estimate-value">$0.00</span>
      </div>
      
      <div class="wumbo-price-chart" id="price-chart">
        <div class="wumbo-loading-chart">Loading price data...</div>
      </div>
    </div>
    <div class="wumbo-modal-footer">
      <button class="wumbo-modal-button wumbo-cancel-button">Cancel</button>
      <button class="wumbo-modal-button wumbo-confirm-button">Sell Tokens</button>
    </div>
  `;
    // Add modal to overlay and overlay to body
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    // Handle close button
    const closeButton = modal.querySelector('.wumbo-modal-close');
    closeButton?.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    // Handle cancel button
    const cancelButton = modal.querySelector('.wumbo-cancel-button');
    cancelButton?.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    // Get token balance for percentage calculations
    let tokenBalance = 0;
    chrome.runtime.sendMessage({
        type: 'GET_TOKEN_BALANCE',
        data: { tokenMint }
    }, (response) => {
        if (response?.success && response.data?.balance) {
            tokenBalance = response.data.balance;
            // Update percentage buttons with actual token amounts
            const percentageButtons = modal.querySelectorAll('.wumbo-percentage-button');
            percentageButtons.forEach(button => {
                const percent = parseInt(button.dataset.percent || '0');
                const amount = (tokenBalance * percent / 100).toFixed(2);
                button.setAttribute('title', `${amount} ${symbol}`);
            });
        }
    });
    // Handle percentage buttons
    const percentageButtons = modal.querySelectorAll('.wumbo-percentage-button');
    percentageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const percent = parseInt(button.dataset.percent || '0');
            const amount = tokenBalance * percent / 100;
            // Update the amount input
            const amountInput = modal.querySelector('#amount');
            if (amountInput) {
                amountInput.value = amount.toFixed(2);
                // Trigger the change event to update price estimate
                amountInput.dispatchEvent(new Event('input'));
            }
        });
    });
    // Handle sell button
    const confirmButton = modal.querySelector('.wumbo-confirm-button');
    confirmButton?.addEventListener('click', async () => {
        const amountInput = modal.querySelector('#amount');
        const amount = amountInput?.value ? parseFloat(amountInput.value) : 0;
        if (amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        // Check if we have a Twitter handle
        if (!currentTwitterHandle) {
            alert('No Twitter handle found. Please connect your Twitter account first.');
            return;
        }
        try {
            // Update UI to show processing
            const footer = modal.querySelector('.wumbo-modal-footer');
            if (footer) {
                footer.innerHTML = `
          <div class="wumbo-processing">
            <div class="wumbo-spinner"></div>
            <span>Processing transaction...</span>
          </div>
        `;
            }
            // Call the background script to execute the sell transaction
            const response = await chrome.runtime.sendMessage({
                type: 'SELL_TOKEN',
                data: {
                    tokenMint,
                    amount,
                    slippagePercent: 1 // Default slippage 1%
                }
            });
            if (response.success) {
                // Close modal
                document.body.removeChild(overlay);
                // Show success toast
                showTransactionSuccess(symbol, amount, 'sell');
            }
            else {
                // Show error
                if (footer) {
                    footer.innerHTML = `
            <div class="wumbo-error-message">
              <p>Transaction failed: ${response.error}</p>
              <button class="wumbo-modal-button wumbo-try-again-button">Try Again</button>
            </div>
          `;
                    // Add try again handler
                    const tryAgainButton = footer.querySelector('.wumbo-try-again-button');
                    tryAgainButton?.addEventListener('click', () => {
                        if (footer) {
                            footer.innerHTML = `
                <button class="wumbo-modal-button wumbo-cancel-button">Cancel</button>
                <button class="wumbo-modal-button wumbo-confirm-button">Sell Tokens</button>
              `;
                            // Re-add event listeners
                            const newCancelButton = footer.querySelector('.wumbo-cancel-button');
                            newCancelButton?.addEventListener('click', () => {
                                document.body.removeChild(overlay);
                            });
                            const newConfirmButton = footer.querySelector('.wumbo-confirm-button');
                            newConfirmButton?.addEventListener('click', () => {
                                confirmButton.click();
                            });
                        }
                    });
                }
            }
        }
        catch (error) {
            alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            // Reset the footer
            const footer = modal.querySelector('.wumbo-modal-footer');
            if (footer) {
                footer.innerHTML = `
          <button class="wumbo-modal-button wumbo-cancel-button">Cancel</button>
          <button class="wumbo-modal-button wumbo-confirm-button">Sell Tokens</button>
        `;
                // Re-add event listeners
                const newCancelButton = footer.querySelector('.wumbo-cancel-button');
                newCancelButton?.addEventListener('click', () => {
                    document.body.removeChild(overlay);
                });
                const newConfirmButton = footer.querySelector('.wumbo-confirm-button');
                newConfirmButton?.addEventListener('click', () => {
                    confirmButton.click();
                });
            }
        }
    });
    // Update price estimate when amount changes
    const amountInput = modal.querySelector('#amount');
    const estimateValue = modal.querySelector('.wumbo-estimate-value');
    if (amountInput && estimateValue) {
        // Get token price from our tokenized items
        let tokenPrice = 0;
        // Find the token price
        if (type === 'profile' && tokenizedItems) {
            for (const handle in tokenizedItems.profiles) {
                if (tokenizedItems.profiles[handle].tokenMint === tokenMint) {
                    tokenPrice = tokenizedItems.profiles[handle].price;
                    break;
                }
            }
        }
        else if (tokenizedItems) {
            for (const tweetId in tokenizedItems.posts) {
                if (tokenizedItems.posts[tweetId].tokenMint === tokenMint) {
                    tokenPrice = tokenizedItems.posts[tweetId].price;
                    break;
                }
            }
        }
        const updateEstimate = () => {
            const amount = parseFloat(amountInput.value) || 0;
            const price = amount * tokenPrice;
            estimateValue.textContent = `$${price.toFixed(4)}`;
        };
        // Initial update
        updateEstimate();
        // Update on change
        amountInput.addEventListener('input', updateEstimate);
    }
    // Fetch and display price history
    const priceChart = modal.querySelector('#price-chart');
    if (priceChart) {
        fetchTokenPriceHistory(tokenMint).then(priceData => {
            if (!priceData || priceData.length === 0) {
                priceChart.innerHTML = '<div class="wumbo-no-price-data">No price history available</div>';
                return;
            }
            // Enhanced chart visualization with colored bars
            let chartHtml = '<div class="wumbo-price-chart-container">';
            // Extract prices and find min/max
            const prices = priceData.map((d) => parseFloat(d.close));
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            const range = maxPrice - minPrice;
            // Add price range indicators
            chartHtml += `
        <div class="wumbo-price-range">
          <div class="wumbo-price-max">${maxPrice.toFixed(6)}</div>
          <div class="wumbo-price-min">${minPrice.toFixed(6)}</div>
        </div>
      `;
            // Create bars with up/down coloring
            for (let i = 0; i < prices.length; i++) {
                const height = range > 0 ? ((prices[i] - minPrice) / range * 80) : 50; // 80% max height
                const isUp = i > 0 ? prices[i] >= prices[i - 1] : true;
                chartHtml += `<div class="wumbo-price-bar ${isUp ? 'up' : 'down'}" style="height: ${height}%;" title="$${prices[i].toFixed(6)}"></div>`;
            }
            // Add time labels (simplified)
            chartHtml += `
        <div class="wumbo-time-labels">
          <span>24h ago</span>
          <span>Now</span>
        </div>
      `;
            chartHtml += '</div>';
            priceChart.innerHTML = chartHtml;
        }).catch(() => {
            priceChart.innerHTML = '<div class="wumbo-no-price-data">Failed to load price history</div>';
        });
    }
}
// Create and open the token creation modal
function openTokenizeModal(type, contextInfo) {
    // Remove any existing modal
    const existingModal = document.getElementById(WUMBO_TOKENIZE_MODAL_ID);
    if (existingModal) {
        existingModal.remove();
    }
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'wumbo-modal-overlay';
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'wumbo-modal wumbo-tokenize-modal';
    modal.id = WUMBO_TOKENIZE_MODAL_ID;
    // Set title based on type
    const title = type === 'profile' ? 'Tokenize Profile' : 'Tokenize Post';
    // Set context-specific fields
    let tokenName = '';
    let tokenSymbol = '';
    let tokenDescription = '';
    if (type === 'profile') {
        tokenName = `${contextInfo.displayName} Token`;
        tokenSymbol = contextInfo.username.substring(0, 5).toUpperCase();
        tokenDescription = `Token for the Twitter profile ${contextInfo.displayName} (@${contextInfo.username})`;
    }
    else { // post
        tokenName = `${contextInfo.displayName ? contextInfo.displayName : 'Post'} Token`;
        tokenSymbol = `${contextInfo.username ? contextInfo.username.substring(0, 3) : 'PT'}`.toUpperCase();
        const tweetIdInfo = contextInfo.tweetId ? ` [ID: ${contextInfo.tweetId}]` : '';
        tokenDescription = `Token for tweet${tweetIdInfo}: "${contextInfo.tweetText.substring(0, 100)}${contextInfo.tweetText.length > 100 ? '...' : ''}"`;
    }
    // Modal content with loading state initially shown
    modal.innerHTML = `
    <div class="wumbo-modal-header">
      <h2>${title}</h2>
      <button class="wumbo-modal-close">&times;</button>
    </div>
    <div class="wumbo-modal-body">
      <div class="wumbo-tokenize-loading">
        <div class="wumbo-spinner"></div>
        <div class="wumbo-tokenize-loading-text">Checking for existing tokens...</div>
      </div>
      
      <div class="wumbo-token-exists-message" style="display: none;">
        <p>This item already has a token! Opening the trading terminal...</p>
        <div class="wumbo-token-exists-details"></div>
      </div>
      
      <div class="wumbo-tokenize-form" style="display: none;">
        <div class="wumbo-input-group">
          <label for="token-name">Token Name</label>
          <input type="text" id="token-name" class="wumbo-input" value="${tokenName}" />
        </div>
        
        <div class="wumbo-input-group">
          <label for="token-symbol">Token Symbol (2-5 characters)</label>
          <input type="text" id="token-symbol" class="wumbo-input" value="${tokenSymbol}" maxlength="5" />
        </div>
        
        <div class="wumbo-input-group">
          <label for="token-description">Description</label>
          <textarea id="token-description" class="wumbo-input" rows="3">${tokenDescription}</textarea>
        </div>
        
      </div>
    </div>
    <div class="wumbo-modal-footer">
      <button class="wumbo-modal-button wumbo-cancel-button">Cancel</button>
      <button class="wumbo-modal-button wumbo-confirm-button" style="display: none;">Create Token</button>
    </div>
  `;
    // Add modal to overlay and overlay to body
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    // Handle close button
    const closeButton = modal.querySelector('.wumbo-modal-close');
    closeButton?.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    // Handle confirm button
    const confirmButton = modal.querySelector('.wumbo-confirm-button');
    confirmButton?.addEventListener('click', async () => {
        // Get form values
        const tokenNameInput = modal.querySelector('#token-name');
        const tokenSymbolInput = modal.querySelector('#token-symbol');
        const tokenDescriptionInput = modal.querySelector('#token-description');
        const tokenName = tokenNameInput.value;
        const tokenSymbol = tokenSymbolInput.value;
        const tokenDescription = tokenDescriptionInput.value;
        const tokenSupply = "1000000000";
        // Validate inputs
        if (!tokenName || !tokenSymbol || !tokenDescription || !tokenSupply) {
            alert('Please fill out all fields');
            return;
        }
        if (tokenSymbol.length < 2 || tokenSymbol.length > 5) {
            alert('Token symbol must be 2-5 characters');
            return;
        }
        // Check if we have a Twitter handle
        if (!currentTwitterHandle) {
            alert('No Twitter handle found. Please connect your Twitter account first.');
            return;
        }
        try {
            // Update UI to show processing
            const body = modal.querySelector('.wumbo-modal-body');
            const footer = modal.querySelector('.wumbo-modal-footer');
            if (body) {
                // Hide the form
                const form = body.querySelector('.wumbo-tokenize-form');
                if (form)
                    form.style.display = 'none';
                // Show processing
                const loading = document.createElement('div');
                loading.className = 'wumbo-tokenize-processing';
                loading.innerHTML = `
          <div class="wumbo-spinner"></div>
          <div class="wumbo-tokenize-loading-text">Creating your token...</div>
        `;
                body.appendChild(loading);
            }
            if (footer) {
                footer.innerHTML = `
          <div class="wumbo-processing-message">This may take a minute. Please wait...</div>
        `;
            }
            // Prepare token data
            const tokenData = {
                name: tokenName,
                symbol: tokenSymbol,
                description: tokenDescription,
                initialSupply: tokenSupply,
                twitterHandle: currentTwitterHandle,
                tokenType: type === 'profile' ? 'profile' : 'post'
            };
            // Add tweet ID if it's a post
            if (type === 'post' && contextInfo.tweetId) {
                tokenData.tweetId = contextInfo.tweetId;
                tokenData.name = contextInfo.tweetId;
                console.log(`Including tweetId in token data: ${contextInfo.tweetId}`);
            }
            // Get wallet
            const walletResponse = await chrome.runtime.sendMessage({ type: 'GET_PRIVY_WALLET' });
            if (!walletResponse.success || !walletResponse.data.isConnected) {
                throw new Error('Wallet not connected. Please connect a wallet first.');
            }
            const walletAddress = walletResponse.data.address;
            // Call background script to create token
            const response = await chrome.runtime.sendMessage({
                type: 'CREATE_TOKEN',
                data: {
                    tokenData,
                    walletAddress
                }
            });
            if (response.success) {
                // Update modal to show success
                if (body) {
                    body.innerHTML = `
            <div class="wumbo-tokenize-success">
              <div class="wumbo-success-icon">✓</div>
              <h3>Token Created Successfully!</h3>
              <div class="wumbo-token-details">
                <p><strong>Name:</strong> ${response.data.name}</p>
                <p><strong>Symbol:</strong> ${response.data.symbol}</p>
                <p><strong>Mint Address:</strong> ${response.data.mint}</p>
              </div>
              <p class="wumbo-success-message">Your token is now live! It will appear in the Wumbo interface shortly.</p>
            </div>
          `;
                }
                if (footer) {
                    footer.innerHTML = `
            <button class="wumbo-modal-button wumbo-close-success-button">Close</button>
          `;
                    const closeButton = footer.querySelector('.wumbo-close-success-button');
                    closeButton?.addEventListener('click', () => {
                        document.body.removeChild(overlay);
                        // Notify Twitter that a token was created
                        chrome.runtime.sendMessage({
                            type: 'NOTIFY_TOKEN_CREATION',
                            data: response.data
                        });
                    });
                }
            }
            else {
                // Show error message
                if (body) {
                    body.innerHTML = `
            <div class="wumbo-tokenize-error">
              <div class="wumbo-error-icon">!</div>
              <h3>Token Creation Failed</h3>
              <p class="wumbo-error-message">${response.error || 'An unknown error occurred'}</p>
              <p>Please try again or contact support if the problem persists.</p>
            </div>
          `;
                }
                if (footer) {
                    footer.innerHTML = `
            <button class="wumbo-modal-button wumbo-try-again-button">Try Again</button>
            <button class="wumbo-modal-button wumbo-close-error-button">Close</button>
          `;
                    const tryAgainButton = footer.querySelector('.wumbo-try-again-button');
                    tryAgainButton?.addEventListener('click', () => {
                        // Remove the overlay and open a new modal
                        document.body.removeChild(overlay);
                        openTokenizeModal(type, contextInfo);
                    });
                    const closeButton = footer.querySelector('.wumbo-close-error-button');
                    closeButton?.addEventListener('click', () => {
                        document.body.removeChild(overlay);
                    });
                }
            }
        }
        catch (error) {
            alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            // Reset the modal
            const body = modal.querySelector('.wumbo-modal-body');
            const footer = modal.querySelector('.wumbo-modal-footer');
            if (body) {
                // Show the form again
                const processingElement = body.querySelector('.wumbo-tokenize-processing');
                if (processingElement)
                    body.removeChild(processingElement);
                const form = body.querySelector('.wumbo-tokenize-form');
                if (form)
                    form.style.display = 'block';
            }
            if (footer) {
                footer.innerHTML = `
          <button class="wumbo-modal-button wumbo-cancel-button">Cancel</button>
          <button class="wumbo-modal-button wumbo-confirm-button">Create Token</button>
        `;
                // Re-add event listeners
                const newCancelButton = footer.querySelector('.wumbo-cancel-button');
                newCancelButton?.addEventListener('click', () => {
                    document.body.removeChild(overlay);
                });
                const newConfirmButton = footer.querySelector('.wumbo-confirm-button');
                newConfirmButton?.addEventListener('click', () => {
                    confirmButton.click();
                });
            }
        }
    });
    // Handle cancel button
    const cancelButton = modal.querySelector('.wumbo-cancel-button');
    cancelButton?.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    // Function to open extension's trading terminal for a token
    const openTrading = (poolId, mintAddress, tokenData) => {
        console.log('Opening trading view for token:', { poolId, mintAddress, tokenData });
        // Create a sidepane trading view instead of navigating away
        const sidepane = document.createElement('div');
        sidepane.className = 'wumbo-trading-sidepane';
        // Create a header for the sidepane
        const header = document.createElement('div');
        header.className = 'wumbo-sidepane-header';
        // Add close button to header
        const closeBtn = document.createElement('button');
        closeBtn.className = 'wumbo-sidepane-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = () => document.body.removeChild(sidepane);
        // Add title to header
        const title = document.createElement('h2');
        title.textContent = 'Trading Terminal';
        header.appendChild(title);
        header.appendChild(closeBtn);
        sidepane.appendChild(header);
        // Add success message if this is a newly created token
        const successMsg = document.createElement('div');
        successMsg.className = 'wumbo-sidepane-success';
        successMsg.innerHTML = `
      <h3>Token Created Successfully!</h3>
      <p>Your token pool is now active and ready for trading.</p>
    `;
        sidepane.appendChild(successMsg);
        // Add token info section
        const tokenInfo = document.createElement('div');
        tokenInfo.className = 'wumbo-sidepane-token-info';
        // Format token info based on what we have
        let tokenSymbol = tokenData?.symbol || 'TOKEN';
        let tokenName = tokenData?.name || 'Token';
        tokenInfo.innerHTML = `
      <div class="wumbo-token-header">
        <h3>${tokenName} (${tokenSymbol})</h3>
      </div>
    `;
        sidepane.appendChild(tokenInfo);
        // Add the price chart (klines)
        const chartContainer = document.createElement('div');
        chartContainer.className = 'wumbo-sidepane-chart';
        chartContainer.innerHTML = '<div class="wumbo-loading-spinner"></div><p>Loading price data...</p>';
        sidepane.appendChild(chartContainer);
        // Add a basic trading interface
        const tradingInterface = document.createElement('div');
        tradingInterface.className = 'wumbo-sidepane-trading';
        tradingInterface.innerHTML = `
      <div class="wumbo-tabs">
        <div class="wumbo-tab active">Buy</div>
        <div class="wumbo-tab">Sell</div>
      </div>
      <div class="wumbo-trading-form">
        <div class="wumbo-input-group">
          <label>Amount (% of holdings)</label>
          <div class="wumbo-input-with-button">
            <input type="number" class="wumbo-amount-input" placeholder="0" min="1" max="100" value="50" />
            <span class="wumbo-percent-sign">%</span>
          </div>
          <div class="wumbo-percentage-buttons">
            <button class="wumbo-percent-btn" data-percent="25">25%</button>
            <button class="wumbo-percent-btn" data-percent="50">50%</button>
            <button class="wumbo-percent-btn" data-percent="75">75%</button>
            <button class="wumbo-percent-btn" data-percent="100">100%</button>
          </div>
        </div>
        <div class="wumbo-amount-preview">
          <span class="wumbo-preview-label">You will trade:</span>
          <span class="wumbo-preview-value">Calculating...</span>
        </div>
        <button class="wumbo-trade-button">Buy ${tokenSymbol}</button>
      </div>
    `;
        sidepane.appendChild(tradingInterface);
        // Fetch and render price chart data
        fetchTokenPriceHistory(mintAddress).then(priceData => {
            if (!priceData || priceData.length === 0) {
                chartContainer.innerHTML = '<p>No price data available</p>';
                return;
            }
            // Process price data for chart
            const prices = priceData.map((d) => parseFloat(d.close));
            const times = priceData.map((d) => new Date(d.time * 1000).toLocaleTimeString());
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            const range = maxPrice - minPrice;
            // Create a simple chart
            let chartHTML = '<div class="wumbo-chart-container">';
            // Add price labels
            chartHTML += `
        <div class="wumbo-price-labels">
          <div class="wumbo-price-max">${maxPrice.toFixed(6)} SOL</div>
          <div class="wumbo-price-min">${minPrice.toFixed(6)} SOL</div>
        </div>
      `;
            // Add candles/bars
            chartHTML += '<div class="wumbo-chart-bars">';
            for (let i = 0; i < prices.length; i++) {
                const height = range > 0 ? ((prices[i] - minPrice) / range * 100) : 50;
                const isUp = i > 0 ? prices[i] >= prices[i - 1] : true;
                chartHTML += `
          <div class="wumbo-bar ${isUp ? 'up' : 'down'}" 
               style="height: ${height}%;" 
               title="${times[i]}: ${prices[i].toFixed(6)} SOL">
          </div>
        `;
            }
            chartHTML += '</div>'; // end chart bars
            // Add time labels
            chartHTML += `
        <div class="wumbo-time-labels">
          <span>${times[0]}</span>
          <span>${times[Math.floor(times.length / 2)]}</span>
          <span>${times[times.length - 1]}</span>
        </div>
      `;
            chartHTML += '</div>'; // end chart container
            // Add current price
            const currentPrice = prices[prices.length - 1];
            chartHTML += `
        <div class="wumbo-current-price">
          <span>Current Price: ${currentPrice.toFixed(6)} SOL</span>
        </div>
      `;
            // Update the chart container
            chartContainer.innerHTML = chartHTML;
        }).catch(error => {
            console.error('Error fetching price data:', error);
            chartContainer.innerHTML = '<p>Failed to load price data</p>';
        });
        // Add tab switching functionality
        setTimeout(() => {
            const tabs = sidepane.querySelectorAll('.wumbo-tab');
            const tradeButton = sidepane.querySelector('.wumbo-trade-button');
            const percentInput = sidepane.querySelector('.wumbo-amount-input');
            const previewValue = sidepane.querySelector('.wumbo-preview-value');
            const percentButtons = sidepane.querySelectorAll('.wumbo-percent-btn');
            // Track balances
            let walletBalance = 0;
            let tokenBalance = 0;
            let currentAmount = 0;
            // Get initial balances
            const updateBalances = (activeTab) => {
                const isBuy = activeTab?.textContent?.includes('Buy');
                if (isBuy) {
                    // Get wallet balance
                    chrome.runtime.sendMessage({ type: 'GET_PRIVY_WALLET' }, response => {
                        if (response?.success && response.data?.balance) {
                            walletBalance = response.data.balance;
                            updateAmountPreview();
                        }
                    });
                }
                else {
                    // Get token balance
                    chrome.runtime.sendMessage({
                        type: 'GET_TOKEN_BALANCE',
                        data: { tokenMint: mintAddress }
                    }, response => {
                        if (response?.success && response.data?.balance) {
                            tokenBalance = response.data.balance;
                            updateAmountPreview();
                        }
                    });
                }
            };
            // Calculate and update the amount preview
            const updateAmountPreview = () => {
                const activeTab = sidepane.querySelector('.wumbo-tab.active');
                const isBuy = activeTab?.textContent?.includes('Buy');
                const balance = isBuy ? walletBalance : tokenBalance;
                const percentValue = Math.min(Math.max(parseInt(percentInput.value) || 0, 0), 100);
                // Calculate actual amount
                currentAmount = (balance * percentValue / 100);
                // Format with appropriate suffix
                if (isBuy) {
                    previewValue.textContent = `${currentAmount.toFixed(4)} SOL`;
                }
                else {
                    previewValue.textContent = `${currentAmount.toFixed(2)} ${tokenSymbol}`;
                }
            };
            // Get initial balances based on active tab
            updateBalances(sidepane.querySelector('.wumbo-tab.active'));
            // Update preview when percentage changes
            percentInput.addEventListener('input', updateAmountPreview);
            // Handle percentage button clicks
            percentButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const percent = btn.dataset.percent;
                    percentInput.value = percent || '50';
                    updateAmountPreview();
                });
            });
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Update active tab
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    // Update button text
                    const isBuy = tab.textContent?.includes('Buy');
                    if (tradeButton) {
                        tradeButton.textContent = (isBuy ? 'Buy ' : 'Sell ') + tokenSymbol;
                        tradeButton.className = `wumbo-trade-button ${isBuy ? 'buy' : 'sell'}`;
                    }
                    // Get balances for the selected tab
                    updateBalances(tab);
                });
            });
            // Handle trade button
            tradeButton?.addEventListener('click', () => {
                const activeTab = sidepane.querySelector('.wumbo-tab.active');
                const isBuy = activeTab?.textContent?.includes('Buy');
                if (currentAmount <= 0) {
                    alert('Please enter a valid amount');
                    return;
                }
                const messageType = isBuy ? 'BUY_TOKEN' : 'SELL_TOKEN';
                // Disable button and show loading
                tradeButton.disabled = true;
                tradeButton.innerHTML = '<div class="wumbo-button-spinner"></div> Processing...';
                // Send transaction request
                chrome.runtime.sendMessage({
                    type: messageType,
                    data: {
                        tokenMint: mintAddress,
                        amount: currentAmount,
                        slippagePercent: 1
                    }
                }, response => {
                    if (response?.success) {
                        // Show success
                        tradeButton.className = 'wumbo-trade-button success';
                        tradeButton.textContent = 'Transaction Complete!';
                        // Reset after a moment
                        setTimeout(() => {
                            tradeButton.disabled = false;
                            tradeButton.className = `wumbo-trade-button ${isBuy ? 'buy' : 'sell'}`;
                            tradeButton.textContent = (isBuy ? 'Buy ' : 'Sell ') + tokenSymbol;
                            percentInput.value = '50'; // Reset to default 50%
                            updateAmountPreview();
                            updateBalances(activeTab); // Refresh balances after transaction
                        }, 3000);
                        // Show toast
                        showTransactionSuccess(tokenSymbol, currentAmount, isBuy ? 'buy' : 'sell');
                    }
                    else {
                        // Show error
                        tradeButton.className = 'wumbo-trade-button error';
                        tradeButton.textContent = 'Transaction Failed';
                        // Reset after a moment
                        setTimeout(() => {
                            tradeButton.disabled = false;
                            tradeButton.className = `wumbo-trade-button ${isBuy ? 'buy' : 'sell'}`;
                            tradeButton.textContent = (isBuy ? 'Buy ' : 'Sell ') + tokenSymbol;
                        }, 3000);
                        alert('Transaction failed: ' + (response?.error || 'Unknown error'));
                    }
                });
            });
        }, 0);
        // Add CSS for the sidepane
        const style = document.createElement('style');
        style.textContent = `
      .wumbo-trading-sidepane {
        position: fixed;
        top: 0;
        right: 0;
        width: 350px;
        height: 100vh;
        background-color: white;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        padding: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      
      .wumbo-sidepane-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        border-bottom: 1px solid #e1e8ed;
        padding-bottom: 12px;
      }
      
      .wumbo-sidepane-header h2 {
        margin: 0;
        font-size: 18px;
        color: #14171a;
      }
      
      .wumbo-sidepane-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #657786;
      }
      
      .wumbo-sidepane-success {
        background-color: #d4edda;
        color: #155724;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 16px;
      }
      
      .wumbo-sidepane-success h3 {
        margin-top: 0;
        margin-bottom: 8px;
        font-size: 16px;
      }
      
      .wumbo-sidepane-success p {
        margin: 0;
        font-size: 14px;
      }
      
      .wumbo-sidepane-token-info {
        background-color: #f8f9fa;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 16px;
      }
      
      .wumbo-token-header h3 {
        margin: 0;
        font-size: 16px;
        color: #14171a;
      }
      
      .wumbo-sidepane-chart {
        background-color: white;
        border: 1px solid #e1e8ed;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 16px;
        height: 200px;
        position: relative;
      }
      
      .wumbo-chart-container {
        height: 160px;
        position: relative;
        display: flex;
      }
      
      .wumbo-price-labels {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 30%;
        font-size: 12px;
        color: #657786;
        padding-right: 8px;
      }
      
      .wumbo-chart-bars {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        width: 70%;
        height: 160px;
        gap: 2px;
      }
      
      .wumbo-bar {
        flex: 1;
        width: 4px;
        min-height: 1px;
        background-color: #1da1f2;
        border-radius: 2px 2px 0 0;
      }
      
      .wumbo-bar.up {
        background-color: #17bf63;
      }
      
      .wumbo-bar.down {
        background-color: #e0245e;
      }
      
      .wumbo-time-labels {
        display: flex;
        justify-content: space-between;
        width: 70%;
        margin-left: 30%;
        font-size: 10px;
        color: #657786;
        margin-top: 4px;
      }
      
      .wumbo-current-price {
        text-align: center;
        font-weight: bold;
        margin-top: 8px;
        font-size: 14px;
        color: #14171a;
      }
      
      .wumbo-loading-spinner {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #1da1f2;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        animation: wumbo-spin 1s linear infinite;
        margin: 60px auto 16px;
      }
      
      @keyframes wumbo-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .wumbo-sidepane-trading {
        background-color: white;
        border: 1px solid #e1e8ed;
        border-radius: 8px;
        padding: 12px;
      }
      
      .wumbo-tabs {
        display: flex;
        border-bottom: 1px solid #e1e8ed;
        margin-bottom: 16px;
      }
      
      .wumbo-tab {
        padding: 8px 16px;
        cursor: pointer;
        color: #657786;
        font-weight: 500;
        position: relative;
      }
      
      .wumbo-tab.active {
        color: #1da1f2;
      }
      
      .wumbo-tab.active:after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #1da1f2;
      }
      
      .wumbo-trading-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .wumbo-input-group label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        color: #657786;
        font-weight: 500;
      }
      
      .wumbo-input-with-button {
        display: flex;
        border: 1px solid #e1e8ed;
        border-radius: 4px;
        overflow: hidden;
      }
      
      .wumbo-amount-input {
        flex: 1;
        padding: 8px 12px;
        border: none;
        outline: none;
        font-size: 14px;
      }
      
      .wumbo-percent-sign {
        background-color: #f5f8fa;
        border-left: 1px solid #e1e8ed;
        padding: 0 12px;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        align-items: center;
        color: #657786;
      }
      
      .wumbo-percentage-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        gap: 8px;
      }
      
      .wumbo-percent-btn {
        flex: 1;
        background-color: #f5f8fa;
        border: 1px solid #e1e8ed;
        border-radius: 4px;
        padding: 6px 0;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        color: #657786;
        transition: all 0.2s ease;
      }
      
      .wumbo-percent-btn:hover {
        background-color: #e1e8ed;
      }
      
      .wumbo-percent-btn:active {
        background-color: #1da1f2;
        color: white;
        border-color: #1da1f2;
      }
      
      .wumbo-amount-preview {
        background-color: #f8f9fa;
        border: 1px solid #e1e8ed;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .wumbo-preview-label {
        font-size: 14px;
        color: #657786;
      }
      
      .wumbo-preview-value {
        font-weight: bold;
        color: #14171a;
      }
      
      .wumbo-max-button {
        background-color: #f5f8fa;
        border: none;
        border-left: 1px solid #e1e8ed;
        padding: 0 12px;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        color: #1da1f2;
      }
      
      .wumbo-trade-button {
        background-color: #1da1f2;
        color: white;
        border: none;
        border-radius: 50px;
        padding: 10px;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.2s;
        position: relative;
      }
      
      .wumbo-trade-button.buy {
        background-color: #17bf63;
      }
      
      .wumbo-trade-button.sell {
        background-color: #e0245e;
      }
      
      .wumbo-trade-button.success {
        background-color: #17bf63;
      }
      
      .wumbo-trade-button.error {
        background-color: #e0245e;
      }
      
      .wumbo-trade-button:hover {
        opacity: 0.9;
      }
      
      .wumbo-button-spinner {
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: wumbo-spin 1s linear infinite;
        margin-right: 8px;
        vertical-align: middle;
      }
    `;
        document.head.appendChild(style);
        document.body.appendChild(sidepane);
        // Close the modal if it exists
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
    };
    // First check if a token already exists for this symbol
    (async () => {
        let searchTerm = '';
        let searchSymbol = '';
        if (type === 'profile') {
            // For profiles, search by symbol (username-based)
            searchSymbol = contextInfo.username.substring(0, 5).toUpperCase();
            searchTerm = searchSymbol;
        }
        else { // post
            // For posts, use the tweet ID as search term
            searchSymbol = `${contextInfo.username ? contextInfo.username.substring(0, 3) : 'PT'}`.toUpperCase();
            searchTerm = contextInfo.tweetId || ''; // Use tweetId as search term
        }
        try {
            // Call CHECK_TOKEN_EXISTS to search for existing tokens
            const response = await chrome.runtime.sendMessage({
                type: 'CHECK_TOKEN_EXISTS',
                data: {
                    searchText: searchTerm,
                    searchType: type === 'post' ? 'tweetId' : 'symbol'
                }
            });
            const loadingDiv = modal.querySelector('.wumbo-tokenize-loading');
            const formDiv = modal.querySelector('.wumbo-tokenize-form');
            const confirmBtn = modal.querySelector('.wumbo-confirm-button');
            // Clear loading state
            if (loadingDiv)
                loadingDiv.style.display = 'none';
            // If tokens exist, navigate directly to the trading terminal
            if (response?.success && response.exists && response.data?.tokens?.length > 0) {
                const matchingTokens = response.data.tokens;
                console.log('Found matching tokens:', matchingTokens);
                // Sort tokens by creation date and pick the oldest one
                const sortedTokens = [...matchingTokens].sort((a, b) => {
                    // If createAt is available, use it for sorting
                    if (a.createAt && b.createAt) {
                        return new Date(a.createAt).getTime() - new Date(b.createAt).getTime();
                    }
                    return 0; // Default case, keep original order
                });
                // Select the oldest token (first in the sorted array)
                const selectedToken = sortedTokens[0];
                // Show the tokens found message
                const existsMessage = modal.querySelector('.wumbo-token-exists-message');
                if (existsMessage) {
                    existsMessage.style.display = 'block';
                    existsMessage.innerHTML = `
            <p>Token "${selectedToken.name}" (${selectedToken.symbol}) already exists!</p>
            <p>Opening trading terminal for the oldest matching token...</p>
          `;
                }
                // Fetch price history data for the token
                const priceData = await fetchTokenPriceHistory(selectedToken.mint);
                // Update modal body to show price chart while waiting
                const body = modal.querySelector('.wumbo-modal-body');
                if (body && priceData && priceData.length > 0) {
                    // Create chart element
                    const chartDiv = document.createElement('div');
                    chartDiv.className = 'wumbo-token-price-chart';
                    // Simple chart visualization (can be enhanced with a proper chart library)
                    let chartHtml = '<div class="wumbo-price-chart-container">';
                    // Extract prices and find min/max
                    const prices = priceData.map((d) => parseFloat(d.close));
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);
                    const range = maxPrice - minPrice;
                    // Current price
                    const currentPrice = prices[prices.length - 1];
                    // Create bars
                    for (let i = 0; i < prices.length; i++) {
                        const height = range > 0 ? ((prices[i] - minPrice) / range * 80) : 40; // 80% max height
                        const isUp = i > 0 ? prices[i] > prices[i - 1] : true;
                        chartHtml += `<div class="wumbo-price-bar ${isUp ? 'up' : 'down'}" style="height: ${height}%;" title="$${prices[i].toFixed(6)}"></div>`;
                    }
                    chartHtml += '</div>';
                    chartHtml += `<div class="wumbo-price-info">Current Price: ${currentPrice.toFixed(6)} SOL</div>`;
                    chartDiv.innerHTML = chartHtml;
                    body.appendChild(chartDiv);
                }
                // Wait a brief moment to show the message and chart before redirecting
                setTimeout(() => {
                    openTrading(selectedToken.poolId, selectedToken.mint, selectedToken);
                }, 2500);
            }
            else {
                // No existing tokens found, show the create token form
                if (formDiv)
                    formDiv.style.display = 'block';
                if (confirmBtn)
                    confirmBtn.style.display = 'block';
            }
        }
        catch (error) {
            console.error('Error checking for existing tokens:', error);
            // Show the create token form in case of error
            const loadingDiv = modal.querySelector('.wumbo-tokenize-loading');
            const formDiv = modal.querySelector('.wumbo-tokenize-form');
            const confirmBtn = modal.querySelector('.wumbo-confirm-button');
            if (loadingDiv)
                loadingDiv.style.display = 'none';
            if (formDiv)
                formDiv.style.display = 'block';
            if (confirmBtn)
                confirmBtn.style.display = 'block';
        }
    })();
}
// Show transaction success message
function showTransactionSuccess(symbol, amount, type) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.wumbo-toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'wumbo-toast-container';
        document.body.appendChild(toastContainer);
    }
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'wumbo-toast wumbo-toast-success';
    // Success message
    const action = type === 'buy' ? 'bought' : 'sold';
    toast.innerHTML = `
    <div class="wumbo-toast-icon">✓</div>
    <div class="wumbo-toast-message">
      Successfully ${action} ${amount} ${symbol} tokens!
    </div>
    <button class="wumbo-toast-close">&times;</button>
  `;
    // Add to container
    toastContainer.appendChild(toast);
    // Handle close button
    const closeButton = toast.querySelector('.wumbo-toast-close');
    closeButton?.addEventListener('click', () => {
        toastContainer?.removeChild(toast);
    });
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode === toastContainer) {
            toastContainer?.removeChild(toast);
        }
    }, 5000);
}
// Initialize the content script
initialize();

})();

/******/ })()
;
//# sourceMappingURL=twitter-inject.js.map