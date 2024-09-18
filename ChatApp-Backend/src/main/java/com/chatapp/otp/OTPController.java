package com.chatapp.otp;

//import com.server.constant.API;
//import com.server.dto.ApiResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class OTPController {


    private Logger log = LoggerFactory.getLogger(OTPController.class);

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestParam String email) {
        try{
            log.info("Request to send the Otp: {}",email);
            // Generate OTP
            String otp = emailService.generateOtp();
            // Send OTP via email
            log.info("Generated otp: {}",otp);
            ApiResponse res = emailService.sendOtpEmail(email, otp);
            log.info("{}",res.getMessage());
            return  new ResponseEntity<>(res, res.isSuccess()?HttpStatus.OK:HttpStatus.BAD_REQUEST);
        }catch (Exception ex){
            log.info("Internal Error on service side !!!");
            log.info("{}",ex.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyTheOTP( @RequestBody OTPVerifyDTO req){


        log.info("Request data first to verify the otp {}",req);
        if(req.getUsername()=="")return  new ResponseEntity<>(Map.of("message","Email blank"),HttpStatus.BAD_REQUEST);
        if(req.getOTP()=="")return  new ResponseEntity<>(Map.of("message","OTP blank"),HttpStatus.BAD_REQUEST);

        log.info("Request to verify the otp {}",req);
        ApiResponse res = emailService.verifyOTP(req);

        return new ResponseEntity<>(res,res.isSuccess()?HttpStatus.OK:HttpStatus.BAD_REQUEST);

    }

    @PostMapping("/forget_password")
    public ResponseEntity<?> forgetPassword(@RequestBody ForgetPasswordDTO  req){
        log.info("Request to forget password.");
        ApiResponse res = emailService.forgetPassword(req);
        log.info("Request completed.");
        return new ResponseEntity<>(res,res.isSuccess()?HttpStatus.OK:HttpStatus.BAD_REQUEST);
    }

}
