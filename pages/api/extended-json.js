// API endpoint for extended JSON format
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const extendedJsonData = {
    "results": [
      {
        "room": {
          "name": "Product A",
          "id": 12456,
          "image_url": "https://picsum.photos/id/237/200/300",
          "description": "Customer support for Product A",
          "created_at": "2024-01-10T09:00:00Z",
          "updated_at": "2024-01-15T11:00:00Z",
          "participant": [
            {
              "id": "admin@mail.com",
              "name": "Admin",
              "role": 0,
              "avatar_url": "https://example.com/avatars/admin.jpg",
              "is_online": true,
              "last_seen": "2024-01-15T14:30:00Z",
              "joined_at": "2024-01-10T09:00:00Z"
            },
            {
              "id": "agent@mail.com",
              "name": "Agent A",
              "role": 1,
              "avatar_url": "https://example.com/avatars/agent-a.jpg",
              "is_online": true,
              "last_seen": "2024-01-15T14:28:00Z",
              "joined_at": "2024-01-10T09:15:00Z"
            },
            {
              "id": "customer@mail.com",
              "name": "King Customer",
              "role": 2,
              "avatar_url": "https://example.com/avatars/customer.jpg",
              "is_online": false,
              "last_seen": "2024-01-15T12:45:00Z",
              "joined_at": "2024-01-15T10:30:00Z"
            }
          ]
        },
        "comments": [
          {
            "id": 885512,
            "type": "text",
            "message": "Selamat malam",
            "sender": "customer@mail.com",
            "timestamp": "2024-01-15T21:30:00Z",
            "is_edited": false,
            "is_deleted": false,
            "reply_to": null,
            "metadata": null,
            "read_by": ["agent@mail.com", "admin@mail.com"],
            "delivered_to": ["agent@mail.com", "admin@mail.com"]
          },
          {
            "id": 885517,
            "type": "image",
            "message": "Ini bukti pembayarannya",
            "sender": "customer@mail.com",
            "timestamp": "2024-01-15T21:37:00Z",
            "is_edited": false,
            "is_deleted": false,
            "reply_to": 885516,
            "attachments": [
              {
                "id": 1001,
                "type": "image",
                "url": "https://example.com/attachments/payment-proof.jpg",
                "thumbnail_url": "https://example.com/thumbnails/payment-proof-thumb.jpg",
                "filename": "bukti-pembayaran.jpg",
                "file_size": 2048576,
                "mime_type": "image/jpeg",
                "width": 1080,
                "height": 1920,
                "alt_text": "Screenshot bukti pembayaran mobile banking"
              }
            ],
            "metadata": {
              "image_processed": true,
              "contains_text": true,
              "ocr_detected": "BCA Mobile, Transfer berhasil, Rp 500.000"
            },
            "read_by": ["agent@mail.com"],
            "delivered_to": ["agent@mail.com", "admin@mail.com"]
          },
          {
            "id": 885519,
            "type": "video",
            "message": "Ini video tutorial cara upload bukti pembayaran di aplikasi",
            "sender": "agent@mail.com",
            "timestamp": "2024-01-15T21:40:00Z",
            "is_edited": false,
            "is_deleted": false,
            "reply_to": null,
            "attachments": [
              {
                "id": 1002,
                "type": "video",
                "url": "https://example.com/attachments/tutorial-upload.mp4",
                "thumbnail_url": "https://example.com/thumbnails/tutorial-upload-thumb.jpg",
                "filename": "tutorial-upload-payment.mp4",
                "file_size": 15728640,
                "mime_type": "video/mp4",
                "duration": 180,
                "width": 1280,
                "height": 720,
                "alt_text": "Video tutorial cara upload bukti pembayaran"
              }
            ],
            "metadata": {
              "video_processed": true,
              "encoding": "h264",
              "bitrate": "1000kbps",
              "has_subtitles": true,
              "subtitle_languages": ["id", "en"]
            },
            "read_by": [],
            "delivered_to": ["customer@mail.com"]
          },
          {
            "id": 885520,
            "type": "pdf",
            "message": "Berikut panduan lengkap untuk pembayaran dan upload bukti",
            "sender": "agent@mail.com",
            "timestamp": "2024-01-15T21:42:00Z",
            "is_edited": false,
            "is_deleted": false,
            "reply_to": null,
            "attachments": [
              {
                "id": 1003,
                "type": "pdf",
                "url": "https://example.com/attachments/payment-guide.pdf",
                "thumbnail_url": "https://example.com/thumbnails/payment-guide-thumb.jpg",
                "filename": "panduan-pembayaran.pdf",
                "file_size": 5242880,
                "mime_type": "application/pdf",
                "pages": 8,
                "alt_text": "Panduan pembayaran dan upload bukti - 8 halaman"
              }
            ],
            "metadata": {
              "pdf_searchable": true,
              "pdf_version": "1.7",
              "contains_forms": false,
              "language": "id"
            },
            "read_by": [],
            "delivered_to": ["customer@mail.com"]
          }
        ]
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total_rooms": 1,
      "total_pages": 1,
      "has_more": false,
      "next_page_url": null,
      "prev_page_url": null
    },
    "metadata": {
      "current_user": {
        "id": "customer@mail.com",
        "name": "King Customer",
        "role": 2
      },
      "server_time": new Date().toISOString(),
      "api_version": "v1.0",
      "supported_file_types": [
        "image/jpeg",
        "image/png", 
        "image/gif",
        "video/mp4",
        "video/quicktime",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ],
      "max_file_size_mb": 25,
      "features": {
        "reactions": true,
        "replies": true,
        "file_upload": true,
        "typing_indicators": true,
        "read_receipts": true,
        "message_editing": true,
        "message_deletion": true
      }
    }
  }

  res.status(200).json(extendedJsonData)
}