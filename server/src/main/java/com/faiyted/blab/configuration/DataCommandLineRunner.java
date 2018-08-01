package com.faiyted.blab.configuration;

import com.faiyted.blab.models.Channel;
import com.faiyted.blab.models.SiteSetting;
import com.faiyted.blab.models.Space;
import com.faiyted.blab.models.user.User;
import com.faiyted.blab.models.user.UserProfile;
import com.faiyted.blab.repositories.Channels;
import com.faiyted.blab.repositories.SiteSettings;
import com.faiyted.blab.repositories.Spaces;
import com.faiyted.blab.services.user.UserService;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Random;
import java.util.stream.Stream;

@Component
public class DataCommandLineRunner implements CommandLineRunner {

    private Channels channels;
    private Spaces spaces;
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
            Spaces spaces,
            PasswordEncoder passwordEncoder,
            SiteSettings site,
            UserService userDao
            )
    {

        this.channels = channels;
        this.spaces = spaces;
        this.site = site;
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
            }
        }

        site.save(new SiteSetting(true));
    }


    private void removeExistingData() {
        //Clean data
        channels.deleteAll();
        spaces.deleteAll();
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

    private Channel createChannel(Space space) {
        return channels.save(
                new Channel(faker.superhero().power(), space));
    }

    private void createSpacesAndChannels(User user) {

        for(int i = 0; i < create.get("spaces"); i++) {
            Space space = createSpace(user);
            for(int j = 0; j < create.get("channels"); j++) {
                Channel channel = createChannel(space);
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
    }


}
