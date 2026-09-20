import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Search, Plus, CheckCircle2, AlertCircle, X, Users, Video } from 'lucide-react';
import { eventService } from '../api/eventService';
import { useAuth } from '../context/AuthContext';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    eventDate: '',
    eventTime: '',
    location: '',
    onlineLink: '',
    eventType: 'TECHNICAL_WORKSHOP',
  });
  const [msg, setMsg] = useState({ text: '', type: '' });

  const { user, isAuthenticated } = useAuth();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventService.getAllEvents(search, selectedType);
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchEvents, 300);
    return () => clearTimeout(timer);
  }, [search, selectedType]);

  const handleRegister = async (eventId) => {
    if (!isAuthenticated) {
      alert("Please sign in to register for campus events.");
      return;
    }
    try {
      const updated = await eventService.registerForEvent(eventId);
      setEvents(events.map(e => e.id === eventId ? updated : e));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to register for event');
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    try {
      await eventService.createEvent(newEvent);
      setMsg({ text: 'Event created successfully!', type: 'success' });
      setShowCreateModal(false);
      setNewEvent({
        title: '',
        description: '',
        eventDate: '',
        eventTime: '',
        location: '',
        onlineLink: '',
        eventType: 'TECHNICAL_WORKSHOP',
      });
      fetchEvents();
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to create event', type: 'error' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Campus & Alumni Events</h1>
          <p style={{ color: 'var(--text-muted)' }}>Workshops, webinars, and networking sessions hosted by alumni.</p>
        </div>

        {isAuthenticated && (user.role === 'ALUMNI' || user.role === 'ADMIN') && (
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={18} /> Host New Event
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.75rem' }}
            placeholder="Search events by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="form-select"
          style={{ width: '220px' }}
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Event Types</option>
          <option value="NETWORKING">Networking</option>
          <option value="TECHNICAL_WORKSHOP">Technical Workshop</option>
          <option value="CAREER_GUIDANCE">Career Guidance</option>
          <option value="CODING_SESSION">Coding Session</option>
          <option value="PLACEMENT_PREPARATION">Placement Prep</option>
          <option value="ALUMNI_MEET">Alumni Meet</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading Events...</div>
      ) : events.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <Calendar size={40} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
          <h3>No Events Scheduled</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Check back soon for upcoming alumni sessions.</p>
        </div>
      ) : (
        <div className="grid-cols-3">
          {events.map(event => (
            <div key={event.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-student">{event.eventType.replace('_', ' ')}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Users size={13} /> {event.participantCount || 0} Registered
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{event.title}</h3>

              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={15} style={{ color: 'var(--primary)' }} /> {event.eventDate}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={15} style={{ color: 'var(--secondary)' }} /> {event.eventTime}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={15} style={{ color: 'var(--accent-purple)' }} /> {event.location}</div>
                {event.onlineLink && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-all' }}>
                    <Video size={15} style={{ color: 'var(--accent-emerald)' }} />
                    <a href={event.onlineLink} target="_blank" rel="noreferrer" style={{ color: 'var(--secondary)', fontSize: '0.85rem' }}>Online Meeting Link</a>
                  </div>
                )}
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineClamp: 3, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {event.description}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Host: {event.organizer?.name || 'Alumni Host'}</span>
                {event.isRegistered ? (
                  <span className="badge badge-alumni"><CheckCircle2 size={12} /> Registered</span>
                ) : (
                  <button className="btn btn-secondary btn-sm" onClick={() => handleRegister(event.id)}>
                    Register
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Host Event Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{ maxWidth: '650px', width: '100%', position: 'relative' }}>
            <button
              onClick={() => setShowCreateModal(false)}
              style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Host a New Event / Workshop</h2>

            <form onSubmit={handleCreateSubmit}>
              <div className="grid-cols-2">
                <div className="form-group">
                  <label className="form-label">Event Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="System Design Masterclass"
                    required
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Event Category</label>
                  <select
                    className="form-select"
                    value={newEvent.eventType}
                    onChange={(e) => setNewEvent({ ...newEvent, eventType: e.target.value })}
                  >
                    <option value="TECHNICAL_WORKSHOP">Technical Workshop</option>
                    <option value="CAREER_GUIDANCE">Career Guidance</option>
                    <option value="CODING_SESSION">Coding Session</option>
                    <option value="PLACEMENT_PREPARATION">Placement Preparation</option>
                    <option value="NETWORKING">Networking</option>
                    <option value="ALUMNI_MEET">Alumni Meet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Event Date</label>
                  <input
                    type="date"
                    className="form-input"
                    required
                    value={newEvent.eventDate}
                    onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Event Time</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="18:00 EST"
                    required
                    value={newEvent.eventTime}
                    onChange={(e) => setNewEvent({ ...newEvent, eventTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Location / Venue</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Main Auditorium & Virtual Stream"
                  required
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Online Zoom / Google Meet Link (Optional)</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://zoom.us/j/12345678"
                  value={newEvent.onlineLink}
                  onChange={(e) => setNewEvent({ ...newEvent, onlineLink: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                <label className="form-label">Event Description & Agenda</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  required
                  placeholder="Describe the topics to be covered and target audience..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                Publish Event & Notify Campus
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
