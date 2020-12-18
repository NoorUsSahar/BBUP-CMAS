import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {sendEmailAdmin} from '../../actions/adminEtc/chatbot.js';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const SendMails = ({steps , category , sendEmailAdmin})  => {
   const subject = 'Complain';
   const { name, email, body } = steps;
   
   const emails = email.value;
   const names= name.value;
   const body1 = body.value;

   const formData = {
     name: names ,
     email: emails,
     subject: category,
     body: body1
   }
  useEffect(() => {
  
   sendEmailAdmin(formData);
   
  }, [sendEmailAdmin])

    return (
    <h3>Sending Email ... </h3>
    );
}

SendMails.propTypes = {
  category : PropTypes.string.isRequired,
  steps: PropTypes.object.isRequired,
  sendEmailAdmin : PropTypes.func.isRequired
};



export default connect(null, { sendEmailAdmin })(
    withRouter(SendMails)
  );
  