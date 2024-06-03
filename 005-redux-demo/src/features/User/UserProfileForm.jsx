// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateUser } from "../../features/Login/authSlice";
// import { FormButton } from "../../components/Buttons";
// import { useNavigate } from "react-router-dom";

// const UserProfileForm = () => {
//   const dispatch = useDispatch();
//   const authUser = useSelector((state) => state.auth.user);
//   let navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: authUser.fullname,
//     password: authUser.password,
//     bio: authUser.bio,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   console.log(formData)
//   console.log(setFormData)

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateUser(formData));
//     navigate("/profile");
//   };

//   // const handleClick = (e) => {
//   //   navigate("/profile");
//   // };

//   return (
//     <div className="w-full h-full flex flex-col justify-center items-center text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
//       <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
//         Edit your profile
//       </h4>
//       <form
//         className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
//         onSubmit={handleSubmit}>
//         <div className="flex flex-col gap-6 mb-1">
//           <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
//             Your full name
//           </h6>
//           <div className="relative h-11 w-full min-w-[200px]">
//             <input
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="peer h-full w-full text-red-800 rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
//             />
//           </div>

//           <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
//             Password
//           </h6>
//           <div className="relative h-11 w-full min-w-[200px]">
//             <input
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
//             />
//           </div>
//           <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
//             Bio
//           </h6>
//           <div className="relative h-11 w-full min-w-[200px]">
//             <input
//               name="bio"
//               value={formData.bio}
//               onChange={handleChange}
//               className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
//             />
//           </div>
//         </div>
//         <div className="inline-flex items-center">
//           <FormButton
//             text="Save"
//             onClick=""
//             className="bg-blue-500 text-white hover:bg-blue-600"
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserProfileForm;
