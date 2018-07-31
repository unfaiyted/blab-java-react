package com.faiyted.blab.models;

import javax.persistence.*;

@Entity
public class Space {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String name;

    // Owner user

    public Space() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
