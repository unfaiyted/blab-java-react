package com.faiyted.blab.repositories;


import com.faiyted.blab.models.Channel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface Channels extends CrudRepository<Channel, Long> {

}
