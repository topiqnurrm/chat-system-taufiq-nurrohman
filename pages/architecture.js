import { useState } from 'react';

export default function ChatArchitecture() {
  const [currentZoom, setCurrentZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const architectureDefinition = `graph TB
    subgraph "Client Layer"
        WebApp[Web Application]
        MobileApp[Mobile Application]
    end
    
    subgraph "API Gateway"
        Gateway[API Gateway<br/>Authentication & Rate Limiting]
    end
    
    subgraph "Application Layer"
        ChatService[Chat Service]
        UserService[User Management Service]
        MediaService[Media Upload Service]
        NotificationService[Notification Service]
    end
    
    subgraph "Real-time Communication"
        WebSocket[WebSocket Server<br/>Socket.IO]
        MessageQueue[Message Queue<br/>Redis/RabbitMQ]
    end
    
    subgraph "Storage Layer"
        Database[(PostgreSQL<br/>User & Chat Data)]
        FileStorage[(File Storage<br/>AWS S3/MinIO<br/>Images, Videos, PDFs)]
        Cache[(Redis Cache<br/>Active Sessions)]
    end
    
    subgraph "External Services"
        FCM[Firebase Cloud Messaging<br/>Push Notifications]
        CDN[CDN<br/>Media Delivery]
    end
    
    WebApp --> Gateway
    MobileApp --> Gateway
    Gateway --> ChatService
    Gateway --> UserService
    Gateway --> MediaService
    
    ChatService --> WebSocket
    ChatService --> Database
    ChatService --> Cache
    ChatService --> MessageQueue
    
    UserService --> Database
    UserService --> Cache
    
    MediaService --> FileStorage
    MediaService --> CDN
    
    WebSocket --> MessageQueue
    MessageQueue --> NotificationService
    NotificationService --> FCM
    
    WebSocket -.-> WebApp
    WebSocket -.-> MobileApp`;

  const copyDefinition = async () => {
    try {
      await navigator.clipboard.writeText(architectureDefinition.trim());
      alert('Architecture definition copied to clipboard!');
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const zoomIn = () => {
    setCurrentZoom(Math.min(currentZoom * 1.2, 3));
  };

  const zoomOut = () => {
    setCurrentZoom(Math.max(currentZoom / 1.2, 0.3));
  };

  const resetZoom = () => {
    setCurrentZoom(1);
  };

  const containerStyle = {
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    color: '#333',
    margin: 0,
    padding: isFullscreen ? 0 : '20px',
    position: isFullscreen ? 'fixed' : 'static',
    top: isFullscreen ? 0 : 'auto',
    left: isFullscreen ? 0 : 'auto',
    width: isFullscreen ? '100vw' : 'auto',
    height: isFullscreen ? '100vh' : 'auto',
    zIndex: isFullscreen ? 9999 : 'auto',
    overflow: isFullscreen ? 'auto' : 'visible'
  };

  const contentStyle = {
    maxWidth: isFullscreen ? 'none' : '1200px',
    margin: '0 auto',
    padding: isFullscreen ? '20px' : '0'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: isFullscreen ? '0' : '20px',
          padding: '40px',
          marginBottom: '30px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '15px'
          }}>
            🏗️ Chat Application Architecture
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '25px',
            lineHeight: '1.6'
          }}>
            Real-time messaging system architecture diagram
          </p>
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {['Microservices', 'Real-time', 'WebSocket', 'Cloud Storage', 'Scalable'].map((badge, index) => (
              <span key={index} style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '500',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}>
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Diagram Container */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: isFullscreen ? '0' : '20px',
          padding: '40px',
          marginBottom: '30px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          }} />

          {/* Diagram SVG - Manual Implementation */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            minHeight: '600px',
            transform: `scale(${currentZoom})`,
            transformOrigin: 'center top',
            transition: 'transform 0.3s ease'
          }}>
            <svg width="100%" height="600" viewBox="0 0 1000 600" style={{ overflow: 'visible' }}>
              {/* Client Layer */}
              <g>
                <rect x="50" y="50" width="200" height="80" rx="10" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2"/>
                <text x="150" y="75" textAnchor="middle" fontSize="14" fontWeight="bold">Client Layer</text>
                <rect x="70" y="85" width="70" height="30" rx="5" fill="#bbdefb" stroke="#1976d2"/>
                <text x="105" y="103" textAnchor="middle" fontSize="10">Web App</text>
                <rect x="160" y="85" width="70" height="30" rx="5" fill="#bbdefb" stroke="#1976d2"/>
                <text x="195" y="103" textAnchor="middle" fontSize="10">Mobile App</text>
              </g>

              {/* API Gateway */}
              <g>
                <rect x="400" y="50" width="200" height="80" rx="10" fill="#f3e5f5" stroke="#9c27b0" strokeWidth="2"/>
                <text x="500" y="75" textAnchor="middle" fontSize="14" fontWeight="bold">API Gateway</text>
                <rect x="420" y="85" width="160" height="30" rx="5" fill="#e1bee7" stroke="#7b1fa2"/>
                <text x="500" y="103" textAnchor="middle" fontSize="10">Auth & Rate Limiting</text>
              </g>

              {/* Application Layer */}
              <g>
                <rect x="50" y="200" width="300" height="120" rx="10" fill="#e8f5e8" stroke="#4caf50" strokeWidth="2"/>
                <text x="200" y="225" textAnchor="middle" fontSize="14" fontWeight="bold">Application Layer</text>
                <rect x="70" y="240" width="60" height="30" rx="5" fill="#c8e6c9" stroke="#388e3c"/>
                <text x="100" y="258" textAnchor="middle" fontSize="9">Chat Service</text>
                <rect x="140" y="240" width="60" height="30" rx="5" fill="#c8e6c9" stroke="#388e3c"/>
                <text x="170" y="258" textAnchor="middle" fontSize="9">User Service</text>
                <rect x="210" y="240" width="60" height="30" rx="5" fill="#c8e6c9" stroke="#388e3c"/>
                <text x="240" y="258" textAnchor="middle" fontSize="9">Media Service</text>
                <rect x="280" y="240" width="60" height="30" rx="5" fill="#c8e6c9" stroke="#388e3c"/>
                <text x="310" y="258" textAnchor="middle" fontSize="9">Notification</text>
              </g>

              {/* Real-time Communication */}
              <g>
                <rect x="450" y="200" width="200" height="120" rx="10" fill="#fff3e0" stroke="#ff9800" strokeWidth="2"/>
                <text x="550" y="225" textAnchor="middle" fontSize="14" fontWeight="bold">Real-time Layer</text>
                <rect x="470" y="240" width="80" height="30" rx="5" fill="#ffcc02" stroke="#f57c00"/>
                <text x="510" y="258" textAnchor="middle" fontSize="9">WebSocket</text>
                <rect x="560" y="240" width="80" height="30" rx="5" fill="#ffcc02" stroke="#f57c00"/>
                <text x="600" y="258" textAnchor="middle" fontSize="9">Message Queue</text>
              </g>

              {/* Storage Layer */}
              <g>
                <rect x="50" y="400" width="400" height="120" rx="10" fill="#fce4ec" stroke="#e91e63" strokeWidth="2"/>
                <text x="250" y="425" textAnchor="middle" fontSize="14" fontWeight="bold">Storage Layer</text>
                <ellipse cx="120" cy="470" rx="50" ry="25" fill="#f8bbd9" stroke="#c2185b"/>
                <text x="120" y="475" textAnchor="middle" fontSize="9">PostgreSQL</text>
                <ellipse cx="250" cy="470" rx="50" ry="25" fill="#f8bbd9" stroke="#c2185b"/>
                <text x="250" y="475" textAnchor="middle" fontSize="9">File Storage</text>
                <ellipse cx="380" cy="470" rx="50" ry="25" fill="#f8bbd9" stroke="#c2185b"/>
                <text x="380" y="475" textAnchor="middle" fontSize="9">Redis Cache</text>
              </g>

              {/* External Services */}
              <g>
                <rect x="750" y="200" width="200" height="120" rx="10" fill="#e0f2f1" stroke="#009688" strokeWidth="2"/>
                <text x="850" y="225" textAnchor="middle" fontSize="14" fontWeight="bold">External Services</text>
                <rect x="770" y="240" width="80" height="30" rx="5" fill="#b2dfdb" stroke="#00695c"/>
                <text x="810" y="258" textAnchor="middle" fontSize="9">FCM Push</text>
                <rect x="860" y="240" width="80" height="30" rx="5" fill="#b2dfdb" stroke="#00695c"/>
                <text x="900" y="258" textAnchor="middle" fontSize="9">CDN</text>
              </g>

              {/* Arrows */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
                </marker>
              </defs>

              {/* Client to Gateway */}
              <line x1="250" y1="90" x2="400" y2="90" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
              
              {/* Gateway to Services */}
              <line x1="450" y1="130" x2="200" y2="200" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
              <line x1="500" y1="130" x2="510" y2="200" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
              
              {/* Services to Storage */}
              <line x1="200" y1="320" x2="250" y2="400" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
              
              {/* Real-time to External */}
              <line x1="650" y1="260" x2="750" y2="260" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

              {/* WebSocket back to clients (dashed) */}
              <line x1="510" y1="240" x2="150" y2="130" stroke="#666" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
            </svg>
          </div>
        </div>

        {/* Controls */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: isFullscreen ? '0' : '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '20px'
          }}>
            <button 
              onClick={toggleFullscreen}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)'
              }}
            >
              🔍 {isFullscreen ? 'Exit' : 'Fullscreen'}
            </button>
            

          </div>
          
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button onClick={zoomIn} style={{
              background: 'rgba(248, 249, 250, 0.9)',
              color: '#495057',
              border: '2px solid rgba(222, 226, 230, 0.8)',
              padding: '10px 20px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}>
              🔍+ Zoom In
            </button>
            <button onClick={resetZoom} style={{
              background: 'rgba(248, 249, 250, 0.9)',
              color: '#495057',
              border: '2px solid rgba(222, 226, 230, 0.8)',
              padding: '10px 20px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}>
              ↺ Reset Zoom
            </button>
            <button onClick={zoomOut} style={{
              background: 'rgba(248, 249, 250, 0.9)',
              color: '#495057',
              border: '2px solid rgba(222, 226, 230, 0.8)',
              padding: '10px 20px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}>
              🔍- Zoom Out
            </button>
          </div>
        </div>

        {/* Info Panel */}
        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: isFullscreen ? '0' : '20px',
          padding: '40px',
          color: 'white',
          boxShadow: '0 20px 40px rgba(240, 147, 251, 0.3)'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            🏗️ Architecture Overview
          </h3>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.7',
            marginBottom: '30px',
            textAlign: 'center',
            opacity: 0.95
          }}>
            Scalable real-time chat application architecture dengan microservices pattern, 
            WebSocket untuk real-time communication, dan cloud storage untuk media handling.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}>
            {[
              { title: '👥 Client Layer', desc: 'Web dan Mobile applications dengan real-time WebSocket connections' },
              { title: '🚪 API Gateway', desc: 'Authentication, rate limiting, dan routing ke microservices' },
              { title: '⚙️ Application Layer', desc: 'Microservices untuk Chat, User, Media, dan Notification services' },
              { title: '🔄 Real-time Layer', desc: 'WebSocket servers dan Message Queue untuk real-time messaging' },
              { title: '💾 Storage Layer', desc: 'PostgreSQL, Redis cache, dan cloud file storage' },
              { title: '🌐 External Services', desc: 'Push notifications dan CDN untuk media delivery' }
            ].map((item, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                padding: '25px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'transform 0.3s ease'
              }}>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '10px',
                  color: '#fff'
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: '0.95rem',
                  opacity: 0.9,
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}