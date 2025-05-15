import axiosInstance from "./axios.js";

export const  getAuthUser = async ()=>{

  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    console.log("getAuthUser", error.message);
    return null
  }
}

export const login = async (signinData)=>{
  try {
    const response = await axiosInstance.post("/auth/login",signinData );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
}

export const signup = async (signupData)=>{
  try {
    console.log(signupData);
    const response = await axiosInstance.post("/auth/signup",signupData );
    
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
}

export const getRecommendUser = async ()=>{
  try {
    const response = await axiosInstance.get("/user/");
    return response.data;
  } catch (error) {
    console.log("getRecommendUser", error.message);
    throw error.response.data.message;
  }
}

export const OnboardingData = async (onboardingData)=>{
  try {
    const response = await axiosInstance.post("/auth/onboarding",onboardingData );
    return response.data;
  } catch (error) {
    console.log("OnboardingData", error.message);
    throw error.response.data.message;
  }
}

export const logout = async ()=>{
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw  Error(error.response?.data?.message );
  }
}

export const getOnlineUsers = async ()=>{
  try {
    const response = await axiosInstance.get("/user/getonline");
    return response.data;
  } catch (error) {
    throw  Error(error.response?.data?.message );
  }
}

export const addFriend = async (id)=>{
  try {
    const response = await axiosInstance.post(`/user/addfriend/${id}`);
    return response.data;
  } catch (error) {
    console.log("addFriend Error:", error.message);
    throw  Error(error.response?.data?.message );
  }
}

export const getOutgoingFriendRequests = async ()=>{
  try {
    const response = await axiosInstance.get("/user/getOutgoingFriendRequests");
    return response.data;
  } catch (error) {
    throw  Error(error.response?.data?.message );
  }
}


export const getIncomingFriendRequests = async ()=>{
  try {
    const response = await axiosInstance.get("/user/getIncomingFriendRequests");
    return response.data;
  } catch (error) {
    throw  Error(error.response?.data?.message );
  }
}

export const acceptFriendRequest = async (id)=>{
  try {
    const response = await axiosInstance.post(`/user/acceptFriendRequest/${id}`);
    return response.data;
  } catch (error) {
    throw  Error(error.response?.data?.message );
  }
}

export const getFriends = async ()=>{
  try {
    const response = await axiosInstance.get("/user/getfriends");
    return response.data;
  } catch (error) {
    throw  Error(error.response?.data?.message );
  }
}