import { AnimatePresence, motion } from "framer-motion";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

function Modal({ modal, setModal, content }) {
  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible">
          <motion.div
            className="h-75 w-75 shadow rounded-1 bg_orange-light-color border border-white border-2 d-flex flex-column justify-content-center align-content-center position-relative  mt-5">
            <button
              onClick={() => setModal(true)}
              className="position-absolute top-0 left-0 btn btn-lg border border-2 d-block m-4 rounded">
              &times;
            </button>
            <div className="mt-5 p-5 d-flex flex-column justify-content-center align-items-center overflow-auto">
              {content}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
