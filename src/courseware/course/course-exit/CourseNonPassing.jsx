import React from 'react';

import {
  injectIntl, intlShape,
} from '@edx/frontend-platform/i18n';
import { Helmet } from 'react-helmet';
import { Alert, Button } from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';

import DashboardFootnote from './DashboardFootnote';
import messages from './messages';

function CourseNonPassing({ intl }) {
  return (
    <>
      <Helmet>
        <title>{`End of Course | ${getConfig().SITE_NAME}`}</title>
      </Helmet>
      <div className="row w-100 mx-0 mb-4 px-5 py-4 border border-light justify-content-center">
        <div className="col-12 p-0 h2 text-center">
          { intl.formatMessage(messages.endOfCourseHeader) }
        </div>
        <Alert variant="primary" className="col col-lg-10 mt-4 d-flex align-items-start border-0">
          <div className="flex-grow-1 mr-5">{ intl.formatMessage(messages.endOfCourseDescription) }</div>
          <Button variant="primary" className="flex-shrink-0" href="./progress">{ intl.formatMessage(messages.viewGradesButton) }</Button>
        </Alert>
        <DashboardFootnote />
      </div>
    </>
  );
}

CourseNonPassing.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CourseNonPassing);
