import Slider from "./features/Slider/Slider";
import NavigateButtons from "./features/NavigateButtons/NavigateButtons";
import FabricsIndexSection from "./features/Fabrics/FabricsIndexSection";
import {DiscountHeading} from "./components/Headings"

const Main = () => {
  return (
    <>
      <Slider></Slider>
      <NavigateButtons></NavigateButtons>
      <DiscountHeading/>
      <FabricsIndexSection></FabricsIndexSection>
    </>
  );
};
export default Main;
