import { useDispatch } from "react-redux";
import { fabricShowPage } from "./fabricsSlice";
import { Link, useParams } from "react-router-dom";
import { PrimaryButton } from "../../components/Buttons";

const FabricCard = ({ id, img, name, text, price, color }) => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const handleCardClick = () => {
    dispatch(fabricShowPage(id));
  };

  return (
    <>
      <Link to={`/fabrics/${type}/` + id}>
        <div
          className=" flex flex-col mt-6 text-gray-700 bg-neutral-100 shadow-md bg-clip-border rounded-xl w-96"
          onClick={handleCardClick}>
          <div className="p-6">
            <h5 className="block mb-2 font-inter text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {name}
            </h5>
            <p className="block font-inter text-base antialiased font-light leading-relaxed text-inherit">
              {text}
            </p>
            <p className="block font-inter text-base antialiased font-light leading-relaxed text-inherit">
              {price}€
            </p>
          </div>
          <div className="p-6 pt-0">
            <PrimaryButton text={type} onClick={handleCardClick} className="p-2 bg-purple-700 text-neutral-100 rounded-lg"/>
          </div>
        </div>
      </Link>
    </>
  );
};

export default FabricCard;
