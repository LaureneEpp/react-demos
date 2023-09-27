import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../constants";

function PostDetails() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  const [, setError] = useState(null);

  useEffect(() => {
    async function fetchCurrentPost() {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          throw response;
        }
      } catch (e) {
        console.log("An error occured", e);
      }
    }
    fetchCurrentPost();
  }, [id]);

  const deletePost = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // const json = await response.json();
        navigate("/");
      } else {
        throw response;
      }
    } catch (e) {
      console.log("Error occured", e);
      setError(e);
    }
  };

  if (!post) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to={`/posts/${post.id}/edit`}> Edit </Link>
      {"|"}
      <Link to="/"> Back to Posts</Link>
      {"|"}
      <button onClick={deletePost}>Delete</button>
    </div>
  );
}

export default PostDetails;
