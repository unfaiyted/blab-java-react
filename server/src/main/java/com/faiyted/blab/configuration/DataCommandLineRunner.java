package com.faiyted.blab.configuration;


import com.faiyted.blab.models.Beer;
import com.faiyted.blab.repositories.Beers;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;


@Component
public class DataCommandLineRunner implements CommandLineRunner {

    private final Beers repository;

    public DataCommandLineRunner(Beers repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        // Top beers from https://www.beeradvocate.com/lists/top/
        Stream.of("Kentucky Brunch Brand Stout", "Good Morning", "Very Hazy", "King Julius",
                "Budweiser", "Coors Light", "PBR").forEach(name ->
                repository.save(new Beer(name))
        );
        repository.findAll().forEach(System.out::println);
    }


}
