import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../../components/Grid/GridContainer.js";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import SaveIcon from '@material-ui/icons/Save';

// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

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
  root: {
    width: "100%",
    
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }

};

const useStyles = makeStyles(styles);

const AddMarks = ({ addMarks, history }) => {
  const classes = useStyles();

  const createData = (Name, registrationNo ,marks, gpa,
    cgpa,grades) => ({

    Name,
    registrationNo,
    marks,
    gpa,
    cgpa,
    grades,
    isEditMode: false
  });

  const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = row;
    return (
      <TableCell align="left" className={classes.tableCell}>
        {isEditMode ? (
          <Input
            value={row[name]}
            name={name}
            onChange={e => onChange(e, row)}
            className={classes.input}
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };
////
const [rows, setRows] = React.useState([
  createData("Name", "sp17bse-037", 6.0, 24, 4.0,"fa"),
  createData("registrationNo", 237, 9.0, 37, 4.3),
  createData("gpa", 262, 16.0, 24, 6.0),
  createData("cgpa", 262, 16.0, 24, 6.0),
  createData("grades", 262, 16.0, 24, 6.0)

]);
const [previous, setPrevious] = React.useState({});
//const classes = useStyles();

const onToggleEditMode = id => {
  setRows(state => {
    return rows.map(row => {
      if (row.id === id) {
        return { ...row, isEditMode: !row.isEditMode };
      }
      return row;
    });
  });
};

const onChange = (e, row) => {
  
  const value = e.target.value;
  const name = e.target.name;
  const { registrationNo } = row;
  const newRows = rows.map(row => {
    if (row.registrationNo === registrationNo) {
      return { ...row, [name]: value };
    }
    return row;
  });
  setRows(newRows);
};

const onRevert = id => {
  const newRows = rows.map(row => {
    if (row.id === id) {
      return previous[id] ? previous[id] : row;
    }
    return row;
  });
  setRows(newRows);
  setPrevious(state => {
    delete state[id];
    return state;
  });
  onToggleEditMode(id);
};

////
 

  return (
    <GridContainer>
      <h1>Add Marks</h1>
     <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Registration No</TableCell>
            <TableCell align="left">Marks</TableCell>
            <TableCell align="left">GPA</TableCell>
            <TableCell align="left">CGPA</TableCell>
            <TableCell align="left">Grades</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <Icon>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </Icon>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <CustomTableCell {...{ row, name: "Iqra Fareed", onChange }} />
              <CustomTableCell {...{ row, name: "sp17-bse-037", onChange }} />
              <CustomTableCell {...{ row, name: "100", onChange }} />
              <CustomTableCell {...{ row, name: "2.9", onChange }} />
              <CustomTableCell {...{ row, name: "2.7", onChange }} />
              <CustomTableCell {...{ row, name: "C", onChange }} />
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Submit
      </Button>
    
    </GridContainer>
  );
};

AddMarks.propTypes = {
  addMarks:PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(null)(
  withRouter(AddMarks)
);
