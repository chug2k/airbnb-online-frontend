import React, { useState } from "react";

const AddExperience = () => {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pictureUrl, setPictureUrl] = useState("");

  const createExperience = async (e) => {
    e.preventDefault();
    const experienceData = {
      title,
      country,
      price,
      duration,
      pictureUrl,
    };
    const newExperience = await fetch("http://localhost:3000/experiences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experienceData),
    });
    alert("yay experience created");
  };

  return (
    <div>
      <form onSubmit={createExperience}>
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <label for="country">Country</label>
        <input
          type="text"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <br />

        <label for="price">Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />

        <label for="duration">Duration</label>
        <input
          type="number"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <br />

        <label for="pictureUrl">Picture Url</label>
        <input
          type="text"
          name="pictureUrl"
          value={pictureUrl}
          onChange={(e) => setPictureUrl(e.target.value)}
        />
        <br />
        <input type="submit" value="Create Experience" />
      </form>
    </div>
  );
};

export default AddExperience;
