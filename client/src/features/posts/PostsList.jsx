import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  // Fetch API URL
  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const json = await response.json();
          setPosts(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError("An error occured...");
        console.log("An error occured", e);
        // setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const json = await response.json();
        console.log("Post deleted:", json);
        // Delete post from the list of posts (setPosts)
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        throw response;
      }
    } catch (e) {
      console.log("Error occured", e);
      setError(e);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>
            <Link to={`/posts/${post.id}`} className="post-title">
              {post.title}
            </Link>
          </h2>
          <div className="post-links">
            <button onClick={() => deletePost(post.id)}>Delete Post</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
