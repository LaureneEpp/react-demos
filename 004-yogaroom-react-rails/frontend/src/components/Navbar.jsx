import { useState } from "react";
import { motion } from "framer-motion";

const links = [
  { name: "Home", to: "/", id: 1 },
  { name: "Lessons", to: "/yoga_lessons", id: 2 },
  { name: "Agenda", to: "/yoga_classes", id: 3 },
  { name: "Contact", to: "#", id: 4 },
];

const iconVariants = {
  opened: {
    rotate: 90,
  },
  closed: {
    rotate: 0,
  },
};

const menuVariants = {
  opened: {
    top: "10%",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
  closed: {
    top: "-90vh",
  },
};
const linkVariants = {
  opened: {
    opacity: 1,
    y: 50,
  },
  closed: {
    opacity: 0,
    y: 0,
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav className="navbar navbar-expand-lg bg_primary-color  fixed-top d-flex p-3 mx-3 justify-content-between z-2 ">
      <div className="container-fluid">
        <a
          className="navbar-brand text-uppercase fw-bold fs-3 white-color "
          href="#">
          YogaRoom
        </a>
        <motion.svg
          variants={iconVariants}
          animate={isOpen ? "opened" : "closed"}
          onClick={() => setIsOpen(!isOpen)}
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          fill="currentColor"
          className="bi bi-three-dots"
          viewBox="0 0 16 16">
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </motion.svg>
        <motion.div
          initial={false}
          variants={menuVariants}
          animate={isOpen ? "opened" : "closed"}
          className=" menu-toggle vw-100 bg_secondary-color fixed-top d-flex flex-column justify-content-center align-items-center">
          {links.map(({ name, to, id }) => (
            <motion.a
              key={id}
              href={to}
              whileHover={{ scale: 1.1 }}
              variants={linkVariants}
              className="d-block fs-1 fw-bold uppercase primary-color p-3 mb-3 text-decoration-none">
              {name}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
