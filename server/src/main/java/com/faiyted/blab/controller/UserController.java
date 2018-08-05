package com.faiyted.blab.controller;

import com.faiyted.blab.models.Channel;
import com.faiyted.blab.models.user.User;
import com.faiyted.blab.models.user.UserWithRoles;
import com.faiyted.blab.repositories.user.Roles;
import com.faiyted.blab.repositories.user.Users;
import com.faiyted.blab.services.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private Roles roles;

    private PasswordEncoder passwordEncoder;

    public UserController(Users users, UserService userDao, PasswordEncoder passwordEncoder, Roles roles) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
        this.userDao = userDao;
        this.roles = roles;


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

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value="/auth", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<?> authUser(@RequestParam("username") String username, @RequestParam("password") String password) {

        User user = userDao.getUsers().findByUsername(username);

        if(!passwordEncoder.matches(password, user.getPassword())) {
            return new ResponseEntity<>("", HttpStatus.UNAUTHORIZED);
        }
            UserDetails userDetails = new UserWithRoles(user, roles.ofUserWith(user.getUsername()));

            Authentication auth = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    userDetails.getPassword(),
                    userDetails.getAuthorities()
            );

            SecurityContext context = SecurityContextHolder.getContext();
            context.setAuthentication(auth);

        return ResponseEntity.ok().body(user);
    }


    // who is logged in
    @RequestMapping(path = "/account", method = RequestMethod.POST)
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


