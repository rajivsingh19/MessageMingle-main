import { BASE_API_URL } from '../../Config/Config.js';
import {
  REGISTER,
  LOGIN_USER,
  REQ_USER,
  SEARCH_USER,
  UPDATE_USER,
  LOGOUT_USER,
  LOGIN_FAILURE
} from './ActionType';

export const register = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    if (resData.jwt) localStorage.setItem('token', resData.jwt);
    dispatch({ type: REGISTER, payload: resData });
  } catch (error) {
    console.error('Registration error:', error);
  }
};

export const verifyOtp = (data) => async (dispatch) => {
  try {
    
    const res = await fetch(`${BASE_API_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username:data.email,OTP:data.otp}),
    });

    const resData = await res.json();
    return resData.status === 'success' ? 'successfully' : 'failed';
  } catch (error) {
    console.error('Verify OTP error:', error);
    return 'failed';
  }
};

export const resetPassword = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/forget_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    return resData.status === 'success' ? 'successfully' : 'failed';
  } catch (error) {
    console.error('Reset password error:', error);
    return 'failed';
  }
};


export const reqOtp = (data) => async (dispatch)=>{
   try{
    const res= await fetch(`${BASE_API_URL}/auth/send-otp?email=${data}`,{
      method: 'POST',
    })
    return "successfully";
   }
   catch(error){
     console.error('otp error:', error);
     return "failed";
   }
}

export const loginUser = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    if (resData.jwt) localStorage.setItem('token', resData.jwt);
    dispatch({ type: LOGIN_USER, payload: resData });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    console.error('Login error:', error);
  }
};

export const currentUser = (token) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const resData = await res.json();
   console.log("current chat data",resData);
    dispatch({ type: REQ_USER, payload: resData });
  } catch (error) {
    console.error('Fetch current user error:', error);
  }
};

export const searchUser = (data) => async (dispatch) => {
  console.log("Searching for ::: ", data);
  try {
    const res = await fetch(
      `${BASE_API_URL}/api/users/search?name=${data.keyword}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    const resData = await res.json();
    console.log("Searched Usrr",resData);
    dispatch({ type: SEARCH_USER, payload: resData });
  } catch (error) {
    console.error('Search user error:', error);
  }
};

export const updateUser = (data) => async (dispatch) => {

  console.log("received data for update req ::",data);
  try {
    const res = await fetch(
      `${BASE_API_URL}/api/users/update`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
        
        body: JSON.stringify(data.data),
      }
    );
    const resData = await res.json();
    console.log("profile updated successfullyyy::: ",resData);
    dispatch({ type: UPDATE_USER, payload: resData });
  } catch (error) {
    console.error('Update user error:', error);
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT_USER, payload: null });
  dispatch({ type: REQ_USER, payload: null });
  console.log('User logged out successfully...');
};
