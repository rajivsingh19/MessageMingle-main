package com.chatapp.otp;

import lombok.Data;

@Data
public class ForgetPasswordDTO {
    private String otp;
    private String password;
    private String email;
}
