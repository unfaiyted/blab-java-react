package com.faiyted.blab.controller;

import com.faiyted.blab.models.Channel;
import com.faiyted.blab.models.user.User;
import com.faiyted.blab.repositories.user.Users;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private Users users;

    public UserController(Users users) {
        this.users = users;
    }


    @GetMapping("/list")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<User> fullList() {
        return users.findAll();
    }



}


