/**
 * @file
 * To display the header with icon in the different components.
 */

import React from 'react';
import PropTypes from 'prop-types';
import IconBubble from './icon-bubble';

/**
 * Header.
 *
 * @param header
 *   Header text.
 * @param subheader
 *   Subheader subheader.
 * @param which
 *   Which header.
 * @param icon
 *   Icon.
 * @return {*}
 * @constructor
 */
function Header({ header, subheader, which, icon }) {
    return (
        <>
            <div className='col-md-1'>
                <IconBubble which={which} icon={icon} />
            </div>
            <div className='col-md-8'>
                <div className='header'>{header}</div>
                <div className='subheader'>{subheader}</div>
            </div>
        </>
    );
}

Header.propTypes = {
    header: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    subheader: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    which: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired
};

export default Header;
