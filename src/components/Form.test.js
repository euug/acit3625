import React from 'react';
import renderer from 'react-test-renderer';
import Form from './Form';
import { mount } from 'enzyme';
import "../setupTests";

describe('Render Tests', () => {
    test('Snapshot Test', () => {
        const component = renderer.create(<Form />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});

describe('Input Field Tests', () => {
    test('Initial textbox is empty', () => {
        const wrapper = mount(<Form />);
        expect(wrapper.find('input').text()).toEqual('');
    });
});
