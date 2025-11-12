import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




const initialState = {
    posts:[],
    allItems: [],  // ✅ original list
    items: [],
    filters: 'all',
    status: 'idle', // for tracking loading state
    error: null
};


// Simulate async fetch
export const fetchTasks = createAsyncThunk(
    'task/fetchTasks',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // or mocked
        const data = await response.json();
        return data; // This should be an array of tasks
    }
);


const taskSlice = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        addToTask: (state, { payload }) => {
            debugger;
            state.items.push({
                id: Date.now(),
                val: payload,
                completed: false
            });
            state.allItems.push({
                id: Date.now(),
                val: payload,
                completed: false
            });
        },
        toggleTask: (state, { payload }) => {
            const task = state.allItems.find(item => item.id === payload);
            if (task)
                task.completed = !task.completed;

            if (payload === "completed") {
                state.items = state.allItems.filter(item => item.completed === true);
            }
            else {
                state.items = [...state.allItems];
            }

        },
        deleteTask: (state, { payload }) => {
            state.allItems = state.allItems.filter(item => item.id !== payload);
            if (payload === "completed") {
                state.items = state.allItems.filter(item => item.completed === true);
            }
            else {
                state.items = [...state.allItems];
            }
        },
        filteredTask: (state, { payload }) => {
            debugger;
            if (payload === "completed") {
                state.items = state.items.filter(item => item.completed === true);
            }
            else {
                state.items = [...state.allItems];
            }
        }
    },
    extraReducers: (builder) => {
        //get posts
        builder.addCase(fetchTasks.pending, (state) => {
            state.status = "loading";
            state.error = null;
        }).addCase(fetchTasks.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.posts = action.payload;

        }).addCase(fetchTasks.rejected,(state, action) => {
            state.status = "failed"
            state.error = action.error.message;
        })
    }
});

export const { addToTask, toggleTask, deleteTask, filteredTask } = taskSlice.actions;
export default taskSlice.reducer;