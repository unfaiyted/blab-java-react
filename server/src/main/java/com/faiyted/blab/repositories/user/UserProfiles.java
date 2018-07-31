package com.faiyted.blab.repositories.user;

import com.faiyted.blab.models.user.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfiles extends JpaRepository<UserProfile, Long> {


}
