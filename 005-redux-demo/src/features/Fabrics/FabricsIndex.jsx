import { fabricData } from "../../assets/data";
import FabricsIndexItem from "./FabricsIndexItem";

const FabricsIndex = () => {
  return (
    <div>
      <div className="bg-red-300 p-2 w-[55%] mx-auto rounded">
        <h3 className="text-orange-900 text-center text-lg">
          Sales for Fabrics up to 50%
        </h3>
      </div>
      <div className="flex flex-wrap justify-center items-center py-5 m-5">
        {fabricData.slice(0, 6).map((item, index) => {
          return (
            <div key={index}>
              <FabricsIndexItem
                id={item.id}
                name={item.name}
                img={item.img}
                text={item.text}
                color={item.color}
                price={item.price}
                type={item.type}></FabricsIndexItem>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FabricsIndex;
