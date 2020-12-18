import React, {  useState , useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../../../components/Grid/GridItem.js";
import GridContainer from "../../../../components/Grid/GridContainer.js";
import Card from "../../../../components/Card/Card.js";
import CardHeader from "../../../../components/Card/CardHeader.js";
import CardBody from "../../../../components/Card/CardBody.js";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { addInfo , getCurrentProfile} from "../../../../actions/adminEtc/studentprofile";
import { withRouter } from "react-router-dom";

import {
    TextField,
   
  } from "@material-ui/core";
  
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



  const EditProfile = ({
    profile: { profile, loading },
    addInfo,
    history,
    getCurrentProfile,
  }) => {
    const [formData, setFormData] = useState({
    Name:'',
    Program:'',
    fatherName:'',
    cnic:'',
    semester:'',
    dateOfBirth:'',
    phone_number:'',
    domicile:'',
    Nationality:'',
    registrationNo:'',
    gpa:'',
    cgpa:'',
    department:'',
    courses:'',
    area:'',
    city:'',
    District:'',
    school:'',
    college:'',
    Olevels_matricMarks:'',
    alevels_fscMarks:'',
    feildOfStudy:'',
    yearOfMariculatioin:'',
    yearOfIntermediate:'',
    overseasEducation:''
    });
    const classes = useStyles();

    useEffect(() => {
        getCurrentProfile();
    
        setFormData({
          Name : loading || !profile.Name ?'' : profile.Name,
          Program : loading || !profile.Program ?'' : profile.Program,
          fatherName : loading || !profile.fatherName ?'' : profile.fatherName,
        cnic: loading || !profile.cnic ?'' : profile.cnic,
        semester : loading || !profile.semester ?'' : profile.semester,
        dateOfBirth: loading || !profile.dateOfBirth ?'' : profile.dateOfBirth,
        domicile: loading || !profile.domicile ?'' : profile.domicile,
        Nationality: loading || !profile.Nationality ?'' : profile.Nationality,
        registrationNo: loading || !profile.registrationNo ?'' : profile.registrationNo,
        gpa:loading || !profile.gpa ?'' : profile.gpa,
        cgpa:loading || !profile.cgpa ?'' : profile.cgpa,
        department:loading || !profile.department?'' : profile.department,
        courses:loading || !profile.courses ?'' : profile.courses.join(','),
        area:loading || !profile.address ?'' : profile.address.area,
        city:loading || !profile.address ?'' : profile.address.city,
        District:loading || !profile.address ?'' : profile.address.District,
        school:loading || !profile.school ?'' : profile.school,
        college:loading || !profile.college ?'' : profile.college,
        Olevels_matricMarks:loading || !profile.Olevels_matricMarks ?'' : profile.Olevels_matricMarks,
        alevels_fscMarks:loading || !profile.alevels_fscMarks?'' : profile.alevels_fscMarks,
        feildOfStudy:loading || !profile.feildOfStudy ?'' : profile.feildOfStudy,
        yearOfMariculatioin:loading || !profile.yearOfMariculatioin ?'' : profile.yearOfMariculatioin,
        yearOfIntermediate:loading || !profile.yearOfIntermediate ?'' : profile.yearOfIntermediate,
        overseasEducation :loading || !profile.overseasEducation ?'' : profile.overseasEducation,
        section :loading || !profile.section ?'' : profile.section

        });
      }, [loading]);
      const {
    Name,
    Program,
    fatherName,
    cnic,
    semester,
    dateOfBirth,
    phone_number,
    domicile,
    Nationality,
    registrationNo,
    gpa,
    cgpa,
    department,
    courses,
    area,
    city,
    District,
    school,
    college,
    Olevels_matricMarks,
    alevels_fscMarks,
    feildOfStudy,
    yearOfMariculatioin,
    yearOfIntermediate,
    overseasEducation,
    section
      } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addInfo(formData, history , true);
  };
  
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h3 className={classes.cardTitleWhite}>
                  Your Profile
                </h3>
                <p className={classes.cardCategoryWhite}>Complete your profile</p>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
              <Button
                   color="primary"
                  variant="contained" 
                  round
                  href=""
                  size="medium"
                >
                  
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  round
                  href=""
                  size="medium"
                >
                
                </Button>
                <Button
                  color="primary"
                  round
                  variant="contained"
                  size="medium"
                  href=""
                >
                
                </Button>
              </GridItem>
            </GridContainer>
          </CardHeader>
          <CardBody>
            <form onSubmit={e => onSubmit(e)}>
              <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
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
              <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label="Program"
                    variant='outlined'
                    type='text'
                    name='Program'
                    value={Program}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label="Father's Name"
                    variant='outlined'
                    type='text'
                    name='fatherName'
                    value={fatherName}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label="CNIC"
                    variant='outlined'
                    type='text'
                    name='CNIC'
                    pattern="[0-9]{13}"
                    value={cnic}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
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
                <GridItem xs={12} sm={12} md={12}>
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
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label="Date of Birth"
                    variant='outlined'
                    type='text'
                    name='dateOfBirth'
                    value={dateOfBirth}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Phone Number'
                    variant='outlined'
                    type='text'
                    name='phone_number'
                    pattern="[0-9]{11}"
                    value={phone_number}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Domicile'
                    variant='outlined'
                    type='text'
                    name='domicile'
                    value={domicile}
                    onChange={e => onChange(e)}
                    
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Nationality'
                    variant='outlined'
                    type='text'
                    name='Nationality'
                    value={Nationality}
                    onChange={e => onChange(e)}
                    
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
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Department'
                    variant='outlined'
                    type='text'
                    name='department'
                    value={department}
                    onChange={e => onChange(e)}
                    
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Address'
                    variant='outlined'
                    multiline
                    rows={2}
                    type='text'
                    name='area'
                    value={area}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='City'
                    variant='outlined'
                    type='text'
                    name='city'
                    value={city}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='District'
                    variant='outlined'
                    type='text'
                    name='district'
                    value={District}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Courses'
                    variant='outlined'
                    multiline
                    rows={2}
                    type='text'
                    name='courses'
                    value={courses}
                    onChange={e => onChange(e)}
                    // required={true}
                  />
                </GridItem>
    
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='School'
                    variant='outlined'
                    type='text'
                    name='school'
                    value={school}
                    onChange={e => onChange(e)}
                    // required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='College'
                    variant='outlined'
                    type='text'
                    name='college'
                    value={college}
                    onChange={e => onChange(e)}
                    // required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Olevels or Matric marks'
                    variant='outlined'
                    type='text'
                    name='Olevels_matricMarks'
                    value={Olevels_matricMarks}
                    onChange={e => onChange(e)}
                    // required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Alevels or Fsc marks'
                    variant='outlined'
                    type='text'
                    name='alevels_fscMarks'
                    value={alevels_fscMarks}
                    onChange={e => onChange(e)}
                    // required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Feild of Study'
                    variant='outlined'
                    type='text'
                    name='feildOfStudy'
                    value={feildOfStudy}
                    onChange={e => onChange(e)}
                    // required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Year of Matriculation'
                    variant='outlined'
                    type='text'
                    name='yearOfMariculatioin'
                    value={yearOfMariculatioin}
                    onChange={e => onChange(e)}
                    // required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Year of Intermediate'
                    variant='outlined'
                    type='text'
                    name='yearOfIntermediate'
                    value={yearOfIntermediate}
                    onChange={e => onChange(e)}
                    // required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Over seas education if...'
                    variant='outlined'
                    type='text'
                    name='overseasEducation'
                    value={overseasEducation}
                    onChange={e => onChange(e)}
                    // required={true}
                  />
                </GridItem>
    

    
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    color='primary'
                    variant='contained'
                    type='submit'
                    size='large'
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

EditProfile.propTypes = {
  addInfo: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
  // profile: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addInfo , getCurrentProfile })(
  withRouter(EditProfile)
);
