// // the review form the user submits

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Review = (props)  => {
  const [state, setState] = useState({ name: '', email: '', body: ''});
  
  useEffect(() => {
    const { steps } = props;
    const { name, email, body } = steps;
    setState({ name, email, body });
  }, [props])

    const { name, email, body } = state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{email.value}</td>
            </tr>
            <tr>
              <td>Query</td>
              <td>{body.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

export default Review;