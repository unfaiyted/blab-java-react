package com.faiyted.blab.models;

import com.faiyted.blab.models.user.User;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class ChannelMessage extends Message {

    @ManyToOne
    private Channel sentIn;

    public ChannelMessage(Channel sentIn) {
        this.sentIn = sentIn;
    }

    public ChannelMessage(String message, User sentBy, Channel sentIn) {
        super(message, sentBy);
        this.sentIn = sentIn;
    }

    public Channel getSentIn() {
        return sentIn;
    }

    public void setSentIn(Channel sentIn) {
        this.sentIn = sentIn;
    }
}
