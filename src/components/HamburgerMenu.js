import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './HamburgerMenu.scss';

const HamburgerMenu = ({ toggle, isOpen }) => (
  <button
    aria-expanded={open}
    aria-label="Mobile Menu"
    type="button"
    className={cx('HamburgerMenu', { HamburgerMenu__open: isOpen })}
    onClick={() => toggle()}
  >
    <div />
    <div />
    <div />
  </button>
);

HamburgerMenu.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

HamburgerMenu.defaultProps = {
  isOpen: false,
};

export default HamburgerMenu;
