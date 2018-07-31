package com.faiyted.blab.services.user;



import com.faiyted.blab.models.user.User;
import com.faiyted.blab.models.user.UserProfile;
import com.faiyted.blab.models.user.UserWithRoles;
import com.faiyted.blab.repositories.user.Roles;
import com.faiyted.blab.repositories.user.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service("customUserDetailsService")
public class UserDetailsLoader implements UserDetailsService {
    private final Users users;
    private final Roles roles;

    @Autowired
    public UserDetailsLoader(Users users, Roles roles) {
                this.users = users;
                this.roles = roles;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
         User user = users.findByUsername(username);

        if(user == null) {
            throw new UsernameNotFoundException("User could not be found for " + username);
        }

        return new UserWithRoles(user, roles.ofUserWith(username));

    }


    public UserProfile getProfile(Long id) {
        UserProfile profile = users.getUserProfile(id);
        return profile;
    }

    public UserProfile getProfile(String username) {
        User user = users.findByUsername(username);

        UserProfile profile = users.getUserProfile(user.getId());
        return profile;
    }




}
