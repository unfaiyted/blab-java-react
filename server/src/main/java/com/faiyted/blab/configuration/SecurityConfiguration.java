package com.faiyted.blab.configuration;

import com.faiyted.blab.services.user.SimpleSocialUsersDetailService;
import com.faiyted.blab.services.user.UserDetailsLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.social.security.SocialUserDetailsService;
import org.springframework.social.security.SpringSocialConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private UserDetailsLoader usersLoader;

    @Autowired
    public SecurityConfiguration(UserDetailsLoader usersLoader) {
        this.usersLoader = usersLoader;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(usersLoader) // How to find users by their username
                .passwordEncoder(passwordEncoder()) // How to encode and verify passwords
        ;
    }


    // Cross Browser AJAX request checks
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","OPTIONS","PUT","DELETE"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean //Redirects to last page
    public AuthenticationSuccessHandler successHandler() {
        SimpleUrlAuthenticationSuccessHandler handler = new SimpleUrlAuthenticationSuccessHandler();
        handler.setUseReferer(true);
        return handler;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                /* Login configuration */
                .formLogin()
//                    .loginPage("/login")
                .defaultSuccessUrl("/", true)
//                    .failureUrl("/login?error=true")
//                    .successHandler(successHandler())
//                    .defaultSuccessUrl("/users/displayprofile") // user's home page, it can be any URL
                    .permitAll() // Anyone can go to the login page
                    /* Logout configuration */
                .and()
                    .logout()
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                    .logoutSuccessUrl("/logout.done")
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                    .logoutSuccessUrl("/login?logout") // append a query string value
                    /* Pages that can be viewed without having to log in */
                .and()
                    .authorizeRequests()
                        .antMatchers("/users/login","/","/topic","/css/**", "js/**","/img/**","/error**") // anyone can see the home and the posts pages
                        .permitAll()
                    .and()
                     .authorizeRequests()
                     .antMatchers("/channels/**","/spaces/**","/users/**","/messages/**")
                     .hasAuthority("USER")
                    /* Pages that require authentication */
                .and()
                    .authorizeRequests()
                    .antMatchers(
                            "/static/**",
                            "/viewstate/**",
                            "/messages/create",
                            "/topics"
                    )
                .authenticated()
                .and()
                .rememberMe()
                .and()
                .apply(new SpringSocialConfigurer()
                        .postLoginUrl("/users/displayprofile")
                        .alwaysUsePostLoginUrl(true));

    }

//    @Bean
//    @Profile("dev")
//    public RequestCache refererRequestCache() {
//        return new HttpSessionRequestCache() {
//            @Override
//            public void saveRequest(HttpServletRequest request, HttpServletResponse response) {
//                String referrer = request.getHeader("referer");
//                if (referrer != null) {
//                    request.getSession().setAttribute("SPRING_SECURITY_SAVED_REQUEST", new SimpleSavedRequest(referrer));
//                }
//            }
//        };
//    }

    @Bean
    public SocialUserDetailsService socialUsersDetailService() {
        return new SimpleSocialUsersDetailService(usersLoader);
    }

}
