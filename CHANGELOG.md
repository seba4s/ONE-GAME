# 📝 Changelog

## [0.1.0] - 2025-11-05

### 🎉 Release Inicial - Características Base

#### ✨ Nuevas Características

**Autenticación & Autorizacion**
- Sistema de login con Email/Username
- Registro de nuevas cuentas
- Modo Invitado con nickname
- OAuth ready (Google, Facebook, Apple)
- Back navigation en login

**Interfaz Principal**
- Menú principal con opciones (JUGAR, Configuración, Desarrolladores)
- Selección de crear/unirse a sala
- Pantalla de configuración de partida

**Gestión de Partidas**
- Selección de 2-4 jugadores
- Sistema de agregar bots
- Código de sala para invitaciones
- Presets (Clásico, Torneo)
- Configuración manual:
  - Cartas iniciales (5, 7, 10)
  - Puntos para ganar (200, 500, 1000)
  - Tiempo por turno (30s, 60s, 90s)
  - Apilar +2/+4

**GamePlay Core**
- Inicialización de 108 cartas UNO
- Distribución de 7 cartas por jugador
- Sistema de dibujar cartas
- Interfaz 3D con perspectiva CSS
- Soporte para 4 jugadores
- Gestión automática de turnos
- Visualización de manos:
  - Tu mano: Interactiva (seleccionable)
  - Otros jugadores: Face-down (ocultas)

**Componentes Visuales**
- Galaxia espiral animada
- Partículas flotantes
- Cartas UNO en fondo
- Efecto glassmorphism
- Gradiente naranja-rojo dinámico
- Animaciones fade-in/out

**Configuración Global**
- Panel de configuración (Settings Modal)
- Control de audio (volumen, efectos)
- Control visual (brillo)
- Tamaño de texto
- Persistencia en localStorage

#### 🐛 Fixes
- Nombres de jugadores mostrados correctamente
- Navegación back correcta en todas las pantallas
- Botones con estilos consistentes
- Layouts responsive

#### 📚 Documentación
- `README.md` - Guía principal del proyecto
- `GAMEPLAY_COMPONENT.md` - Detalles del componente GamePlay
- `BACKEND_INTEGRATION.md` - Guía de integración con backend
- `GUIA_AUTENTICACION.md` - Sistema de autenticación
- `ROADMAP.md` - Planificación de features
- Este `CHANGELOG.md`

#### 🔧 Stack Técnico
- Next.js 15.5.4
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4.1.9
- shadcn/ui
- Lucide Icons
- Canvas API

#### 📊 Git Commits
- Total: 22+ commits
- Commits por categoría:
  - Auth system: 4 commits
  - UI/Layout: 8 commits
  - GamePlay: 3 commits
  - Documentation: 7 commits

#### 🚀 Deployment
- Repository: github.com/seba4s/ONE-GAME
- Branch principal: main
- Estado: ✅ Compilando exitosamente
- Dev Server: localhost:3002

---

## Próximas Versiones Planeadas

### v0.2.0 - Validación de Cartas & Especiales
- Validación de cartas jugables
- Implementar +2, Skip, Reverse, Wild
- Sistema de UNO!
- Audio integrado

### v0.3.0 - Fin de Juego & Puntuación
- Sistema de puntuación
- Pantalla de fin de juego
- Acumulativo de rondas
- Leader board local

### v0.4.0 - Backend Integration
- NextAuth.js
- Database (PostgreSQL)
- API endpoints
- WebSocket real-time

### v0.5.0+ - Gameplay Avanzado
- AI mejorada
- Variantes de juego
- Estadísticas
- Chat & comunicación

---

## Notas de Desarrollo

### Problemas Resueltos
1. ✅ Puerto 3000 en uso → Usamos puerto 3002
2. ✅ Componentes sin activación → Fixed screen state logic
3. ✅ CSS warnings en Tailwind → Non-blocking, resolved in build
4. ✅ Git merge conflicts → Resueltos con git pull

### Lecciones Aprendidas
- El flujo de autenticación debe ser claro
- La navegación entre screens crítica
- 3D CSS transforms requieren planning cuidadoso
- Documentación temprana evita confusiones

### Recomendaciones Futuras
1. Separar game logic de UI components
2. Implementar tests unitarios
3. Agregar error boundaries
4. Optimizar re-renders con React.memo
5. Usar Zustand para state management más complejo

---

## Créditos

**Developers**:
- Sebastian Lopez
- Miguel Mendoza (miguelangel11230@gmail.com)

**Repository**: [ONE-GAME](https://github.com/seba4s/ONE-GAME)

**Licencia**: MIT

---

**Publicado**: 5 de Noviembre, 2025
**Versión Actual**: 0.1.0
**Próxima Release**: TBD (v0.2.0)
