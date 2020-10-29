import React from 'react';
import renderer from 'react-test-renderer';
import Todo from './Todo';
import { shallow } from 'enzyme';
import "../setupTests";


describe('Render Tests', () => {
    test('Snapshot Test', () => {
        const component = renderer.create(<Todo />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Renders editingTemplate if isEditing State is True', () => {
        const component = shallow(<Todo/>);
      
        component.find('#edit-button').simulate('click');
        component.update();
        
        expect(component.find('#cancel-button').text()).toEqual('Cancelrenaming ')
    });
})
