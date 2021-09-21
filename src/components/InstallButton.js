import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Button, Link, Icon } from '@newrelic/gatsby-theme-newrelic';
import {
  getPackNr1Url,
  getGuidedInstallStackedNr1Url,
} from '../utils/get-pack-nr1-url';
import {
  NR1_LOGIN_URL,
  NR1_GUIDED_INSTALL_NERDLET,
  NR1_PACK_DETAILS_NERDLET,
} from '../data/constants';
import { quickstart } from '../types';

/**
 * @param {String} id
 * @returns {String}
 */
const createInstallLink = (id, nerdletId) => {
  const platformUrl =
    nerdletId === NR1_GUIDED_INSTALL_NERDLET
      ? getGuidedInstallStackedNr1Url(nerdletId)
      : getPackNr1Url(id, nerdletId);
  const url = new URL(
    `?return_to=${encodeURIComponent(platformUrl)}`,
    NR1_LOGIN_URL
  );

  return url.href;
};

/**
 * @param {quickstart} quickstart
 * @param {String} key
 * @returns {Boolean}
 */
const hasComponent = (quickstart, key) =>
  quickstart[key] && quickstart[key].length > 0;

const InstallButton = ({ quickstart, ...props }) => {
  const hasInstallableComponent = hasComponent(quickstart, 'installPlans');

  const hasGuidedInstall =
    hasInstallableComponent &&
    quickstart.installPlans.length === 1 &&
    quickstart.installPlans[0].id.includes('guided-install');

  // If there is nothing to install AND no documentation, don't show this button.
  if (!hasInstallableComponent && !hasComponent(quickstart, 'documentation')) {
    return null;
  }

  const destinationNerdletId = hasGuidedInstall
    ? NR1_GUIDED_INSTALL_NERDLET
    : NR1_PACK_DETAILS_NERDLET;

  // If we have an install-able component, generate a URL. Otherwise, link to the
  // first documentation supplied.
  const url = hasInstallableComponent
    ? createInstallLink(quickstart.id, destinationNerdletId)
    : quickstart.documentation[0].url;

  return (
    <Button {...props} as={Link} to={url} variant={Button.VARIANT.PRIMARY}>
      {hasInstallableComponent ? (
        <>
          <Icon
            name="fe-plus"
            viewBox="0 0 16 16"
            css={css`
              margin-right: 7px;
            `}
          />
          Install quickstart
        </>
      ) : (
        'See installation docs'
      )}
    </Button>
  );
};

InstallButton.propTypes = {
  quickstart: quickstart.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default InstallButton;
