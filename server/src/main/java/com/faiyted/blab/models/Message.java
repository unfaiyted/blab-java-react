package com.faiyted.blab.models;


import com.faiyted.blab.models.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String message;

    @Column
    private LocalDateTime sentAt = LocalDateTime.now();

    @ManyToOne
    private User sentBy;

    public Message() {}

    public Message(String message, User sentBy) {
        this.message = message;
        this.sentBy = sentBy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getSentBy() {
        return sentBy;
    }

    public void setSentBy(User sentBy) {
        this.sentBy = sentBy;
    }
}
