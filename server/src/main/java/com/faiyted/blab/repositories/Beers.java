package com.faiyted.blab.repositories;

import com.faiyted.blab.models.Beer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface Beers extends JpaRepository<Beer, Long> {
}
