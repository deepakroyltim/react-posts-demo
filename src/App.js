import React, { useEffect, useState } from "react";

import "./App.css";
import Post from "./components/Post";
import ThemeToggle from "./components/ThemeToggle";
import Error from "./components/Error";
import NewPost from "./components/NewPost";
import { useAppContext } from "./contexts/AppContext";

function App() {
  // State to store posts fetched from the API
  const [posts, setPosts] = useState([]);
  // State to handle loader visibility
  const [loader, setLoader] = useState(false);
  // State to handle form visibility
  const [showForm, setShowForm] = useState(false);
  // State to handle the new post status
  const [newPostStatus, setNewPostStatus] = useState(false);
  // Access the showError function from the custom context hook
  const { showError } = useAppContext();

  // Function to toggle the form visibility
  const toggleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  // useEffect to fetch posts when the component mounts
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
          {/* Button to toggle the new post form visibility */}
          <button className="btn" onClick={toggleShowForm}>
            New Post
          </button>
          {/* Component to toggle the theme */}
          <ThemeToggle />
        </div>

        <div className="message">
          {newPostStatus && (
            // Message displayed when a new post is created successfully
            <div className="success">New Post Created Successfully</div>
          )}
          {/* Error component to display error messages */}
          <Error />
        </div>

        {showForm && (
          // Form component to create a new post
          <NewPost
            setLoader={setLoader}
            setPosts={setPosts}
            setShowForm={setShowForm}
            setNewPostStatus={setNewPostStatus}
          />
        )}

        {loader && (
          // Loader component displayed while fetching posts
          <div className="loader-container">
            <div className="loader-bar" id="loader-bar"></div>
          </div>
        )}

        {posts.length > 0 &&
          // Map through posts and render Post components
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
