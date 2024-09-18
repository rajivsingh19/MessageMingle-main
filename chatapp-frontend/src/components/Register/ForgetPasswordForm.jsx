import { Alert, Button, Snackbar, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reqOtp } from '../../Redux/Auth/Action';

const ForgetPasswordForm = ({ onOtpSent }) => {
    const [email, setEmail] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(reqOtp(email));
        if (response === 'successfully') {
            setSnackBarMessage('OTP sent successfully!');
            setSnackBarSeverity('success');
            setOpenSnackBar(true);
            onOtpSent(email); // Call onOtpSent with the email
        } else {
            setSnackBarMessage('Failed to send OTP. Please try again.');
            setSnackBarSeverity('error');
            setOpenSnackBar(true);
        }
    };

    const handleSnackBarClose = () => {
        setOpenSnackBar(false);
    };

    return (
        <div className="flex flex-col items-start justify-center w-[400px] p-10 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md">
            <h2 className="text-center text-3xl mb-5 font-extrabold text-white">Forgot Password</h2>
            <form onSubmit={handleSubmit} className="space-y-5 w-full">
                <div>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white"
                    />
                </div>
                <Button
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    variant="contained"
                    type="submit"
                >
                    Send OTP
                </Button>
            </form>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity={snackBarSeverity} sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ForgetPasswordForm;
