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



}
