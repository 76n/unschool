const UNSAFE_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

const isPlainMergeable = (value) =>
  value !== null &&
  typeof value === 'object' &&
  !(value instanceof RegExp) &&
  !(value instanceof Date);

const settingsOf = (options = {}) => ({
  isMergeableObject: options.isMergeableObject ?? isPlainMergeable,
  arrayMerge:
    options.arrayMerge ??
    ((target, source, o) => [...target, ...source].map((item) => cloneValue(item, o))),
  customMerge: options.customMerge,
});

const empty = (value) => (Array.isArray(value) ? [] : {});

const cloneValue = (value, settings) =>
  settings.isMergeableObject(value) ? mergeWith(empty(value), value, settings) : value;

const mergeObjects = (target, source, settings) => {
  const result = {};
  for (const key of Object.keys(target)) {
    if (!UNSAFE_KEYS.has(key)) result[key] = cloneValue(target[key], settings);
  }
  for (const key of Object.keys(source)) {
    if (UNSAFE_KEYS.has(key)) continue;
    if (key in result && settings.isMergeableObject(source[key])) {
      const merge = settings.customMerge?.(key, settings) ?? deepmerge;
      result[key] = merge(result[key], source[key], settings);
    } else {
      result[key] = cloneValue(source[key], settings);
    }
  }
  return result;
};

const mergeWith = (target, source, settings) => {
  if (Array.isArray(source) !== Array.isArray(target)) return cloneValue(source, settings);
  if (Array.isArray(source)) return settings.arrayMerge(target, source, settings);
  return mergeObjects(target, source, settings);
};

const deepmerge = (target, source, options) => mergeWith(target, source, settingsOf(options));

deepmerge.all = (values, options) => {
  if (!Array.isArray(values)) throw new Error('first argument should be an array');
  return values.reduce((merged, value) => deepmerge(merged, value, options), {});
};

export { deepmerge as default, deepmerge as 'module.exports' };
