import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Send, Plus, Trash2, Sparkles, MessageSquare, Briefcase, FileText, 
  HelpCircle, User, Cpu, ArrowRight, RefreshCw, CheckCircle2, Copy 
} from 'lucide-react';
import { 
  sendChatMessage, getUserConversations, getConversationDetails, deleteConversation 
} from '../api/aiService';

export default function AICareerAssistantPage() {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [promptInput, setPromptInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [mode, setMode] = useState('CAREER_GUIDANCE'); // CAREER_GUIDANCE, RESUME_FEEDBACK, INTERVIEW_PREP
  const [providerName, setProviderName] = useState('AI Engine');
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  const messagesEndRef = useRef(null);

  const modeOptions = [
    { id: 'CAREER_GUIDANCE', label: 'Career Guidance', icon: Briefcase },
    { id: 'RESUME_FEEDBACK', label: 'Resume Feedback', icon: FileText },
    { id: 'INTERVIEW_PREP', label: 'Interview Prep', icon: HelpCircle },
  ];

  const quickPrompts = [
    "What skills do I need to become a Full-Stack Developer in 2026?",
    "How can I optimize my resume for ATS filters?",
    "What are top Spring Boot & React interview questions?",
    "Write a cold message to ask an alumnus for a 15-minute chat.",
  ];

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    try {
      setHistoryLoading(true);
      const data = await getUserConversations();
      setConversations(data || []);
      if (data && data.length > 0 && !activeConversationId) {
        // Optionally load latest
        loadConversationDetails(data[0].id);
      }
    } catch (err) {
      console.error('Failed to load AI conversations:', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const loadConversationDetails = async (id) => {
    try {
      setActiveConversationId(id);
      const details = await getConversationDetails(id);
      setMessages(details.messages || []);
    } catch (err) {
      console.error('Failed to load conversation details:', err);
    }
  };

  const startNewChat = () => {
    setActiveConversationId(null);
    setMessages([]);
  };

  const handleDeleteConversation = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteConversation(id);
      setConversations(prev => prev.filter(c => c.id !== id));
      if (activeConversationId === id) {
        startNewChat();
      }
    } catch (err) {
      console.error('Failed to delete conversation:', err);
    }
  };

  const handleSend = async (customPrompt = null) => {
    const textToSend = customPrompt || promptInput;
    if (!textToSend || !textToSend.trim() || loading) return;

    const userText = textToSend.trim();
    if (!customPrompt) setPromptInput('');

    // Optimistically add user message
    const tempUserMsg = {
      id: Date.now(),
      senderRole: 'USER',
      content: userText,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempUserMsg]);
    setLoading(true);

    try {
      const res = await sendChatMessage(userText, activeConversationId, mode);
      
      setProviderName(res.providerUsed || 'AI Engine');
      setActiveConversationId(res.conversationId);

      // Add assistant response
      const assistantMsg = {
        id: res.assistantMessage.id || Date.now() + 1,
        senderRole: 'ASSISTANT',
        content: res.assistantMessage.content,
        createdAt: res.assistantMessage.createdAt || new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMsg]);

      // Refresh side list to update titles/timestamps
      loadConversations();
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg = {
        id: Date.now() + 1,
        senderRole: 'ASSISTANT',
        content: "⚠️ I encountered an issue generating a response. Please check your connection or try again.",
        createdAt: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Helper to parse basic markdown bold and lists
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');

    return lines.map((line, lIdx) => {
      let trimmed = line.trim();

      // Heading 3 / 4
      if (trimmed.startsWith('### ') || trimmed.startsWith('#### ')) {
        const titleText = trimmed.replace(/^#+\s*/, '');
        return (
          <h4 key={lIdx} style={{ 
            color: 'var(--primary-light)', 
            marginTop: '1rem', 
            marginBottom: '0.4rem', 
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            fontWeight: 700 
          }}>
            {titleText}
          </h4>
        );
      }

      // Code blocks or bullet points
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const bulletText = trimmed.substring(2);
        return (
          <div key={lIdx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem', paddingLeft: '0.5rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>•</span>
            <span style={{ color: 'var(--text-main)', lineHeight: 1.5 }}>
              {parseBoldText(bulletText)}
            </span>
          </div>
        );
      }

      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <div key={lIdx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem', paddingLeft: '0.5rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{trimmed.split(' ')[0]}</span>
            <span style={{ color: 'var(--text-main)', lineHeight: 1.5 }}>
              {parseBoldText(trimmed.replace(/^\d+\.\s/, ''))}
            </span>
          </div>
        );
      }

      if (trimmed === '') {
        return <div key={lIdx} style={{ height: '0.5rem' }}></div>;
      }

      return (
        <p key={lIdx} style={{ margin: '0 0 0.4rem 0', color: 'var(--text-main)', lineHeight: 1.6 }}>
          {parseBoldText(line)}
        </p>
      );
    });
  };

  const parseBoldText = (str) => {
    const parts = str.split(/(\*\*.*?\*\*|\`.*?\`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: '#fff', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} style={{ 
            background: 'rgba(99, 102, 241, 0.15)', 
            color: '#a5b4fc', 
            padding: '2px 6px', 
            borderRadius: '4px',
            fontSize: '0.88rem',
            fontFamily: 'monospace'
          }}>
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem', minHeight: 'calc(100vh - 80px)' }}>
      
      {/* Header Banner */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%)',
        border: '1px solid var(--border-glass)',
        marginBottom: '1.5rem',
        padding: '1.25rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-purple) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 20px var(--primary-glow)'
          }}>
            <Bot size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: '#fff', margin: 0, fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              AI Career Assistant <Sparkles size={18} style={{ color: 'var(--accent-amber)' }} />
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.25rem 0 0 0' }}>
              Personalized career guidance, resume feedback, and technical interview coaching powered by AlumniConnect.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)' }}>
          <Cpu size={16} style={{ color: 'var(--primary-light)' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active AI Provider:</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary-light)' }}>{providerName}</span>
        </div>
      </div>

      {/* Main Interface Layout: Sidebar + Chat Box */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem', height: '650px' }}>
        
        {/* Sidebar */}
        <div className="card" style={{ 
          padding: '1.25rem', 
          display: 'flex', 
          flexDirection: 'column', 
          background: 'rgba(15, 23, 42, 0.75)',
          height: '100%',
          overflow: 'hidden'
        }}>
          
          <button 
            onClick={startNewChat}
            className="btn btn-primary"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}
          >
            <Plus size={18} /> New Conversation
          </button>

          {/* Mode Selector */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
              Assistant Focus Mode
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {modeOptions.map(opt => {
                const IconComponent = opt.icon;
                const active = mode === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setMode(opt.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: active ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                      border: active ? '1px solid var(--primary-light)' : '1px solid transparent',
                      color: active ? '#fff' : 'var(--text-muted)',
                      fontSize: '0.85rem',
                      fontWeight: active ? 600 : 400,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    <IconComponent size={16} style={{ color: active ? 'var(--primary-light)' : 'var(--text-muted)' }} />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conversation History */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingRight: '0.2rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>
              Chat History
            </label>

            {historyLoading ? (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Loading history...
              </div>
            ) : conversations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                No past chats found.
              </div>
            ) : (
              conversations.map(conv => {
                const isSelected = activeConversationId === conv.id;
                return (
                  <div
                    key={conv.id}
                    onClick={() => loadConversationDetails(conv.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: isSelected ? '1px solid var(--border-glass)' : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                      <MessageSquare size={14} style={{ color: isSelected ? 'var(--primary-light)' : 'var(--text-muted)', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.82rem', color: isSelected ? '#fff' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {conv.title}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleDeleteConversation(e, conv.id)}
                      title="Delete Conversation"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        opacity: 0.6,
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                    >
                      <Trash2 size={13} style={{ color: 'var(--accent-rose)' }} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Panel: Chat Stream Area */}
        <div className="card" style={{ 
          padding: '0', 
          display: 'flex', 
          flexDirection: 'column', 
          background: 'rgba(15, 23, 42, 0.75)',
          height: '100%',
          overflow: 'hidden'
        }}>
          
          {/* Chat Messages Stream */}
          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {messages.length === 0 ? (
              <div style={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                textAlign: 'center',
                padding: '2rem',
                color: 'var(--text-muted)'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(99, 102, 241, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  color: 'var(--primary-light)'
                }}>
                  <Bot size={32} />
                </div>
                
                <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                  How can I help your career today?
                </h3>
                <p style={{ maxWidth: '450px', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Select a prompt below or type any question regarding career roadmaps, technical skills, resume ATS review, or mock interview preparation.
                </p>

                {/* Quick Prompts */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%', maxWidth: '650px' }}>
                  {quickPrompts.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.85rem 1rem',
                        textAlign: 'left',
                        color: 'var(--text-main)',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.background = 'rgba(99, 102, 241, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-glass)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      }}
                    >
                      <span>{q}</span>
                      <ArrowRight size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isUser = msg.senderRole === 'USER';
                return (
                  <div
                    key={msg.id || idx}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'flex-start',
                      flexDirection: isUser ? 'row-reverse' : 'row'
                    }}
                  >
                    {/* Avatar */}
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: isUser ? 'var(--accent-purple)' : 'linear-gradient(135deg, var(--primary) 0%, var(--accent-blue) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      flexShrink: 0,
                      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                    }}>
                      {isUser ? <User size={18} /> : <Bot size={18} />}
                    </div>

                    {/* Message Bubble */}
                    <div style={{
                      maxWidth: '80%',
                      background: isUser ? 'rgba(99, 102, 241, 0.25)' : 'rgba(30, 41, 59, 0.85)',
                      border: isUser ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-glass)',
                      borderRadius: '14px',
                      borderTopRightRadius: isUser ? '2px' : '14px',
                      borderTopLeftRadius: !isUser ? '2px' : '14px',
                      padding: '1rem 1.25rem',
                      position: 'relative'
                    }}>
                      
                      {/* Copy Action for Assistant */}
                      {!isUser && (
                        <button
                          onClick={() => copyToClipboard(msg.content, idx)}
                          title="Copy message"
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                        >
                          {copiedIndex === idx ? <CheckCircle2 size={14} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={14} />}
                        </button>
                      )}

                      {isUser ? (
                        <p style={{ margin: 0, color: '#fff', fontSize: '0.92rem', lineHeight: 1.5 }}>
                          {msg.content}
                        </p>
                      ) : (
                        <div style={{ fontSize: '0.92rem' }}>
                          {renderFormattedText(msg.content)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {/* Loading Indicator */}
            {loading && (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-blue) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0
                }}>
                  <Bot size={18} />
                </div>
                <div style={{
                  background: 'rgba(30, 41, 59, 0.85)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '14px',
                  padding: '0.75rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.88rem'
                }}>
                  <RefreshCw size={16} className="spin" style={{ color: 'var(--primary-light)' }} />
                  Analyzing context & generating response...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Input Form */}
          <div style={{
            padding: '1rem 1.5rem',
            background: 'rgba(11, 15, 25, 0.95)',
            borderTop: '1px solid var(--border-glass)'
          }}>
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}
            >
              <input
                type="text"
                placeholder={`Ask about ${mode.toLowerCase().replace('_', ' ')}...`}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                disabled={loading}
                className="input-field"
                style={{ flex: 1, padding: '0.85rem 1.1rem', fontSize: '0.92rem' }}
              />
              <button
                type="submit"
                disabled={loading || !promptInput.trim()}
                className="btn btn-primary"
                style={{ padding: '0.85rem 1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-md)' }}
              >
                <Send size={16} /> Send
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
