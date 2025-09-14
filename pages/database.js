// pages/database.js
import { useEffect, useRef } from 'react';
import Head from 'next/head';

export default function DatabaseERD() {
  const diagramRef = useRef(null);
  const currentZoom = useRef(1);
  const isFullscreen = useRef(false);

  const erdDefinition = `
erDiagram
    users {
        bigint id PK
        varchar username UK
        varchar email UK
        varchar password_hash
        varchar full_name
        varchar avatar_url
        boolean is_online
        timestamp last_seen
        timestamp created_at
        timestamp updated_at
    }
    
    chat_rooms {
        bigint id PK
        varchar name
        varchar description
        enum type "single,group"
        varchar avatar_url
        bigint created_by FK
        timestamp created_at
        timestamp updated_at
    }
    
    chat_room_members {
        bigint id PK
        bigint chat_room_id FK
        bigint user_id FK
        enum role "admin,member"
        timestamp joined_at
        timestamp last_read_at
    }
    
    messages {
        bigint id PK
        bigint chat_room_id FK
        bigint sender_id FK
        text content
        enum message_type "text,image,video,pdf,file"
        json metadata
        bigint reply_to_message_id FK
        boolean is_edited
        boolean is_deleted
        timestamp created_at
        timestamp updated_at
    }
    
    message_attachments {
        bigint id PK
        bigint message_id FK
        varchar file_name
        varchar file_url
        varchar file_type
        bigint file_size
        json thumbnail_data
        timestamp created_at
    }
    
    message_reactions {
        bigint id PK
        bigint message_id FK
        bigint user_id FK
        varchar emoji
        timestamp created_at
    }
    
    message_read_receipts {
        bigint id PK
        bigint message_id FK
        bigint user_id FK
        timestamp read_at
    }
    
    users ||--o{ chat_rooms : creates
    users ||--o{ chat_room_members : belongs_to
    chat_rooms ||--o{ chat_room_members : has
    chat_rooms ||--o{ messages : contains
    users ||--o{ messages : sends
    messages ||--o{ message_attachments : has
    messages ||--o{ message_reactions : receives
    messages ||--o{ message_read_receipts : tracks
    users ||--o{ message_reactions : gives
    users ||--o{ message_read_receipts : reads
    messages ||--o{ messages : replies_to
  `;

  useEffect(() => {
    // Load Mermaid dynamically
    const loadMermaid = async () => {
      if (typeof window !== 'undefined') {
        const mermaid = (await import('mermaid')).default;
        
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          themeVariables: {
            primaryColor: '#667eea',
            primaryTextColor: '#2c3e50',
            primaryBorderColor: '#764ba2',
            lineColor: '#34495e',
            secondaryColor: '#f093fb',
            tertiaryColor: '#f8f9fa',
            background: '#ffffff',
            mainBkg: '#ffffff',
            secondBkg: '#f8f9fa',
            tertiaryBkg: '#e9ecef',
            entityBkg: '#ffffff',
            attributeBkg: '#f8f9fa',
            relationshipColor: '#667eea'
          },
          er: {
            diagramPadding: 20,
            layoutDirection: 'TB',
            minEntityWidth: 100,
            minEntityHeight: 75,
            entityPadding: 15,
            stroke: '#333333',
            fill: '#ffffff',
            fontSize: 12
          },
          securityLevel: 'loose'
        });

        try {
          const { svg } = await mermaid.render('erd-diagram', erdDefinition);
          if (diagramRef.current) {
            diagramRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Error generating diagram:', error);
          if (diagramRef.current) {
            diagramRef.current.innerHTML = `
              <div style="color: red; text-align: center; padding: 50px; border: 2px dashed #dc3545; border-radius: 8px;">
                <h3>⚠️ Error generating ERD</h3>
                <p>${error.message}</p>
              </div>
            `;
          }
        }
      }
    };

    loadMermaid();
  }, []);

  const exportDiagram = () => {
    const svg = diagramRef.current?.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'chat-database-erd.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    }
  };

  const zoomIn = () => {
    currentZoom.current = Math.min(currentZoom.current * 1.2, 3);
    applyZoom();
  };

  const zoomOut = () => {
    currentZoom.current = Math.max(currentZoom.current / 1.2, 0.3);
    applyZoom();
  };

  const resetZoom = () => {
    currentZoom.current = 1;
    applyZoom();
  };

  const applyZoom = () => {
    const svg = diagramRef.current?.querySelector('svg');
    if (svg) {
      svg.style.transform = `scale(${currentZoom.current})`;
      svg.style.transformOrigin = 'center top';
      svg.style.transition = 'transform 0.3s ease';
    }
  };

  return (
    <>
      <Head>
        <title>Chat Application Database ERD</title>
        <meta name="description" content="Entity Relationship Diagram untuk sistem chat real-time" />
      </Head>

      <div style={{
        fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        minHeight: '100vh',
        color: '#333',
        margin: 0,
        padding: 0
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '20px'
        }}>
          {/* Header */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
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
              🗄️ Chat Application Database ERD
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              marginBottom: '25px',
              lineHeight: '1.6'
            }}>
              Entity Relationship Diagram untuk sistem chat real-time dengan fitur lengkap
            </p>
            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {['PostgreSQL', '8 Tables', 'Real-time Chat', 'File Attachments', 'Message Reactions'].map((badge, index) => (
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

          {/* Diagram */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
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
            
            <div 
              ref={diagramRef}
              style={{
                background: 'white',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                minHeight: '400px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              Loading diagram...
            </div>
          </div>

          {/* Controls */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
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
                onClick={exportDiagram}
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
                📥 Export SVG
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
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                🔍+ Zoom In
              </button>
              <button onClick={resetZoom} style={{
                background: 'rgba(248, 249, 250, 0.9)',
                color: '#495057',
                border: '2px solid rgba(222, 226, 230, 0.8)',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                ↺ Reset
              </button>
              <button onClick={zoomOut} style={{
                background: 'rgba(248, 249, 250, 0.9)',
                color: '#495057',
                border: '2px solid rgba(222, 226, 230, 0.8)',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                🔍- Zoom Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}