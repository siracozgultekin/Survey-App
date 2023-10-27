import { User } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  is_admin: false,
  name: "",
  surname: "",
  email: "",
  password: "",
  registration_date: "",
  participated_surveys: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      console.log("action.payload.id=>", action.payload.id);
      state.id = action.payload.id;
      state.is_admin = action.payload.is_admin;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.registration_date = action.payload.registration_date;
      state.participated_surveys = action.payload.participated_surveys;
      console.log("setcurrenuser tetiklendi");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
