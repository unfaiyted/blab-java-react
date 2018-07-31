package com.faiyted.blab.services.user;


import com.faiyted.blab.models.user.ExtendedSocialUser;
import com.faiyted.blab.models.user.User;
import com.faiyted.blab.models.user.UserProfile;
import com.faiyted.blab.repositories.user.Roles;
import com.faiyted.blab.repositories.user.UserConnections;
import com.faiyted.blab.repositories.user.Users;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.List;


@Repository
public class UserService {
    private Users users;
    private UserConnections connections;
    private Roles roles;


    @Autowired
    public UserService(Users users, UserConnections  connections, Roles roles) {
        this.users = users;
        this.connections = connections;
        this.roles = roles;
    }

    public Users getUsers() {
        return users;
    }

    public UserConnections getConnections() {
        return connections;
    }

    public void createUser(String username, UserProfile profile) throws IOException {

        User user = new User(username, RandomStringUtils.randomAlphanumeric(8));

        //TODO: Change reigster process to get state data.
        profile.setUserState("Texas");
        profile.setEmail("update@me.now");


        user.setProfile(profile);

        users.addDefaultRole(user.getId());
        users.save(user);


    }

    public List<User> findAll() {
        Iterable<User> users = getUsers().findAll();
        return (List<User>) users;
    }

    public User findOne(long id){
        User user = users.findById(id).get();
        return user;
    }


    public User getLoggedInUser() {

        if(SecurityContextHolder.getContext().getAuthentication() != null) {
            try {
                return  (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            } catch (ClassCastException e) {
                try {
                    System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
                    ExtendedSocialUser socialUser = (ExtendedSocialUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                    return getUsers().findByUsername(socialUser.getUserId());
                } catch (NullPointerException x) {
                   return null;
                }
            }
        }
        return null;

    }


}
