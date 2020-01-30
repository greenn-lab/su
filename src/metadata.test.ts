/**
 * @jest-environment jsdom
 */

import metadata from './metadata'

describe('metadata tests', () => {
  it('wrong pattern', () => {
    // GIVEN
    const input = document.createElement('input')
    input.setAttribute('data-pattern', '#X,##0.0')

    // WHEN
    const actual = () => metadata(input)

    // THEN
    expect(actual).toThrow(Error)
  })

  it('get definitions', () => {
    // GIVEN
    const input = document.createElement('input')
    input.setAttribute('data-pattern', 'USD #,##0.00# $')

    // WHEN
    const meta = metadata(input)

    // THEN
    expect(meta.integer.max).toEqual(4)
    expect(meta.integer.groups).toEqual(3)
    expect(meta.integer.fill).toEqual('0')

    expect(meta.fraction.max).toEqual(3)
    expect(meta.fraction.fill).toEqual('00')
  })

  it('no integer pattern', () => {
    // GIVEN
    const input = document.createElement('input')
    input.setAttribute('data-pattern', 'USD .00# $')

    // WHEN
    const meta = metadata(input)

    // THEN
    expect(meta.integer.max).toEqual(0)
  })

  it('no fraction pattern', () => {
    // GIVEN
    const input = document.createElement('input')
    input.setAttribute('data-pattern', 'USD #,###,### $')

    // WHEN
    const meta = metadata(input)

    // THEN
    expect(meta.fraction.max).toEqual(0)
  })
})
