// import React from "react";
import { fabricData } from "../../assets/data";
import { filterFabricsByType } from "../Fabrics/fabricsSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


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
              <button className="outline bg-neutral-100 hover:bg-purple-800 text-purple-800 hover:text-neutral-100 font-bold py-2 px-4 m-2 rounded"
              onClick={() => handleFilterFabricsByType(type)}
              >
                {type}
              </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavigateButtons;
