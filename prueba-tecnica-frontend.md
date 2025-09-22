# Prueba Técnica — Desarrollador Frontend Angular

Se requiere desarrollar una aplicación web en **Angular 17+** que consuma la API pública de **Pokémon (pokeapi.co)** como fuente de datos. El prototipo debe seguir las mejores prácticas de Angular y replicar las pantallas proporcionadas en los prototipos de diseño.

El proyecto tiene como objetivo evaluar las competencias del candidato en el **desarrollo frontend**, la **implementación de arquitecturas modulares** y la **construcción de interfaces de usuario** modernas y responsivas.

## Objetivo de la Prueba
- Validar las habilidades en Angular 17+ y TypeScript.
- Medir la capacidad de implementar autenticación, internacionalización y gestión de estado.
- Evaluar la calidad de la UI/UX replicando los prototipos entregados.
- Revisar la modularidad del código, uso de servicios, interceptores y guards.
- Comprobar la integración con API REST y optimización de datos en frontend.

---

## Prototipos a Implementar

### 1) Pantalla de Login
**Formulario:** correo y contraseña; “recordar sesión”; link a registro.

**Criterios de aceptación:**
- El formulario permite ingresar correo electrónico y contraseña.
- El botón de *Login* solo se habilita con datos válidos en ambos campos.
- El correo valida formato email (`usuario@dominio.com`).
- La contraseña valida no estar vacía.
- “Recordar sesión” mantiene la sesión tras cerrar/abrir el navegador.
- Mensaje de error si las credenciales no son válidas.
- Link a Registro que redirige correctamente.

### 2) Pantalla de Registro
**Formulario:** nombre, apellido, correo, teléfono (opcional), ciudad (opcional), contraseña y confirmación; link a login.

**Criterios de aceptación:**
- Incluye los campos mencionados (teléfono y ciudad opcionales salvo que se indique lo contrario).
- Correo con formato válido.
- Contraseña con mínimo 8 caracteres: al menos 1 mayúscula, 1 minúscula y 1 número.
- Confirmación de contraseña debe coincidir.
- Botón *Registrar* solo si todo es válido.
- Mensajes de error específicos (p. ej., “Las contraseñas no coinciden”).
- Tras registro exitoso, redirigir a Login automáticamente.
- Link a Login que redirige correctamente.

### 3) Home
**Métricas / secciones:**
- Visualización de Pokémon capturados.
- % de ocupación de la Pokédex (vs total de la API).
- Nivel promedio de los Pokémon capturados.
- Tipo favorito (tipo más frecuente).
- Experiencia total (suma de experiencia de la pokédex).
- Pokémon más fuerte (mayor **ATK**).
- **Mis Pokémon**: últimos 4 agregados.
- **Recomendados**: 2 Pokémon aleatorios del *top 100* más fuertes (rotan cada 10 minutos).

**Criterios de aceptación:**
- Mostrar total de Pokémon capturados.
- Mostrar % de ocupación basado en el total de la API.
- Mostrar nivel promedio, tipo favorito, experiencia total, y Pokémon con máximo ATK.
- “Mis Pokémon”: últimos 4 (o menos si no hay suficientes).
- “Recomendados”: 2 aleatorios del top 100 por ATK y cambiar cada 10 min.
- Si no hay capturados, mostrar “0”, “Ninguno” o “Sin datos” según corresponda.

### 4) Pokédex
**Requisitos:**
- Lista de Pokémon con tarjetas.
- Filtros por **tipo**, **región**, **generación**.
- Buscador por **nombre**, **tipo** o **región**.
- Contador total de Pokémon en la pokédex.

**Criterios de aceptación:**
- Lista con todos los Pokémon capturados del usuario.
- Contador total.
- Filtros combinables (tipo, región, generación) y búsqueda combinable con filtros.
- Mensaje “No se encontraron Pokémon con estos criterios” si no hay resultados.

### 5) Agregar más Pokémon a la pokédex (Pop‑up)
**Requisitos:**
- Pop‑up con **tabla** de Pokémon de la API (poblada inicialmente).
  - Si hay problemas de rendimiento: mostrar solo los **100 con mayor ATK**.
- Filtros: tipo, región, generación.
- Buscador: nombre, tipo, región.
- Columnas: **foto**, **nombre**, **Lv**, **ATK**, **DEF**, **SPD**.
- Ordenamiento: nombre (A‑Z), nivel, ATK, DEF, SPD.
- Checkbox por fila para **selección múltiple**, botón **“Agregar seleccionados”**.
- Al agregar, reflejar inmediatamente en la lista del usuario.
- Prevenir **duplicados** (mostrar “Ya agregado” o deshabilitar selección).

**Criterios de aceptación:**
- Pop‑up al hacer clic en “Agregar Pokémon”.
- Tabla con foto, nombre, Lv, ATK, DEF, SPD.
- Inicialmente todos los Pokémon de la API; si no es viable, top 100 por ATK.
- Filtros/búsqueda/orden combinables.
- Mensaje de no resultados según criterios.
- Selección múltiple y agregado masivo a la pokédex sin duplicados.

### 6) Mi equipo
**Requisitos:**
- Lista de equipos creados.
- **Estadísticas del equipo** = suma de estadísticas (ATK, DEF, SPD, etc.).
- **Distribución de tipos**: tipos únicos del equipo.
- Botón “+” abre componente para agregar Pokémon.
- Eliminar equipos.
- Vista independiente al abrir un equipo (detalle del equipo).

**Criterios de aceptación:**
- Ver todos los equipos con nombre y resumen de composición.
- Ver estadísticas acumuladas y distribución de tipos.
- “+” abre el componente de agregar Pokémon.
- Eliminar equipo completo.
- Vista detallada del equipo: listado de Pokémon, estadísticas y distribución.

### 7) Nuevo equipo
**Requisitos:**
- Crear nuevas agrupaciones con **nombre** y **límite de Pokémon**.

**Criterios de aceptación:**
- Formulario con:
  - Nombre (obligatorio).
  - Límite máximo de Pokémon (número > 0).
- Validaciones correspondientes.
- El nuevo equipo aparece en **Mi equipo** y se refleja de inmediato.

> Se incluyen imágenes de referencia en Figma.

**Figma:** https://www.figma.com/design/8w5gZj123uUy3ny0cCoejd/Untitled?node-id=0-1&t=KCx0rOyfEoLnV3ct-1

---

## Funcionalidades Esperadas

### Autenticación y Autorización
- Registro e inicio de sesión con validaciones.
- Gestión de sesión en **localStorage** / **sessionStorage**.
- Rutas públicas: *login, registro, pokédex*.
- Rutas privadas: *dashboard, equipo, perfil*.
- Roles: **Admin**, **Entrenador**, **Visitante**.

### Internacionalización (i18n)
- Soporte mínimo: **es**, **en**, **pt**.
- Implementación con **@ngx-translate**.
- Cambio dinámico de idioma (*plus*).

### Gestión de Estado y Caché
- Caché de datos de Pokémon.
- **localStorage** para preferencias de usuario.
- **sessionStorage** para datos temporales.
- Interceptores HTTP para caché automático (*plus*).

### Componentes y Vistas
- **Home** (*plus*): landing con info general.
- **Pokédex Público**: lista, filtros y detalle.
- **Mi Equipo**: gestión de equipos de usuario.
- **Dashboard** (*plus*): métricas globales.
- **Perfil de Usuario** (*plus*): edición de datos.

### Requisitos Técnicos
**Frameworks y librerías:**
- Angular 17+
- PrimeNG 17.3.0
- PrimeIcons
- Chart.js 6.0.1
- SweetAlert2
- @ngx-translate

**Arquitectura:**
- Servicios independientes por funcionalidad.
- Guards para rutas protegidas.
- Interceptores para manejo de errores.
- Pipes y directivas personalizadas cuando sea necesario (*plus*).

### API a consumir
- **PokeAPI** (`https://pokeapi.co`):
  - `pokemon`
  - `pokemon/{id}`
  - `evolution-chain/{id}`
  - `type`
  - `ability`
  - `move`

### Requisitos de UI/UX
- Diseño responsivo (desktop y mobile).
- Accesibilidad básica (navegación por teclado).
- Indicadores de carga.
- Alertas/confirmaciones para acciones críticas.
- Consistencia visual con el prototipo.

### Entregables
1. Código fuente en GitHub.
2. `README.md` con instalación y uso.
3. **Demo** desplegada (*plus*).
4. Documentación breve de decisiones técnicas.

### Criterios de Evaluación
- **Funcionalidad (40%)**: autenticación, vistas, caché, i18n.
- **Código y Arquitectura (30%)**: modularidad, servicios, tipado.
- **UI/UX (20%)**: responsivo, fidelidad, accesibilidad.
- **Documentación (10%)**: README, comentarios, APIs.

### Tiempo Estimado
- Recomendado: **5–7 días**.
- Subir el repo a GitHub y agregar a **@patogalarza** como colaborador.
- No se aceptan cambios posteriores a la entrega.

### Instrucciones Adicionales
- Usar datos falsos para autenticación.
- Implementar **al menos 5 modales/pop-ups**.
- Diseñar interfaces y modelos de datos según necesidad.
- Demostrar creatividad.
- Seguir buenas prácticas de Angular y TypeScript.

> 🔔 **Importante:** Los elementos marcados como *plus* son opcionales, pero suman positivamente en la evaluación al demostrar iniciativa, dominio técnico y atención al detalle.
