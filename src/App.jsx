import './App.css';
import { useState, useEffect } from 'react';

const offers = [
  {
    name: 'Free',
    price: 'Free',
    popular: false,
    isFree: true,
    features: [
      { text: 'Limited messages', icon: 'message' },
      { text: 'Limited uploads', icon: 'upload' },
      { text: 'Limited memory', icon: 'memory' },
    ],
  },
  {
    name: 'Starter',
    price: '79 pesos',
    popular: false,
    features: [
      { text: 'More messages', icon: 'message' },
      { text: 'More uploads', icon: 'upload' },
      { text: 'Higher daily download limit', icon: 'download' },
    ],
  },
  {
    name: 'Plus',
    price: '150 pesos',
    popular: false,
    features: [
      { text: 'Even more messages', icon: 'message' },
      { text: 'Even more uploads', icon: 'upload' },
      { text: 'Even higher daily download limit', icon: 'download' },
      { text: 'Expanded memory across conversations', icon: 'memory' },
      { text: 'Fast response', icon: 'spark' },
    ],
  },
  {
    name: 'Ultimate',
    price: '300 pesos',
    popular: true,
    features: [
      { text: 'Unlimited messages', icon: 'infinity' },
      { text: 'Unlimited uploads', icon: 'upload' },
      { text: 'Unlimited downloads', icon: 'download' },
      { text: 'Maximum memory and context', icon: 'memory' },
      { text: 'Early access to new features', icon: 'spark' },
      { text: 'Even faster response', icon: 'bolt' },
      { text: 'Maximum memory across conversations', icon: 'memory' },
    ],
  },
];

function FeatureIcon({ type }) {
  switch (type) {
    case 'message':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.5 5.5h15v9h-7l-4 3v-3h-4z" />
        </svg>
      );
    case 'upload':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 16V5" />
          <path d="M7.5 9.5 12 5l4.5 4.5" />
          <path d="M5 19h14" />
        </svg>
      );
    case 'download':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v11" />
          <path d="M7.5 11.5 12 16l4.5-4.5" />
          <path d="M5 19h14" />
        </svg>
      );
    case 'memory':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="7" y="7" width="10" height="10" rx="2.5" />
          <path d="M9 4.5v2" />
          <path d="M12 4.5v2" />
          <path d="M15 4.5v2" />
          <path d="M9 17.5v2" />
          <path d="M12 17.5v2" />
          <path d="M15 17.5v2" />
          <path d="M4.5 9h2" />
          <path d="M4.5 12h2" />
          <path d="M4.5 15h2" />
          <path d="M17.5 9h2" />
          <path d="M17.5 12h2" />
          <path d="M17.5 15h2" />
        </svg>
      );
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.5 13.8 8l4.5 1.8-4.5 1.7L12 16l-1.8-4.5-4.5-1.7L10.2 8z" />
        </svg>
      );
    case 'bolt':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.5 2.5 5.5 13h5l-1 8.5L18.5 11h-5z" />
        </svg>
      );
    case 'infinity':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 9.5c-2.2 0-4 1.5-4 3.5s1.8 3.5 4 3.5c3.5 0 4-7 8-7 2.2 0 4 1.5 4 3.5s-1.8 3.5-4 3.5c-4 0-4.5-7-8-7z" />
        </svg>
      );
    default:
      return null;
  }
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 9h15v3H4.5z" />
      <path d="M6 12v7.5h12V12" />
      <path d="M12 9v10.5" />
      <path d="M9.5 9c-1.7 0-3-1-3-2.4S7.1 4.5 8.6 4.5c2.1 0 3.4 3.2 3.4 4.5v0c0-1.3 1.3-4.5 3.4-4.5 1.5 0 2.1 1.1 2.1 2.1 0 1.4-1.3 2.4-3 2.4" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20c0-2.8 3.6-4 8-4s8 1.2 8 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [hasConversationStarted, setHasConversationStarted] = useState(false);
  const [activePage, setActivePage] = useState('chat');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [lastSentMessageId, setLastSentMessageId] = useState(null);

  // Detect system theme preference on mount and listen for changes
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener('change', handleChange);

    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);

  const handleSendMessage = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && currentMessage.trim()) {
      e.preventDefault();
      const newMessage = {
        id: Date.now(),
        text: currentMessage,
        timestamp: new Date(),
      };
      setConversations([...conversations, newMessage]);
      setLastSentMessageId(newMessage.id);
      setCurrentMessage('');
      setHasConversationStarted(true);
    }
  };

  const handleNewChat = () => {
    setConversations([]);
    setCurrentMessage('');
    setHasConversationStarted(false);
    setActivePage('chat');
  };

  const sendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        text: currentMessage,
        timestamp: new Date(),
      };
      setConversations([...conversations, newMessage]);
      setLastSentMessageId(newMessage.id);
      setCurrentMessage('');
      setHasConversationStarted(true);
    }
  };

  const handleMessageEdit = (messageId, nextText) => {
    setConversations((previousConversations) =>
      previousConversations.map((message) =>
        message.id === messageId ? { ...message, text: nextText } : message
      )
    );
  };

  const handleSidebarClick = () => {
    if (!isSidebarExpanded) {
      setIsSidebarExpanded(true);
    }
  };

  const handleSidebarKeyDown = (e) => {
    if (!isSidebarExpanded && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsSidebarExpanded(true);
    }
  };

  const openOffersPage = () => {
    setActivePage('offers');
  };

  const backToChat = () => {
    setActivePage('chat');
  };

  const renderChatPage = () => (
    <div className="chat-container">
      {/* Mobile Top Bar */}
      <div className="mobile-top-bar">
        <button
          type="button"
          className="mobile-sidebar-toggle"
          onClick={() => setIsSidebarExpanded(true)}
          aria-label="Open sidebar"
        >
          <BurgerIcon />
        </button>

        {hasConversationStarted && (
          <button
            type="button"
            className="gift-button-top mobile-offers-button"
            onClick={openOffersPage}
            aria-label="View offers"
          >
            <GiftIcon />
            <span>See Offers</span>
          </button>
        )}

        <button
          type="button"
          className="mobile-profile-button"
          aria-label="Profile"
        >
          <ProfileIcon />
        </button>
      </div>

      {/* Profile Button - Always Visible in Top Right */}
      <div className="profile-button-container">
        <button
          type="button"
          className="profile-button"
          aria-label="Profile"
        >
          <ProfileIcon />
        </button>
      </div>
      
      {/* See Offers Button - Centered when conversation started */}
      {hasConversationStarted && (
        <div className="top-gift-button-container">
          <button
            type="button"
            className="gift-button-top"
            onClick={openOffersPage}
            aria-label="View offers"
          >
            <GiftIcon />
            <span>See Offers</span>
          </button>
        </div>
      )}
      {hasConversationStarted ? (
        <>
          {/* Conversation View */}
          <div className="conversation">
            {conversations.map((msg) => (
              <div key={msg.id} className={`message-wrapper ${lastSentMessageId === msg.id ? 'sent-message' : ''}`}>
                <div
                  className="message-item user-message"
                  contentEditable={editingMessageId === msg.id}
                  suppressContentEditableWarning
                  spellCheck={false}
                  role={editingMessageId === msg.id ? "textbox" : "article"}
                  aria-label={editingMessageId === msg.id ? "Editing message" : "Message"}
                  onBlur={(e) => {
                    handleMessageEdit(msg.id, e.currentTarget.textContent || '');
                    setEditingMessageId(null);
                  }}
                  onKeyDown={(e) => {
                    if (editingMessageId === msg.id && e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleMessageEdit(msg.id, e.currentTarget.textContent || '');
                      setEditingMessageId(null);
                    }
                  }}
                >
                  {msg.text}
                </div>
                <div className="message-actions">
                  <button
                    type="button"
                    className="message-action-btn"
                    onClick={() => {
                      setEditingMessageId(msg.id);
                      setTimeout(() => {
                        const messageElement = document.querySelector(`[data-message-id="${msg.id}"]`);
                        if (messageElement) {
                          messageElement.focus();
                        }
                      }, 0);
                    }}
                    aria-label="Edit message"
                    data-tooltip="Edit"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 17.75L15.24 5.51c.39-.39 1.02-.39 1.41 0l2.83 2.83c.39.39.39 1.02 0 1.41L7.07 22H3v-4.25z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="message-action-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(msg.text);
                    }}
                    aria-label="Copy message"
                    data-tooltip="Copy"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="8" y="8" width="12" height="12" rx="1" />
                      <path d="M4 16V4c0-1 1-2 2-2h12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input at Bottom */}
          <div className="chat-input-section bottom">
            <div className="input-pill">
              <input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={handleSendMessage}
                placeholder="Message {awan pay nagan na}"
                className="chat-input single-line"
                aria-label="Chat input"
                autoComplete="off"
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
              />
              <button
                className="send-button"
                onClick={sendMessage}
                aria-label="Send"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 2L11 13" />
                  <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Welcome Message and Centered Input */}
          <div className="empty-chat">
            <div className="welcome-message">Let's Study?</div>
            <button
              type="button"
              className="offers-toggle"
              onClick={openOffersPage}
              aria-label="See offers"
            >
              <GiftIcon />
              <span>See Offers</span>
            </button>
            <div className="chat-input-section centered">
              <div className="input-pill">
                <input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={handleSendMessage}
                  placeholder="Message {awan pay nagan na}"
                  className="chat-input single-line"
                  aria-label="Chat input"
                  autoComplete="off"
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="off"
                />
                <button
                  className="send-button"
                  onClick={sendMessage}
                  aria-label="Send"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 2L11 13" />
                    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderOffersPage = () => (
    <div className="plans-page">
      <button type="button" className="close-button" onClick={backToChat} aria-label="Close plans">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 6 6 18" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
      <div className="plans-hero">
        <h1 className="plans-title">Upgrade your plan</h1>
      </div>

      <div className="offers-grid offers-grid-page">
        {offers.map((offer) => (
          <article
            key={offer.name}
            className={`offer-card ${offer.popular ? 'popular' : ''} ${offer.isFree ? 'free' : ''}`}
          >
            {offer.popular && <div className="offer-popular-badge">Popular</div>}
            <div className="offer-header">
              <div>
                <p className="offer-name">{offer.name}</p>
                <h3 className="offer-price">{offer.price}</h3>
              </div>
            </div>
            <ul className="offer-features">
              {offer.features.map((feature) => (
                <li key={feature.text} className="offer-feature">
                  <span className="offer-feature-icon" aria-hidden="true">
                    <FeatureIcon type={feature.icon} />
                  </span>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
            <button type="button" className="upgrade-button">
              {offer.isFree ? 'Current plan' : `Upgrade to ${offer.name}`}
            </button>
          </article>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'} ${activePage === 'offers' ? 'plans-view' : ''}`}>
      {/* Sidebar */}
      <aside
        className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}
        onClick={handleSidebarClick}
        onKeyDown={handleSidebarKeyDown}
        tabIndex={isSidebarExpanded ? -1 : 0}
        role={isSidebarExpanded ? undefined : 'button'}
        aria-label={isSidebarExpanded ? undefined : 'Open sidebar'}
      >
        {isSidebarExpanded && (
          <button
            className="sidebar-corner-toggle"
            onClick={() => setIsSidebarExpanded(false)}
            aria-label="Close sidebar"
            data-label="Close sidebar"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3.5" y="4.5" width="17" height="15" rx="3.5" />
              <path d="M10.5 4.5v15" />
            </svg>
          </button>
        )}

        <div className="sidebar-logo" aria-hidden="true" title="Awan pay nagan na">
          <img src="/AI_LOGO.png" alt="Logo" className="sidebar-logo-img" />
        </div>

        <div className="sidebar-buttons">
          {/* New Chat Button */}
          <button
            className="sidebar-button"
            aria-label="New Chat"
            data-label="New Chat"
            onClick={handleNewChat}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            {isSidebarExpanded && <span>New Chat</span>}
          </button>

          {/* Folder Button */}
          <button className="sidebar-button" aria-label="Folders" data-label="Folders">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
            </svg>
            {isSidebarExpanded && <span>Folders</span>}
          </button>

          {/* Search Button */}
          <button className="sidebar-button" aria-label="Search" data-label="Search">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            {isSidebarExpanded && <span>Search</span>}
          </button>

          {/* Recent Button */}
          <button className="sidebar-button" aria-label="Recent" data-label="Recent">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v4l3 2" />
            </svg>
            {isSidebarExpanded && <span>Recent</span>}
          </button>

        </div>

        {/* Theme Toggle at Bottom */}
        <div className="sidebar-bottom">
          <button
            className="theme-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setIsDarkMode(!isDarkMode);
            }}
            aria-label={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            data-label={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? (
              <svg className="theme-icon moon-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg className="theme-icon sun-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v3" />
                <path d="M12 19v3" />
                <path d="M4.93 4.93l2.12 2.12" />
                <path d="M16.95 16.95l2.12 2.12" />
                <path d="M2 12h3" />
                <path d="M19 12h3" />
                <path d="M4.93 19.07l2.12-2.12" />
                <path d="M16.95 7.05l2.12-2.12" />
              </svg>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activePage === 'offers' ? renderOffersPage() : renderChatPage()}

        {/* Footer */}
        <footer className="app-footer">
          <p>Frontend example hehe pero maganda yata yung may dashboard din</p>
        </footer>
      </main>
    </div>
  );
}
