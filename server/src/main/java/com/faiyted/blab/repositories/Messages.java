package com.faiyted.blab.repositories;

import com.faiyted.blab.models.ChannelMessage;
import com.faiyted.blab.models.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface Messages extends CrudRepository<Message, Long> {

}
