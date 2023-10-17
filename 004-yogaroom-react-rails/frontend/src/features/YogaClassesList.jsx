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
              <button
                onClick={() => handleDelete(yoga_class.id)}
                className="btn btn-lg delete-button my-3">
                Delete
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
      <Link to="/new" className="btn btn-lg custom-button my-3">
        Create a new class
      </Link>
      <div className="py-5">
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
