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
import PaginationLink from "./PaginationLink";
import Rheostat from "rheostat";

const ExperiencesList = () => {
  const [experiences, setExperiences] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [maxPageNum, setMaxPageNum] = useState(1);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [tempMinPrice, setTempMinPrice] = useState(1);
  const [tempMaxPrice, setTempMaxPrice] = useState(1000);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `http://localhost:3000/experiences?page=${pageNum}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      const resp = await data.json();
      setExperiences(resp.data);
      setMaxPageNum(parseInt(resp.maxPageNum));
    }
    fetchData();
  }, [pageNum, minPrice, maxPrice]);

  const goNextPage = () => {
    setPageNum(pageNum + 1);
  };

  const goPrevPage = () => {
    setPageNum(pageNum - 1);
  };

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
      <div>
        <Rheostat
          min={1}
          max={1000}
          values={[minPrice, maxPrice]}
          onChange={handleChange}
          onValuesUpdated={handleValuesUpdated}
          onSliderDragStart={() => setIsDragging(true)}
          onSliderDragEnd={() => setIsDragging(false)}
        />
        <input
          type="text"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <p>
          Min Price {tempMinPrice} - Max Price {tempMaxPrice}
        </p>
      </div>
      <div className="d-flex justify-content-between">
        <PaginationLink disabled={pageNum === 1} handleClick={goPrevPage}>
          Prev Page
        </PaginationLink>
        <PaginationLink
          disabled={pageNum === maxPageNum}
          handleClick={goNextPage}
        >
          Next Page
        </PaginationLink>
      </div>

      <Row style={{ opacity: isDragging ? "0.5" : "1" }}>
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
