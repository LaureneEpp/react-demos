// import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createPost } from "../../services/postService";
import PostForm from "./PostForm";

function NewPostForm() {
  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleCreateSubmit = async (formData) => {
    try {
      const response = await createPost(formData);
      console.log(`Post created successfully.`);
      navigate(`/posts/${response}`);
    } catch (e) {
      console.error("Error occurred while creating the new post:", e);
    }
  };

  return (
    <PostForm
      headerText="Create a new post"
      onSubmit={handleCreateSubmit}
      buttonText="Create Post"
    />
  );
}

export default NewPostForm;
