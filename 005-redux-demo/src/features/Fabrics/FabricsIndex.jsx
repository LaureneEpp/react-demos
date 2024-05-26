import FabricsIndexItem from "./FabricsIndexItem";
import { useSelector } from "react-redux";

const FabricsIndex = () => {
  const fabrics = useSelector((state) => state.fabrics.fabrics);

  return (
    <div>
      <div className="bg-red-300 p-2 w-[55%] mx-auto rounded">
        <h3 className="text-orange-900 text-center text-lg">
          Sales for Fabrics up to 50%
        </h3>
      </div>
      <div className="flex flex-wrap justify-center items-center py-5 m-5">
        {fabrics.map((fabric, index) => {
          return (
            <div key={index}>
              <FabricsIndexItem
                id={fabric.id}
                name={fabric.name}
                img={fabric.img}
                text={fabric.text}
                color={fabric.color}
                price={fabric.price}
                type={fabric.type}></FabricsIndexItem>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FabricsIndex;
