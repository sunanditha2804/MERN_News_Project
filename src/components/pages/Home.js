import React, { useEffect, useState } from "react";
import { fetchNews, deleteNews, addNews, updateNews } from "../services/api";

const Home = () => {
  const [news, setNews] = useState([]);
  const [newNews, setNewNews] = useState({ title: "", content: "", author: "", category: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "", author: "", category: "", image: "" });

  useEffect(() => {
    fetchNews()
      .then(setNews)
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid ID!");
      return;
    }
    try {
      await deleteNews(id);
      setNews(news.filter((item) => item.id !== id && item._id !== id));
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Failed to delete news.");
    }
  };

  const handleAdd = async () => {
    if (!newNews.title || !newNews.content || !newNews.author || !newNews.category) {
      alert("All fields are required!");
      return;
    }
    try {
      const addedNews = await addNews(newNews);
      setNews([...news, addedNews]);
      setNewNews({ title: "", content: "", author: "", category: "", image: "" });
    } catch (error) {
      console.error("Error adding news:", error);
      alert("Failed to add news.");
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id || item._id);
    setEditData({ title: item.title, content: item.content, author: item.author, category: item.category, image: item.image });
  };

  const handleUpdate = async () => {
    if (!editId) return;
    try {
      await updateNews(editId, editData);
      setNews(news.map((item) => (item.id === editId || item._id === editId ? { ...item, ...editData } : item)));
      setEditId(null);
    } catch (error) {
      console.error("Error updating news:", error);
      alert("Failed to update news.");
    }
  };

  return (
    <div>
      <h2>📰 Latest News</h2>

      {/* Add News Section */}
      <div style={{ marginBottom: 20 }}>
        <h3>Add News</h3>
        <input type="text" placeholder="Title" value={newNews.title} onChange={(e) => setNewNews({ ...newNews, title: e.target.value })} />
        <textarea placeholder="Content" value={newNews.content} onChange={(e) => setNewNews({ ...newNews, content: e.target.value })} />
        <input type="text" placeholder="Author" value={newNews.author} onChange={(e) => setNewNews({ ...newNews, author: e.target.value })} />
        <input type="text" placeholder="Category" value={newNews.category} onChange={(e) => setNewNews({ ...newNews, category: e.target.value })} />
        
        <button onClick={handleAdd}>Add News</button>
      </div>

      {/* News List */}
      {news.map((item) => (
        <div key={item.id || item._id} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
          {editId === (item.id || item._id) ? (
            <>
              <input type="text" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
              <textarea value={editData.content} onChange={(e) => setEditData({ ...editData, content: e.target.value })} />
              <input type="text" value={editData.author} onChange={(e) => setEditData({ ...editData, author: e.target.value })} />
              <input type="text" value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} />
              
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <p><b>Author:</b> {item.author}</p>
              <p><b>Category:</b> {item.category}</p>
              
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id || item._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
