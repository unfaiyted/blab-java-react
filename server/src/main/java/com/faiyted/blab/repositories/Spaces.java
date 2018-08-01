package com.faiyted.blab.repositories;

import com.faiyted.blab.models.Space;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface Spaces extends CrudRepository<Space, Long> {

    Space getById(Long id);

}
