import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deletePost, fetchAllPosts } from "../../services/postService";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  // Fetch API URL - refactor
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchAllPosts();
        console.log(`Posts have been loaded successfully.`);
        setPosts(data);
        setLoading(false);
      } catch (e) {
        console.log("Error occurred while loading posts:", e);
        setError(e);
      }
    }
    loadPosts();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const response = await deletePost(id);
      if (response === null ) {
        console.log(`Post with ID ${id} deleted successfully.`);
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        console.log("Error occurred while deleting the post:", response);
      }
    } catch (e) {
      console.log("Error occurred while deleting the post:", e);
      // setError(e)
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
            <Link to={`/posts/${post.id}/edit`}>Edit </Link>
            {"|"}
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
