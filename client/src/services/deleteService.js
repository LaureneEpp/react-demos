// import { API_URL } from "../constants";

// async function deletePost (id) {
//     const response = await fetch(`${API_URL}/${id}`, {
//         method: "DELETE",
//     });
//     if (!response.ok) {
//         throw new Error(response.statusText)
//     }
//     return response.json();
// }

// export {deletePost}

// const deletePost = async (id) => {
//     try {
//       await deletePost(id)
//       const response = await fetch(`${API_URL}/${id}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         const json = await response.json();
//         console.log("Post deleted:", json);
//         // Delete post from the list of posts (setPosts)
//         setPosts(posts.filter((post) => post.id !== id));
//       } else {
//         throw response;
//       }
//     } catch (e) {
//       console.log("Error occured", e);
//       setError(e);
//     }
//   };