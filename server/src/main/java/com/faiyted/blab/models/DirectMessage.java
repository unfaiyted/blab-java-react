package com.faiyted.blab.models;

import com.faiyted.blab.models.Message;
import com.faiyted.blab.models.user.User;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class DirectMessage extends Message {

    @ManyToOne
    private User receivedBy;

    public DirectMessage() {
    }

    public DirectMessage(String message, User sentBy, User receivedBy) {
        super(message, sentBy);
        this.receivedBy = receivedBy;
    }

    public User getReceivedBy() {
        return receivedBy;
    }

    public void setReceivedBy(User receivedBy) {
        this.receivedBy = receivedBy;
    }

}
