package com.faiyted.blab.models.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.social.security.SocialUser;

import java.util.Collection;

public class ExtendedSocialUser extends SocialUser {

    private UserProfile profile;

    public ExtendedSocialUser(String username, String password, boolean enabled, boolean accountNonExpired,
                              boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities, UserProfile profile) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        this.profile = profile;
    }

    public ExtendedSocialUser(String username, String password, Collection<? extends GrantedAuthority> authorities, UserProfile profile) {
        super(username, password, authorities);
        this.profile = profile;
    }


    public UserProfile getProfile() {
        return profile;
    }

    public void setProfile(UserProfile profile) {
        this.profile = profile;
    }

    @Override
    public String toString() {
        return "ExtendedSocialUser{" +
                "profile=" + profile +
                "} " + super.toString();
    }
}
