# CRUD de Usuarios

API REST para gestionar usuarios, desarrollada como parte del Taller Práctico No. 3 de Arquitectura de Software.

El proyecto utiliza **NestJS**, **TypeScript**, **TypeORM** y **MySQL**. La implementación busca aplicar separación de responsabilidades, inyección de dependencias, DTOs, interfaces y una arquitectura por capas.

## Tecnologías

- Node.js
- NestJS 11
- TypeScript
- TypeORM
- MySQL
- Jest para pruebas unitarias

## Arquitectura

El recorrido de una petición es:

```text
Cliente / Swagger
        ↓
UsuariosController
        ↓
UsuariosService
        ↓
UsuarioRepository
        ↓
TypeORM
        ↓
MySQL
```

### Responsabilidad de cada capa

- **Controller:** recibe las peticiones HTTP y devuelve las respuestas.
- **Service:** contiene los casos de uso y las reglas de negocio.
- **Repository:** encapsula las operaciones de persistencia con TypeORM.
- **Entity:** representa la tabla de usuarios en MySQL.
- **DTOs:** definen los datos de entrada y salida de la API.
- **Interfaces:** definen los contratos de los servicios y repositorios.

## Estructura actual

```text
src/
├── Controllers/
│   └── usuarios.controller.ts
├── DTOs/
│   ├── actualizar-usuario.dto.ts
│   ├── crear-usuario.dto.ts
│   └── response-usuario.dto.ts
├── Entities/
│   └── usuario.entity.ts
├── Interfaces/
│   ├── repository-usuario.interface.ts
│   └── service-usuario.interface.ts
├── Repositories/
│   └── usuario.repository.ts
├── Services/
│   └── usuarios.service.ts
├── modules/
│   └── usuarios.module.ts
├── app.module.ts
└── main.ts
```

## Requisitos previos

- Node.js instalado.
- MySQL instalado y ejecutándose localmente.
- Una base de datos MySQL creada.

## Configuración de MySQL

Actualmente la conexión está configurada en `src/app.module.ts` con estos valores:

```ts
{
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
}
```

Cambia estos valores según la configuración de MySQL de tu equipo. La opción `synchronize: true` permite que TypeORM sincronice automáticamente las entidades con la base de datos durante el desarrollo. No se recomienda utilizarla en producción.

## Instalación

```bash
npm install
```

## Ejecución

```bash
# Modo desarrollo
npm run start:dev

# Modo normal
npm run start

# Compilar el proyecto
npm run build

# Ejecutar la versión compilada
npm run start:prod
```

La API estará disponible en:

```text
http://localhost:3000
```

## Endpoints esperados

Cuando el CRUD esté implementado, la API deberá ofrecer los siguientes endpoints:

| Método | Endpoint | Acción |
|---|---|---|
| GET | `/usuarios` | Listar usuarios |
| GET | `/usuarios/:id` | Consultar un usuario |
| POST | `/usuarios` | Crear un usuario |
| PUT | `/usuarios/:id` | Actualizar un usuario |
| DELETE | `/usuarios/:id` | Eliminar un usuario |

## Ejemplo de usuario

### Crear usuario

```json
{
  "nombre": "Laura Gómez",
  "correo": "laura.gomez@correo.com",
  "telefono": "3001234567"
}
```

### Actualizar usuario

```json
{
  "nombre": "Laura Gómez Pérez",
  "correo": "laura.gomez@correo.com",
  "telefono": "3119876543",
  "activo": true
}
```

## Pruebas

```bash
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e
```

## Estado del proyecto

Actualmente se encuentran creadas la entidad `Usuario`, los DTOs, las interfaces, el módulo, el controller y el service base. Está pendiente completar la integración del repository con TypeORM, registrar correctamente las dependencias y desarrollar los endpoints CRUD.

## Entrega del taller

La entrega debe incluir:

1. Proyecto NestJS funcional.
2. Conexión con MySQL.
3. CRUD completo de usuarios.
4. Diagrama de la arquitectura implementada.
5. README con instrucciones de ejecución.
6. Respuestas a las preguntas de análisis.
7. Al menos dos mejoras adicionales del reto propuesto.
