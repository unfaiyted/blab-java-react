package com.faiyted.blab.repositories;

import com.faiyted.blab.models.Channel;
import com.faiyted.blab.models.ChannelMessage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface ChannelMessages extends CrudRepository<ChannelMessage, Long> {

    List<ChannelMessage> findAllByChannel(Channel channel);
}
