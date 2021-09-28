import { createSlice } from "@reduxjs/toolkit";

const userSlice =  createSlice({
  name: "user",
  initialState: {},
  reducers:{
    getUser() {},
    setUser(state, action){
      const userData = action.payload;
      /*  
      {
        id: 3
        name: "ANTONIO"
        LASTName: "bundas"
        role: "programmer"
      }
      { role: "senior programmer"}
      {
        id: 3
        name: "ANTONIO"
        LASTName: "bundas"
        role: "senior programmer"
      }
      */
     return { ...state, ...userData}
    }
  }
});

export const { getUser, setUser } = userSlice.actions;
export default userSlice.reducer;