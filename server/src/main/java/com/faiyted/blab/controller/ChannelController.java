package com.faiyted.blab.controller;

import com.faiyted.blab.models.Channel;
import com.faiyted.blab.models.Space;
import com.faiyted.blab.models.user.User;
import com.faiyted.blab.repositories.Channels;
import com.faiyted.blab.repositories.Spaces;
import com.faiyted.blab.services.user.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("channel")
public class ChannelController {
    private Channels channels;
    private Spaces spaces;
    private UserService userDao;


    public ChannelController(Channels channels,
                             Spaces spaces,
                             UserService userDao) {
        this.channels = channels;
        this.userDao = userDao;
        this.spaces = spaces;
    }


    @GetMapping("/list")
    @CrossOrigin(origins = "http://localhost:3000")
    public Iterable<Channel> fullList() {
        return channels.findAll();
    }

    @GetMapping("/space/{id}")
    public Iterable<Channel> userList(@PathVariable(name = "id") long id) {
        Space space = spaces.getById(id);
        return channels.findAllBySpace(space);
    }


}
