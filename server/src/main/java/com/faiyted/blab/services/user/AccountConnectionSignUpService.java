package com.faiyted.blab.services.user;


import com.faiyted.blab.models.user.UserProfile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionSignUp;

import java.io.IOException;
import java.util.UUID;

public class AccountConnectionSignUpService implements ConnectionSignUp {

    private static final Logger LOG = LoggerFactory.getLogger(AccountConnectionSignUpService.class);

    private final UserService usersDao;

    public AccountConnectionSignUpService(UserService usersDao) {
        this.usersDao = usersDao;
    }

    public String execute(Connection<?> connection) {
        org.springframework.social.connect.UserProfile profile = connection.fetchUserProfile();
        String username = UUID.randomUUID().toString();
        LOG.debug("Created username: " + username);
        try {
            usersDao.createUser(username, new UserProfile(profile));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return username;
    }
}