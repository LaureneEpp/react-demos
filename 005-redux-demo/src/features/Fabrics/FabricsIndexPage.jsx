import FabricsIndexItem from "./FabricsIndexItem";
import { useSelector } from "react-redux";

const FabricsIndexPage = () => {
  const fabrics = useSelector((state) => state.fabrics.fabricsIndex);

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center py-5 m-5">
        {fabrics.map((fabric, index) => {
          return (
            <div key={fabric.id}>
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

export default FabricsIndexPage;
