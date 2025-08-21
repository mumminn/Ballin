package com.example.backend.domain.user.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
public class KakaoLoginPageController {

    @Value("${kakao.client-id}")
    private String kakaoClientId;

    @Value("${kakao.redirect-uri}")
    private String kakaoRedirectUri;

    @GetMapping("/page")
    public String kakaoLogin(Model model){
        String location =
                "https://kauth.kakao.com/oauth/authorize?response_type=code"
                        +"&client_id="+kakaoClientId+
                        "&redirect_uri="+ kakaoRedirectUri;
        model.addAttribute("location", location);
        return "login";
    }
}
