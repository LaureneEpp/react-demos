import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function YogaClassesList() {
  const [yoga_classes, setYogaClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadYogaClasses() {
      try {
        const API_URL = "http://localhost:3000/api/v1";
        const response = await fetch(`${API_URL}/yoga_classes`);
        console.log("API response:", response);
        console.log("Yoga classes have been loaded successfully.");

        if (response.ok) {
          const json = await response.json();
          console.log("Yoga classes data:", json);
          setYogaClasses(json);
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
      } catch (e) {
        setError(`An error occurred while loading yoga classes: ${e.message}`);
      } finally {
        setLoading(false);
      }
    }

    loadYogaClasses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const API_URL = "http://localhost:3000/api/v1";
      const response = await fetch(`${API_URL}/yoga_classes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setYogaClasses(
          yoga_classes.filter((yoga_class) => yoga_class.id !== id)
        );
      } else {
        throw response;
      }
    } catch (e) {
      console.error(
        `An error occurred while deleting the yoga class: ${e.message}`
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const allYogaClasses = (
    <div className="row">
      {yoga_classes.map((yoga_class) => (
        <div key={yoga_class.id} className="col-md-6 col-lg-4">
          <div className="card mb-4 custom-card">
            <div className="card-body">
              <Link
                to={`/yoga_classes/${yoga_class.id}`}
                className="text-decoration-none text-reset">
                <h5 className="card-title mb-2">{yoga_class.title}</h5>
                <p className="card-text">{yoga_class.description}</p>
              </Link>
              <button onClick={() => handleDelete(yoga_class.id)} className="btn btn-lg my-3 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-trash3-fill orange-light-color"
                  viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const noYogaClass = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No yoga class scheduled yet. Why not{" "}
        <Link to="/new_yoga_class">create one</Link>
      </h4>
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="display-4">All the yoga classes you wish</h2>
      <p className="lead text-muted">
        We pulled together a great agenda for you!
      </p>
      <Link to="/new" className="btn btn-lg my-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-plus-circle-fill secondary-color"
          viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>
      </Link>
      <div className="py-3">
        {yoga_classes.length > 0 ? allYogaClasses : noYogaClass}
      </div>
    </div>
  );
}

export default YogaClassesList;

//       <div className="py-5">
//         <main className="container">
//           <div className="text-end mb-3">
//             <Link to="/recipe" className="btn custom-button">
//               Create New Recipe
//             </Link>
//           </div>
//           <div className="row">
//             {recipes.length > 0 ? allRecipes : noRecipe}
//           </div>
//           <Link to="/" className="btn btn-link">
//             Home
//           </Link>
//         </main>
//       </div>
//     </>
//   );
// };
