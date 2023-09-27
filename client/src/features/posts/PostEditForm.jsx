import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchPost, editPost } from "../../services/postService";

function PostEditForm() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // fetch post id
    async function FetchCurrentPost() {
      try {
        const json = await fetchPost(id);
        setPost(json);
      } catch (e) {
        console.log("Error occurred while loading the post:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    FetchCurrentPost();
  }, [id]);

  // fetch put
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title: post.title,
      body: post.body,
    };

    try {
      const response = await editPost(id, postData);
      console.log(`Post with ID ${id} has been updated successfully.`);
      navigate(`/posts/${response}`);
    } catch (e) {
      console.log("Error occurred while deleting the post:", e);
    }
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="post-title">Title:</label>
          <input
            id="post-title"
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="post-body">Description:</label>
          <textarea
            id="post-body"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
            cols="30"
            rows="10"
            required></textarea>
        </div>
        <div>
          <button type="submit">Edit Post</button>
        </div>
      </form>
    </div>
  );
}

export default PostEditForm;
