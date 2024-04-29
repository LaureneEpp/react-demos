import { nextSlide, prevSlide, dotSlide } from "../slices/sliderSlice";
import { useSelector, useDispatch } from "react-redux";
import { sliderData } from "../../assets/data";

const Slider = () => {
  const slideIndex = useSelector((state) => state.slider.value);
  console.log("slideIndex", slideIndex);
  const dispatch = useDispatch();

  return (
    <div className="relative pb-4">
      {sliderData.map((item) => {
        return (
          <>
            <div
              key={item.id}
              className={
                parseInt(item.id) === slideIndex
                  ? "opacity-100 duration-700 ease-in-out scale-100 m-6 "
                  : "opacity-0 duration-700 ease-in-out scale-96 m-6 "
              }>
              <div>
                {parseInt(item.id) === slideIndex && (
                  <img
                    src={item.img}
                    alt="textile"
                    className="object-cover h-48 w-full drop-shadow-xl"
                  />
                )}
              </div>
              <div className="absolute top-44 mx-auto mt-6 ">
                <p className="text-neutral-100 text-xl font-inter font-bold">
                  {parseInt(item.id) === slideIndex && item.text}
                </p>
              </div>
            </div>
          </>
        );
      })}
      <div className="flex absolute bottom-12 left-[45%]">
        {sliderData.map((dot, index) => {
          return (
            <div className="mr-4" key={dot.id}>
              <div
                className={
                  index === slideIndex
                    ? "bg-purple-600 rounded-full p-2 cursor-pointer"
                    : "bg-neutral-100 rounded-full p-2 cursor-pointer"
                }
                onClick={() => dispatch(dotSlide(index))}></div>
            </div>
          );
        })}
      </div>
      <div>
        <button
          className="absolute top-[15%] left-4 bg-purple-600 text-emerald-700 rounded-full p-2 hover:bg-emerald-700 hover:text-purple-600"
          onClick={() => dispatch(prevSlide(slideIndex - 1))}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </button>
        <button
          className="absolute top-[15%] right-4 bg-purple-600 text-emerald-700 rounded-full p-2 hover:bg-emerald-700 hover:text-purple-600"
          onClick={() => dispatch(nextSlide(slideIndex + 1))}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;
