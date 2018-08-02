package com.faiyted.blab.controller;

import com.faiyted.blab.models.Channel;
import com.faiyted.blab.models.Space;
import com.faiyted.blab.models.SpaceMember;
import com.faiyted.blab.models.user.User;
import com.faiyted.blab.repositories.SpaceMembers;
import com.faiyted.blab.repositories.Spaces;
import com.faiyted.blab.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("spaces")
@CrossOrigin(origins = "http://localhost:3000")
public class SpaceController {

    private UserService userDao;
    private Spaces spaces;
    private SpaceMembers members;

    @Autowired
    public SpaceController(UserService userDao, Spaces spaces, SpaceMembers members) {
        this.userDao = userDao;
        this.spaces = spaces;
        this.members = members;

    }

    @GetMapping("/list")
    @CrossOrigin(origins = "http://localhost:3000")
    public Iterable<Space> fullList() {
        return spaces.findAll();
    }

    @GetMapping("/user/{id}")
    public List<Space> getUsersOwnedSpaces(@PathVariable Long id) {
        User owner = userDao.getUsers().findById(id).get();
        return spaces.findAllByOwner(owner);
    }


    @GetMapping("/member/{id}")
    public List<Space> getUsersMemberSpaces(@PathVariable Long id) {
        User user = userDao.getUsers().findById(id).get();
        List<SpaceMember> memberOf = members.findAllByUser(user);

        List<Space> spaces = new ArrayList<>();
        for(SpaceMember member : memberOf) {
            spaces.add(member.getSpace());
        }
        return spaces;
    }



}
