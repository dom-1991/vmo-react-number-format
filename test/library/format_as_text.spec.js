import React from 'react';

import { mount } from '../test_util';
import NumericFormat from '../../src/numeric_format';
import PatternFormat from '../../src/pattern_format';

/*** format_number input as text ****/
describe('NumberFormat as text', () => {
  it('should format numbers to currency', () => {
    const wrapper = mount(
      <NumericFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} />,
    );
    expect(wrapper.find('span').text()).toEqual('$2,456,981');
  });

  it('should format as given format', () => {
    const wrapper = mount(
      <PatternFormat value={4111111111111111} displayType={'text'} format="#### #### #### ####" />,
    );
    expect(wrapper.find('span').text()).toEqual('4111 1111 1111 1111');
  });

  it('should format as given format when input is string', () => {
    const wrapper = mount(
      <PatternFormat
        value="4111111111111111"
        valueIsNumericString
        displayType={'text'}
        format="#### #### #### ####"
      />,
    );
    expect(wrapper.find('span').text()).toEqual('4111 1111 1111 1111');
  });

  it('should format as given format when input length is less than format length', () => {
    const wrapper = mount(
      <PatternFormat
        value="41111111111111"
        valueIsNumericString
        displayType={'text'}
        format="#### #### #### ####"
      />,
    );
    expect(wrapper.find('span').text()).toEqual('4111 1111 1111 11  ');
  });

  it('should format as given format with mask', () => {
    const wrapper = mount(
      <PatternFormat
        value="41111111111111"
        valueIsNumericString
        displayType={'text'}
        format="#### #### #### ####"
        mask="_"
      />,
    );
    expect(wrapper.find('span').text()).toEqual('4111 1111 1111 11__');
  });

  it('should limit decimal scale to given value', () => {
    const wrapper = mount(<NumericFormat value={4111.344} displayType={'text'} decimalScale={2} />);
    expect(wrapper.find('span').text()).toEqual('4111.34');

    wrapper.setProps({
      value: 4111.358,
    });
    wrapper.update();

    expect(wrapper.find('span').text()).toEqual('4111.36');
  });

  it('should add zeros if fixedDecimalScale is provided', () => {
    const wrapper = mount(
      <NumericFormat
        value="4111.11"
        valueIsNumericString
        displayType={'text'}
        decimalScale={4}
        fixedDecimalScale={true}
      />,
    );
    expect(wrapper.find('span').text()).toEqual('4111.1100');

    wrapper.setProps({
      decimalScale: 1,
    });

    wrapper.update();
    expect(wrapper.find('span').text()).toEqual('4111.1');
  });

  it('should accept custom renderText method', () => {
    const wrapper = mount(
      <NumericFormat
        value="4111.11"
        valueIsNumericString
        thousandSeparator=","
        renderText={(value) => <div>{value}</div>}
        displayType={'text'}
      />,
    );
    expect(wrapper.find('div').text()).toEqual('4,111.11');
  });
});
