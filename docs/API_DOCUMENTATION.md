# API Documentation - Próximo Passo

## Overview
Próximo Passo exposes REST API endpoints for chat interactions and journey management. All endpoints require authentication via Supabase JWT tokens.

## Authentication
All protected endpoints require an `Authorization` header with a Bearer token from Supabase authentication.

```bash
Authorization: Bearer <supabase_jwt_token>
```

## Endpoints

### Chat API

#### Send Message
Send a message to a journey specialist and receive AI response.

**Request:**
- **Method:** POST
- **Path:** `/api/chat`
- **Content-Type:** application/json
- **Rate Limit:** 10 messages per minute per user

**Body:**
```json
{
  "userId": "user-id-uuid",
  "journeyId": "abrir-mei",
  "message": "Quais são os requisitos para abrir um MEI?"
}
```

**Response (200 OK):**
```json
{
  "role": "assistant",
  "content": "Para abrir um MEI você precisa de..."
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Message is required"
}
```

**Response (429 Too Many Requests):**
```json
{
  "error": "Too many messages. Try again later.",
  "retryAfter": 45
}
```

#### Get Chat History
Retrieve conversation history for a journey.

**Request:**
- **Method:** GET
- **Path:** `/api/chat?userId={userId}&journeyId={journeyId}`

**Response (200 OK):**
```json
[
  {
    "role": "user",
    "content": "Como abrir um MEI?"
  },
  {
    "role": "assistant",
    "content": "Para abrir um MEI você precisa..."
  }
]
```

#### Clear Chat History
Delete all messages for a journey.

**Request:**
- **Method:** POST
- **Path:** `/api/chat/clear`
- **Content-Type:** application/json

**Body:**
```json
{
  "userId": "user-id-uuid",
  "journeyId": "abrir-mei"
}
```

**Response (200 OK):**
```json
{
  "message": "Chat history cleared successfully"
}
```

## Error Handling

All endpoints return standard error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Common Error Codes
- `INVALID_REQUEST` - Missing or invalid parameters
- `UNAUTHORIZED` - Missing or invalid authentication token
- `FORBIDDEN` - User does not have access to this resource
- `NOT_FOUND` - Resource not found
- `RATE_LIMITED` - Too many requests
- `SERVER_ERROR` - Internal server error

## Rate Limiting

- **Chat Messages:** 10 per minute per user
- **General API:** 100 requests per minute per IP

When rate limited, responses include:
- `X-RateLimit-Limit` - Maximum requests allowed
- `X-RateLimit-Remaining` - Remaining requests
- `X-RateLimit-Reset` - Unix timestamp when limit resets

## Journey Specialists

Each journey has a dedicated specialist with custom system prompts:

| Journey ID | Specialist | Model |
|---|---|---|
| `abrir-mei` | Especialista em MEI | gpt-4o-mini |
| `comprar-casa` | Especialista em Imóveis | gpt-4o-mini |
| `casar` | Especialista em Casamento | gpt-4o-mini |
| `inventario` | Especialista em Sucessão | gpt-4o-mini |
| `imposto-renda` | Especialista em Imposto de Renda | gpt-4o-mini |

## Response Times

Expected response times (p95):
- Send message: 2-5 seconds
- Get history: 200-500ms
- Clear history: 100-300ms

## Changelog

### v1.0.0 (Current)
- Initial API release
- Chat with specialists
- Rate limiting
- Authentication

## Support

For API issues, contact: `api-support@proximopasso.com`
