import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";

const ExperiencesList = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("http://localhost:3000/experiences");
      const experiences = await data.json();
      setExperiences(experiences);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <h1> Experiences </h1>
      <Row>
        {experiences.map((e) => (
          <Col sm={4}>
            <Experience {...e} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const Experience = ({ title, pictureUrl, country, duration, price }) => (
  <Card>
    <CardImg top width="100%" src={pictureUrl} alt="Card image cap" />
    <CardBody>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{country}</CardSubtitle>
      <CardText>Starting from ${price}</CardText>
    </CardBody>
  </Card>
);

export default ExperiencesList;
