import { motion } from "framer-motion";

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut",
};

function LoadingAnimation() {
  return (
    <div className="vw-100 vh-100 mt-3 d-flex align-items-center justify-content-center ">
      <motion.div
        className="d-flex justify-content-around"
        style={{ width: "10rem", height: "5rem" }}
        variants={ContainerVariants}
        initial="initial"
        animate="animate">
        <motion.span
          className="d-block rounded-circle bg-white"
          style={{ width: "2rem", height: "2rem" }}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          className="d-block rounded-circle bg-white"
          style={{ width: "2rem", height: "2rem" }}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          className="d-block rounded-circle bg-white"
          style={{ width: "2rem", height: "2rem" }}
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
    </div>
  );
}

export default LoadingAnimation;
