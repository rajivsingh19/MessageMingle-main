package com.chatapp.otp;

import com.chatapp.model.User;
import com.chatapp.repository.UserRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class EmailService {


    private final Long expiryInterval = 5L * 60 * 1000;
    private final JavaMailSender mailSender;

    private Logger log = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private OTPRepository otpRepository;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Autowired
    private UserRepository userRepository;
//    private UserRepository studentDetailRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public String generateOtp() {
        // Generate a 6-digit OTP
        log.info("Generating Otp from service");
        return RandomStringUtils.randomNumeric(6);
    }

    public ApiResponse sendOtpEmail(String toEmail, String otp) {
        log.info("Sending the otp on email..");
        SimpleMailMessage message = new SimpleMailMessage();

        message.setSubject("OTP Verification");
        message.setText("Your OTP for verification is: " + otp);
        message.setTo(toEmail);
        log.info("Data: {}",message);

        try{
            User user = userRepository.findByEmail(toEmail);
            if (user==null){
                return new ApiResponse("User not exist !!",false);
            }else {
                OTPModel req = new OTPModel();
                req.setOTP(Integer.parseInt(otp));
                req.setUsername(toEmail);
                req.setExpires(new Date(System.currentTimeMillis() + expiryInterval));
                OTPModel res = otpRepository.findByUsername(toEmail);

                log.info("Test 1:");
                mailSender.send(message);
                log.info("Test 2: ");
                if (res == null) {
                    otpRepository.save(req);
                } else {
                    res.setOTP(req.getOTP());
                    res.setExpires(req.getExpires());
                    otpRepository.save(res);
                }
                log.info("Successfully send email");
                return new ApiResponse("Successfully send otp", true);
            }
        }catch(Exception ex){
            log.info("error: {}",ex.getMessage());
            return  new ApiResponse("Failed to send otp internal error",false);
        }


    }

    public ApiResponse verifyOTP(OTPVerifyDTO req){
        log.info("Processing the OTP verification...");
        try{
            OTPModel res = otpRepository.findByUsername(req.getUsername());
            log.info("{}",res);
            if(res==null)
            {return new ApiResponse("Request for the new OTP !!",false);}
            if(String.valueOf(res.getOTP()).equals(req.getOTP())){
                if(res.isExpired()){
                    otpRepository.delete(res);
                    log.info("OTP is expired.");
                    return new ApiResponse("OTP is Expired.",false);
                }else{
                    otpRepository.delete(res);
                    log.info("Successfully verified OTP.");
                    return new ApiResponse("Successfully verified OTP",true);
                }
            }else{
                log.info("OTP not matched");
                return new ApiResponse("OTP incorrect !!",false);
            }
        }catch (Exception ex){
            log.info("{}",ex.getMessage());
            return new ApiResponse("Not verify internal issue",false);
        }
    }

    public ApiResponse forgetPassword(ForgetPasswordDTO req) {
        log.info("Processing the password change...");
        try{
            OTPModel res = otpRepository.findByUsername(req.getEmail());
            log.info("{}",res);
            if(res==null)
            {return new ApiResponse("Request for the new OTP !!",false);}
            if(String.valueOf(res.getOTP()).equals(req.getOtp())){
                if(res.isExpired()){
                    otpRepository.delete(res);
                    log.info("OTP is expired.");
                    return new ApiResponse("OTP is Expired.",false);
                }else{
                    otpRepository.delete(res);
                    User student = userRepository.findByEmail(req.getEmail());
                    student.setPassword(bCryptPasswordEncoder.encode(req.getPassword()));
                    userRepository.save(student);
                    log.info("Successfully verified OTP & change password.");
                    return new ApiResponse("Successfully changed password",true);
                }
            }else{
                log.info("OTP not matched");
                return new ApiResponse("OTP incorrect !!",false);
            }
        }catch (Exception ex){
            log.info("{}",ex.getMessage());
            return new ApiResponse("Not verify internal issue",false);
        }
    }


}
