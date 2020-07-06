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
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `http://localhost:3000/experiences?page=${pageNum}`
      );
      const experiences = await data.json();
      setExperiences(experiences);
    }
    fetchData();
  }, [pageNum]);

  const prevPage = () => {
    setPageNum(pageNum - 1);
  };
  const nextPage = () => {
    setPageNum(pageNum + 1);
  };

  return (
    <Container>
      <h1> Experiences </h1>
      <div className="d-flex justify-content-between">
        <PageLink onClick={prevPage} disabled={pageNum == 1}>
          Prev Page
        </PageLink>
        <PageLink onClick={nextPage}>Next Page</PageLink>
      </div>
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

const PageLink = ({ disabled, onClick, children }) => {
  if (disabled) {
    return <a class="btn disabled">{children}</a>;
  }
  return (
    <a href="#" onClick={onClick}>
      {children}
    </a>
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
