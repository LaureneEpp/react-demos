import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("authUser")) || {
      fullname: "",
      password: "",
      img: "",
      bio: "",
      authUser: false,
    },
  },
  reducers: {
    login(state, action) {
      const userId = action.payload;
      const userValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,10}$/i.test(
        userId.fullname
      );
      const passwordValidation =
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,10}$/i.test(
          userId.password
        );

      state.user = userId;
      if (!userValidation || !passwordValidation) {
        state.user.authUser = false;
      } else {
        state.user.authUser = true;
        const saveState = JSON.stringify(userId);
        sessionStorage.setItem("authUser", saveState);
      }
    },
    logout(state) {
      state.user = {
        fullname: "",
        password: "",
        img: "",
        bio: "",
        authUser: false,
      };
      sessionStorage.clear();
    },
    // updateUser(state, action) {
    //   state.user = { ...state.user, ...action.payload };
    //   const saveState = JSON.stringify(state.user);
    //   sessionStorage.setItem("authUser", saveState);
    // },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
