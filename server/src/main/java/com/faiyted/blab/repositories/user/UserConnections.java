package com.faiyted.blab.repositories.user;

import com.faiyted.blab.models.user.UserConnection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserConnections extends CrudRepository<UserConnection, Long> {


    UserConnection findByUserId(String username);

}