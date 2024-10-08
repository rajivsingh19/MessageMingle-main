import { Alert, Button, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentUser, loginUser } from '../../Redux/Auth/Action';
import backgroundImage from './backgroundImage.jpg';
import ResetPassword from './ResetPassword';

const SignIn = () => {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success');
    const [inputData, setInputData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { auth } = useSelector((store) => store);

    const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(false);
   


    useEffect(() => {
        if (token) {
            dispatch(currentUser(token));
        }
    }, [token, auth.reqUser, dispatch]);

    // useEffect(() => {
    //     if (auth.reqUser) {
    //         navigate("/");
    //     }
    // }, [auth, navigate]);


    useEffect(() => {
        if (auth.reqUser) {
            navigate("/");
        } else if (auth.loginError) {
            setSnackBarMessage(auth.loginError);
            setSnackBarSeverity('error');
            setOpenSnackBar(true);
        }
    }, [auth, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginUser(inputData));
        setOpenSnackBar(true);
        if (auth.signin) {
            setSnackBarMessage('Login Successfully!');
            setSnackBarSeverity('success');
        } else {
            setSnackBarMessage(auth.loginError || 'Login Failed!');
            setSnackBarSeverity('error');
        }
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(loginUser(inputData));
    //     setOpenSnackBar(true);
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((values) => ({ ...values, [name]: value }));
    };

    const handleSnackBarClose = () => {
        setOpenSnackBar(false);
    };

    return (
        <div
            className='flex items-center justify-center h-screen'
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className='flex flex-col items-start justify-center w-[400px] p-10 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md'>
                <h1 className='text-5xl text-white font-semibold mb-5'>Sign In</h1>
                <p className='text-white mb-8'>Ready to reconnect? Sign in now and join the conversation!</p>
            </div>

            {!showForgetPasswordForm && (
                <div className='w-[400px] p-10 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md'>
                    <h2 className='text-center text-3xl mb-5 font-extrabold text-white'>MessageMingle
                    </h2>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <label className='mb-2 block text-white'>Email</label>
                            <input type="email" placeholder='Enter your email' name="email" onChange={handleChange} value={inputData.email} className='py-2 px-3 w-full outline-none border border-white rounded-md focus:border-blue-500 text-black' required />
                        </div>
                        <div>
                            <label className='mb-2 block text-white'>Password</label>
                            <input type="password" placeholder='Enter your password' name="password" onChange={handleChange} value={inputData.password} className='py-2 px-3 w-full outline-none border border-white rounded-md focus:border-blue-500 text-black' required />
                        </div>
                        <div onClick={() => setShowForgetPasswordForm(true)} style={{ color: "white", cursor: "pointer" }}>
                            Forget Password.
                        </div>
                        <div>
                            <Button className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300' variant='contained' type='submit'>Sign in</Button>
                        </div>
                    </form>
                    <div className='flex items-center mt-5'>
                        <p className='m-0 text-white'>Don't have an Account?</p>
                        <Button className='text-blue-500 hover:underline ml-1' variant='text' onClick={() => navigate("/signup")}>Register</Button>
                    </div>
                </div>
            )}
            {showForgetPasswordForm && <ResetPassword />}

            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
                {snackBarMessage}
                    {/* Login Successfully! */}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SignIn;




// import { Alert, Button, Snackbar } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { currentUser, loginUser } from '../../Redux/Auth/Action';
// import backgroundImage from './backgroundImage.jpg';
// import ResetPassword from './ForgetPasswordForm';

// const SignIn = () => {
//     const [openSnackBar, setOpenSnackBar] = useState(false);
//     const [inputData, setInputData] = useState({ email: "", password: "" });
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const token = localStorage.getItem("token");
//     const { auth } = useSelector((store) => store);


//     ////////
//     const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(false);
//    const [showResetPassword, setShowResetPassword] = useState(false);
//    const [showSuccessfullyCode, setSuccessfullyCode] = useState(false);

//     useEffect(() => {
//         if (token) {
//             dispatch(currentUser(token));
//         }
//     }, [token, auth.reqUser, dispatch]);

//     useEffect(() => {
//         if (auth.reqUser) {
//             navigate("/");
//         }
//     }, [auth, navigate]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(loginUser(inputData));
//         setOpenSnackBar(true);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setInputData((values) => ({ ...values, [name]: value }));
//     };

//     const handleSnackBarClose = () => {
//         setOpenSnackBar(false);
//     };

//     return (
//         <div
//             className='flex items-center justify-center h-screen'
//             style={{
//                 backgroundImage: `url(${backgroundImage})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//             }}
//         >
//             <div className='flex flex-col items-start justify-center w-[400px] p-10 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md'>
//                 <h1 className='text-5xl text-white font-semibold mb-5'>Sign In</h1>
//                 <p className='text-white mb-8'>Ready to reconnect? Sign in now and join the conversation!</p>
//             </div>

//            {
//             !showForgetPasswordForm && (
//                 <div className='w-[400px] p-10 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md'>
//                 <h2 className='text-center text-3xl mb-5 font-extrabold text-white'>MessageMingle
// </h2>
//                 <form onSubmit={handleSubmit} className='space-y-5'>
//                     <div>
//                         <label className='mb-2 block text-white'>Email</label>
//                         <input type="email" placeholder='Enter your email' name="email" onChange={handleChange} value={inputData.email} className='py-2 px-3 w-full outline-none border border-white rounded-md focus:border-blue-500 text-black' required />
//                     </div>
//                     <div>
//                         <label className='mb-2 block text-white'>Password</label>
//                         <input type="password" placeholder='Enter your password' name="password" onChange={handleChange} value={inputData.password} className='py-2 px-3 w-full outline-none border border-white rounded-md focus:border-blue-500 text-black' required />
//                     </div>
//                     <div  onClick={()=> setShowForgetPasswordForm(true)} style={{color:"white",cursor:"pointer"}}>
//                         Forget Password.
//                     </div>
//                     <div>
//                         <Button className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300' variant='contained' type='submit'>Sign in</Button>
//                     </div>
//                 </form>
//                 <div className='flex items-center mt-5'>
//                     <p className='m-0 text-white'>Don't have an Account?</p>
//                     <Button className='text-blue-500 hover:underline ml-1' variant='text' onClick={() => navigate("/signup")}>Register</Button>
//                 </div>
//             </div> 
//             )
//            }
//            {showForgetPasswordForm && (
//             <ResetPassword/>
//            )}

//             <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose}>
//                 <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
//                     Login Successfully!
//                 </Alert>
//             </Snackbar>
//         </div>
        
//     );
// };
// export default SignIn;
