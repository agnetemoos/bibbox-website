/**
 * @file
 * The navbar is the navigation bar in the top.
 */

import React, { useContext } from 'react';
import MachineStateContext from '../../context/machine-state-context';
import Button from './button';
import {
    faBookReader,
    faInfoCircle,
    faBook,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

/**
 * NavBar.
 *
 * @param actionHandler
 *  As the state can only be changed by the statemachine, the actionHandler
 *  calls the statemachine if a user requests a state change.
 * @return {*}
 * @constructor
 */
function NavBar({ actionHandler }) {
    const context = useContext(MachineStateContext);
    const classes = context.machineState.get.step === 'initial'
        ? 'navbar initial' : 'navbar';
    const buttonCheckOut = <FormattedMessage id='button-navbar-check-out' defaultMessage='Lån' />;
    const buttonStatus = <FormattedMessage id='button-navbar-status' defaultMessage='Status' />;
    const buttonCheckIn = <FormattedMessage id='button-navbar-check-in' defaultMessage='Aflever' />;
    const buttonFinish = <FormattedMessage id='button-navbar-finish' defaultMessage='Afslut' />;
    const components = [
        {
            which: 'checkOutItems',
            action: 'changeFlow',
            data: { flow: 'checkOutItems' },
            label: buttonCheckOut,
            icon: faBookReader
        },
        {
            which: 'status',
            action: 'changeFlow',
            data: { flow: 'status' },
            label: buttonStatus,
            icon: faInfoCircle
        },
        {
            which: 'checkInItems',
            action: 'changeFlow',
            data: { flow: 'checkInItems' },
            label: buttonCheckIn,
            icon: faBook
        }
    ];

    return (
        <div className={classes}>
            <div className='text-container'>
                <span className='text'>{context.boxConfig.get.school.name}</span>
                {context.machineState.get.user && (
                    <span className='text bold'>
                        {context.machineState.get.user.name}
                    </span>
                )}
            </div>
            <div className='button-container'>
                {context.machineState.get.user &&
                components.map((button) => (
                    <Button
                        key={button.which}
                        label={button.label}
                        icon={button.icon}
                        handleButtonPress={() => actionHandler(button.action, button.data)}
                        which={ button.which}
                    />
                ))}
                {context.machineState.get.step !== 'initial' &&
                    <Button
                        label={buttonFinish}
                        icon={faSignOutAlt}
                        handleButtonPress={() => actionHandler('reset')}
                        which={ 'reset' }
                    />
                }
            </div>
        </div>
    );
}

NavBar.propTypes = {
    actionHandler: PropTypes.func.isRequired
};

export default NavBar;
