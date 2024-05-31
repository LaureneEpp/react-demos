import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "./cartSlice";
import { useState } from "react";
import { PrimaryButton } from "../../components/Buttons";

const Cart = () => {
  const [openModal, setOpenModal] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleClearCart = (e) => {
    dispatch(clearCart());
    // setOpenModal(false);
  };

  const handleCancel = (e) => {
    setOpenModal(false);
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    /* Tailwind component */
    openModal && (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-neutral-100 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-neutral-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </div>
                  <div className="w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900 my-3"
                      id="modal-title">
                      ShoppingCart
                    </h3>
                    <div className="mt-2">
                      {cart.length > 0 ? (
                        <div>
                          {cart.map((item, index) => (
                            <div className="flex flex-row mt-4">
                              {" "}
                              key={index}
                              <div className="flex-none">
                                <img
                                  className="h-[125px] rounded-md"
                                  src={item.img}
                                  alt={item.name}
                                />
                              </div>
                              <div className=" grow flex flex-col p-3">
                                <div className="flex flex-row justify-between">
                                  <div className="text-gray-500 text-base font-inter font-bold tracking-norma leading-none py-4">
                                    {item.name}
                                  </div>
                                  <div className="text-gray-500 text-base font-intertracking-norma leading-none py-4 italic">
                                    {item.color}
                                  </div>
                                </div>
                                <div className="flex flex-row justify-between">
                                  <div className="text-gray-500 text-sm font-inter tracking-norma leading-none">
                                    Quantity: {item.amount}
                                  </div>
                                  <div className="text-gray-500 text-sm font-inter tracking-norma leading-none">
                                    ${item.price}/p
                                  </div>
                                </div>
                                <div className="flex justify-end">
                                  <PrimaryButton text="Remove" onclick={() => handleRemoveFromCart(item)} className="mt-6 bg-red-300 text-neutral-100 hover:bg-red-400" />
                                </div>
                              </div>
                            </div>
                          ))}

                          <p className="text-base text-gray-500 mt-4">
                            You have a total of{" "}
                            <span className="underline underline-offset-1">
                              {totalAmount} items
                            </span>
                            .
                          </p>
                          <p className="flex justify-end text-lg text-gray-500 mt-4 mr-6">
                            <strong>${totalPrice.toFixed(2)}</strong>
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h2 className="text-base text-gray-500 mt-4">
                            Your bag is empty
                          </h2>
                          <p className="flex justify-end text-base text-gray-500 font-inter tracking-normal leading-none my-3 mr-6">
                            {" "}
                            Add some products
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <div className="flex flex-row">
                  <PrimaryButton
                    text="Cancel"
                    onclick={handleCancel}
                    className="mx-2 bg-neutral-100 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-neutral-400 hover:text-neutral-100 "
                  />
                  <PrimaryButton
                    text="Clear"
                    onclick={handleClearCart}
                    className="mx-2 bg-emerald-600 text-neutral-100 hover:bg-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Cart;
