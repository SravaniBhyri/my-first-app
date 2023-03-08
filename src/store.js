import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./features/cardsSlice";

export default configureStore({
  reducer: {
    videoCards: cardsReducer,
  },
});
