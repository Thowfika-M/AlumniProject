package com.alumniconnect.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebSpaController {

    /**
     * Forward non-API client routes to index.html for Single Page Application client-side routing.
     */
    @RequestMapping(value = {
        "/",
        "/about",
        "/jobs",
        "/alumni",
        "/events",
        "/mentorship",
        "/login",
        "/register",
        "/ai-assistant",
        "/student/**",
        "/alumni/**",
        "/admin/**"
    })
    public String forwardSpaRoutes() {
        return "forward:/index.html";
    }
}
