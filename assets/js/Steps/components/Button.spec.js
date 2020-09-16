/**
 * @file
 * Tests of Button.
 */

import React from 'react';
import Button from './Button';
import { shallow, mount } from 'enzyme';
import { expect, it, describe } from '@jest/globals';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

describe('Test of button component', () => {
    it('Renders without crashing', () => {
        shallow(
            <Button
                label='knap'
                icon={faCheck}
                handleButtonPress={() => console.log()}
                which='class'
            />
        );
    });

    it('Renders reset', () => {
        const wrapper = mount(
            <Button
                label='knap'
                icon={faCheck}
                handleButtonPress={() => console.log()}
                which='reset'
            />
        );
        expect(wrapper.exists('.reset')).toEqual(true);
    });

    it('Renders label', () => {
        const wrapper = mount(
            <Button
                label='knap'
                icon={faCheck}
                handleButtonPress={() => console.log()}
                which='reset'
            />
        );
        expect(wrapper.text()).toEqual('knap');
    });

    it('Renders icon', () => {
        const wrapper = mount(
            <Button
                label='knap'
                icon={faCheck}
                handleButtonPress={() => console.log()}
                which='class'
            />
        );
        expect(wrapper.exists('.icon')).toEqual(true);
        expect(wrapper.find('.icon').length).toEqual(1);
    });

    it('works when button is clicked', () => {
        const mockCallBack = jest.fn();

        const button = shallow(
            <Button
                label='knap'
                icon={faCheck}
                handleButtonPress={mockCallBack}
                which='class'
            />
        );
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
