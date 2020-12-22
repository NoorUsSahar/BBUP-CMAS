import React from "react";
import FileUpload from "./components/FileUpload";
import "../../../App.css";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";

const UploadFile = () => (
  <div className="container mt-4">
    <Card>
      <CardHeader color="primary">
        <h4 className="display-4 text-center mb-4">
          <i className="fab " /> Upload File
        </h4>
      </CardHeader>
      <CardBody>
        <FileUpload />
      </CardBody>
    </Card>
  </div>
);

export default UploadFile;
