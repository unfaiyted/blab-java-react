package com.faiyted.blab.repositories;

import com.faiyted.blab.models.SiteSetting;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface SiteSettings extends CrudRepository<SiteSetting, Long> {


    @Query("Select s.isPopulated from SiteSetting s")
    Boolean isPopulated();

    @Query("Select s from SiteSetting s where id = 1")
    SiteSetting getFirst();
}
