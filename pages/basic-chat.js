import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'

export default function BasicChat() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  
  const currentUserId = "customer@mail.com"
  
  // Real data from the provided endpoint
  const chatData = {
    "results": [
      {
        "room": {
          "name": "Product A",
          "id": 12456,
          "image_url": "https://picsum.photos/id/237/200/300",
          "participant": [
            {
              "id": "admin@mail.com",
              "name": "Admin",
              "role": 0
            },
            {
              "id": "agent@mail.com",
              "name": "Agent A",
              "role": 1
            },
            {
              "id": "customer@mail.com",
              "name": "King Customer",
              "role": 2
            }
          ]
        },
        "comments": [
          {
            "id": 885512,
            "type": "text",
            "message": "Selamat malam",
            "sender": "customer@mail.com"
          },
          {
            "id": 885513,
            "type": "text",
            "message": "Malam",
            "sender": "agent@mail.com"
          },
          {
            "id": 885514,
            "type": "text",
            "message": "Ada yang bisa saya bantu?",
            "sender": "agent@mail.com"
          },
          {
            "id": 885515,
            "type": "text",
            "message": "Saya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagal",
            "sender": "customer@mail.com"
          },
          {
            "id": 885516,
            "type": "text",
            "message": "Baik, silahkan kirimkan lampiran bukti pembayarannya",
            "sender": "agent@mail.com"
          }
        ]
      }
    ]
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setMessages(chatData.results[0].comments)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      id: Date.now(),
      type: "text",
      message: inputMessage.trim(),
      sender: currentUserId
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const responses = [
          "Terima kasih atas informasinya.",
          "Saya akan membantu Anda dengan ini.",
          "Baik, saya mengerti.",
          "Ada yang lain yang bisa saya bantu?",
          "Silahkan tunggu sebentar."
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        
        const agentResponse = {
          id: Date.now() + 1,
          type: "text",
          message: randomResponse,
          sender: "agent@mail.com"
        }
        
        setMessages(prev => [...prev, agentResponse])
      }, 2000)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
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

  const renderMessage = (comment, participants) => {
    const isOwn = comment.sender === currentUserId
    const sender = participants.find(p => p.id === comment.sender)
    const senderName = sender ? sender.name : comment.sender.split('@')[0]
    const senderRole = sender ? sender.role : 2
    const avatarText = getAvatarText(senderName)

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
              <span className="message-time">Now</span>
            </div>
          )}
          {isOwn && (
            <div className="message-header">
              <span className="message-time">Now</span>
            </div>
          )}
          <div className="message-text">{comment.message}</div>
          <div className="message-id">ID: {comment.id}</div>
        </div>
        <style jsx>{`
          .message {
            margin-bottom: 16px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
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
          .message-avatar.admin { background: #ff6b6b; }
          .message-avatar.agent { background: #4CAF50; }
          .message-avatar.customer { background: #2b5ce6; }
          .message-content {
            max-width: 70%;
            background: white;
            border-radius: 18px;
            padding: 12px 16px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            position: relative;
          }
          .message.own .message-content {
            background: #2b5ce6;
            color: white;
          }
          .message-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 4px;
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
          .sender-role.admin { background: #ff6b6b; }
          .sender-role.agent { background: #4CAF50; }
          .sender-role.customer { background: #2b5ce6; }
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
      <Head>
        <title>Basic Chat Interface - Qiscus Assessment</title>
        <meta name="description" content="Responsive chat interface using real JSON data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="chat-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="user-info">
              <div className="avatar">KC</div>
              <div>
                <div style={{ fontWeight: 600 }}>King Customer</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Online</div>
              </div>
            </div>
          </div>
          
          <div className="chat-list">
            <div className="chat-item active">
              <div className="chat-item-header">
                <span className="chat-name">Product A</span>
                <span className="chat-time">Active</span>
              </div>
              <div className="chat-preview">Baik, silahkan kirimkan lampiran...</div>
            </div>
          </div>
        </div>

        {/* Main Chat */}
        <div className="main-chat">
          <div className="chat-header">
            <div className="chat-info">
              <div className="avatar">
                <img src="https://picsum.photos/id/237/200/300" alt="Product A" />
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>Product A</div>
                <div className="participants-info">
                  <span className="role-badge admin">Admin</span>
                  <span className="role-badge agent">Agent</span>
                  <span className="role-badge customer">Customer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map(comment => 
              renderMessage(comment, chatData.results[0].room.participant)
            )}
            {isTyping && (
              <div className="typing-indicator">
                Agent is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="message-input-container">
            <div className="message-input-wrapper">
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
            background: #2b5ce6;
            color: white;
            display: flex;
            flex-direction: column;
          }

          .sidebar-header {
            padding: 20px;
            background: #1e4bd1;
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
          }

          .avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .chat-list {
            flex: 1;
            overflow-y: auto;
          }

          .chat-item {
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            cursor: pointer;
          }

          .chat-item.active {
            background: rgba(255,255,255,0.1);
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

          .chat-time {
            font-size: 12px;
            opacity: 0.8;
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
            background: white;
            border-bottom: 1px solid #e4e6ea;
            display: flex;
            align-items: center;
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
          }

          .role-badge {
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 8px;
            color: white;
          }

          .role-badge.admin { background: #ff6b6b; }
          .role-badge.agent { background: #4CAF50; }
          .role-badge.customer { background: #2b5ce6; }

          .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f8f9fa;
          }

          .typing-indicator {
            padding: 8px 16px;
            font-size: 13px;
            color: #8e8e93;
            font-style: italic;
          }

          .message-input-container {
            padding: 16px 24px;
            background: white;
            border-top: 1px solid #e4e6ea;
          }

          .message-input-wrapper {
            display: flex;
            align-items: flex-end;
            gap: 12px;
            background: #f0f2f5;
            border-radius: 25px;
            padding: 8px 16px;
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
            background: #2b5ce6;
            color: white;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
            flex-shrink: 0;
          }

          .send-button:hover {
            background: #1e4bd1;
          }

          .send-button:disabled {
            background: #ccc;
            cursor: not-allowed;
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
          }
        `}</style>
      </div>
    </>
  )
}