import { useState, useEffect, useRef } from 'react'

export default function MultimediaChat() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({ url: '', type: '' })
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  
  const currentUserId = "customer@mail.com"
  let messageCounter = 885523

  // Extended data with multimedia messages
  const multimediaData = {
    "results": [
      {
        "room": {
          "name": "Product A",
          "id": 12456,
          "image_url": "https://picsum.photos/id/237/200/300",
          "participant": [
            { "id": "admin@mail.com", "name": "Admin", "role": 0 },
            { "id": "agent@mail.com", "name": "Agent A", "role": 1 },
            { "id": "customer@mail.com", "name": "King Customer", "role": 2 }
          ]
        },
        "comments": [
          {
            "id": 885512,
            "type": "text",
            "message": "Selamat malam",
            "sender": "customer@mail.com",
            "timestamp": "2024-01-15T21:30:00Z",
            "status": "read"
          },
          {
            "id": 885513,
            "type": "text", 
            "message": "Malam, ada yang bisa saya bantu?",
            "sender": "agent@mail.com",
            "timestamp": "2024-01-15T21:31:00Z",
            "reply_to": 885512,
            "status": "read"
          },
          {
            "id": 885514,
            "type": "text",
            "message": "Saya ingin mengirimkan bukti pembayaran, karena di aplikasi selalu gagal upload",
            "sender": "customer@mail.com",
            "timestamp": "2024-01-15T21:32:00Z",
            "status": "read"
          },
          {
            "id": 885515,
            "type": "text",
            "message": "Baik, silahkan kirimkan lampiran bukti pembayarannya di sini",
            "sender": "agent@mail.com",
            "timestamp": "2024-01-15T21:33:00Z",
            "status": "read"
          },
          {
            "id": 885516,
            "type": "image",
            "message": "Ini bukti pembayarannya kak",
            "sender": "customer@mail.com",
            "timestamp": "2024-01-15T21:35:00Z",
            "attachment_url": "https://via.placeholder.com/400x600/4CAF50/ffffff?text=Payment+Receipt",
            "status": "delivered"
          },
          {
            "id": 885517,
            "type": "text",
            "message": "Terima kasih, saya akan proses segera. Berikut tutorial untuk ke depannya:",
            "sender": "agent@mail.com",
            "timestamp": "2024-01-15T21:36:00Z",
            "reply_to": 885516,
            "status": "delivered"
          },
          {
            "id": 885518,
            "type": "video",
            "message": "Video tutorial upload bukti pembayaran",
            "sender": "agent@mail.com",
            "timestamp": "2024-01-15T21:37:00Z",
            "attachment_url": "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
            "status": "sent"
          },
          {
            "id": 885519,
            "type": "pdf",
            "message": "Panduan lengkap pembayaran",
            "sender": "agent@mail.com",
            "timestamp": "2024-01-15T21:38:00Z",
            "attachment_url": "#",
            "status": "sent"
          },
          {
            "id": 885520,
            "type": "file",
            "message": "Template Excel untuk rekap pembayaran",
            "sender": "agent@mail.com",
            "timestamp": "2024-01-15T21:40:00Z",
            "attachment_url": "#",
            "status": "sent"
          }
        ]
      },
      {
        "room": {
          "name": "Product B Support",
          "id": 12457,
          "image_url": "https://picsum.photos/id/123/200/300",
          "participant": [
            { "id": "admin@mail.com", "name": "Admin", "role": 0 },
            { "id": "support@mail.com", "name": "Tech Support", "role": 1 },
            { "id": "customer@mail.com", "name": "King Customer", "role": 2 }
          ]
        },
        "comments": [
          {
            "id": 885521,
            "type": "text",
            "message": "Halo, saya mengalami kendala dengan fitur login",
            "sender": "customer@mail.com",
            "timestamp": "2024-01-15T10:30:00Z",
            "status": "read"
          },
          {
            "id": 885522,
            "type": "text",
            "message": "Bisa dijelaskan lebih detail kendalanya seperti apa?",
            "sender": "support@mail.com",
            "timestamp": "2024-01-15T10:32:00Z",
            "reply_to": 885521,
            "status": "read"
          },
          {
            "id": 885523,
            "type": "image",
            "message": "Ini screenshot errornya",
            "sender": "customer@mail.com",
            "timestamp": "2024-01-15T10:35:00Z",
            "attachment_url": "https://via.placeholder.com/800x600/ff4757/ffffff?text=Error+Screenshot",
            "status": "delivered"
          },
          {
            "id": 885524,
            "type": "text",
            "message": "Terima kasih, saya akan cek ke sistem dulu. Ini panduan troubleshooting sementara:",
            "sender": "support@mail.com",
            "timestamp": "2024-01-15T10:37:00Z",
            "reply_to": 885523,
            "status": "delivered"
          },
          {
            "id": 885525,
            "type": "pdf",
            "message": "Panduan troubleshooting login issues",
            "sender": "support@mail.com",
            "timestamp": "2024-01-15T10:38:00Z",
            "attachment_url": "#",
            "status": "sent"
          }
        ]
      }
    ]
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setMessages(multimediaData.results[currentRoomIndex].comments)
  }, [currentRoomIndex])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      id: ++messageCounter,
      type: "text",
      message: inputMessage.trim(),
      sender: currentUserId,
      timestamp: new Date().toISOString(),
      status: "sent"
    }

    const updatedData = { ...multimediaData }
    updatedData.results[currentRoomIndex].comments.push(newMessage)
    setMessages([...updatedData.results[currentRoomIndex].comments])
    setInputMessage('')

    // Simulate status updates and responses
    setTimeout(() => {
      newMessage.status = "delivered"
      setMessages([...updatedData.results[currentRoomIndex].comments])
      simulateResponse(updatedData)
    }, 1000)
  }

  const simulateResponse = (data) => {
    setIsTyping(true)
    
    setTimeout(() => {
      setIsTyping(false)
      const responses = [
        "Terima kasih atas informasinya.",
        "Saya akan membantu Anda dengan ini.",
        "Baik, saya mengerti maksudnya.",
        "Ada yang lain yang bisa saya bantu?",
        "Silahkan tunggu sebentar ya."
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      const agentId = currentRoomIndex === 0 ? "agent@mail.com" : "support@mail.com"
      
      const agentResponse = {
        id: ++messageCounter,
        type: "text",
        message: randomResponse,
        sender: agentId,
        timestamp: new Date().toISOString(),
        status: "delivered"
      }

      data.results[currentRoomIndex].comments.push(agentResponse)
      setMessages([...data.results[currentRoomIndex].comments])
    }, 2000 + Math.random() * 2000)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const fileType = getFileType(file.type)
    let attachmentUrl

    switch (fileType) {
      case 'image':
        attachmentUrl = URL.createObjectURL(file)
        break
      case 'video':
        attachmentUrl = 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4'
        break
      default:
        attachmentUrl = '#'
    }

    const newMessage = {
      id: ++messageCounter,
      type: fileType,
      message: `Shared ${file.name}`,
      sender: currentUserId,
      timestamp: new Date().toISOString(),
      attachment_url: attachmentUrl,
      status: "sent"
    }

    const updatedData = { ...multimediaData }
    updatedData.results[currentRoomIndex].comments.push(newMessage)
    setMessages([...updatedData.results[currentRoomIndex].comments])

    setTimeout(() => {
      newMessage.status = "delivered"
      setMessages([...updatedData.results[currentRoomIndex].comments])
      simulateResponse(updatedData)
    }, 1000)
  }

  const getFileType = (mimeType) => {
    if (mimeType.startsWith('image/')) return 'image'
    if (mimeType.startsWith('video/')) return 'video'
    if (mimeType === 'application/pdf') return 'pdf'
    return 'file'
  }

  const openModal = (url, type) => {
    setModalContent({ url, type })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalContent({ url: '', type: '' })
  }

  const downloadFile = (url, filename) => {
    if (url === '#') {
      alert(`File download simulated: ${filename}`)
      return
    }
    
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const switchRoom = (roomIndex) => {
    setCurrentRoomIndex(roomIndex)
  }

  const getRoleClass = (role) => {
    switch (role) {
      case 0: return 'admin'
      case 1: return 'agent'
      case 2: return 'customer'
      default: return 'customer'
    }
  }

  const getRoleText = (role) => {
    switch (role) {
      case 0: return 'Admin'
      case 1: return 'Agent'
      case 2: return 'Customer'
      default: return 'User'
    }
  }

  const getAvatarText = (name) => {
    return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()
  }

  const createAttachmentElement = (comment) => {
    switch (comment.type) {
      case 'image':
        return (
          <div className="image-attachment" onClick={() => openModal(comment.attachment_url, 'image')}>
            <img src={comment.attachment_url} alt="Image attachment" loading="lazy" />
            <style jsx>{`
              .image-attachment {
                position: relative;
                border-radius: 12px;
                overflow: hidden;
                cursor: pointer;
                transition: all 0.3s ease;
                max-width: 280px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                margin-top: 8px;
              }
              .image-attachment:hover {
                transform: scale(1.02);
                box-shadow: 0 8px 20px rgba(0,0,0,0.2);
              }
              .image-attachment img {
                width: 100%;
                height: auto;
                display: block;
                max-height: 200px;
                object-fit: cover;
              }
            `}</style>
          </div>
        )
      case 'video':
        return (
          <div className="video-attachment" onClick={() => openModal(comment.attachment_url, 'video')}>
            <video>
              <source src={comment.attachment_url} type="video/mp4" />
            </video>
            <div className="video-overlay">▶</div>
            <style jsx>{`
              .video-attachment {
                position: relative;
                border-radius: 12px;
                overflow: hidden;
                max-width: 320px;
                background: #000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                margin-top: 8px;
                cursor: pointer;
              }
              .video-attachment video {
                width: 100%;
                height: auto;
                max-height: 250px;
                display: block;
              }
              .video-overlay {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,0,0,0.7);
                color: white;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                transition: all 0.3s ease;
              }
              .video-overlay:hover {
                background: rgba(0,0,0,0.9);
                transform: translate(-50%, -50%) scale(1.1);
              }
            `}</style>
          </div>
        )
      case 'pdf':
      case 'file':
        return (
          <div className="file-attachment" onClick={() => downloadFile(comment.attachment_url, 'document.pdf')}>
            <div className={`file-icon ${comment.type}`}>
              {comment.type === 'pdf' ? '📄' : '📎'}
            </div>
            <div className="file-info">
              <div className="file-name">
                {comment.type === 'pdf' ? 'PDF Document' : 'File Attachment'}
              </div>
              <div className="file-size">Click to download</div>
            </div>
            <div className="download-icon">⬇</div>
            <style jsx>{`
              .file-attachment {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                background: rgba(0,0,0,0.05);
                border-radius: 12px;
                margin-top: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                max-width: 280px;
                border: 1px solid rgba(0,0,0,0.1);
              }
              .file-attachment:hover {
                background: rgba(0,0,0,0.1);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              }
              .file-icon {
                width: 40px;
                height: 40px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                color: white;
                flex-shrink: 0;
              }
              .file-icon.pdf {
                background: linear-gradient(135deg, #ff4757, #ff3742);
              }
              .file-icon.file {
                background: linear-gradient(135deg, #5352ed, #3742fa);
              }
              .file-info {
                flex: 1;
              }
              .file-name {
                font-weight: 600;
                font-size: 13px;
                margin-bottom: 2px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .file-size {
                font-size: 11px;
                opacity: 0.7;
              }
              .download-icon {
                color: #2b5ce6;
                font-size: 18px;
                transition: transform 0.2s ease;
              }
              .file-attachment:hover .download-icon {
                transform: translateY(-2px);
              }
            `}</style>
          </div>
        )
      default:
        return null
    }
  }

  const renderMessage = (comment, participants) => {
    const isOwn = comment.sender === currentUserId
    const sender = participants.find(p => p.id === comment.sender)
    const senderName = sender ? sender.name : comment.sender.split('@')[0]
    const senderRole = sender ? sender.role : 2
    const avatarText = getAvatarText(senderName)
    const timestamp = new Date(comment.timestamp || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

    let replyHtml = null
    if (comment.reply_to) {
      const originalMessage = multimediaData.results[currentRoomIndex].comments.find(c => c.id === comment.reply_to)
      if (originalMessage) {
        replyHtml = (
          <div className="reply-indicator">
            ↳ Replying to: {originalMessage.message ? originalMessage.message.substring(0, 30) + '...' : 'attachment'}
            <style jsx>{`
              .reply-indicator {
                background: rgba(43, 92, 230, 0.1);
                border-left: 3px solid #2b5ce6;
                padding: 6px 10px;
                margin-bottom: 8px;
                border-radius: 0 6px 6px 0;
                font-size: 12px;
                opacity: 0.8;
              }
            `}</style>
          </div>
        )
      }
    }

    let statusHtml = null
    if (isOwn) {
      const statusIcon = comment.status === 'sent' ? '✓' : 
                       comment.status === 'delivered' ? '✓✓' : 
                       comment.status === 'read' ? '✓✓' : '○'
      const statusClass = `status-${comment.status}`
      statusHtml = (
        <div className="message-status">
          <span className={`status-icon ${statusClass}`}>{statusIcon}</span>
          <style jsx>{`
            .message-status {
              display: flex;
              align-items: center;
              gap: 4px;
              margin-top: 4px;
              justify-content: flex-end;
              font-size: 11px;
              color: #8e8e93;
            }
            .status-sent { color: #8e8e93; }
            .status-delivered { color: #4CAF50; }
            .status-read { color: #2b5ce6; }
          `}</style>
        </div>
      )
    }

    return (
      <div key={comment.id} className={`message ${isOwn ? 'own' : ''}`}>
        <div className={`message-avatar ${getRoleClass(senderRole)}`}>
          {avatarText}
        </div>
        <div className="message-content">
          {!isOwn && (
            <div className="message-header">
              <span className="message-sender">{senderName}</span>
              <span className={`sender-role ${getRoleClass(senderRole)}`}>
                {getRoleText(senderRole)}
              </span>
              <span className="message-time">{timestamp}</span>
            </div>
          )}
          {isOwn && (
            <div className="message-header">
              <span className="message-time">{timestamp}</span>
            </div>
          )}
          {replyHtml}
          {comment.message && <div className="message-text">{comment.message}</div>}
          {comment.type !== 'text' && createAttachmentElement(comment)}
          <div className="message-id">ID: {comment.id}</div>
          {statusHtml}
        </div>
        <style jsx>{`
          .message {
            margin-bottom: 16px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            opacity: 0;
            animation: slideIn 0.3s ease forwards;
          }
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .message.own {
            flex-direction: row-reverse;
          }
          .message-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            font-weight: bold;
            flex-shrink: 0;
          }
          .message-avatar.admin { background: linear-gradient(135deg, #ff6b6b, #ff5252); }
          .message-avatar.agent { background: linear-gradient(135deg, #4CAF50, #43A047); }
          .message-avatar.customer { background: linear-gradient(135deg, #2b5ce6, #1e4bd1); }
          .message-content {
            max-width: 70%;
            background: white;
            border-radius: 18px;
            padding: 12px 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            position: relative;
            border: 1px solid rgba(0,0,0,0.05);
          }
          .message.own .message-content {
            background: linear-gradient(135deg, #2b5ce6, #1e4bd1);
            color: white;
          }
          .message-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 4px;
            flex-wrap: wrap;
          }
          .message-sender {
            font-weight: 600;
            font-size: 13px;
          }
          .message.own .message-sender {
            color: rgba(255,255,255,0.9);
          }
          .sender-role {
            font-size: 9px;
            padding: 1px 4px;
            border-radius: 6px;
            color: white;
          }
          .sender-role.admin { background: linear-gradient(135deg, #ff6b6b, #ff5252); }
          .sender-role.agent { background: linear-gradient(135deg, #4CAF50, #43A047); }
          .sender-role.customer { background: linear-gradient(135deg, #2b5ce6, #1e4bd1); }
          .message-time {
            font-size: 11px;
            color: #8e8e93;
            margin-left: auto;
          }
          .message.own .message-time {
            color: rgba(255,255,255,0.7);
          }
          .message-text {
            font-size: 14px;
            line-height: 1.4;
            word-wrap: break-word;
          }
          .message-id {
            font-size: 10px;
            color: #aaa;
            margin-top: 4px;
            font-family: monospace;
          }
          .message.own .message-id {
            color: rgba(255,255,255,0.5);
          }
        `}</style>
      </div>
    )
  }

  return (
    <>
      {/* Modal for media preview */}
      {showModal && (
        <div className="modal" onClick={closeModal}>
          <span className="modal-close" onClick={closeModal}>&times;</span>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {modalContent.type === 'image' && (
              <img src={modalContent.url} alt="Full size image" />
            )}
            {modalContent.type === 'video' && (
              <video controls autoPlay>
                <source src={modalContent.url} type="video/mp4" />
              </video>
            )}
          </div>
          <style jsx>{`
            .modal {
              display: flex;
              position: fixed;
              z-index: 1000;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0,0,0,0.9);
              backdrop-filter: blur(5px);
              align-items: center;
              justify-content: center;
              animation: fadeIn 0.3s ease;
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .modal-content {
              max-width: 90%;
              max-height: 90%;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 20px 40px rgba(0,0,0,0.3);
              animation: scaleIn 0.3s ease;
            }
            @keyframes scaleIn {
              from { transform: scale(0.8); }
              to { transform: scale(1); }
            }
            .modal-content img,
            .modal-content video {
              width: 100%;
              height: auto;
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
            }
            .modal-close {
              position: absolute;
              top: 20px;
              right: 30px;
              color: white;
              font-size: 40px;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.2s ease;
              background: rgba(0,0,0,0.5);
              width: 50px;
              height: 50px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .modal-close:hover {
              background: rgba(0,0,0,0.8);
              transform: scale(1.1);
            }
          `}</style>
        </div>
      )}

      <div className="chat-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="user-info">
              <div className="avatar">
                KC
                <div className="online-indicator"></div>
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>King Customer</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Online</div>
              </div>
            </div>
          </div>
          
          <div className="chat-list">
            {multimediaData.results.map((result, index) => {
              const lastComment = result.comments[result.comments.length - 1]
              const messagePreview = lastComment ? 
                (lastComment.type === 'text' ? lastComment.message : 
                 lastComment.type === 'image' ? '📷 Image' :
                 lastComment.type === 'video' ? '📹 Video' :
                 lastComment.type === 'pdf' ? '📄 PDF' : '📎 File') : 'No messages'

              return (
                <div 
                  key={result.room.id}
                  className={`chat-item ${index === currentRoomIndex ? 'active' : ''}`}
                  onClick={() => switchRoom(index)}
                >
                  <div className="chat-item-header">
                    <span className="chat-name">{result.room.name}</span>
                    <span style={{ fontSize: '12px', opacity: 0.8 }}>Now</span>
                  </div>
                  <div className="chat-preview">
                    {messagePreview.substring(0, 35)}{messagePreview.length > 35 ? '...' : ''}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Main Chat */}
        <div className="main-chat">
          <div className="chat-header">
            <div className="chat-info">
              <div className="avatar">
                <img src={multimediaData.results[currentRoomIndex].room.image_url} alt={multimediaData.results[currentRoomIndex].room.name} />
                <div className="online-indicator"></div>
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{multimediaData.results[currentRoomIndex].room.name}</div>
                <div className="participants-info">
                  {multimediaData.results[currentRoomIndex].room.participant.map(participant => (
                    <span key={participant.id} className={`role-badge ${getRoleClass(participant.role)}`}>
                      {getRoleText(participant.role)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map(comment => 
              renderMessage(comment, multimediaData.results[currentRoomIndex].room.participant)
            )}
            {isTyping && (
              <div className="typing-indicator">
                <span>Agent is typing</span>
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="message-input-container">
            <div className="message-input-wrapper">
              <div className="attachment-buttons">
                <button className="attachment-button" onClick={() => fileInputRef.current?.click()} title="Upload Image">
                  📷
                </button>
                <button className="attachment-button" onClick={() => fileInputRef.current?.click()} title="Upload Video">
                  📹
                </button>
                <button className="attachment-button" onClick={() => fileInputRef.current?.click()} title="Upload File">
                  📎
                </button>
              </div>
              <textarea
                className="message-input"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={1}
              />
              <button 
                className="send-button"
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
              >
                ➤
              </button>
            </div>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*,video/*,.pdf,.doc,.docx"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />

        <style jsx>{`
          .chat-container {
            display: flex;
            height: 100vh;
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          .sidebar {
            width: 320px;
            background: linear-gradient(135deg, #2b5ce6 0%, #1e4bd1 100%);
            color: white;
            display: flex;
            flex-direction: column;
          }

          .sidebar-header {
            padding: 20px;
            background: rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .user-info {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #ff6b6b;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            overflow: hidden;
            position: relative;
          }

          .avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .online-indicator {
            position: absolute;
            bottom: 2px;
            right: 2px;
            width: 10px;
            height: 10px;
            background: #4CAF50;
            border: 2px solid white;
            border-radius: 50%;
          }

          .chat-list {
            flex: 1;
            overflow-y: auto;
          }

          .chat-item {
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .chat-item:hover,
          .chat-item.active {
            background: rgba(255,255,255,0.15);
            transform: translateX(4px);
          }

          .chat-item.active {
            border-right: 3px solid #ffffff;
          }

          .chat-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
          }

          .chat-name {
            font-weight: 600;
            font-size: 14px;
          }

          .chat-preview {
            font-size: 13px;
            opacity: 0.9;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .main-chat {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #ffffff;
          }

          .chat-header {
            padding: 16px 24px;
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            border-bottom: 1px solid #e4e6ea;
            display: flex;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.02);
          }

          .chat-info {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .participants-info {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-top: 2px;
            flex-wrap: wrap;
          }

          .role-badge {
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
          }

          .role-badge.admin { background: linear-gradient(135deg, #ff6b6b, #ff5252); }
          .role-badge.agent { background: linear-gradient(135deg, #4CAF50, #43A047); }
          .role-badge.customer { background: linear-gradient(135deg, #2b5ce6, #1e4bd1); }

          .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
          }

          .typing-indicator {
            padding: 8px 20px;
            font-size: 13px;
            color: #8e8e93;
            font-style: italic;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .typing-dots {
            display: flex;
            gap: 2px;
          }

          .typing-dots span {
            width: 4px;
            height: 4px;
            background: #8e8e93;
            border-radius: 50%;
            animation: typing 1.4s infinite;
          }

          .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
          .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

          @keyframes typing {
            0%, 80%, 100% { opacity: 0.3; }
            40% { opacity: 1; }
          }

          .message-input-container {
            padding: 16px 24px;
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            border-top: 1px solid #e4e6ea;
          }

          .message-input-wrapper {
            display: flex;
            align-items: flex-end;
            gap: 12px;
            background: white;
            border-radius: 25px;
            padding: 8px 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border: 1px solid #e4e6ea;
            transition: all 0.3s ease;
          }

          .message-input-wrapper:focus-within {
            border-color: #2b5ce6;
            box-shadow: 0 2px 12px rgba(43, 92, 230, 0.2);
          }

          .attachment-buttons {
            display: flex;
            gap: 8px;
          }

          .attachment-button {
            background: none;
            border: none;
            color: #8e8e93;
            cursor: pointer;
            padding: 6px;
            border-radius: 50%;
            transition: all 0.2s ease;
            font-size: 16px;
          }

          .attachment-button:hover {
            background: rgba(43, 92, 230, 0.1);
            color: #2b5ce6;
            transform: scale(1.1);
          }

          .message-input {
            flex: 1;
            border: none;
            background: transparent;
            padding: 8px 0;
            font-size: 14px;
            outline: none;
            resize: none;
            max-height: 100px;
            min-height: 20px;
            font-family: inherit;
          }

          .send-button {
            background: linear-gradient(135deg, #2b5ce6, #1e4bd1);
            color: white;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            flex-shrink: 0;
            box-shadow: 0 2px 8px rgba(43, 92, 230, 0.3);
          }

          .send-button:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(43, 92, 230, 0.4);
          }

          .send-button:active {
            transform: scale(0.95);
          }

          .send-button:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          @media (max-width: 768px) {
            .chat-container {
              flex-direction: column;
            }
            
            .sidebar {
              width: 100%;
              height: auto;
              max-height: 200px;
            }
            
            .main-chat {
              height: calc(100vh - 200px);
            }

            .chat-messages {
              padding: 16px;
            }

            .message-input-container {
              padding: 12px 16px;
            }
          }
        `}</style>
      </div>
    </>
  )
}