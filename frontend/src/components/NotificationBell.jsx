import React, { useState, useEffect } from 'react';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { notificationService } from '../api/notificationService';

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchUnreadCount = async () => {
    try {
      const data = await notificationService.getUnreadCount();
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      console.error("Failed to fetch unread count:", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const list = await notificationService.getUserNotifications();
      setNotifications(list);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    if (!open) {
      fetchNotifications();
    }
    setOpen(!open);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, readAt: new Date().toISOString() } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, readAt: new Date().toISOString() })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all read:", err);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleToggle}
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.45rem',
          color: 'var(--text-main)',
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: 'var(--accent-rose)',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: 700,
            borderRadius: '999px',
            width: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="glass-panel" style={{
          position: 'absolute',
          right: 0,
          top: '2.75rem',
          width: '350px',
          maxHeight: '450px',
          overflowY: 'auto',
          padding: '1rem',
          zIndex: 3000,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-glass)' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              >
                <CheckCheck size={14} /> Mark all read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem 0' }}>
              No notifications yet
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {notifications.map(n => (
                <div key={n.id} style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: n.readAt ? 'rgba(255,255,255,0.02)' : 'rgba(79, 70, 229, 0.12)',
                  border: '1px solid var(--border-glass)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="badge badge-skill" style={{ fontSize: '0.65rem' }}>{n.type}</span>
                    {!n.readAt && (
                      <button
                        onClick={() => handleMarkAsRead(n.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                        title="Mark as read"
                      >
                        <Check size={14} />
                      </button>
                    )}
                  </div>
                  <div style={{ color: n.readAt ? 'var(--text-muted)' : '#fff', lineHeight: 1.4 }}>{n.message}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                    {new Date(n.createdAt).toLocaleDateString()} {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
