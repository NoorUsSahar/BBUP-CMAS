import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import {addInfo} from "../../../actions/facultysc/studentgrade";
import { withRouter } from "react-router-dom";
import { TextField } from "@material-ui/core";


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "0.9rem",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    fontSize: "1.3rem",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

const AddInfo = ({ addInfo, history , auth : {faculty} }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    Name:'',
    semester:'',
    registrationNo:'',
    section:'',
    ECA:0,
    ICP:0,
    ENG:0,
    Cal:0,
    ISL:0,
    gpa:0.0,
    cgpa:0.0,
   
  });

  const {
    Name,
    semester,
    registrationNo,
    section,
    ECA,
    ICP,
    ENG,
    Cal,
    ISL,
    gpa,
    cgpa,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('called')
    addInfo(formData, history);
    window.location = '/faculty/student-marks'
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h3 className={classes.cardTitleWhite}>
                 Add Information to Student Profile
                </h3>
                <p className={classes.cardCategoryWhite}>Add the fields</p>
              </GridItem>
             
            </GridContainer>
          </CardHeader>
          <CardBody>
            <form onSubmit={e => onSubmit(e)}>
              <GridContainer>
              <GridItem xs={12} sm={12} md={6} styles={style}>
                  <TextField
                    className='form-control'
                    label="Name"
                    variant='outlined'
                    type='text'
                    name='Name'
                    value={Name}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Registration Number'
                    variant='outlined'
                    type='text'
                    name='registrationNo'
                    value={registrationNo}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
               
           
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label="Semester"
                    variant='outlined'
                    type='text'
                    name='semester'
                    value={semester}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label="Section"
                    variant='outlined'
                    type='text'
                    name='section'
                    value={section}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2.5}>
                  <TextField
                    className='form-control'
                    label="ECA"
                    variant='outlined'
                    type='Number'
                    name='ECA'
                    value={ECA}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
             
                <GridItem xs={12} sm={12} md={2.5}>
                  <TextField
                    className='form-control'
                    label="ICP"
                    variant='outlined'
                    type='Number'
                    name='ICP'
                    value={ICP}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
             
                <GridItem xs={12} sm={12} md={2.5}>
                  <TextField
                    className='form-control'
                    label="Calculus"
                    variant='outlined'
                    type='Number'
                    name='Cal'
                    value={Cal}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2.5}>
                  <TextField
                    className='form-control'
                    label="ENG"
                    variant='outlined'
                    type='Number'
                    name='ENG'
                    value={ENG}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
             
                <GridItem xs={12} sm={12} md={2.5}>
                  <TextField
                    className='form-control'
                    label="ISL"
                    variant='outlined'
                    type='Number'
                    name='ISL'
                    value={ISL}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
             
               
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='gpa'
                    variant='outlined'
                    type='text'
                    name='gpa'
                    value={gpa}
                    onChange={e => onChange(e)}
                    
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='cgpa'
                    variant='outlined'
                    type='text'
                    name='cgpa'
                    value={cgpa}
                    onChange={e => onChange(e)}
                    
                  />
                </GridItem>
             
              
                
    
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    color='primary'
                    variant='contained'
                    type='submit'
                    size='large'
                    // href={"/final-result"}
                    
                  >
                    Submit
                  </Button>
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};
const style={
  backgroundColor:"red"
}
AddInfo.propTypes = {
  addInfo:PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {addInfo})(
  withRouter(AddInfo)
);
