# ✨ Turnos Láser - Sistema de Reservas (Next.js + Firebase)

Aplicación moderna para la gestión y reserva de turnos desarrollada con **Next.js 14**, **Firebase**, **TypeScript**, **TailwindCSS** y **shadcn/ui**.  
Incluye un **panel de administración seguro**, login con roles, manejo de turnos, servicios y vista optimizada para móviles.

---

## 🚀 Tecnologías utilizadas

- **Next.js 14 (App Router)**
- **React + TypeScript**
- **Firebase Authentication**
- **Cloud Firestore Database**
- **TailwindCSS**
- **shadcn/ui**
- **Vercel (opcional para deploy)**

---

## 🧩 Funcionalidades principales

### 🧑‍🤝‍🧑 Área Pública
- Reserva de turnos online.
- Selección de servicios.
- Selección de fecha y hora disponible.
- Confirmación visual de reserva.
- Diseño adaptable (mobile-first).

### 🛡️ Área de Administración (solo para usuarios con rol "admin")
- Login seguro con Firebase.
- Validación de roles mediante Firestore.
- Panel de control con resumen de turnos.
- Tabla de turnos con opciones para:
  - Ver
  - Editar
  - Eliminar
- Gestión interna sin acceso público.

---

## 🔐 Roles y seguridad

Para acceder al panel `/admin`, un usuario debe:

1. Estar registrado en **Firebase Authentication**.
2. Tener un documento en **Firestore**, colección `users`, con:
   ```json
   {
     "email": "admin@miapp.com",
     "role": "admin"
   }

- Optimización de metadatos y generación automática de sitemap.

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cambios.

## Licencia
Este proyecto está bajo la Licencia MIT.
