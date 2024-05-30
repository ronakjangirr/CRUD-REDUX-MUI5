import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Actions

export const createFormAction = createAsyncThunk(
  "formDetailSliceName/createFormAction",
  async (data, { rejectWithValue }) => {
    const response = await axios.post(
      "https://63441d6a2dadea1175b568d5.mockapi.io/crud-youtube",
      data
    );
    try {
      debugger;
      if (!response.ok) {
        console.log("Can't fetch data");
        debugger;
      }
      debugger;
      const result = response.data;
      console.log("result", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const readFormAction = createAsyncThunk(
  "formDetailSliceName/readFormAction",
  async (args, { rejectWithValue }) => {
    const response = await axios(
      "https://63441d6a2dadea1175b568d5.mockapi.io/crud-youtube"
    );
    try {
      debugger;
      if (!response.ok) {
        console.log("Can't fetch data");
        debugger;
      }
      debugger;
      const result = response.data;
      console.log("result", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFormAction = createAsyncThunk(
  "formDetailSliceName/deleteFormAction",
  async (selectedRows, { rejectWithValue }) => {
    debugger;
    const response = await axios.delete(
      `https://63441d6a2dadea1175b568d5.mockapi.io/crud-youtube/${selectedRows}`
    );
    try {
      if (!response.ok) {
        console.log("Can't Delete data");
        debugger;
      }
      const result = response.data;
      console.log("result", result);
      return result;
    } catch (error) {
      return rejectWithValue("Oop's can't delete user");
    }
  }
);

export const updateFormAction = createAsyncThunk(
  "formDetailSliceName/updateFormAction",
  async (updatedData, { rejectWithValue }) => {
    const response = await axios.put(
      `https://63441d6a2dadea1175b568d5.mockapi.io/crud-youtube/${updatedData.id}`,
      updatedData
    );
    try {
      debugger;
      if (!response.ok) {
        console.log("Can't fetch data");
        debugger;
      }
      debugger;
      const result = response.data;
      console.log("result", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// State

export const formDetailSliceName = createSlice({
  name: "formDetail",
  initialState: {
    forms: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createFormAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFormAction.fulfilled, (state, action) => {
        state.loading = false;
        state.forms.push(action.payload); // Push the payload into the forms array
      })
      .addCase(createFormAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(readFormAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readFormAction.fulfilled, (state, action) => {
        debugger;
        state.loading = false;
        state.forms = action.payload;
      })
      .addCase(readFormAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // New reducer for delete action
      .addCase(deleteFormAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFormAction.fulfilled, (state, action) => {
        debugger;
        const deletedId = action.payload.id; // Assuming the response contains the ID of the deleted row
        state.loading = false;
        state.forms = state.forms.filter((form) => form.id !== deletedId); // Remove the deleted row from the forms array
      })
      .addCase(deleteFormAction.rejected, (state, action) => {
        // Handle any error while deleting
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateFormAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFormAction.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = state.forms.map((form) =>
          form.id === action.payload.id ? action.payload : form
        );
      })
      .addCase(updateFormAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default formDetailSliceName.reducer;
