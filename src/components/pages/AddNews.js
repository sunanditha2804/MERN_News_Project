import React, { useState } from "react";
import { addNews } from "../services/api";

const AddNews = () => {
  const [news, setNews] = useState({ title: "", content: "", author: "", category: "" });

  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNews(news);
    alert("News added!");
    setNews({ title: "", content: "", author: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="content" placeholder="Content" onChange={handleChange} required></textarea>
      <input type="text" name="author" placeholder="Author" onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
      <button type="submit">Add News</button>
    </form>
  );
};

export default AddNews;
