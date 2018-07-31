package com.faiyted.blab.models.user;

import javax.persistence.*;


@Entity
@Table(name="UserConnection")
public class UserConnection {


    /*
    create table UserConnection (
      userId varchar(255) not null,
      providerId varchar(255) not null,
      providerUserId varchar(255),
      rank int not null,  //rank might be issue...
      displayName varchar(255),
      profileUrl varchar(512),
      imageUrl varchar(512),
      accessToken varchar(1024) not null,
      secret varchar(255),
      refreshToken varchar(255),
      expireTime bigint,
      primary key (userId, providerId, providerUserId));
    create unique index UserConnectionRank on UserConnection(userId, providerId, rank);

     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name="userid")
    private  String userId;
    @Column(nullable= false, name="providerid")
    private  String providerId;
    @Column(name="provideruserid")
    private  String providerUserId;
    @Column(nullable = false, name="rank")
    private int rank;
    @Column(name="displayname")
    private  String displayName;
    @Column(name="profileurl")
    private  String profileUrl;
    @Column(name="imageurl")
    private  String imageUrl;
    @Column(nullable = false, name="accesstoken")
    private  String accessToken;
    @Column(name="secret")
    private  String secret;
    @Column(name="refreshtoken")
    private  String refreshToken;
    @Column(name="expiretime")
    private  Long expireTime;

    public UserConnection() {}

    public UserConnection(String userId, String providerId, String providerUserId, int rank, String displayName, String profileUrl, String imageUrl, String accessToken, String secret, String refreshToken, Long expireTime) {
        this.userId = userId;
        this.providerId = providerId;
        this.providerUserId = providerUserId;
        this.rank = rank;
        this.displayName = displayName;
        this.profileUrl = profileUrl;
        this.imageUrl = imageUrl;
        this.accessToken = accessToken;
        this.secret = secret;
        this.refreshToken = refreshToken;
        this.expireTime = expireTime;
    }

    public String getUserId() {
        return userId;
    }

    public String getProviderId() {
        return providerId;
    }

    public String getProviderUserId() {
        return providerUserId;
    }

    public int getRank() {
        return rank;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getSecret() {
        return secret;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public Long getExpireTime() {
        return expireTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String toString() {
        return
                "userId = " + userId +
                        ", providerId = " + providerId +
                        ", providerUserId = " + providerUserId +
                        ", rank = " + rank +
                        ", displayName = " + displayName +
                        ", profileUrl = " + profileUrl +
                        ", imageUrl = " + imageUrl +
                        ", accessToken = " + accessToken +
                        ", secret = " + secret +
                        ", refreshToken = " + refreshToken +
                        ", expireTime = " + expireTime;
    }

}