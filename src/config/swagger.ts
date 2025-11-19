  import swaggerJsdoc from 'swagger-jsdoc';
  import { fileURLToPath } from 'url';
  import { dirname, join } from 'path';
  import { env } from './env.js';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Express + PostgreSQL',
        version: '1.0.0',
        description: 'API REST con autenticación JWT, validación Zod, rate limiting y testing completo',
        contact: {
          name: 'API Support',
        },
      },
      servers: [
        {
          url: `http://localhost:${env.PORT}`,
          description: 'Servidor de desarrollo',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: 'ID del usuario',
              },
              email: {
                type: 'string',
                format: 'email',
                description: 'Email del usuario',
              },
              name: {
                type: 'string',
                description: 'Nombre del usuario',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de creación',
              },
            },
          },
          RegisterInput: {
            type: 'object',
            required: ['email', 'name', 'password'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
                description: 'Email del usuario',
              },
              name: {
                type: 'string',
                minLength: 2,
                description: 'Nombre del usuario',
              },
              password: {
                type: 'string',
                minLength: 8,
                description: 'Contraseña del usuario',
              },
            },
          },
          LoginInput: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
              },
              password: {
                type: 'string',
                minLength: 8,
              },
            },
          },
          AuthResponse: {
            type: 'object',
            properties: {
              user: {
                $ref: '#/components/schemas/User',
              },
              token: {
                type: 'string',
                description: 'JWT token',
              },
            },
          },
          UpdateProfileInput: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                format: 'email',
              },
              name: {
                type: 'string',
                minLength: 2,
              },
            },
          },
          ChangePasswordInput: {
            type: 'object',
            required: ['currentPassword', 'newPassword'],
            properties: {
              currentPassword: {
                type: 'string',
              },
              newPassword: {
                type: 'string',
                minLength: 8,
              },
            },
          },
          Trip: {
            type: 'object',
            properties: {
              id: { 
                type: 'integer', 
                description: 'ID del itinerario' },
              title: { 
                type: 'string', 
                description: 'Título del viaje' },
              description: { 
                type: 'string', 
                description: 'Descripción del viaje' },
              startDate: { 
                type: 'string', 
                format: 'date', 
                description: 'Fecha de inicio' },
              endDate: { 
                type: 'string', 
                format: 'date', 
                description: 'Fecha de fin' },
              userId: { 
                type: 'integer', 
                description: 'ID del usuario dueño del viaje' },
              createdAt: { 
                type: 'string', 
                format: 'date-time', 
                description: 'Fecha de creación' },
            },
          },
          CreateTripInput: {
            type: 'object',
            required: ['title', 'userId'],
            properties: {
              title: { 
                type: 'string', 
                minLength: 3, 
                description: 'Título del viaje' },
              description: { 
                type: 'string', 
                description: 'Descripción del viaje' },
              startDate: { 
                type: 'string', 
                format: 'date', 
                description: 'Fecha de inicio' },
              endDate: { 
                type: 'string', 
                format: 'date', 
                description: 'Fecha de fin' },
              userId: { 
                type: 'integer', 
                description: 'ID del usuario dueño del viaje' },
            },
          },
          UpdateTripInput: {
            type: 'object',
            properties: {
              title: { 
                type: 'string', 
                minLength: 3, 
                description: 'Título del viaje' },
              description: { 
                type: 'string', 
                description: 'Descripción del viaje' },
              startDate: { 
                type: 'string', 
                format: 'date', 
                description: 'Fecha de inicio' },
              endDate: { 
                type: 'string', 
                format: 'date', 
                description: 'Fecha de fin' },
            },
          },
          Error: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
          },
        },
      },
      tags: [
        {
          name: 'Auth',
          description: 'Endpoints de autenticación',
        },
        {
          name: 'Users',
          description: 'Gestión de usuarios',
        },
        { name: 'Trip', 
          description: 'Gestión de de los viajes' 
        }
      ],
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID del usuario',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
            },
            name: {
              type: 'string',
              description: 'Nombre del usuario',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
          },
        },

        Profile: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del perfil',
            },
            name: {
              type: 'string',
              description: 'Nombre del perfil',
            },
            bio: {
              type: 'string',
              description: 'Descripción breve o biografía del usuario',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del perfil',
            },
          },
        },

        CreateProfileInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              description: 'Nombre del perfil',
            },
            bio: {
              type: 'string',
              description: 'Descripción opcional del perfil',
            },
          },
        },

        RegisterInput: {
          type: 'object',
          required: ['email', 'name', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
            },
            name: {
              type: 'string',
              minLength: 2,
              description: 'Nombre del usuario',
            },
            password: {
              type: 'string',
              minLength: 8,
              description: 'Contraseña del usuario',
            },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            password: {
              type: 'string',
              minLength: 8,
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
            },
            token: {
              type: 'string',
              description: 'JWT token',
            },
          },
        },
        UpdateProfileInput: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            name: {
              type: 'string',
              minLength: 2,
            },
          },
        },
        ChangePasswordInput: {
          type: 'object',
          required: ['currentPassword', 'newPassword'],
          properties: {
            currentPassword: {
              type: 'string',
            },
            newPassword: {
              type: 'string',
              minLength: 8,
            },
          },
        },
        Trip: {
          type: 'object',
          properties: {
            id: { 
              type: 'integer', 
              description: 'ID del itinerario' },
            title: { 
              type: 'string', 
              description: 'Título del viaje' },
            description: { 
              type: 'string', 
              description: 'Descripción del viaje' },
            startDate: { 
              type: 'string', 
              format: 'date', 
              description: 'Fecha de inicio' },
            endDate: { 
              type: 'string', 
              format: 'date', 
              description: 'Fecha de fin' },
            userId: { 
              type: 'integer', 
              description: 'ID del usuario dueño del viaje' },
            createdAt: { 
              type: 'string', 
              format: 'date-time', 
              description: 'Fecha de creación' },
          },
        },
        CreateTripInput: {
          type: 'object',
          required: ['title', 'userId'],
          properties: {
            title: { 
              type: 'string', 
              minLength: 3, 
              description: 'Título del viaje' },
            description: { 
              type: 'string', 
              description: 'Descripción del viaje' },
            startDate: { 
              type: 'string', 
              format: 'date', 
              description: 'Fecha de inicio' },
            endDate: { 
              type: 'string', 
              format: 'date', 
              description: 'Fecha de fin' },
            userId: { 
              type: 'integer', 
              description: 'ID del usuario dueño del viaje' },
          },
        },
        UpdateTripInput: {
          type: 'object',
          properties: {
            title: { 
              type: 'string', 
              minLength: 3, 
              description: 'Título del viaje' },
            description: { 
              type: 'string', 
              description: 'Descripción del viaje' },
            startDate: { 
              type: 'string', 
              format: 'date', 
              description: 'Fecha de inicio' },
            endDate: { 
              type: 'string', 
              format: 'date', 
              description: 'Fecha de fin' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Auth',
        description: 'Endpoints de autenticación',
      },
      {
        name: 'Users',
        description: 'Gestión de usuarios',
      },
      {
        name: 'Profiles',
        description: 'Gestión básica de perfiles de usuario',
      },
      { name: 'Trip', 
          description: 'Gestión de de los viajes' 
      }
    ],
    apis: [
      //join(__dirname, '../routes/*.ts'),
      //join(__dirname, '../routes/*.js'),
      //join(__dirname, '../index.ts'),
      //join(__dirname, '../index.js'),
      join(__dirname, '../modules/**/*.routes.js')
    ],
  }

  export const swaggerSpec = swaggerJsdoc(options);

