import React, { useState, useEffect } from 'react';
import { 
  Users, Briefcase, Calendar, MessageSquare, ShieldAlert, CheckCircle2, XCircle, 
  Trash2, RefreshCw, Search, UserCheck, UserX, Activity, Eye, AlertTriangle 
} from 'lucide-react';
import { 
  getAdminStats, getAdminUsers, toggleUserStatus, deleteUser, getAdminJobs, deleteJob, getAdminAuditLogs 
} from '../api/adminService';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  
  const [activeTab, setActiveTab] = useState('USERS'); // USERS, JOBS, AUDIT
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  
  const [selectedUserForDelete, setSelectedUserForDelete] = useState(null);
  const [selectedJobForDelete, setSelectedJobForDelete] = useState(null);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [statsData, usersData, jobsData, auditData] = await Promise.all([
        getAdminStats(),
        getAdminUsers(),
        getAdminJobs(),
        getAdminAuditLogs()
      ]);
      setStats(statsData);
      setUsers(usersData || []);
      setJobs(jobsData || []);
      setAuditLogs(auditData || []);
    } catch (err) {
      console.error('Failed to fetch admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId) => {
    try {
      setActionLoading(true);
      const updatedUser = await toggleUserStatus(userId);
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, enabled: updatedUser.enabled } : u));
      // Refresh audit logs
      const freshAudit = await getAdminAuditLogs();
      setAuditLogs(freshAudit);
    } catch (err) {
      console.error('Failed to toggle user status:', err);
      alert('Failed to toggle user status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUserConfirm = async () => {
    if (!selectedUserForDelete) return;
    try {
      setActionLoading(true);
      await deleteUser(selectedUserForDelete.id);
      setUsers(prev => prev.filter(u => u.id !== selectedUserForDelete.id));
      setSelectedUserForDelete(null);
      // Refresh audit logs & stats
      loadAdminData();
    } catch (err) {
      console.error('Failed to delete user:', err);
      alert(err.response?.data?.message || 'Failed to delete user account.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteJobConfirm = async () => {
    if (!selectedJobForDelete) return;
    try {
      setActionLoading(true);
      await deleteJob(selectedJobForDelete.id);
      setJobs(prev => prev.filter(j => j.id !== selectedJobForDelete.id));
      setSelectedJobForDelete(null);
      // Refresh audit logs & stats
      loadAdminData();
    } catch (err) {
      console.error('Failed to delete job:', err);
      alert('Failed to delete job posting.');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.postedByAlumniName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadgeClass = (role) => {
    if (role === 'STUDENT') return 'badge badge-student';
    if (role === 'ALUMNI') return 'badge badge-alumni';
    return 'badge badge-admin';
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem', minHeight: '80vh' }}>
      
      {/* Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', color: '#fff', margin: 0, fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldAlert size={32} style={{ color: 'var(--accent-rose)' }} />
            Admin Operations Center
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '0.4rem 0 0 0', fontSize: '0.95rem' }}>
            Real-time platform telemetry, user account moderation, job listings control, and audit logs.
          </p>
        </div>

        <button 
          onClick={loadAdminData} 
          disabled={loading}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <RefreshCw size={15} className={loading ? 'spin' : ''} /> Refresh Telemetry
        </button>
      </div>

      {/* Telemetry Metric Cards Grid */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(15, 23, 42, 0.6) 100%)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>TOTAL REGISTERED USERS</span>
              <Users size={20} style={{ color: 'var(--primary-light)' }} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '0.6rem 0 0.25rem' }}>
              {stats.totalUsers}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem' }}>
              <span>👨‍🎓 {stats.totalStudents} Students</span>
              <span>🎓 {stats.totalAlumni} Alumni</span>
            </div>
          </div>

          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(15, 23, 42, 0.6) 100%)', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>JOB OPPORTUNITIES</span>
              <Briefcase size={20} style={{ color: 'var(--accent-purple)' }} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '0.6rem 0 0.25rem' }}>
              {stats.totalJobs}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem' }}>
              <span>🟢 {stats.openJobs} Active</span>
              <span>📄 {stats.totalApplications} Applications</span>
            </div>
          </div>

          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.6) 100%)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>MENTORSHIP ENGAGEMENT</span>
              <MessageSquare size={20} style={{ color: 'var(--accent-emerald)' }} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '0.6rem 0 0.25rem' }}>
              {stats.totalMentorshipRequests}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem' }}>
              <span>✅ {stats.totalApprovedMentorships} Approved 1-on-1 Sessions</span>
            </div>
          </div>

          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(15, 23, 42, 0.6) 100%)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>COLLEGE EVENTS</span>
              <Calendar size={20} style={{ color: 'var(--accent-amber)' }} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '0.6rem 0 0.25rem' }}>
              {stats.totalEvents}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem' }}>
              <span>👥 {stats.totalEventParticipants} Total Registrations</span>
            </div>
          </div>

        </div>
      )}

      {/* Tabs & Controls Header */}
      <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('USERS')}
            className={`btn ${activeTab === 'USERS' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Users size={16} /> User Moderation ({users.length})
          </button>

          <button
            onClick={() => setActiveTab('JOBS')}
            className={`btn ${activeTab === 'JOBS' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Briefcase size={16} /> Jobs Moderation ({jobs.length})
          </button>

          <button
            onClick={() => setActiveTab('AUDIT')}
            className={`btn ${activeTab === 'AUDIT' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Activity size={16} /> System Audit Logs ({auditLogs.length})
          </button>
        </div>

        {/* Search & Filters */}
        {activeTab !== 'AUDIT' && (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder={activeTab === 'USERS' ? "Search user name / email..." : "Search job title / company..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '2.1rem', paddingTop: '0.45rem', paddingBottom: '0.45rem', fontSize: '0.88rem', width: '230px' }}
              />
            </div>

            {activeTab === 'USERS' && (
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="input-field"
                style={{ paddingTop: '0.45rem', paddingBottom: '0.45rem', fontSize: '0.88rem', width: '130px' }}
              >
                <option value="ALL">All Roles</option>
                <option value="STUDENT">Students</option>
                <option value="ALUMNI">Alumni</option>
                <option value="ADMIN">Admins</option>
              </select>
            )}
          </div>
        )}
      </div>

      {/* TAB 1: USER MODERATION TABLE */}
      {activeTab === 'USERS' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase' }}>User</th>
                  <th style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Role</th>
                  <th style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Profile Details</th>
                  <th style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      No users match the criteria.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(u => (
                    <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '0.9rem 1.25rem' }}>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{u.name}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{u.email}</div>
                      </td>
                      <td style={{ padding: '0.9rem 1.25rem' }}>
                        <span className={getRoleBadgeClass(u.role)}>{u.role}</span>
                      </td>
                      <td style={{ padding: '0.9rem 1.25rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                        {u.extraInfo || '—'}
                      </td>
                      <td style={{ padding: '0.9rem 1.25rem' }}>
                        {u.enabled ? (
                          <span style={{ color: 'var(--accent-emerald)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                            <CheckCircle2 size={14} /> Active
                          </span>
                        ) : (
                          <span style={{ color: 'var(--accent-rose)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                            <XCircle size={14} /> Disabled
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '0.9rem 1.25rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleToggleUserStatus(u.id)}
                            disabled={actionLoading || u.role === 'ADMIN'}
                            className="btn btn-secondary btn-sm"
                            title={u.enabled ? "Disable Account" : "Enable Account"}
                            style={{ padding: '0.35rem 0.65rem' }}
                          >
                            {u.enabled ? <UserX size={14} style={{ color: 'var(--accent-amber)' }} /> : <UserCheck size={14} style={{ color: 'var(--accent-emerald)' }} />}
                          </button>
                          {u.role !== 'ADMIN' && (
                            <button
                              onClick={() => setSelectedUserForDelete(u)}
                              disabled={actionLoading}
                              className="btn btn-outline btn-sm"
                              title="Delete Account"
                              style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.3)', padding: '0.35rem 0.65rem' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: JOBS MODERATION TABLE */}
      {activeTab === 'JOBS' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Job Title & Company</th>
                  <th style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Posted By Alumnus</th>
                  <th style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Applicants</th>
                  <th style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      No jobs found.
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map(j => (
                    <tr key={j.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '0.9rem 1.25rem' }}>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{j.title}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{j.companyName} • {j.location} ({j.jobType})</div>
                      </td>
                      <td style={{ padding: '0.9rem 1.25rem' }}>
                        <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 600 }}>{j.postedByAlumniName}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{j.postedByAlumniEmail}</div>
                      </td>
                      <td style={{ padding: '0.9rem 1.25rem' }}>
                        <span className="badge badge-primary" style={{ fontSize: '0.78rem' }}>
                          {j.applicationCount} Submissions
                        </span>
                      </td>
                      <td style={{ padding: '0.9rem 1.25rem' }}>
                        <span className={`badge ${j.status === 'OPEN' ? 'badge-alumni' : 'badge-admin'}`}>
                          {j.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.9rem 1.25rem', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedJobForDelete(j)}
                          disabled={actionLoading}
                          className="btn btn-outline btn-sm"
                          title="Delete Job Listing"
                          style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.3)', padding: '0.35rem 0.65rem' }}
                        >
                          <Trash2 size={14} /> Remove Listing
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM AUDIT LOGS */}
      {activeTab === 'AUDIT' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
            System Audit Event Log
          </h3>

          {auditLogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              No audit actions logged yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {auditLogs.map(log => (
                <div 
                  key={log.id} 
                  style={{
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-glass)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      padding: '6px 10px',
                      borderRadius: '6px',
                      background: log.action.includes('DELETE') ? 'rgba(244, 63, 94, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                      color: log.action.includes('DELETE') ? 'var(--accent-rose)' : 'var(--primary-light)',
                      fontWeight: 700,
                      fontSize: '0.75rem'
                    }}>
                      {log.action}
                    </div>

                    <div>
                      <div style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 600 }}>
                        {log.details}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                        Executed by: {log.adminName} ({log.adminEmail}) • Target: {log.targetType} #{log.targetId}
                      </div>
                    </div>
                  </div>

                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    {new Date(log.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {selectedUserForDelete && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '1rem'
        }}>
          <div className="card" style={{ maxWidth: '450px', width: '100%', padding: '1.75rem', background: '#0f172a', border: '1px solid var(--border-glass)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-rose)', marginBottom: '1rem' }}>
              <AlertTriangle size={24} />
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Delete User Account?</h3>
            </div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Are you sure you want to permanently delete account <strong style={{ color: '#fff' }}>{selectedUserForDelete.email}</strong>? This action cannot be undone.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedUserForDelete(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleDeleteUserConfirm} disabled={actionLoading} className="btn btn-primary" style={{ background: 'var(--accent-rose)', borderColor: 'var(--accent-rose)' }}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Job Confirmation Modal */}
      {selectedJobForDelete && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '1rem'
        }}>
          <div className="card" style={{ maxWidth: '450px', width: '100%', padding: '1.75rem', background: '#0f172a', border: '1px solid var(--border-glass)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-rose)', marginBottom: '1rem' }}>
              <AlertTriangle size={24} />
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Remove Job Listing?</h3>
            </div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Are you sure you want to delete job posting <strong style={{ color: '#fff' }}>{selectedJobForDelete.title}</strong> at {selectedJobForDelete.companyName}?
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedJobForDelete(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleDeleteJobConfirm} disabled={actionLoading} className="btn btn-primary" style={{ background: 'var(--accent-rose)', borderColor: 'var(--accent-rose)' }}>
                Remove Listing
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
