package com.faiyted.blab.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class SiteSetting {

    @Id
    private Integer id = 1;
    // Record if data is populated on the site,
    // false value will trigger a full reload
    @Column
    private Boolean isPopulated = false;

    // If you wish to force a reload of API data set this to TRUE in the database
    @Column
    private Boolean refreshAPIs = false;

    // If you wish to refresh Application Data only set this to TRUE in the database
    @Column
    private Boolean refreshAppData = false;

    public SiteSetting() {}

    public SiteSetting(Boolean isPopulated) {
        this.isPopulated = isPopulated;
    }

    public SiteSetting(Integer id, Boolean isPopulated, Boolean refreshAPIs, Boolean refreshAppData) {
        this.id = id;
        this.isPopulated = isPopulated;
        this.refreshAPIs = refreshAPIs;
        this.refreshAppData = refreshAppData;
    }

    public Boolean getPopulated() {
        return isPopulated;
    }

    public void setPopulated(Boolean populated) {
        isPopulated = populated;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Boolean getRefreshAPIs() {
        return refreshAPIs;
    }

    public void setRefreshAPIs(Boolean refreshAPIs) {
        this.refreshAPIs = refreshAPIs;
    }

    public Boolean getRefreshAppData() {
        return refreshAppData;
    }

    public void setRefreshAppData(Boolean refreshAppData) {
        this.refreshAppData = refreshAppData;
    }
}
