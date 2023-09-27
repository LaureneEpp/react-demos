import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../constants";

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
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          throw response;
        }
      } catch (error) {
        console.log("An error occured", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    FetchCurrentPost();
  }, [id]);

  // fetch put
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: post.title,
          body: post.body
        }
        ),
      });
      if (response.ok) {
        const json = await response.json();
        console.log("Post updated:", json);
        navigate(`/posts/${id}`);
      } else {
        throw response;
      }
    } catch (error) {
      console.log("Error occured", error);
      setError(error);
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
