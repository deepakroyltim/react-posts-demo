const Post = ({ id, title, body }) => {
  return (
    <div className="post">
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
};

export default Post;
