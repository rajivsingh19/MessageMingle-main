package com.chatapp.otp;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class OTPModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  Id;

    private Date expires;

    private int OTP;

    private String username;

    public boolean isExpired() {
        Date currentDate = new Date();
        return expires != null && currentDate.after(expires);
    }

}
