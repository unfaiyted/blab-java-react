package com.faiyted.blab.models;

import com.faiyted.blab.models.user.User;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class ChannelMessage extends Message {

    @ManyToOne
    private Channel channel;

    public ChannelMessage() {}

    public ChannelMessage(String message, User sentBy, Channel channel) {
        super(message, sentBy);
        this.channel = channel;
    }

    public Channel getChannel() {
        return channel;
    }

    public void setChannel(Channel sentIn) {
        this.channel = sentIn;
    }
}
