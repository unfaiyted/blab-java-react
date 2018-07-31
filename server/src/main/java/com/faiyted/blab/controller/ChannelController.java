package com.faiyted.blab.controller;

import com.faiyted.blab.models.Channel;
import com.faiyted.blab.repositories.Channels;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("channel")
public class ChannelController {
    private Channels repository;


    public ChannelController(Channels repository) {
        this.repository = repository;
    }


    @GetMapping("/list")
    @CrossOrigin(origins = "http://localhost:3000")
    public Iterable<Channel> goodBeers() {
        return repository.findAll();
    }


}
