const escape = (segment) => segment.replaceAll('~', '~0').replaceAll('/', '~1');
const unescape = (segment) => segment.replaceAll('~1', '/').replaceAll('~0', '~');

const segments = (path) => {
  if (!Array.isArray(path)) throw new TypeError('Invalid type: path must be an array of segments.');
  return path.map(String);
};

export const encodePointer = (path) =>
  segments(path)
    .map((segment) => `/${escape(segment)}`)
    .join('');

export const encodeUriFragmentIdentifier = (path) =>
  `#${segments(path)
    .map((segment) => `/${encodeURIComponent(escape(segment))}`)
    .join('')}`;

const decodePointer = (pointer) => {
  if (pointer === '') return [];
  if (!pointer.startsWith('/')) {
    throw new ReferenceError('Invalid JSON Pointer syntax: it must begin with a solidus `/`.');
  }
  return pointer.slice(1).split('/').map(unescape);
};

const decodeUriFragmentIdentifier = (pointer) => {
  if (pointer === '#') return [];
  if (!pointer.startsWith('#/')) throw new ReferenceError('Invalid JSON Pointer syntax.');
  return pointer
    .slice(2)
    .split('/')
    .map((segment) => unescape(decodeURIComponent(segment)));
};

export const JsonPointer = {
  decode: (pointer) => {
    if (typeof pointer !== 'string') {
      throw new TypeError('Invalid type: JSON Pointers are represented as strings.');
    }
    return pointer.startsWith('#') ? decodeUriFragmentIdentifier(pointer) : decodePointer(pointer);
  },
};
