package com.faiyted.blab.services.user;


import com.faiyted.blab.models.user.User;
import com.faiyted.blab.models.user.UserConnection;
import com.faiyted.blab.models.user.UserProfile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.web.WebAttributes;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.util.Enumeration;
import java.util.Map;
import java.util.Set;


@Component
public class SocialControllerService {

    private static final Logger LOG = LoggerFactory.getLogger(SocialControllerService.class);

    private static final String USER_CONNECTION = "user_connection";
    private static final String USER_PROFILE = "user_profile";

    @Value("${file-upload-path}")
    private String uploadPath;




    @Autowired
    private UserService usersDao;

    protected void logInfo(HttpServletRequest request, Model model, String username, String path, HttpSession session) {
        // Log the content of the model
        LOG.debug("Path: " + path + ", currentUsername: " + username);

        LOG.debug("Non-null request-attributes:");
        for (Enumeration<String> rane = request.getAttributeNames(); rane.hasMoreElements();) {
            String key = rane.nextElement();
            Object value = session.getAttribute(key);
            if (value != null) {
                LOG.debug(" - " + key + " = " + value);
            }
        }

        LOG.debug("Session-attributes:");
        for (Enumeration<String> sane = session.getAttributeNames(); sane.hasMoreElements();) {
            String key = sane.nextElement();
            LOG.debug(" - " + key + " = " + session.getAttribute(key));
        }

        Set<Map.Entry<String, Object>> me = model.asMap().entrySet();
        LOG.debug("ModelElements (" + me.size() + "):");
        for (Map.Entry<String, Object> e: me) {
            LOG.debug(" - " + e.getKey() + " = " + e.getValue());
        }
    }

    /**
     * Get the current UserProfile from the http session
     *
     * @param session
     * @param userId
     * @return
     */
    protected UserProfile getUserProfile(HttpSession session, Long userId) {
        UserProfile profile = (UserProfile) session.getAttribute(USER_PROFILE);

        // Reload from persistence storage if not set or invalid (i.e. no valid userId)
        if (profile == null || !userId.equals(profile.getUserId())) {
            profile = usersDao.getUsers().getUserProfile(userId);
            session.setAttribute(USER_PROFILE, profile);
        }
        return profile;
    }

    /**
     * Get the current UserConnection from the http session
     *
     * @param session
     * @param userId
     * @return
     */
    public UserConnection getUserConnection(HttpSession session, String username) {
        UserConnection connection;
        connection = (UserConnection) session.getAttribute(USER_CONNECTION);

        // Reload from persistence storage if not set or invalid (i.e. no valid userId)
        if (connection == null || !username.equals(connection.getUserId())) {
            connection = usersDao.getUsers().getUserConnection(username);
            session.setAttribute(USER_CONNECTION, connection);
        }




        return connection;
    }


    public void setModel(HttpServletRequest request, Principal currentUser, Model model) {

        // SecurityContext ctx = (SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT");

        String username = currentUser == null ? null : currentUser.getName();
        String path = request.getRequestURI();
        HttpSession session = request.getSession();

        UserConnection connection = null;
        UserProfile profile = null;
        String displayName = null;
        User data = null;

        // Collect info if the user is logged in, i.e. userId is set
        if (username != null) {

            // Get user data
            data = usersDao.getUsers().findByUsername(username);

            // Get the current UserConnection from the http session
            connection = getUserConnection(session, data.getUsername());



            // Get the current UserProfile from the http session
            profile = getUserProfile(session, data.getId());

            // Compile the best display name from the connection and the profile
            displayName = getDisplayName(connection, profile);

        }

        Throwable exception = (Throwable)session.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);

        // Update the model with the information we collected
        model.addAttribute("exception",              exception == null ? null : exception.getMessage());
        model.addAttribute("currentUsername",          username);
        model.addAttribute("currentUserProfile",     profile);
        model.addAttribute("currentUserConnection",  connection);
        model.addAttribute("currentUserDisplayName", displayName);
        model.addAttribute("currentData",            data);

        if (LOG.isDebugEnabled()) {
            logInfo(request, model, username, path, session);
        }
    }

    /**
     * Compile the best display name from the connection and the profile
     *
     * @param connection
     * @param profile
     * @return
     */
    protected String getDisplayName(UserConnection connection, UserProfile profile) {

        // The name is set differently in different providers so we better look in both places...
        if (connection.getDisplayName() != null) {
            return connection.getDisplayName();
        } else {
            return profile.getName();
        }
    }




}
