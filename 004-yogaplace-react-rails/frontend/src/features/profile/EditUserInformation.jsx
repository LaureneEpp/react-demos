import { useNavigate, Link } from "react-router-dom";
import BackButton from "../../components/Button/BackButton";
import SubmitButton from "../../components/Button/SubmitButton";
import IdentityIcon from "../../assets/icons/IdentityIcon";
import LocationIcon from "../../assets/icons/LocationIcon";
import EmailIcon from "../../assets/icons/EmailIcon";
import useFetchUserData from "../../services/useFetchUserData";

const EditUserInformation = ({ currUser }) => {
  const { userData, updateUserData } = useFetchUserData({ currUser });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUserData({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user[first_name]", userData.first_name);
    formData.append("user[last_name]", userData.last_name);
    formData.append("user[username]", userData.username);
    formData.append("user[email]", userData.email);
    formData.append("user[city]", userData.city);
    formData.append("user[role]", userData.role);
    formData.append("user[password]", userData.password);

    try {
      const API_URL = "http://localhost:3000/api/v1";
      const response = await fetch(`${API_URL}/users/${currUser.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        console.log("Image uploaded successfully");
        localStorage.setItem("token", response.headers.get("Authorization"));
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
    navigate(`/${currUser.username}`);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card bg-transparent border border-2 p-2">
              <div className="card-header p-3">
                <h2 className="card-title white-color display-4">
                  Edit your profile
                </h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} className="pt-4">
                  <div className="mb-3 lead white-color d-flex flex-row align-items-center">
                    <IdentityIcon width={25} height={25} />
                    <input
                      type="first_name"
                      className="form-control me-1"
                      id="first_name"
                      name="first_name"
                      value={userData.first_name}
                      onChange={handleChange}
                    />

                    <input
                      type="last_name"
                      className="form-control"
                      id="last_name"
                      name="last_name"
                      value={userData.last_name}
                      onChange={handleChange}
                    />
                    <hr className="my-2 bg-secondary" />
                  </div>
                  <div className="mb-3 lead white-color d-flex flex-row align-items-center">
                    <IdentityIcon width={25} height={25} />
                    <input
                      type="username"
                      className="form-control"
                      id="username"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                    />
                    <hr className="my-2 bg-secondary" />
                  </div>
                  <div className="mb-3 lead white-color d-flex flex-row align-items-center">
                    <LocationIcon width={25} height={25} />
                    <input
                      type="city"
                      className="form-control"
                      id="city"
                      name="city"
                      value={userData.city}
                      onChange={handleChange}
                    />
                    <hr className="my-2 bg-secondary" />
                  </div>
                  <div className="mb-3 lead white-color d-flex flex-row align-items-center">
                    <EmailIcon />
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                    />
                    <hr className="my-2 bg-secondary" />
                  </div>
                  <div className="d-flex">
                    <BackButton path={`/${currUser.username}`} />
                    <SubmitButton />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserInformation;
