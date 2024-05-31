import { filterFabricsByType } from "../Fabrics/fabricsSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../components/Buttons";

const NavigateButtons = () => {
  const typesList = [
    "Cotton",
    "Linen",
    "Silk",
    "Wool",
    "Polyester",
    "Rayon",
    "Nylon",
    "Spandex",
    "Velvet",
    "Denim",
    "Flannel",
    "Satin",
    "Chiffon",
    "Taffeta",
    "Tweed",
    "Leather",
  ];
  const dispatch = useDispatch();

  const handleFilterFabricsByType = (type) => {
    dispatch(filterFabricsByType(type));
  };

  return (
    <div className="">
      <div className="flex flex-wrap justify-center py-5 m-5">
        {typesList.map((type, index) => {
          return (
            <div key={index.id} className="mr-4">
              <Link to={`/fabrics/${type}`}>
                <PrimaryButton text={type} onClick={() => handleFilterFabricsByType(type)} className="outline m-2  bg-neutral-100 rounded hover:bg-purple-800 text-purple-800 hover:text-neutral-100"/>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavigateButtons;
