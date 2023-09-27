import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../constants";
import {
  fetchPost,
  deletePost as deletePostService,
} from "../../services/postService";

function PostDetails() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  const [, setError] = useState(null);

  useEffect(() => {
    async function fetchCurrentPost() {
      try {
        const json = await fetchPost(id);
        console.log(`Post with ID ${id} has been loaded successfully.`);
        setPost(json);
      } catch (e) {
        console.log("Error occurred while loading the post:", e);
      }
    }
    fetchCurrentPost();
  }, [id]);

  const handleDeletePost = async () => {
    try {
      await deletePostService(post.id);
      console.log(`Post with ID ${id} deleted successfully.`);
      navigate("/");
    } catch (e) {
      console.log("Error occurred while deleting the post:", e);
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
      <button onClick={handleDeletePost}>Delete</button>
    </div>
  );
}

export default PostDetails;
