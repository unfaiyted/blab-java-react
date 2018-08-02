package com.faiyted.blab.controller;

import com.faiyted.blab.models.Channel;
import com.faiyted.blab.models.Space;
import com.faiyted.blab.models.SpaceMember;
import com.faiyted.blab.models.user.User;
import com.faiyted.blab.repositories.Channels;
import com.faiyted.blab.repositories.SpaceMembers;
import com.faiyted.blab.repositories.Spaces;
import com.faiyted.blab.services.user.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("channels")
@CrossOrigin(origins = "http://localhost:3000")
public class ChannelController {
    private Channels channels;
    private SpaceMembers members;
    private Spaces spaces;
    private UserService userDao;


    public ChannelController(Channels channels,
                             Spaces spaces,
                             SpaceMembers members,
                             UserService userDao) {
        this.channels = channels;
        this.userDao = userDao;
        this.spaces = spaces;
        this.members = members;
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

    @GetMapping("/user/{id}")
    public List<Channel> getUsersChannels(@PathVariable Long id) {
        User user = userDao.getUsers().findById(id).get();
        List<SpaceMember> memberOf = members.findAllByUser(user);

        List<Space> spaces = new ArrayList<>();
        for (SpaceMember member : memberOf) {
            spaces.add(member.getSpace());
        }
        return channels.findAllBySpaceIn(spaces);
    }
}
