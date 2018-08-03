package com.faiyted.blab.controller;

import com.faiyted.blab.models.Channel;
import com.faiyted.blab.models.user.User;
import com.faiyted.blab.repositories.user.Users;
import com.faiyted.blab.services.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private Users users;
    private UserService userDao;

    public UserController(Users users, UserService userDao) {
        this.users = users;
        this.userDao = userDao;

    }


    @GetMapping("/list")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<User> fullList() {
        return users.findAll();
    }

    @GetMapping("/user/{id}")
    public User byUser(@PathVariable Long id) {
        return users.findById(id).get();
    }


    @GetMapping("/loggedIn")
    public ResponseEntity<?> getUser() {
        User user = userDao.getLoggedInUser();
        if (user == null) {
            return new ResponseEntity<>("", HttpStatus.OK);
        } else {
            return ResponseEntity.ok().body(user);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // send logout URL to client so they can initiate logout - doesn't work from the server side
        // Make it easier: https://github.com/spring-projects/spring-security/issues/5540
        //String logoutUrl = issuerUri + "/v1/logout";

        Map<String, String> logoutDetails = new HashMap<>();
       // logoutDetails.put("logoutUrl", logoutUrl);
       // logoutDetails.put("idToken", idToken.getTokenValue());
        request.getSession(false).invalidate();
        return ResponseEntity.ok().body(logoutDetails);
    }



}


