import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Qiscus Technical Assessment</title>
        <meta name="description" content="Complete chat system implementation for Qiscus" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #2b5ce6 0%, #1e4bd1 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '600px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            color: '#2b5ce6', 
            fontSize: '2.5rem', 
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            🚀 Qiscus Technical Assessment
          </h1>
          
          <p style={{ 
            color: '#666', 
            fontSize: '1.1rem', 
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Complete chat system implementation with system architecture, database design, and fully functional interfaces.
          </p>

          <div style={{ 
            display: 'grid', 
            gap: '20px', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            marginBottom: '30px'
          }}>
            <Link href="/basic-chat" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, #4CAF50, #43A047)',
                color: 'white',
                padding: '20px',
                borderRadius: '15px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <h3 style={{ margin: '0 0 10px 0' }}>📱 Basic Chat Interface</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                  Responsive chat using real JSON data from provided endpoint
                </p>
              </div>
            </Link>

            <Link href="/multimedia-chat" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ff5252)',
                color: 'white',
                padding: '20px',
                borderRadius: '15px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <h3 style={{ margin: '0 0 10px 0' }}>🎥 Multimedia Chat</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                  Complete interface with images, videos, PDFs & file upload
                </p>
              </div>
            </Link>
          </div>

          <div style={{ 
            background: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <h4 style={{ color: '#333', marginBottom: '15px' }}>✅ Assessment Requirements Completed:</h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '10px',
              textAlign: 'left',
              fontSize: '0.9rem'
            }}>
              <div>✅ System Architecture Diagram</div>
              <div>✅ Database ERD</div>
              <div>✅ Responsive Chat Interface</div>
              <div>✅ Extended JSON Format</div>
              <div>✅ Multimedia Chat Interface</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/architecture" style={{
              background: '#2b5ce6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}>
              📊 View Architecture
            </Link>
            <Link href="/database" style={{
              background: '#6c757d',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}>
              🗄️ Database ERD
            </Link>
            <a href="/api/extended-json" style={{
              background: '#17a2b8',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}>
              📄 JSON API
            </a>
          </div>

          <p style={{ 
            marginTop: '30px', 
            fontSize: '0.9rem', 
            color: '#999'
          }}>
            Built with Next.js • Deployed on Vercel • Ready for Production
          </p>
        </div>
      </main>
    </>
  )
}