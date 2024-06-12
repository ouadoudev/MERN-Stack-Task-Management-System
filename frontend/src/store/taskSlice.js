// features/tasks/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loggedUser } from "./authSlice";

// Thunks for asynchronous actions
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const user = loggedUser(state);

      if (!user || !user.id || !user.token) {
        throw new Error("User not authenticated");
      }
      const response = await axios.get("/task/list", {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.tasks;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const user = loggedUser(state);

      if (!user || !user.id || !user.token) {
        throw new Error("User not authenticated");
      }
      const response = await axios.post("/task", taskData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, taskData }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const user = loggedUser(state);

      if (!user || !user.id || !user.token) {
        throw new Error("User not authenticated");
      }
      const response = await axios.put(`/task/${taskId}`, taskData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeTaskStatus = createAsyncThunk(
  "tasks/changeTaskStatus",
  async ({ taskId, taskStatus }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const user = loggedUser(state);

      if (!user || !user.id || !user.token) {
        throw new Error("User not authenticated");
      }
      const response = await axios.patch(
        `/task/${taskId}/status`,
        { taskStatus },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const markTaskAsComplete = createAsyncThunk(
  "tasks/markTaskAsComplete",
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const user = loggedUser(state);

      if (!user || !user.id || !user.token) {
        throw new Error("User not authenticated");
      }
      const response = await axios.patch(
        `/task/${taskId}/complete`,
        { completed: true },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { getState }) => {
    const state = getState();
    const user = loggedUser(state);
    if (!user || !user.id || !user.token) {
      throw new Error("User not authenticated");
    }
    await axios.delete(`/task/${taskId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    return taskId;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tasks = action.payload;
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload.id);
        if (index!== -1) {
          state.tasks[index] = action.payload;
        } else {
          state.tasks = state.tasks.map(task => task._id === action.payload.id? action.payload : task);
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(changeTaskStatus.fulfilled, (state, action) => {
        const index = state.tasks.find((task) => task._id === action.payload);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })

      .addCase(changeTaskStatus.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(markTaskAsComplete.fulfilled, (state, action) => {
        const index = state.tasks.find((task) => task._id === action.payload);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })

      .addCase(markTaskAsComplete.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
