package com.faiyted.blab.controller;

import com.faiyted.blab.repositories.Spaces;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SpaceController {

    private Spaces repository;

    public SpaceController(Spaces repository) {
        this.repository = repository;
    }



}
