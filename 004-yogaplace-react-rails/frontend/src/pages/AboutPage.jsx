import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFetchUserData from "../fetchingData/useFetchUserData";

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

function Image() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={
        isLoaded && isInView
          ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
          : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
      }
      transition={{ duration: 1, delay: 1 }}
      onViewportEnter={() => setIsInView(true)}
      className="aspect-ratio-2/3 m-2 "
      style={{ width: "50%", height: "50%" }}>
      <img
        src={`/profile_default.jpeg`}
        alt="profileDefault"
        onLoad={() => setIsLoaded(true)}
        className="img-fluid rounded mx-auto d-block"
      />
    </motion.div>
  );
}

function AboutPage() {
  const { usersList } = useFetchUserData();
  const [instructorsList, setInstructorsList] = useState([]);

  useEffect(() => {
    if (usersList) {
      const instructors = usersList.filter(
        (user) => user.role === "instructor"
      );
      setInstructorsList(instructors);
    }
  }, [usersList]);

  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <div className="text-center px-4">
        <div className="m-5">
          <h2 className="display-4">About Us</h2>
          <p className="lead text-muted">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
            pariatur, laudantium dicta repellat iure minus fugit, tenetur
            facilis, nobis illum voluptatibus deserunt eum enim minima! Aliquam
            dolorem sed rerum accusamus.
          </p>
          <hr className="my-4" />
        </div>
      </div>
      <div className="p-3 overflow-y-auto">
        <div className="text-center">
          <h5 className="display-4">Our Team</h5>
          <div className="d-flex flex-column align-items-center justify-content-center my-4 overflow-scroll">
            {instructorsList.map((i) => (
              <div
                key={i.id}
                className="d-flex flex-row"
                style={{ width: "75%" }}>
                <Image />
                <div className="m-2 w-100 d-flex justify-content-center align-items-center">
                  <Link
                    to={`/users/${i.username}`}
                    className="text-decoration-none text-white">
                    <h6 className="fs-3 border boder-light p-3 fw-light">
                      {i.first_name} {i.last_name}
                    </h6>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
