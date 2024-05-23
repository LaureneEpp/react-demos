import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
import { useState } from "react";
// import NavBar from "../../components/NavBar";

const Cart = () => {
  const [openModal, setOpenModal] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  console.log("cart", cart);
  const handleClearCart = (e) => {
    // e.preventDefault();
    dispatch(clearCart());
    setOpenModal(false);
  };

  const handleCancel = (e) => {
    // e.preventDefault();
    setOpenModal(false);
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
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900 my-3"
                      id="modal-title">
                      ShoppingCart
                    </h3>
                    <div className="mt-2">
                      <ul className="list-none">
                        {cart.map((item) => (
                          <li key={item.id} className="my-2 text-gray-500 text-base">
                            <strong>{item.name} </strong> for {item.color} color and {item.amount} units.
                          </li>
                        ))}
                      </ul>
                      <p className="text-base text-gray-500 mt-4">
                        You have a total of <span className="underline underline-offset-1">{totalAmount} items</span>.
                      </p>
                      <p className="text-base text-gray-500 mt-4">
                        ${totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-neutral-100 shadow-sm hover:bg-emerald-500 sm:ml-3 sm:w-auto">
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-neutral-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Cart;
