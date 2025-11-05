# 🔌 Guía de Integración del Backend

## Resumen de Cambios

Se han mejorado los placeholders de autenticación para facilitar la integración futura con un backend. Los cambios incluyen:

1. **Estructura de datos unificada** (`UserData`)
2. **Comentarios claros con ejemplos de integración**
3. **Manejo de errores mejorado**
4. **Soporte para múltiples métodos de autenticación**

---

## 📋 Interfaz UserData

```typescript
interface UserData {
  username: string      // Identificador visible del usuario
  email?: string        // Email del usuario
  userId?: string       // ID único en la base de datos
  isGuest: boolean      // Flag para usuarios invitados
}
```

**Importante**: El backend debe siempre retornar un `username`, ya que se usa en JUGADOR 1 del game room.

---

## 🔐 Autenticación por Email/Contraseña

### Archivo: `components/LoginScreen.tsx` - Método `handleEmailLogin`

**Ubicación del código**: Líneas ~70-95

**Placeholder actual**:
```typescript
onLoginSuccess({ 
  username: loginEmail.split('@')[0],  // Extrae nombre del email
  email: loginEmail,
  userId: "user123",
  isGuest: false 
})
```

**Integración sugerida** (descomentar y adaptar):
```typescript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    email: loginEmail, 
    password: loginPassword 
  })
})
const data = await response.json()
if (!response.ok) throw new Error(data.error)

onLoginSuccess({ 
  username: data.username,  // Debe venir del backend
  email: data.email,
  userId: data.id,
  isGuest: false 
})
```

**Cambios necesarios en tu backend**:
- Endpoint: `POST /api/auth/login`
- Body esperado: `{ email, password }`
- Respuesta exitosa: `{ username, email, id, ... }`
- Respuesta error: `{ error: "mensaje" }`

---

## 📝 Registro

### Archivo: `components/LoginScreen.tsx` - Método `handleRegister`

**Ubicación del código**: Líneas ~98-135

**Placeholder actual**: Solo valida y muestra alerta

**Integración sugerida**:
```typescript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    email: registerEmail,
    username: registerUsername,
    password: registerPassword
  })
})
const data = await response.json()
if (!response.ok) throw new Error(data.error)

alert("¡Registro exitoso! Inicia sesión con tus credenciales")
setActiveTab("login")
```

**Cambios necesarios en tu backend**:
- Endpoint: `POST /api/auth/register`
- Body esperado: `{ email, username, password }`
- Validar unicidad de email y username
- Retornar error si ya existe
- No requiere login automático (usuario va a tab login)

---

## 🎮 Invitado

### Archivo: `components/LoginScreen.tsx` - Método `handleGuestLogin`

**Esta opción NO requiere backend** - funciona completamente en el cliente:

```typescript
onLoginSuccess({ 
  username: guestNickname,  // Nombre que escribió el usuario
  isGuest: true 
})
```

---

## 🔑 OAuth (Google, Facebook, Apple)

### Archivo: `components/LoginScreen.tsx`
- Google: Método `handleGoogleLogin` (líneas ~175-192)
- Facebook: Método `handleFacebookLogin` (líneas ~200-217)
- Apple: Método `handleAppleLogin` (líneas ~219-236)

### ⚠️ IMPORTANTE: NextAuth es la opción recomendada

**Opción 1: NextAuth.js (RECOMENDADO)**

1. Instalar:
```bash
npm install next-auth@beta
```

2. Crear `app/api/auth/[...nextauth]/route.ts`:
```typescript
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import AppleProvider from "next-auth/providers/apple"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.userId = user.id
      return token
    },
    session({ session, token }) {
      session.user.id = token.userId
      return session
    },
  },
}

export const handler = NextAuth(authOptions)
```

3. Modificar los handlers en `LoginScreen.tsx`:
```typescript
const handleGoogleLogin = async (e?: React.MouseEvent<HTMLButtonElement>) => {
  if (e) animateButton(e)
  const result = await signIn("google", { redirect: false })
  
  if (result?.ok) {
    const session = await getSession()
    onLoginSuccess({
      username: session.user.name || session.user.email,
      email: session.user.email,
      userId: session.user.id,
      isGuest: false
    })
  } else {
    alert("Error al iniciar sesión")
  }
}
```

**Opción 2: Integración manual con backend**

Crear endpoint en tu backend:
```typescript
POST /api/auth/google
Body: { token } // ID Token de Google
Response: { username, email, userId, ... }
```

---

## 🚨 Problemas Potenciales y Soluciones

### 1. **Username duplicado con backend**
**Problema**: El cliente extrae username de email, pero el backend genera uno diferente
**Solución**: Siempre usar el `username` que retorna el backend
```typescript
// ❌ MAL
username: loginEmail.split('@')[0]

// ✅ BIEN
username: data.username  // Viene del backend
```

### 2. **Email no coincide**
**Problema**: LoginScreen valida email, pero backend rechaza
**Solución**: Backend debe validar y retornar error específico
```typescript
// Backend responde:
{ 
  ok: false, 
  error: "Email no válido" 
}
```

### 3. **Usuario mira JUGADOR 1 antes de login**
**Problema**: GameRoomMenu usa `userData?.username || "JUGADOR1"`
**Solución**: LoginScreen garantiza que username siempre existe antes de llamar `onLoginSuccess`

### 4. **Sesión perdida al refrescar**
**Problema**: userData se limpia al recargar la página
**Solución**: Implementar persistencia:
```typescript
// En page.tsx
useEffect(() => {
  const saved = localStorage.getItem('userData')
  if (saved) setUserData(JSON.parse(saved))
}, [])

// Al setear userData
localStorage.setItem('userData', JSON.stringify(userData))
```

---

## 📊 Flujo de Autenticación

```
┌─────────────────────────────────────────────────────────────┐
│                    OPCIONES DE LOGIN                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    EMAIL     │  │   OAUTH      │  │   GUEST      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│        │                 │                    │             │
│        ▼                 ▼                    ▼             │
│  Backend:            NextAuth:          Client-side:       │
│  /api/auth/login     signIn()            No necesita       │
│        │                 │                 backend         │
│        ▼                 ▼                    │             │
│  { username,        { username,      { username,          │
│    email,            email,             isGuest:          │
│    userId }          userId }            true }            │
│        │                 │                    │             │
│        └─────────────────┴────────────────────┘             │
│                         │                                   │
│                         ▼                                   │
│              onLoginSuccess(userData)                       │
│                         │                                   │
│                         ▼                                   │
│           App estado: currentScreen = 'game'               │
│           GameRoomMenu recibe userData                      │
│           JUGADOR 1 muestra: userData.username             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist de Integración

- [ ] Crear endpoints en backend (`/api/auth/login`, `/api/auth/register`)
- [ ] Configurar NextAuth (opcional pero recomendado)
- [ ] Configurar variables de entorno (.env.local)
- [ ] Descomentar códigos de integración en LoginScreen.tsx
- [ ] Implementar persistencia de sesión (localStorage/cookies)
- [ ] Probar cada método de login
- [ ] Verificar que username siempre aparece en JUGADOR 1
- [ ] Implementar logout que limpie sesión del backend
- [ ] Agregar validaciones en backend (email válido, username único)

---

## 🔗 Referencias

- [NextAuth Documentación](https://next-auth.js.org/)
- [Google OAuth Credentials](https://console.cloud.google.com/)
- [Facebook App Dashboard](https://developers.facebook.com/)
- [Apple Sign In Guide](https://developer.apple.com/sign-in-with-apple/)
