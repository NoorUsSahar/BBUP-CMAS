import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { withRouter } from "react-router-dom";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
// core components
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSurveyById, setSurveyDates } from "../../../../actions/adminEtc/survey";
import { Container, Grid, Paper, TextField } from "@material-ui/core";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #fafffa 30%, #fafffa 90%)",
    borderRadius: 3,
    border: 0,
    color: "black",
    height: 48,
    padding: "0 30px",
    weight: "20px",
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

const PublishDate = ({ survey, getSurveyById, survey_id, setSurveyDates }) => {
  useEffect(() => {
    getSurveyById(survey_id);
  }, [getSurveyById, setSurveyDates]);

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      
      publish_date:'',
    end_date: '',
    id: survey_id,
    },

    onSubmit: (values) => {
      setSurveyDates(values);
      console.log("Date set")
    },
    validationSchema: Yup.object().shape({
      
      publish_date: Yup.date().min(
        new Date(Date.now() - 86400000),
        'Publish date is required'
      ),
      end_date: Yup.date().min(
        Yup.ref('publish_date'),
        'End date cannot be before publish date'
      ),
      // id: Yup.string().required('Id is required'),
    }),
  });

  // const [formData, setFormData] = useState({
  //   publish_date: "",
  //   end_date: "",
  //   id: "",
  // });

  // const { publish_date, end_date, id } = formData;

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   setFormData({ ...formData, id: survey_id });
  //   setSurveyDates(formData);
  //   //   createEvent(formData, history);
  // };

  return (
    <Popup
      style={{ width: "100px" }}
      trigger={
        <Button variant="contained" color="secondary">
          Set Dates
        </Button>
      }
      position="right center"
    >
      <Container className="container-primary" color="primary">
        <Paper elevation={2} className="paper-primary">
          <Grid container>
            <Grid
              xs={12}
              sm={12}
              md={12}
              item
              className="text-center-horizontal"
            >
              <h3>Dates</h3>
            </Grid>
            <Grid xs={12} sm={12} md={12} item>
              <form className="form" onSubmit={handleSubmit}>
                Publish Date
                <TextField
                  className="form-control"
                  variant="outlined"
                  type="datetime-local"
                  name="publish_date"
                  
                  onChange={handleChange}
                  error={errors.publish_date && touched.publish_date}
                    helperText={errors.publish_date}
                    value={values.name}
                />
                End Date
                <TextField
                  className="form-control"
                  variant="outlined"
                  type="datetime-local"
                  name="end_date"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.end_date && touched.end_date}
                    helperText={errors.end_date}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  className="form-control"
                >
                  Submit
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Popup>
  );
};
PublishDate.propTypes = {
  getSurveyById: PropTypes.func.isRequired,
  survey_id: PropTypes.string.isRequired,
  survey: PropTypes.object.isRequired,
  setSurveyDates: PropTypes.func.isRequired,
  // createEvent : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  survey: state.survey,
  // addSurveyResponse: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
  getSurveyById,
  setSurveyDates,
})(withRouter(PublishDate));
