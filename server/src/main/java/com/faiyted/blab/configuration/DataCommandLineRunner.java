package com.faiyted.blab.configuration;

import com.faiyted.blab.models.*;
import com.faiyted.blab.models.user.User;
import com.faiyted.blab.models.user.UserProfile;
import com.faiyted.blab.repositories.*;
import com.faiyted.blab.services.user.UserService;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.stream.Stream;

@Component
public class DataCommandLineRunner implements CommandLineRunner {

    private Channels channels;
    private ChannelMessages channelMessages;
    private Spaces spaces;
    private SpaceMembers members;
    private PasswordEncoder passwordEncoder;
    private SiteSettings site;
    private UserService userDao;

    private static final boolean FRESHSTART = true;

    private Faker faker = new Faker();
    private Random rand = new Random();

    private HashMap<String, Integer> create = new HashMap<>();
    // Test Data for fake account
    private String testUserName = "test";
    private String testPassword = "test";

    @Autowired
    public DataCommandLineRunner(
            Channels channels,
            ChannelMessages channelMessages,
            SpaceMembers members,
            Spaces spaces,
            PasswordEncoder passwordEncoder,
            SiteSettings site,
            UserService userDao
            )
    {

        this.channels = channels;
        this.channelMessages =channelMessages;
        this.spaces = spaces;
        this.site = site;
        this.members = members;
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;

        // stores values for data to be populated
        dataToPopulate();

        // Site settings validate
        siteSettings();

    }

    @Override
    public void run(String... strings) throws Exception {
        if(FRESHSTART) {
            // REFRESH APP DATA
            if(site.getFirst().getRefreshAppData() || !site.getFirst().getPopulated()) {

                removeExistingData();

                // START DATA GENERATION (USERS)
                for (int i = 0; i < create.get("users"); i++) {
                    User user = createUser(testUserName + i, testPassword);
                    createSpacesAndChannels(user);
                }

                createSpaceMembers(create.get("memberSpaces"));
                createChannelMessages(create.get("channelMessages"));



            }
        }

        site.save(new SiteSetting(true));
    }


    private void removeExistingData() {
        //Clean data
        channels.deleteAll();
        members.deleteAll();
        spaces.deleteAll();
        userDao.getUsers().deleteAll();
    }


    private User createUser(String username, String password) {
        User user = new User(username, password, LocalDateTime.now(), LocalDateTime.now());
        String hash = passwordEncoder.encode(password);
        user.setPassword(hash);
        user.setCreatedAt(LocalDateTime.now());

        user.setProfile(new UserProfile(faker.name().fullName(),  faker.name().firstName(),
                faker.name().lastName(),  faker.internet().emailAddress(),  username,  faker.address().state()));

        user = userDao.getUsers().save(user);
        userDao.getUsers().addDefaultRole(user.getId());

        return user;
    }

    private Space createSpace(User user) {
         return spaces.save(
                new Space(faker.superhero().name(), user));
    }

    private SpaceMember createMember(Space space, User user) {
        return members.save(new SpaceMember(space, user));
    }

    private Channel createChannel(Space space) {
        return channels.save(
                new Channel(faker.superhero().power(), space));
    }

    private ChannelMessage createChannelMessage(Channel channel, User user) {
        return channelMessages.save(new ChannelMessage(
                faker.gameOfThrones().quote(),
                user,
                channel));
    }

    private void createSpacesAndChannels(User user) {

        for(int i = 0; i < create.get("spaces"); i++) {
            Space space = createSpace(user);
            for(int j = 0; j < create.get("channels"); j++) {
                Channel channel = createChannel(space);
            }
        }
    }

    private void createSpaceMembers(Integer totalPerUser) {
        List<User> users = userDao.getUsers().findAll();
        List<Space> spaceList = spaces.findAll();

        for(User user : users) {
            for(int i = 0; i < totalPerUser; i++) {
                Space space = spaceList.get(rand.nextInt(spaceList.size()));
                createMember(space, user);
            }
        }
    }


    private void createChannelMessages(Integer messagesPerChannel) {
        List<User> users = userDao.getUsers().findAll();
        List<Channel> channelList = channels.findAll();

        for(Channel channel  : channelList) {
            for(int i = 0; i < messagesPerChannel; i++) {
                User user = users.get(rand.nextInt(users.size()));
                createChannelMessage(channel,user);
            }
        }

    }

    private void siteSettings() {
        // Creates record for Site settings
        try {
            if (!site.isPopulated()) {
                System.out.println("Populated Returned FALSE");
            }
        } catch (NullPointerException e) {
            SiteSetting setting = new SiteSetting(false);
            site.save(setting);
        }
    }

    private void dataToPopulate() {
        //How many users to create
        create.put("users", 150);
        // Spaces per user
        create.put("spaces", 2);
        // Channels per user
        create.put("channels", 5);
        // How many spaces each user is a member of
        create.put("memberSpaces", 5);
        // How many messages to make in each channel
        create.put("channelMessages", 50);
    }


}
