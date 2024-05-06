import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FabricCard from "./FabricCard";

const Fabrics = () => {
  const fabrics = useSelector((state) => state.fabrics.fabrics);
  console.log("fabrics", fabrics);
  const { type } = useParams();

  return (
    <div>
      <div className="pt-16">
        <div className="pl-14">
          <h1 className="text-4xl font-inter text-emerald-300 font-bold tracking-normal leading-none">
            {type}
          </h1>
        </div>
        <div className="flex flex-wrap justify-center items-center py-8 gap-8">
          {fabrics
            .filter((fabric) => fabric.type === type)
            .map((fabric, index) => {
              return (
                <div key={index}>
                  <FabricCard
                    id={fabric.id}
                    name={fabric.name}
                    text={fabric.text}
                    price={fabric.price}></FabricCard>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Fabrics;
