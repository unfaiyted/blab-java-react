package com.faiyted.blab.repositories;


import com.faiyted.blab.models.Channel;
import com.faiyted.blab.models.Space;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface Channels extends CrudRepository<Channel, Long> {

    List<Channel> findAllBySpace(Space space);

    List<Channel> findAllBySpaceIn(List<Space> spaces);

}
