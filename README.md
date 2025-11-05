# UNO - Juego de Cartas Online

Un juego de cartas UNO desarrollado con Next.js 15, TypeScript y Tailwind CSS. Incluye animaciones de partículas, fondo de galaxia espiral y un sistema completo de configuración.

## 🎮 Características

- **Interfaz moderna**: Diseño glassmorphism con efectos visuales
- **Animaciones**: Partículas flotantes y cartas UNO animadas  
- **Fondo dinámico**: Espiral de galaxia con gradiente naranja-rojo
- **Sistema de configuración completo**:
  - 🔊 Audio (Volumen Master, Efectos, Música, Sonidos de cartas)
  - 🎨 Visual (Control de brillo)
  - 🎮 Jugabilidad (Auto-ordenar cartas)
  - 💬 Interfaz (Tamaño de texto)
- **Persistencia**: Configuraciones guardadas en localStorage
- **Responsive**: Optimizado para todas las pantallas

## 🚀 Tecnologías

- **Next.js 15.5.4** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Styling
- **Canvas API** - Animaciones de partículas
- **Context API** - Gestión de estado global

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/uno-game.git

# Entrar al directorio
cd uno-game

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## 🎯 Uso

1. **Jugar**: Haz clic en "JUGAR" para iniciar una partida
2. **Configurar**: Accede a las configuraciones desde el menú principal
3. **Personalizar**: Ajusta audio, brillo, tamaño de texto y más

## 🎨 Componentes Principales

- `GalaxySpiral.tsx` - Animación de espiral de galaxia
- `ParticleCanvas.tsx` - Sistema de partículas flotantes
- `UnoCardsBackground.tsx` - Cartas UNO animadas
- `SettingsModal.tsx` - Panel de configuración
- `AudioContext.tsx` - Sistema de audio global

## 🌟 Efectos Visuales

- **Fondo gradiente**: Naranja a rojo oscuro
- **Espiral de galaxia**: 3 brazos con 2500 partículas
- **Partículas naranjas**: 100 partículas flotantes
- **Cartas flotantes**: Animación hacia el centro
- **Efectos glass**: Contenedores con glassmorphism

## 🔧 Configuraciones Disponibles

| Categoría | Opciones |
|-----------|----------|
| **Audio** | Volumen Master, Efectos de Sonido, Música de Fondo, Sonidos de Cartas |
| **Visual** | Control de Brillo (25-100%) |
| **Jugabilidad** | Auto-ordenar cartas (Color/Número/Manual) |
| **Interfaz** | Tamaño de texto (Pequeño/Mediano/Grande) |

## 📱 Compatibilidad

- ✅ Chrome/Edge/Firefox/Safari
- ✅ Dispositivos móviles y tablets
- ✅ Pantallas de alta resolución
- ✅ Modo oscuro/claro

## 🤝 Contribución

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autores

**Sebastian Lopez** -
**Miguel Mendoza** 
- Email: miguelangel11230@gmail.com
- Email: jlopezbenavides73@gmail.com
- GitHub: [@tu-usuario](https://github.com/tu-usuario)

---

⭐ ¡Dale una estrella a este proyecto si te gustó!
