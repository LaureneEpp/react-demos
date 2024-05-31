import Slider from "./features/Slider/Slider";
import NavigateButtons from "./features/NavigateButtons/NavigateButtons";
import FabricsIndexSection from "./features/Fabrics/FabricsIndexSection";
import {DiscountHeading} from "./components/Headings"
import { useSelector } from "react-redux";
import Login from "./features/Login/Login";

const Main = () => {
  const authUser = useSelector((state) => state.auth.user);
  
  console.log(authUser)
  return (
    authUser.authUser ? (
      <>
      <Slider></Slider>
        <NavigateButtons></NavigateButtons>
        <DiscountHeading text="Sales for Fabrics up to 50%"/>
        <FabricsIndexSection></FabricsIndexSection>
      </>
    ) : (
      <Login/>
    )
  );
};
export default Main;
