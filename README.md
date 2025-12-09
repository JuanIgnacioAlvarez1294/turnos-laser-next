# Turnos Láser

## Descripción
Turnos Láser es una aplicación web diseñada para gestionar turnos de depilación láser. Permite a los usuarios reservar, modificar y cancelar turnos, así como realizar pagos a través de Mercado Pago. Además, ofrece un panel de administración para gestionar turnos y servicios.

## Tecnologías Utilizadas
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Auth, Hosting)
- **Pagos**: Mercado Pago Checkout PRO

## Estructura del Proyecto
```
turnos-laser-next
├── app
│   ├── layout.tsx
│   ├── page.tsx
│   ├── head.tsx
│   ├── favicon.ico
│   ├── admin
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── dashboard
│   │   └── page.tsx
│   ├── user
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── reservas
│   │   ├── page.tsx
│   │   └── [turnoId]
│   │       └── page.tsx
│   └── api
│       ├── auth
│       │   └── route.ts
│       ├── mercado-pago
│       │   ├── create_payment
│       │   │   └── route.ts
│       │   └── webhook
│       │       └── route.ts
│       └── turnos
│           └── route.ts
├── src
│   ├── components
│   │   ├── ui
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Modal.tsx
│   │   ├── turnos
│   │   │   ├── TurnoForm.tsx
│   │   │   ├── Calendar.tsx
│   │   │   └── TurnoCard.tsx
│   │   └── admin
│   │       ├── DashboardCards.tsx
│   │       └── TurnosTable.tsx
│   ├── hooks
│   │   ├── useAuth.ts
│   │   ├── useTurnos.ts
│   │   └── useViewport.ts
│   ├── contexts
│   │   └── AuthContext.tsx
│   ├── lib
│   │   ├── firebase
│   │   │   ├── client.ts
│   │   │   └── admin.ts
│   │   └── mercadoPago.ts
│   ├── services
│   │   ├── turnos.service.ts
│   │   ├── servicios.service.ts
│   │   └── usuarios.service.ts
│   ├── utils
│   │   ├── seo.ts
│   │   ├── dates.ts
│   │   └── notifications.ts
│   ├── types
│   │   └── index.ts
│   └── styles
│       └── globals.css
├── public
│   ├── robots.txt
│   └── sitemap.xml
├── functions
│   ├── src
│   │   ├── index.ts
│   │   ├── sendPushNotifications.ts
│   │   └── mercadoPagoWebhook.ts
│   ├── package.json
│   └── tsconfig.json
├── scripts
│   ├── generate-sitemap.mjs
│   └── seed-data.mjs
├── .env.example
├── .firebaserc
├── firebase.json
├── next.config.js
├── tsconfig.json
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next-sitemap.config.js
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
└── README.md
```

## Instalación
1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd turnos-laser-next
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env` basado en `.env.example`.

4. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

## Funcionalidades
### Usuario
- Ver servicios disponibles.
- Reservar, modificar y cancelar turnos.
- Recibir notificaciones sobre el estado de los turnos.
- Panel de usuario con historial y datos personales.

### Administrador
- Dashboard para gestionar turnos y servicios.
- Crear, editar y eliminar servicios.
- Enviar notificaciones push.

## SEO
- Optimización de metadatos y generación automática de sitemap.

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cambios.

## Licencia
Este proyecto está bajo la Licencia MIT.