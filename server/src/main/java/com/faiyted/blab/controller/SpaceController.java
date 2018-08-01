package com.faiyted.blab.controller;

import com.faiyted.blab.models.Channel;
import com.faiyted.blab.models.Space;
import com.faiyted.blab.repositories.Spaces;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("spaces")
@CrossOrigin(origins = "http://localhost:3000")
public class SpaceController {

    private Spaces repository;

    public SpaceController(Spaces repository) {
        this.repository = repository;
    }

    @GetMapping("/list")
    @CrossOrigin(origins = "http://localhost:3000")
    public Iterable<Space> fullList() {
        return repository.findAll();
    }



}
