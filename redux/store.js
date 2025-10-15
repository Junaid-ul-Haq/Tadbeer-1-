import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import scholarshipReducer from "./slices/scholarshipSlice";
import consultationReducer from "./slices/consultationSlice";
import businessGrantReducer from "./slices/businessGrantSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    scholarship: scholarshipReducer,
    consultation: consultationReducer,
 businessGrant: businessGrantReducer,  },
});

export default store;
