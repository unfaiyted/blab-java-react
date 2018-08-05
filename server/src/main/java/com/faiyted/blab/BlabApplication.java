package com.faiyted.blab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@EnableResourceServer
@SpringBootApplication
public class BlabApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlabApplication.class, args);
	}
}
