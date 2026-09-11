# CRUD de Usuarios

API REST para gestionar usuarios, desarrollada para el Taller Práctico No. 3 de Arquitectura de Software con NestJS, TypeScript, TypeORM y MySQL.

**Trabajo realizado por:** Diego Rojas y Brian Alba.

## Instalación y ejecución

### 1. Requisitos previos

- Node.js instalado.
- MySQL instalado y ejecutándose.
- Un schema de MySQL creado para el proyecto.

### 2. Configurar la base de datos

En `src/app.module.ts`, ajusta los datos de conexión a los de tu instalación local de MySQL:

```ts
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: '',
  database: 'flavio',
  entities: [Usuario],
  synchronize: true,
});
```

El valor de `database` debe ser el nombre exacto de tu schema. La opción `synchronize: true` crea o actualiza las tablas automáticamente durante el desarrollo; no debe usarse en producción.

### 3. Instalar dependencias

Desde la carpeta del proyecto, ejecuta:

```bash
npm install
```

### 4. Iniciar la API

```bash
# Modo desarrollo: se reinicia al guardar cambios
npm run start:dev

# Modo normal
npm run start
```

La API queda disponible en `http://localhost:3000` y Swagger en `http://localhost:3000/doc`.

## Endpoints

Todos los endpoints usan el prefijo `/api`:

| Método | Endpoint | Acción |
|---|---|---|
| GET | `/api/usuarios` | Listar usuarios |
| GET | `/api/usuarios/:id` | Consultar un usuario |
| POST | `/api/usuarios` | Crear un usuario |
| PUT | `/api/usuarios/:id` | Actualizar un usuario |
| DELETE | `/api/usuarios/:id` | Eliminar un usuario |

## Ejemplos de datos

### Crear usuario

```json
{
  "Nombre": "Laura Gómez",
  "Correo": "laura.gomez@correo.com",
  "Telefono": "3001234567"
}
```

### Actualizar usuario

```json
{
  "Nombre": "Laura Gómez Pérez",
  "Correo": "laura.gomez@correo.com",
  "Telefono": "3119876543",
  "Activo": true
}
```

## Arquitectura

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

- **Controller:** recibe las peticiones HTTP y devuelve respuestas.
- **Service:** implementa casos de uso y reglas de negocio.
- **Repository:** gestiona la persistencia mediante TypeORM.
- **Entity:** representa la tabla de usuarios.
- **DTOs:** definen los datos de entrada y salida.
- **Interfaces y tokens:** desacoplan controller, service y repository.

## Estructura

```text
src/
├── Controllers/usuarios.controller.ts
├── DTOs/
├── Entities/usuario.entity.ts
├── Interfaces/
├── Repositories/usuario.repository.ts
├── Services/usuarios.service.ts
├── modules/usuarios.module.ts
├── app.module.ts
└── main.ts
```

## Otros comandos

```bash
# Compilar
npm run build

# Ejecutar la versión compilada
npm run start:prod

```
