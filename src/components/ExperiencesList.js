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
import Rheostat from "rheostat";

const ExperiencesList = () => {
  const [experiences, setExperiences] = useState([]);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [tempMinPrice, setTempMinPrice] = useState(1);
  const [tempMaxPrice, setTempMaxPrice] = useState(1000);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `http://localhost:3000/experiences?minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      const experiences = await data.json();
      setExperiences(experiences);
    }
    fetchData();
  }, [minPrice, maxPrice]);

  const handleChange = (e) => {
    setMinPrice(e.values[0]);
    setMaxPrice(e.values[1]);
  };

  const handleValuesUpdated = (e) => {
    setTempMinPrice(e.values[0]);
    setTempMaxPrice(e.values[1]);
  };

  return (
    <Container>
      <h1> Experiences </h1>
      <Rheostat
        min={1}
        max={1000}
        values={[minPrice, maxPrice]}
        onValuesUpdated={handleValuesUpdated}
        onChange={handleChange}
      />
      <p>
        Min Price {tempMinPrice} <br /> Max Price {tempMaxPrice}
      </p>
      <input
        type="text"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
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
