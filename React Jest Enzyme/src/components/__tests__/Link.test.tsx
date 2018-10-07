import * as React from 'react'
import { shallow } from 'enzyme'
import Link from '../Link';

test('Has page and link text', () => {
  const wrapper = shallow(<Link page="http://www.mindprobe.io">Mindprobe.io</Link>)
  expect(wrapper.find('a').text()).toEqual('Mindprobe.io')
  expect(wrapper.find('a').prop('href')).toEqual('http://www.mindprobe.io')
  //expect(wrapper.instance().props.page).toEqual('http://www.mindprobe.io')
})

test('Changes class to hovered on mouse enter', () => {
  const wrapper = shallow(<Link page="http://www.mindprobe.io">Mindprobe.io</Link>)
  wrapper.find('a').simulate('mouseEnter')
  expect(wrapper.find('.hovered').length).toEqual(1)
})

test('Changes class to hovered on mouse enter and back to normal on mouse leave', () => {
  const wrapper = shallow(<Link page="http://www.mindprobe.io">Mindprobe.io</Link>)
  wrapper.find('a').simulate('mouseEnter')
  expect(wrapper.find('.hovered').length).toEqual(1)
  wrapper.find('a').simulate('mouseLeave')
  expect(wrapper.find('.normal').length).toEqual(1)
})