import { Alert, Button, Snackbar, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyOtp } from '../../Redux/Auth/Action';

const VerifyOtpForm = ({ email, onOtpVerified }) => {
    const [otp, setOtp] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(verifyOtp({ email, otp }));
        if (response === 'successfully') {
            setSnackBarMessage('OTP verified successfully!');
            setSnackBarSeverity('success');
            setOpenSnackBar(true);
            onOtpVerified(); // Call onOtpVerified to update state
        } else {
            setSnackBarMessage('Failed to verify OTP. Please try again.');
            setSnackBarSeverity('error');
            setOpenSnackBar(true);
        }
    };

    const handleSnackBarClose = () => {
        setOpenSnackBar(false);
    };

    return (
        <div className="flex flex-col items-start justify-center w-[400px] p-10 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md">
            <h2 className="text-center text-3xl mb-5 font-extrabold text-white">Verify OTP</h2>
            <form onSubmit={handleSubmit} className="space-y-5 w-full">
                <div>
                    <TextField
                        label="OTP"
                        variant="outlined"
                        fullWidth
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="bg-white"
                    />
                </div>
                <Button
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    variant="contained"
                    type="submit"
                >
                    Verify OTP
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

export default VerifyOtpForm;
