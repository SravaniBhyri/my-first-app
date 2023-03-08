import {  createSlice } from "@reduxjs/toolkit";



const cardsSlice = createSlice({
  name: "videoCards",
  initialState: {
    entities: [],
    folders:[],
    videoHistory:[],
    loading: false,
  },
  reducers: {
    folderAdded(state, action) {
      state.folders.push(action.payload);
    },
    videHistoryAdded(state, action) {
      state.videoHistory.push(action.payload);
    },
    userAdded(state, action) {
      state.entities.push(action.payload);
    },
    fodlerUpdated(state, action) {
      const { id, name, description } = action.payload;
      const index = state.folders.findIndex((folder) => folder.id === id);
      if (index > -1) {
        state.folders[index].name = name;
        state.folders[index].description = description;
      }
    },
    userUpdated(state, action) {
      const { id, name, link } = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.link = link;
      }
    },
    userDeleted(state, action) {
      const { id } = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        state.entities = state.entities.filter((user) => user.id !== id);
      }
    },
    folderDeleted(state, action) {
      const { id } = action.payload;
      const existingUser = state.folders.find((user) => user.id === id);
      if (existingUser) {
        state.folders = state.folders.filter((user) => user.id !== id);
      }
    },
  },

});

export const { userAdded, userUpdated, userDeleted, folderAdded, folderDeleted, fodlerUpdated, videHistoryAdded } = cardsSlice.actions;

export default cardsSlice.reducer;
