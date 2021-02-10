import * as React from 'react'
import { shallow } from 'enzyme'
import PowerBar from '../PowerBar';

it('renders the correct greeting text with no power level given', () => {
  const hello = shallow (<PowerBar name='Sven' />)
  expect(hello.find('.greeting').text()).toEqual('Hello Player Sven !')
})

it('renders the correct text when power level is 1', () => {
  const hello = shallow (<PowerBar name='Sven' powerLevel={1} />)
  expect(hello.find('.powerLevel').text()).toEqual('Power: +')
})

it('renders the correct text when power level is 5', () => {
  const hello = shallow (<PowerBar name='Sven' powerLevel={5} />)
  expect(hello.find('.powerLevel').text()).toEqual('Power: +++++')
})

it('throws an error when power level is 0', () => {
  expect(() => {
    shallow(<PowerBar name='Sven' powerLevel={0} />)
  }).toThrow()
})

it('throws an error when power level is negative', () => {
  expect(() => {
    shallow(<PowerBar name='Sven' powerLevel={-1} />)
  }).toThrow()
})