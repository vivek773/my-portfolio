// User slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  webAccessToken: null,
  first_name: "",
  last_name: "",
  user_id: "",
  tenant_id: "",
  business_name: "",
  email: "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const {
        webAccessToken,
        first_name,
        last_name,
        user_id,
        tenant_id,
        business_name,
        email,
      } = action.payload;

      state.webAccessToken = webAccessToken;
      state.first_name = first_name;
      state.last_name = last_name;
      state.user_id = user_id;
      state.tenant_id = tenant_id;
      state.business_name = business_name;
      state.email = email;
    },
    resetUser: (state) => {
      state.webAccessToken = initialState.webAccessToken;
      state.first_name = initialState.first_name;
      state.last_name = initialState.last_name;
      state.user_id = initialState.user_id;
      state.tenant_id = initialState.tenant_id;
      state.business_name = initialState.business_name;
      state.email = initialState.email;
    },
  },
});

export const { loginUser, resetUser } = auth.actions;
export default auth.reducer;
