import { Link } from "react-router-dom";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon.jsx";

function BackButton({ path }) {
  return (
    <Link
      to={path}
      className="btn btn-lg secondary-color my-3 p-2"
      role="button">
      <ArrowLeftIcon />
    </Link>
  );
}

export default BackButton;
