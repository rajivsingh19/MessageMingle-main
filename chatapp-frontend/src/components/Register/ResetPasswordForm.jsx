import { Alert, Button, Snackbar, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../Redux/Auth/Action';

const ResetPasswordForm = ({ email }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setSnackBarMessage('Passwords do not match');
            setSnackBarSeverity('error');
            setOpenSnackBar(true);
            return;
        }
        const response = await dispatch(resetPassword({ email, password }));
        if (response === 'successfully') {
            setSnackBarMessage('Password reset successfully!');
            setSnackBarSeverity('success');
        } else {
            setSnackBarMessage('Failed to reset password. Please try again.');
            setSnackBarSeverity('error');
        }
        setOpenSnackBar(true);
    };

    const handleSnackBarClose = () => {
        setOpenSnackBar(false);
    };

    return (
        <div className="flex flex-col items-start justify-center w-[400px] p-10 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md">
            <h2 className="text-center text-3xl mb-5 font-extrabold text-white">Reset Password</h2>
            <form onSubmit={handleSubmit} className="space-y-5 w-full">
                <div>
                    <TextField
                        label="New Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white"
                    />
                </div>
                <div>
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="bg-white"
                    />
                </div>
                <Button
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    variant="contained"
                    type="submit"
                >
                    Reset Password
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

export default ResetPasswordForm;
