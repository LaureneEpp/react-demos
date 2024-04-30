// import React from "react";
import { fabricData } from "../../assets/data";

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

const NavigateButtons = () => {
  return (
    <div className="">
      <div className="flex flex-wrap justify-center py-5 m-5">
        {typesList.map((type, index) => {
          return (
            <div key={index} className="mr-4">
              <button class="outline bg-neutral-100 hover:bg-purple-800 text-purple-800 hover:text-neutral-100 font-bold py-2 px-4 m-2 rounded">
                {type}
              </button>
            </div>
          );
        })}
      </div>
      <div className="bg-red-300 p-2 w-[55%] mx-auto rounded">
        <h3 className="text-orange-900 text-center text-lg">Sales up to 50%</h3>
      </div>
      <div className="flex flex-wrap justify-center items-center py-5 m-5">
        {fabricData.map((img, index) => {
          return (
            <div >
              <img src={img.img} alt="Fabrics" className="object-cover h-48 w-full drop-shadow-xl py-2 px-4 m-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavigateButtons;
