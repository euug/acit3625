import React from 'react';
import renderer from 'react-test-renderer';
import FilterButton from './FilterButton';
import { mount } from 'enzyme';
import "../setupTests";

describe('Render Tests', () => {
    test('Snapshot Test', () => {
        const component = renderer.create(<FilterButton />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});

describe('Button Event Test', () => {
    test('FilterButton Event Test', () => {
        const setFilter = jest.fn();
        const wrapper = mount(<FilterButton setFilter={setFilter}>Button</FilterButton>);
        const filter = wrapper.find('button');
    
        filter.simulate('click');
        expect(setFilter).toHaveBeenCalled();
    });
});