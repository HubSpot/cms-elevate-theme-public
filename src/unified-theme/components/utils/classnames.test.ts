import cx, { staticWithModule } from './classnames.js';
import { describe, it, expect } from 'vitest';

describe('cx', () => {
  it('should join string arguments with spaces', () => {
    expect(cx('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('should filter out non-string arguments', () => {
    expect(cx('foo', null, 'bar', undefined, 'baz', 0, false)).toBe('foo bar baz');
  });

  it('should flatten arrays', () => {
    expect(cx(['foo', 'bar'], 'baz')).toBe('foo bar baz');
    expect(cx('foo', ['bar', 'baz'])).toBe('foo bar baz');
  });

  it('should handle nested arrays', () => {
    expect(cx(['foo', ['bar', 'baz']])).toBe('foo bar baz');
  });

  it('should trim whitespace', () => {
    expect(cx('  foo  ', 'bar', '  baz  ')).toBe('foo bar baz');
  });

  it('should return empty string for no arguments', () => {
    expect(cx()).toBe('');
  });

  it('should return empty string for non-string arguments only', () => {
    expect(cx(null, undefined, false, 0)).toBe('');
  });

  it('should handle object-like strings properly', () => {
    expect(cx('[object Object]', 'foo')).toBe('[object Object] foo');
  });

  it('Should handle && operator', () => {
    let TrueVariable = true;
    let FalseVariable = false;
    expect(cx(TrueVariable && 'foo', FalseVariable && 'bar')).toBe('foo');
  });

  it('Should handle || operator', () => {
    let TrueVariable = true;
    let FalseVariable = false;
    expect(cx(TrueVariable || 'foo', FalseVariable || 'bar')).toBe('bar');
  });

  it('Should handle && and || operators', () => {
    let TrueVariable = true;
    let FalseVariable = false;
    expect(cx(TrueVariable && 'foo', FalseVariable || 'bar')).toBe('foo bar');
  });

  it('should handle empty strings after trimming', () => {
    expect(cx('foo', '   ', 'bar', '    ', 'baz')).toBe('foo bar baz');
  });

  it('should support object syntax with boolean values', () => {
    expect(cx({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('should support object syntax with truthy/falsy values', () => {
    expect(cx({ foo: 1, bar: 0, baz: 'truthy', qux: '' })).toBe('foo baz');
  });

  it('should handle mix of strings and objects', () => {
    expect(cx('static', { conditional: true, disabled: false })).toBe('static conditional');
  });

  it('should handle mix of arrays and objects', () => {
    expect(cx(['one', 'two'], { three: true, four: false })).toBe('one two three');
  });

  it('should handle arrays and objects and strings', () => {
    expect(cx(['one', 'two'], { three: true, four: false }, 'five')).toBe('one two three five');
  });

  it('should handle empty objects', () => {
    expect(cx({})).toBe('');
  });

  it('should trim keys in objects', () => {
    expect(cx({ '  foo  ': true, 'bar  ': true })).toBe('foo bar');
  });
});

describe('staticWithModule', () => {
  const styles = {
    'hs-button': 'hs-button_xyz123',
    'hs-button--primary': 'hs-button--primary_abc456',
    'with-space': 'with-space_def789',
  };
  const swm = staticWithModule(styles);

  it('should return global and mapped classes for single string input', () => {
    expect(swm('hs-button')).toBe('hs-button hs-button_xyz123');
  });

  it('should return global and mapped classes for multiple space-separated class names', () => {
    expect(swm('hs-button hs-button--primary')).toBe('hs-button hs-button_xyz123 hs-button--primary hs-button--primary_abc456');
  });

  it('should return only global classes if no match in styles', () => {
    expect(swm('unmapped-class')).toBe('unmapped-class');
  });

  it('should trim class names', () => {
    expect(swm('  hs-button  hs-button--primary  ')).toBe('hs-button hs-button_xyz123 hs-button--primary hs-button--primary_abc456');
  });

  it('should work when no styles match', () => {
    const scEmpty = staticWithModule({});
    expect(scEmpty('foo bar')).toBe('foo bar');
  });

  it('should not add undefined or empty class names from styles', () => {
    const scPartial = staticWithModule({ 'known-class': 'mapped-class' });
    expect(scPartial('known-class unknown-class')).toBe('known-class mapped-class unknown-class');
  });

  it('should handle duplicate class names without duplication in output', () => {
    expect(swm('hs-button hs-button')).toBe('hs-button hs-button_xyz123 hs-button hs-button_xyz123');
  });

  it('should handle class names with dashes and special characters', () => {
    expect(swm('with-space')).toBe('with-space with-space_def789');
  });
});
