package com.chatapp.otp;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Data
public class OTPVerifyDTO {

    private String username;

    private String OTP;
}