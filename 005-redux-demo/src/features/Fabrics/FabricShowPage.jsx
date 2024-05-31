import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { colorsList } from "../../assets/data";
import { addToCart } from "../Cart/cartSlice";
import { updateFabricColor } from "./fabricsSlice";
import { DiscountHeading } from "../../components/Headings";
import { FormButton } from "../../components/Buttons";

const FabricShowPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fabric = useSelector((state) =>
    state.fabrics.fabricShowPage.find((item) => item.id === id)
  );
  const [color, setColor] = useState("");

  useEffect(() => {
    setColor(fabric.color || "");
  }, [fabric]);

  const handleColorChange = (e) => {
    const selectedColor = e.target.value;
    setColor(selectedColor);
    dispatch(updateFabricColor({ id: fabric.id, color: selectedColor }));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    dispatch(
      addToCart({
        id: fabric.id,
        img: fabric.img,
        name: fabric.name,
        price: fabric.price,
        color: fabric.color || color,
      })
    );
  };

  return (
    <div className="pt-6 h-full w-full">
      {/* Tailwind component */}
      <div className="flex flex-col justify-center items-center py-10">
        {/* Image */}
        <div className="mx-auto p-6 sm:px-6 lg:px-8">
          <div className="flex justify-center aspect-h-4 aspect-w-3 overflow-hidden rounded-lg ">
            <img
              src={fabric.img}
              alt={fabric.name}
              className=" w-1/2 h-1/2 object-cover object-center"
            />
          </div>
        </div>
        {/* fabric info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
          <div className=" lg:pr-8">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-100 sm:text-3xl">
              {fabric.name}
            </h1>
          </div>

          <div className="mt-4 lg:mt-0">
            <h2 className="sr-only">fabric information</h2>
            <p className="text-3xl tracking-tight text-neutral-100">
              {fabric.price} €
            </p>
            <DiscountHeading text={`Discount up to ${fabric.discount}%`} />

            <div className="py-10 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-xl tracking-tight text-neutral-100">
                    This fabric is made of {fabric.type}.
                  </p>
                  <p className="text-base text-neutral-100">{fabric.text}</p>
                </div>
                <div>
                  <div className="relative h-10 w-72 min-w-[200px] mt-10">
                    <select
                      id="color"
                      name="color"
                      value={color}
                      onChange={handleColorChange}
                      className="peer h-full w-full rounded-[7px] border border-emerald-200 border-t-transparent bg-transparent px-3 py-2.5 font-inter text-base font-normal text-neutral-100 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-emerald-200 placeholder-shown:border-t-emerald-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-emerald-100">
                      {colorsList.map((item, index) => {
                        return <option key={index}>{item}</option>;
                      })}
                    </select>
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[15px] font-normal leading-tight text-neutral-100 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-emerald-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-emerald-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-emerald-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:beforeπ:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-emerald-500">
                      Select a color
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <FormButton text="Add to your bag" onClick={handleAddToCart} className=" mt-10 w-full bg-purple-600 text-neutral-100 hover:bg-purple-700"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FabricShowPage;