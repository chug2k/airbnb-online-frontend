import React, { useState, useEffect } from "react";

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
    <div>
      <h1> Experiences </h1>
      {experiences.map((e) => (
        <Experience {...e} />
      ))}
    </div>
  );
};

const Experience = ({ title, pictureUrl, country, duration, price }) => (
  <div>
    <h2>{title}</h2>
    <img src={pictureUrl} />
    <h3>{country}</h3>
    <h4>Starting from ${price}</h4>
    <h4>{duration} hour</h4>
  </div>
);

export default ExperiencesList;
