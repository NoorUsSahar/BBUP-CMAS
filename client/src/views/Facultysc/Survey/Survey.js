import React, { useState, useEffect, Fragment } from "react";
import "survey-react/survey.css";
import * as Survey from "survey-react";
import { connect } from "react-redux";
import {
  getSurveyById,
  addSurveyResponse,
  getSurveyEndDateById,
  getSurveyPublishDateById,
} from "../../../actions/adminEtc/survey";
import { loadFaculty } from "../../../actions/facultysc/auth";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import Spinner from "../../../layouts/Spinner";
import Moment from "moment";

const SurveyForms = ({
  // loadFaculty,
  auth: { faculty },
  getSurveyEndDateById,
  getSurveyPublishDateById,
  getSurveyById,
  match,
  survey: { survey_forms, loading, end_date, publish_date },
  addSurveyResponse,
  history,
}) => {
  const [isCompleted, formData, setFormData] = useState(false, {
    user_email: "",
    survey_id: "",
    title: "",
    satisfied: "",
    not_satisfied: "",
    neutral: "",
    department: "",
    course: "",
    response: "",
  });

  useEffect(() => {
    getSurveyById(match.params.id);
    addSurveyResponse();
    loadFaculty();
    getSurveyEndDateById(match.params.id);
    getSurveyPublishDateById(match.params.id);
  }, [
    getSurveyById,
    addSurveyResponse,
    // getSurveyEndDateById,
    // getSurveyPublishDateById,
  ]);

  Survey.Serializer.addProperty("page", {
    name: "navigationTitle:string",
    isLocalizable: true,
  });

  Survey.Serializer.addProperty("page", {
    name: "navigationDescription:string",
    isLocalizable: true,
  });

  // get json from another file
  const json = JSON.stringify(survey_forms, null, 3);

  var survey = (
    <Survey.Survey
      json={json}
      showCompletedPage={false}
      onComplete={function (result) {
        var satisfied_score = 0;
        var not_satisfied_score = 0;
        var neutral_score = 0;
        var data = result.data;

        Object.keys(data).forEach(function (qName) {
          var question = result.getQuestionByName(qName);
          var qValue = data[qName];

          if (question) {
            if (question.choices) {
              question.choices.forEach(function (choice) {
                if (choice.value === qValue) {
                  if (choice.value == "2") {
                    satisfied_score += +2;
                  } else if (choice.value == "1") {
                    satisfied_score += +1;
                  } else if (choice.value == "0") {
                    neutral_score += +1;
                  } else if (choice.value == "-1") {
                    not_satisfied_score += +1;
                  } else if (choice.value == "-2") {
                    not_satisfied_score += +2;
                  }
                }
              });
            }
          } else {
            satisfied_score = 0;
            not_satisfied_score = 0;
            neutral_score = 0;
          }
        });
        var dep;
        var cour;
        if (!result.data.department) {
          dep = "";
          cour = "";
        } else {
          dep = result.data.department;
          cour = result.data.Course_Title;
        }
        var resultData = {
          user_email: faculty.email,
          survey_id: survey_forms.survey_id,
          title: survey_forms.title,
          satisfied: satisfied_score,
          not_satisfied: not_satisfied_score,
          neutral: neutral_score,
          department: dep,
          course: cour,
          response: result.data,
        };

        addSurveyResponse(resultData, history);
        document.querySelector("#surveyResultHeader").innerHTML =
          "Thankyou for Completing the survey";
      }}
      showProgressBar={"top"}
    />
  );
  var surveyDisplay = !isCompleted ? survey : null;

  var current_date = Moment(new Date());
  return (
    <Fragment>
      {loading && faculty && publish_date == null ? (
        <div>
          <Spinner></Spinner>
        </div>
      ) : (
        <Fragment>
         
         {(
            Moment(current_date).isSameOrAfter(Moment(publish_date)) &&
            Moment(current_date).isSameOrBefore(Moment(end_date))
         
          ) ? (
           
            <Card>
            <CardBody>
              <div> {surveyDisplay}</div>
              <h1 id="surveyResultHeader"></h1>
              <div id="surveyResult"></div>
            </CardBody>
          </Card>
          ) : (
            <Card>
            <CardBody>
              {/* <div> {surveyDisplay}</div> */}
              <h1 id="surveyResultHeader"></h1>
              <div id="surveyResult"><h1>The Survey is not available right now </h1></div>
            </CardBody>
          </Card>
          )}
         
        </Fragment>
      )}
    </Fragment>
  );
};
SurveyForms.propTypes = {
  addSurveyResponse: PropTypes.func.isRequired,
  getSurveyById: PropTypes.func.isRequired,
  getSurveyEndDateById: PropTypes.func.isRequired,
  getSurveyPublishDateById: PropTypes.func.isRequired,
  // loadFaculty: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  survey: state.survey,
  addSurveyResponse: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
  addSurveyResponse,
  getSurveyById,
  getSurveyEndDateById,
  getSurveyPublishDateById,
  // loadFaculty,
})(withRouter(SurveyForms));
