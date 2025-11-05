# 📝 Guía para integrar Autenticación en LoginScreen.tsx

## Ubicación del componente
`/components/LoginScreen.tsx`

## Funciones que necesitas completar

El componente tiene 4 funciones placeholders que necesitas llenar con tu código de autenticación:

### 1. **Email Login**
```typescript
const handleEmailLogin = async () => {
  setIsLoading(true)
  try {
    // TU CÓDIGO AQUÍ
    // Ejemplo: Abrir modal de email/contraseña o redirigir a página de login
    console.log("Email login clicked")
  } catch (error) {
    console.error("Error:", error)
  } finally {
    setIsLoading(false)
  }
}
```

### 2. **Google Login**
```typescript
const handleGoogleLogin = async () => {
  setIsLoading(true)
  try {
    // TU CÓDIGO AQUÍ
    // Ejemplo: Usar NextAuth, Firebase, o Google OAuth
    console.log("Google login clicked")
  } catch (error) {
    console.error("Error:", error)
  } finally {
    setIsLoading(false)
  }
}
```

### 3. **Facebook Login**
```typescript
const handleFacebookLogin = async () => {
  setIsLoading(true)
  try {
    // TU CÓDIGO AQUÍ
    // Ejemplo: Usar NextAuth, Firebase, o Facebook SDK
    console.log("Facebook login clicked")
  } catch (error) {
    console.error("Error:", error)
  } finally {
    setIsLoading(false)
  }
}
```

### 4. **Apple Login**
```typescript
const handleAppleLogin = async () => {
  setIsLoading(true)
  try {
    // TU CÓDIGO AQUÍ
    // Ejemplo: Usar NextAuth, Firebase, o Apple Sign In
    console.log("Apple login clicked")
  } catch (error) {
    console.error("Error:", error)
  } finally {
    setIsLoading(false)
  }
}
```

## Cómo usar la autenticación

Una vez que autenticas al usuario, debes llamar a la función `onLoginSuccess`:

```typescript
// Después de autenticar exitosamente:
onLoginSuccess({ 
  username: userInfo.name || userInfo.email, 
  isGuest: false 
})
```

## Opciones recomendadas para autenticación

### 1. **NextAuth.js** (Recomendado)
- Fácil integración con múltiples proveedores
- Manejo seguro de sesiones
- Documentación completa

### 2. **Firebase Authentication**
- Soporte nativo para Google, Facebook, Apple
- Realtime database optional
- Buena integración con React

### 3. **Auth0**
- Enterprise-grade
- Muchos proveedores de OAuth
- Dashboard potente

### 4. **Supabase** (Alternativa a Firebase)
- PostgreSQL backend
- Autenticación integrada
- Open source

## Flujo actual del componente

1. Usuario ingresa a la app → Ve LoginScreen
2. Puede elegir:
   - **Iniciar Sesión**: Email, Google, Facebook, o Apple
   - **Invitado**: Escribe nickname y continúa
3. Después de validar → Se va a la pantalla principal

## Variables importantes

- `isLoading`: Deshabilita botones mientras se procesa autenticación
- `guestNickname`: Texto del nickname para invitados
- `activeTab`: Controla qué sección se muestra (login/guest)

## Próximos pasos

1. Elige tu proveedor de autenticación preferido
2. Instala las dependencias necesarias
3. Reemplaza las funciones placeholder con tu código
4. Prueba el flujo completo

---

**¿Necesitas ayuda con algún proveedor específico?** Pásame el código y lo integro por ti.
