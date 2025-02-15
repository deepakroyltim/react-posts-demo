import React, { useEffect, useState } from "react";

import "./App.css";
import Post from "./components/Post";
import ThemeToggle from "./components/ThemeToggle";
import Error from "./components/Error";
import NewPost from "./components/NewPost";
import { useError } from "./contexts/ErrorContext";

function App() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newPostStatus, setNewPostStatus] = useState(false);
  const { showError } = useError();

  const toggleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoader(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
        setLoader(false);
      } catch (error) {
        showError(error.message);
        setLoader(false);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="App">
      <div id="posts">
        <h1>Posts</h1>

        <div className="btn-section">
          <button className="btn" onClick={toggleShowForm}>
            New Post
          </button>
          <ThemeToggle />
        </div>

        <div className="message">
          {newPostStatus && (
            <div className="success">New Post Created Successfully</div>
          )}
          <Error />
        </div>

        {showForm && (
          <NewPost
            setLoader={setLoader}
            setPosts={setPosts}
            setShowForm={setShowForm}
            setNewPostStatus={setNewPostStatus}
          />
        )}

        {loader && (
          <div className="loader-container">
            <div className="loader-bar" id="loader-bar"></div>
          </div>
        )}

        {posts.length > 0 &&
          posts.map((post) => (
            <Post
              key={`${post.title}@${post.id}`}
              id={post.id}
              title={post.title}
              body={post.body}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
