import { createSlice } from "@reduxjs/toolkit";
import { fabricData } from "../../assets/data";

export const fabricsSlice = createSlice({
  name: "fabrics",
  initialState: {
    fabrics: JSON.parse(sessionStorage.getItem("filteredData")) || fabricData,
    fabricShowPage: JSON.parse(sessionStorage.getItem("singleFabric")) || [],
    updateFabricColor: {},
    fabricsIndex: fabricData
  },
  reducers: {
    filterFabricsByType(state, action) {
      try {
        const filter = fabricData.filter(
          (fabric) => fabric.type === action.payload
        );
        state.fabrics = filter;
        console.log("filter", filter);
        const saveState = JSON.stringify(filter);
        sessionStorage.setItem("filteredData", saveState);
      } catch (error) {
        return error;
      }
    },
    fabricShowPage(state, action) {
      try {
        const singleFabric = fabricData.filter(
          (fabric) => fabric.id === action.payload
        );
        state.fabricShowPage = singleFabric;
        const saveState = JSON.stringify(singleFabric);
        sessionStorage.setItem("singleFabric", saveState);
      } catch (error) {
        return error;
      }
    },
    updateFabricColor(state, action) {
      try {
        const { id, color } = action.payload;
        const fabricIndex = state.fabricShowPage.findIndex(
          (fabric) => fabric.id === id
        );
        if (fabricIndex !== -1) {
          state.fabricShowPage[fabricIndex].color = color;
          state.updateFabricColor = { id, color };
        }
      } catch (error) {
        return error;
      }
    }, 
    fabricsIndex() {
    }
  },
});

export const { filterFabricsByType,  fabricShowPage, updateFabricColor, fabricsIndex } =
  fabricsSlice.actions;
export default fabricsSlice.reducer;
