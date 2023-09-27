import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../constants";
import { fetchPost, deletePost as deletePostService } from "../../services/postService";

function PostDetails() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  const [, setError] = useState(null);

  useEffect(() => {
    async function fetchCurrentPost() {
      try {
        const json = await fetchPost(id)
        setPost(json)
      } catch (e) {
        console.log("An error occured", e);
      }
    }
    fetchCurrentPost();
  }, [id]);

  const deletePost = async () => {
    try { 
      await deletePostService(post.id);
        navigate("/");

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
