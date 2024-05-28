// NavBar template from TailwindCSS
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ShoppingCartIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Cart from "../features/Cart/Cart";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../features/Login/authSlice";

const navigation = [
  { name: "Dashboard", path: "/", current: true },
  { name: "Articles", path: "#", current: false },
  { name: "Calendar", path: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({ cart }) {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector((state) => state.user.user);
  const { authUser } = user;
  // const { name } = user;
  const dispatch = useDispatch();
  const handleOpen = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
  };

  return (
    <Disclosure as="nav" className="bg-emerald-900 text-neutral-100">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {authUser && (
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-purple-600 hover:bg-emerald-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              )}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#9333ea"
                    className="h-8 w-auto">
                    <path
                      fillRule="evenodd"
                      d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {authUser && (
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          className={classNames(
                            item.current
                              ? "bg-emerald-900"
                              : "hover:bg-emerald-700",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}>
                          {item.name}
                        </Link>
                      ))}
                      <div
                        onClick={handleOpen}
                        className="flex flex-row bg-emerald-900 rounded-md px-3 py-2 text-sm font-medium hover:bg-emerald-700">
                        <ShoppingCartIcon
                          className="h-6 w-6 "
                          aria-hidden="true"
                        />
                        {totalAmount > 0 ? (
                          <span className="rounded-full bg-purple-300 mx-2 px-3 font-inter text-sm">
                            {totalAmount}
                          </span>
                        ) : (
                          ""
                        )}
                        {openModal && (
                          <Cart
                            openModal={openModal}
                            setOpenModal={setOpenModal}></Cart>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {authUser && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-emerald-800 p-1 text-purple-600 hover:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-800">
                    <span className="absolute -inset-1.5" />
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    <button
                      type="button"
                      className="relative rounded-full bg-emerald-800 p-1 text-purple-600 hover:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-800 mx-2">
                      <span
                        className="absolute -inset-1.5"
                        onClick={() => dispatch(logout())}
                      />
                      <span className="sr-only">View notifications</span>
                      <ArrowLeftStartOnRectangleIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </button>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-emerald-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="#"
                              className={classNames(
                                active ? "bg-emerald-100" : "",
                                "block px-4 py-2 text-sm text-emerald-700"
                              )}>
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="#"
                              className={classNames(
                                active ? "bg-emerald-100" : "",
                                "block px-4 py-2 text-sm text-emerald-700"
                              )}>
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="#"
                              className={classNames(
                                active ? "bg-emerald-100" : "",
                                "block px-4 py-2 text-sm text-emerald-700"
                              )}>
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
          </div>
          {authUser && (
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.id}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? "bg-emerald-900" : " hover:bg-emerald-700",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}>
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
}
