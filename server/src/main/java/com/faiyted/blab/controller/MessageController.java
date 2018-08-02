package com.faiyted.blab.controller;


import com.faiyted.blab.models.Channel;
import com.faiyted.blab.models.ChannelMessage;
import com.faiyted.blab.models.Message;
import com.faiyted.blab.repositories.ChannelMessages;
import com.faiyted.blab.repositories.Channels;
import com.faiyted.blab.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {
    private Channels channels;
    private ChannelMessages messages;
    private UserService userDao;


    @Autowired
    public MessageController(Channels channels, ChannelMessages messages, UserService userDao) {
        this.channels = channels;
        this.userDao = userDao;
        this.messages = messages;
    }


    // TODO: need to create a way to handle long convesation and limits
    @GetMapping("channel/{id}")
    public List<ChannelMessage> getMessagesInChannel(@PathVariable Long id) {
        Channel channel = channels.findById(id).get();
        return messages.findAllByChannel(channel);
    }


}
