package com.faiyted.blab.models;

import javax.persistence.*;

@Entity
public class Channel {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String name;

    @ManyToOne
    private Space space;

    public Channel() {}

    public Channel(String name, Space space) {
        this.name = name;
        this.space = space;
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

    public Space getSpace() {
        return space;
    }

    public void setSpace(Space space) {
        this.space = space;
    }
}
