# 🦸‍♂️ Marvel Heroes App

Aplicación web para explorar héroes de Marvel desarrollada con React, TypeScript, Zustand y React Router.

## 🚀 Características principales

- **🔐 Sistema de Login:** Autenticación básica con rutas protegidas
- **⚡ Zustand para Estado Global:** Manejo eficiente del estado de la aplicación
- **🛣️ React Router:** Navegación y rutas protegidas
- **🎭 Framer Motion:** Animaciones fluidas para mejor experiencia de usuario
- **🦸‍♀️ API de Marvel:** Conexión con la API oficial de Marvel
- **📱 Diseño Responsivo:** Adaptable a diferentes dispositivos
- **👥 Creación de Equipos:** Permite crear equipos de hasta 5 héroes
- **📝 Sistema de Pestañas:** Organización de contenido en pestañas intuitivas
- **🔍 Sistema de Búsqueda:** Búsqueda de héroes por nombre en tiempo real

## 🛠️ Tecnologías utilizadas

- **React**: Biblioteca de UI
- **TypeScript**: Tipado estático
- **Zustand**: Manejo de estado global
- **React Router**: Navegación y rutas protegidas
- **Framer Motion**: Biblioteca de animaciones
- **Vite**: Herramienta de construcción rápida
- **API de Marvel**: Datos de superhéroes

## 📋 Requisitos previos

- Node.js (v16 o superior)
- npm o yarn
- Claves de API de Marvel (pública y privada)

## 🔧 Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/marvel-heroes-app.git
   cd marvel-heroes-app
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**  
   Crea un archivo `.env` en la raíz del proyecto:

   ```env
   VITE_MARVEL_API_PUBLIC_KEY=tu_clave_publica
   VITE_MARVEL_API_PRIVATE_KEY=tu_clave_privada
   ```

4. **Iniciar el servidor de desarrollo**

   ```bash
   npm run dev
   ```

## 🔑 Credenciales de acceso

- **Usuario**: admin
- **Contraseña**: admin

## 📱 Funcionalidades detalladas

### 🔒 Sistema de autenticación

- Inicio de sesión con usuario "admin" / contraseña "admin"
- Rutas protegidas para acceso solo a usuarios autenticados
- Persistencia de sesión usando localStorage

### 🦸‍♀️ Exploración de héroes

- **📋 Listado de héroes:** Muestra los superhéroes de Marvel en una grilla atractiva
- **🎭 Animaciones:** Transiciones suaves al cargar y visualizar héroes
- **🔍 Modal de detalles:** Al hacer clic en un personaje, se muestra información detallada
- **📊 Información detallada:** Vista de atributos, comics, series y más datos de cada héroe

### 📑 Sistema de navegación por pestañas

- **🦸‍♀️ Pestaña Heroes:** Visualización principal de héroes paginados
- **🔎 Pestaña Búsqueda:** Búsqueda de héroes por nombre en tiempo real
- **👥 Pestaña Equipo:** Gestión del equipo personalizado
- **👤 Pestaña Cuenta:** Información del usuario actual

### 🔍 Sistema de búsqueda

- **⚡ Búsqueda en tiempo real:** Resultados actualizados mientras se escribe
- **📈 Resultados optimizados:** Filtrado eficiente por nombre y descripción
- **🖼️ Visualización rica:** Resultados mostrados con imagen y descripción

### 👥 Gestión de equipo

- **➕ Añadir héroes:** Posibilidad de añadir hasta 5 héroes al equipo
- **❌ Eliminar héroes:** Remover héroes del equipo con un clic
- **💾 Persistencia:** El equipo se guarda entre sesiones con localStorage
- **⚠️ Validaciones:** Control para evitar duplicados y límite de miembros

### 📄 Sistema de paginación

- **⬅️ Navegación previa:** Botón para ir a la página anterior
- **➡️ Navegación siguiente:** Botón para ir a la página siguiente
- **🔢 Navegación directa:** Botones numéricos para saltar a páginas específicas
- **🔄 Carga de datos:** Actualización automática al cambiar de página

### 🛡️ Características técnicas

- **🔄 Estado global:** Gestión eficiente con Zustand para datos de héroes, búsquedas y equipo
- **🌐 Conexión API:** Integración con la API oficial de Marvel para datos reales
- **📱 Responsive:** Diseño adaptable a dispositivos móviles, tablets y desktop
- **⚙️ Modo fallback:** Sistema de datos mock cuando la API no está disponible

## 👨‍💻 Desarrollo

Este proyecto está desarrollado siguiendo las mejores prácticas de React y TypeScript:

- Componentes funcionales con Hooks
- Tipado estricto con TypeScript
- Separación clara de responsabilidades
- Estructura de carpetas organizada por funcionalidad
- Custom hooks reutilizables

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.
