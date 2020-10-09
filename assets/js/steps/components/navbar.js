/**
 * @file
 * The navbar is the navigation bar in the top.
 */

import React, { useContext } from 'react';
import Button from './button';
import MachineStateContext from '../utils/machine-state-context';
import {
    faInfoCircle,
    faSignOutAlt,
    faBug,
    faPrint,
    faBirthdayCake
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    NavbarButtonCheckOut,
    NavbarButtonStatus,
    NavbarButtonCheckIn,
    NavbarButtonFinish,
    NavbarButtonPrint
} from '../utils/formattedMessages';
import CheckInIconWhite from '../../../scss/images/check-in-white.svg';
import CheckOutIconBlack from '../../../scss/images/check-out-black.svg';

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
    const classes = context.machineState.get.step === 'initial' ? 'navbar initial' : 'navbar';

    const components = [
        {
            color: 'yellow',
            data: { flow: 'checkOutItems' },
            label: NavbarButtonCheckOut,
            img: CheckOutIconBlack
        },
        {
            color: 'blue',
            data: { flow: 'status' },
            label: NavbarButtonStatus,
            icon: faInfoCircle
        },
        {
            color: 'purple',
            data: { flow: 'checkInItems' },
            label: NavbarButtonCheckIn,
            img: CheckInIconWhite
        }
    ];

    /**
     * Prints the page, available in status component.
     */
    function printPage() {
        window.print();
    }

    return (
        <div className={classes} >
            <div className='text-container'>
                <span className='text'>{context.boxConfig.get.school.name}</span>
                {context.machineState.get.user && (
                    <span className='text bold'>
                        {context.machineState.get.user.name}
                    </span>
                )}
                {context.machineState.get.user && context.machineState.get.user.birthdayToday && (
                    <span className='birthday-icon'>
                        <FontAwesomeIcon icon={faBirthdayCake}></FontAwesomeIcon>
                    </span>
                )}
                {context.boxConfig.get.debugEnabled && (
                    <span className='text bold'>
                        Debug mode!
                        <FontAwesomeIcon icon={faBug} style={{ paddingLeft: '4px', color: 'hotpink' }}></FontAwesomeIcon>
                    </span>
                )}
            </div>
            <div className='button-container'>
                {context.machineState.get.step === 'status' && context.boxConfig.get.hasPrinter && 
                    <Button
                        label={NavbarButtonPrint}
                        icon={faPrint}
                        handleButtonPress={() => printPage()}
                        color='green'
                    />
                }
                {context.machineState.get.user &&
                components.map((button) => (
                    <Button
                        key={button.color}
                        label={button.label}
                        icon={button.icon}
                        handleButtonPress={() => actionHandler('changeFlow', button.data)}
                        color={button.color}
                        img={button.img}
                    />
                ))}
                {context.machineState.get.step !== 'initial' &&
                    <Button
                        label={NavbarButtonFinish}
                        icon={faSignOutAlt}
                        handleButtonPress={() => actionHandler('reset')}
                        color='red'
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
