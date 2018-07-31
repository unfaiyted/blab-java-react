package com.faiyted.blab.services.user;


import com.faiyted.blab.models.user.ExtendedSocialUser;
import com.faiyted.blab.models.user.UserProfile;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.social.security.SocialUserDetails;
import org.springframework.social.security.SocialUserDetailsService;


public class SimpleSocialUsersDetailService implements SocialUserDetailsService {

    private UserDetailsLoader userDetailsService;
  //  private Users users;

    public SimpleSocialUsersDetailService(UserDetailsLoader userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    public SocialUserDetails loadUserByUserId(String userId) throws UsernameNotFoundException, DataAccessException {
        UserDetails userDetails = userDetailsService.loadUserByUsername(userId);
        UserProfile profile = userDetailsService.getProfile(userId);

        //return new ExtendedSocialUser(userDetails.getUsername(), userDetails.getPassword(),
          //      userDetails.getAuthorities(), userDetailsService.);
        return new ExtendedSocialUser(userDetails.getUsername(),
                userDetails.getPassword(), userDetails.getAuthorities(), profile);
    }

}