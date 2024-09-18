import React, { useState } from 'react';
import ForgetPasswordForm from './ForgetPasswordForm';
import VerifyOtpForm from './VerifyOtpForm';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const handleOtpSent = (email) => {
        setEmail(email);
        setOtpSent(true);
    };

    const handleOtpVerified = () => {
        setOtpVerified(true);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {!otpSent && <ForgetPasswordForm onOtpSent={handleOtpSent} />}
            {otpSent && !otpVerified && <VerifyOtpForm email={email} onOtpVerified={handleOtpVerified} />}
            {otpVerified && <ResetPasswordForm email={email} />}
        </div>
    );
};

export default ResetPassword;
