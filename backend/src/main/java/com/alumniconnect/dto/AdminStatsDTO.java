package com.alumniconnect.dto;

public class AdminStatsDTO {
    private long totalUsers;
    private long totalStudents;
    private long totalAlumni;
    private long totalAdmins;

    private long totalJobs;
    private long openJobs;
    private long closedJobs;

    private long totalApplications;
    private long totalAcceptedApplications;

    private long totalEvents;
    private long totalEventParticipants;

    private long totalMentorshipRequests;
    private long totalApprovedMentorships;

    public AdminStatsDTO() {}

    public AdminStatsDTO(long totalUsers, long totalStudents, long totalAlumni, long totalAdmins, 
                         long totalJobs, long openJobs, long closedJobs, 
                         long totalApplications, long totalAcceptedApplications, 
                         long totalEvents, long totalEventParticipants, 
                         long totalMentorshipRequests, long totalApprovedMentorships) {
        this.totalUsers = totalUsers;
        this.totalStudents = totalStudents;
        this.totalAlumni = totalAlumni;
        this.totalAdmins = totalAdmins;
        this.totalJobs = totalJobs;
        this.openJobs = openJobs;
        this.closedJobs = closedJobs;
        this.totalApplications = totalApplications;
        this.totalAcceptedApplications = totalAcceptedApplications;
        this.totalEvents = totalEvents;
        this.totalEventParticipants = totalEventParticipants;
        this.totalMentorshipRequests = totalMentorshipRequests;
        this.totalApprovedMentorships = totalApprovedMentorships;
    }

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }

    public long getTotalAlumni() { return totalAlumni; }
    public void setTotalAlumni(long totalAlumni) { this.totalAlumni = totalAlumni; }

    public long getTotalAdmins() { return totalAdmins; }
    public void setTotalAdmins(long totalAdmins) { this.totalAdmins = totalAdmins; }

    public long getTotalJobs() { return totalJobs; }
    public void setTotalJobs(long totalJobs) { this.totalJobs = totalJobs; }

    public long getOpenJobs() { return openJobs; }
    public void setOpenJobs(long openJobs) { this.openJobs = openJobs; }

    public long getClosedJobs() { return closedJobs; }
    public void setClosedJobs(long closedJobs) { this.closedJobs = closedJobs; }

    public long getTotalApplications() { return totalApplications; }
    public void setTotalApplications(long totalApplications) { this.totalApplications = totalApplications; }

    public long getTotalAcceptedApplications() { return totalAcceptedApplications; }
    public void setTotalAcceptedApplications(long totalAcceptedApplications) { this.totalAcceptedApplications = totalAcceptedApplications; }

    public long getTotalEvents() { return totalEvents; }
    public void setTotalEvents(long totalEvents) { this.totalEvents = totalEvents; }

    public long getTotalEventParticipants() { return totalEventParticipants; }
    public void setTotalEventParticipants(long totalEventParticipants) { this.totalEventParticipants = totalEventParticipants; }

    public long getTotalMentorshipRequests() { return totalMentorshipRequests; }
    public void setTotalMentorshipRequests(long totalMentorshipRequests) { this.totalMentorshipRequests = totalMentorshipRequests; }

    public long getTotalApprovedMentorships() { return totalApprovedMentorships; }
    public void setTotalApprovedMentorships(long totalApprovedMentorships) { this.totalApprovedMentorships = totalApprovedMentorships; }
}
