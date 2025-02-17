import { useRef } from "react";
import { useAppContext } from "../contexts/AppContext";

const NewPost = ({ setLoader, setPosts, setShowForm, setNewPostStatus }) => {
  // Refs to store the values of the title and body input fields
  const titleRef = useRef();
  const bodyRef = useRef();
  // Destructure the showError function from the custom context hook
  const { showError } = useAppContext();

  // Function to validate the form inputs
  const formValidation = () => {
    const title = titleRef.current.value;
    const body = titleRef.current.value;
    if (title === "") {
      showError("Title cannot be blank");
      return false;
    }
    if (body === "") {
      showError("Post Body cannot be blank");
      return false;
    }
    if (title !== "" && body !== "") {
      return true;
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validate = formValidation();
    if (!validate) {
      return false;
    }
    const title = titleRef.current.value;
    const body = bodyRef.current.value;
    try {
      setLoader(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({
            title: title,
            body: body,
            userId: 1,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const newPost = await response.json();

      // Update the posts state with the new post
      setPosts((prevPost) => [newPost, ...prevPost]);
      setNewPostStatus(true);
      setLoader(false);
      setTimeout(() => {
        setNewPostStatus(false);
        setLoader(false);
      }, 5000);

      // Reset the form fields and hide the form
      titleRef.current.value = "";
      bodyRef.current.value = "";
      setShowForm((prevStatus) => !prevStatus);
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <div className="form">
      <h2>New Post</h2>
      <label htmlFor="name">Title:</label>
      <input type="text" id="title" name="title" ref={titleRef} />

      <label htmlFor="email">Body:</label>
      <textarea id="body" name="body" rows={10} ref={bodyRef} />

      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default NewPost;
