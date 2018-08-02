package com.faiyted.blab.repositories;

import com.faiyted.blab.models.SpaceMember;
import com.faiyted.blab.models.user.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SpaceMembers extends CrudRepository<SpaceMember, Long> {


    List<SpaceMember> findAllByUser(User user);


}
