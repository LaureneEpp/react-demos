import { useDispatch } from "react-redux";
import { fabricShowPage } from "./fabricsSlice";
import { Link, useParams } from "react-router-dom";

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
            <button
              className="align-middle select-none font-inter font-bold text-center uppercase transition-all disabled:opacity-50 disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-purple-700 text-neutral-100 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button">
              {type}
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default FabricCard;
