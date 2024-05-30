import { useDispatch } from "react-redux";
import { addToCart } from "../Cart/cartSlice";
import { Link } from "react-router-dom";
import { fabricShowPage } from "./fabricsSlice";

const FabricsIndexItem = ({ id, img, name, text, price, color, type }) => {
  const dispatch = useDispatch();
  const defaultColor = "black";

  const handleCardClick = () => {
    dispatch(fabricShowPage(id));
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: id,
        name: name,
        img: img,
        text: text,
        color: defaultColor,
        price: price,
      })
    );
  };

  return (
    <div>
      <div className="relative flex flex-col m-6 bg-neutral-100 shadow-md bg-clip-border rounded-xl w-96">
        <Link to={`/fabrics/${type}/${id}`}>
          <div
            onClick={handleCardClick}>
            <div className=" h-48 overflow-hidden text-neutral-100 shadow-lg bg-clip-border rounded-t-xl bg-emerald-500 shadow-blue-gray-500/40">
              <img src={img} alt="name" className="object-cover" />
            </div>
            <div className="p-6">
              <h5 className="block mb-2 font-inter text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {name}
              </h5>
              <p className="block font-inter text-base antialiased font-light leading-relaxed text-inherit text-justify">
                {text}
              </p>
              <p className="block font-inter text-base antialiased font-light leading-relaxed text-inherit">
                {defaultColor}
              </p>
            </div>
          </div>
        </Link>
        <div className="p-6 pt-0">
          <button
            className="align-middle select-none font-inter font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-emerald-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
            onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FabricsIndexItem;
