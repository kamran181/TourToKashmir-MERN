import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';


export const createTour = createAsyncThunk('tour/create',
async({updatedTourData,navigate,toast},{rejectWithValue})=>{
    try {
        const response = await api.createTour(updatedTourData);
        toast.success("Tour Added Successfully");
        navigate('/');
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const getTours = createAsyncThunk('getTours',
async(_, {rejectWithValue})=>{
    try {
        const response = await api.getTours();
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const getTour = createAsyncThunk('tour/:id',
async(id, {rejectWithValue})=>{
    try {
        const response = await api.getTour(id);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const getToursByUser = createAsyncThunk('UserTours/:id',
async(userId, {rejectWithValue})=>{
    try {
        const response = await api.getToursByUser(userId);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const deleteTour = createAsyncThunk('DeleteTour/:id',
async({id,toast}, {rejectWithValue})=>{
    try {
        const response = await api.deleteTour(id);
        toast.success('Tour Deleted Successfully')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const updateTour = createAsyncThunk('UpdateTour/:id',
async({updatedTourData,id,toast,navigate}, {rejectWithValue})=>{
    try {
        const response = await api.updateTour(updatedTourData,id);
        toast.success('Tour Updated Successfully');
        navigate('/');
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});



const tourSlice = createSlice({
    name : 'tour',
    initialState :{
        tour : {},
        tours : [],
        userTours:[],
        error : "",
        loading : false,
    },
   
    extraReducers:{
        [createTour.pending] :(state,action)=>{
            state.loading =true
        },
        [createTour.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            state.tours =[action.payload];
        },
        [createTour.rejected] : (state,action)=>{
            state.loading = false ;
            state.error = action.payload.message;
        },
        [getTours.pending] :(state,action)=>{
            state.loading =true
        },
        [getTours.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            state.tours =action.payload;
        },
        [getTours.rejected] : (state,action)=>{
            state.loading = false ;
            state.error = action.payload.message;
        },
        [getTour.pending] :(state,action)=>{
            state.loading =true
        },
        [getTour.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            state.tour =action.payload;
        },
        [getTour.rejected] : (state,action)=>{
            state.loading = false ;
            state.error = action.payload.message;
        },
        [getToursByUser.pending] :(state,action)=>{
            state.loading =true
        },
        [getToursByUser.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            state.userTours =action.payload;
        },
        [getToursByUser.rejected] : (state,action)=>{
            state.loading = false ;
            state.error = action.payload.message;
        },
        [deleteTour.pending] :(state,action)=>{
            state.loading =true
        },
        [deleteTour.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            console.log('action:' ,action);
            const {arg : {id}} = action.meta;
            if(id){
                state.userTours = state.userTours.filter((item)=> item._id !== id);
                state.tours = state.tours.filter((item)=> item._id !== id)
            }
            
        },
        [deleteTour.rejected] : (state,action)=>{
            state.loading = false ;
            console.log('actionnn' ,action);
            state.error = action.payload.message;
        },
        [updateTour.pending] :(state,action)=>{
            state.loading =true
        },
        [updateTour.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = "";
            console.log('action:' ,action);
            const {arg : {id}} = action.meta;
            if(id){
                state.userTours = state.userTours.map((item)=> 
                item._id === id ? action.payload :item) ;
                state.tours = state.tours.map((item)=> 
                item._id === id ? action.payload : item);
            }
            
        },
        [updateTour.rejected] : (state,action)=>{
            state.loading = false ;
            console.log('actionnn' ,action);
            state.error = action.payload.message;
        },
        
    }
        
    
});

export default tourSlice.reducer;
