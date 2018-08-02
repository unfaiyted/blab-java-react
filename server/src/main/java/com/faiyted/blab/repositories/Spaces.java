package com.faiyted.blab.repositories;

import com.faiyted.blab.models.Space;
import com.faiyted.blab.models.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface Spaces extends CrudRepository<Space, Long> {

    Space getById(Long id);

    List<Space> findAll();

    List<Space> findAllByOwner(User owner);

}
