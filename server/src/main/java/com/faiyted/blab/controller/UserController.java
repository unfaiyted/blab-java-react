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
import java.security.Principal;
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



    @RequestMapping(path = "/account",method = RequestMethod.POST)
    public Principal oauth(Principal principal) {
        /*
         * Translate the incoming request, which has an access token
         * Spring security takes the incoming request and injects the Java Security Principal
         * The converter inside Spring Security will handle the to json method which the Spring Security
         * Oauth client will know how to read
         *
         * The @EnableResourceServer on the application entry point is what makes all this magic happen.
         * If there is an incoming request token it will check the token validity and handle it accordingly
         */
        return principal;

    }

}


