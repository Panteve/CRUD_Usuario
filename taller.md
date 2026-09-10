# TALLER PRÁCTICO No. 3

## De la Arquitectura al Código: CRUD de Usuarios en .NET y SQL Server

#### Software Architecture-Ingeniería de Software-Uniempresarial

*.NET 8 Web API | C# | Entity Framework Core | SQL Server | Swagger*

Nombre <u>____________________________</u> Código ______________ Grupo ______________ Fecha ______________

### 1. Objetivo

Implementar una API REST sencilla para gestionar usuarios, aplicando los conceptos trabajados previamente: separación de responsabilidades, Controller, Service, Repository, interfaces, DTOs, inyección de dependencias, principios SOLID y conexión a una base de datos SQL Server.

### 2. Reto del taller

Construir una API denominada UsuarioApi que permita realizar las cuatro operaciones CRUD sobre usuarios: crear, consultar, actualizar y eliminar. La solución no debe concentrar toda la lógica en el Controller; debe respetar la estructura arquitectónica propuesta.

- Crear usuario.
- Consultar todos los usuarios.
- Consultar un usuario por Id.
- Actualizar un usuario existente.
- Eliminar un usuario.
### 3. Arquitectura mínima esperada

|Cliente / Swagger|
|---|
|↓|
|UsuariosController|
|↓|
|IUsuarioService / UsuarioService|
|↓|
|IUsuarioRepository / UsuarioRepository|
|↓|
|AppDbContext (Entity Framework Core)|
|↓|
|SQL Server|

Regla principal: el Controller atiende HTTP, el Service aplica la lógica del caso de uso, el Repository gestiona persistencia y Entity Framework Core realiza la interacción con SQL Server.

### 4. Herramientas necesarias

- Visual Studio 2022 o Visual Studio Code con SDK de .NET 8.
- SQL Server Developer/Express o una instancia disponible de SQL Server.

- SQL Server Management Studio (SSMS) o Azure Data Studio.
- Postman (opcional) o Swagger para probar la API.
- Git (recomendado para el control de versiones).
### 5. Paso 1 - Crear el proyecto

Desde una terminal, cree una Web API de .NET 8:

```
dotnet new webapi -n UsuarioApi
cd UsuarioApi
```
Instale los paquetes de Entity Framework Core para SQL Server:

```
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.EntityFrameworkCore.Design
```
### 6. Paso 2 - Crear la estructura de carpetas

```
UsuarioApi/
├── Controllers/
├── Data/
├── DTOs/
├── Entities/
├── Interfaces/
├── Repositories/
├── Services/
├── Program.cs
└── appsettings.json
```

|Carpeta|Responsabilidad|
|---|---|
|Controllers|Exponer endpoints HTTP.|
|Services|Implementar casos de uso y reglas de negocio.|
|Repositories|Encapsular el acceso a datos.|
|Interfaces|Definir contratos entre componentes.|
|Entities|Representar entidades persistidas.|
|DTOs|Definir datos de entrada y salida de la API.|
|Data|Configurar Entity Framework Core y el DbContext.|

### 7. Paso 3 - Crear la entidad Usuario

#### Cree el archivo Entities/Usuario.cs:

```
namespace UsuarioApi.Entities;
public class Usuario
{
public int Id { get; set; }
public string Nombre { get; set; } = string.Empty;
public string Correo { get; set; } = string.Empty;
public string Telefono { get; set; } = string.Empty;
public bool Activo { get; set; } = true;
public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
}
```

### 8. Paso 4 - Crear los DTOs

No utilice la entidad directamente como contrato HTTP. Cree DTOs para separar la persistencia de la API.

||namespace UsuarioApi.DTOs;|
|---|---|
||public record CrearUsuarioDto( string Nombre, string Correo, string Telefono|
|);|public record ActualizarUsuarioDto( string Nombre, string Correo, string Telefono, bool Activo|
|);|public record UsuarioResponseDto( int Id, string Nombre, string Correo, string Telefono, bool Activo|
|);||

### 9. Paso 5 - Configurar Entity Framework Core

#### Cree Data/AppDbContext.cs:

```
using Microsoft.EntityFrameworkCore;
using UsuarioApi.Entities;
namespace UsuarioApi.Data;
public class AppDbContext : DbContext
{
public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
public DbSet<Usuario> Usuarios => Set<Usuario>();
}
```
### 10. Paso 6 - Configurar la cadena de conexión

En appsettings.json agregue una conexión a SQL Server. Ajuste Server según su ambiente:

|{|
|---|
|"ConnectionStrings": {|
|"DefaultConnection":|
|"Server=localhost;Database=SoftwareArchitectureDb;Trusted_Connection=True;TrustServerCertificate=True;"|
|}|
|}|

Si utiliza autenticación SQL, reemplace la cadena de conexión por la correspondiente a su servidor. No publique contraseñas reales en repositorios.

### 11. Paso 7 - Definir el contrato del Repository

```
using UsuarioApi.Entities;
namespace UsuarioApi.Interfaces;
public interface IUsuarioRepository
{
Task<List<Usuario>> ObtenerTodosAsync();
Task<Usuario?> ObtenerPorIdAsync(int id);
Task<Usuario?> ObtenerPorCorreoAsync(string correo);
Task<Usuario> CrearAsync(Usuario usuario);
Task ActualizarAsync(Usuario usuario);
Task EliminarAsync(Usuario usuario);
}
```
### 12. Paso 8 - Implementar UsuarioRepository

```
using Microsoft.EntityFrameworkCore;
using UsuarioApi.Data;
using UsuarioApi.Entities;
using UsuarioApi.Interfaces;
namespace UsuarioApi.Repositories;
public class UsuarioRepository : IUsuarioRepository
{
private readonly AppDbContext _context;
public UsuarioRepository(AppDbContext context)
{
_context = context;
}
public Task<List<Usuario>> ObtenerTodosAsync() =>
_context.Usuarios.AsNoTracking().ToListAsync();
public Task<Usuario?> ObtenerPorIdAsync(int id) =>
_context.Usuarios.FirstOrDefaultAsync(x => x.Id == id);
public Task<Usuario?> ObtenerPorCorreoAsync(string correo) =>
_context.Usuarios.FirstOrDefaultAsync(x => x.Correo == correo);
public async Task<Usuario> CrearAsync(Usuario usuario)
{
_context.Usuarios.Add(usuario);
await _context.SaveChangesAsync();
return usuario;
}
public async Task ActualizarAsync(Usuario usuario)
{
await _context.SaveChangesAsync();
}
public async Task EliminarAsync(Usuario usuario)
{
_context.Usuarios.Remove(usuario);
await _context.SaveChangesAsync();
```

```
}
}
```
### 13. Paso 9 - Crear el Service y aplicar reglas de negocio

#### Primero defina el contrato:

```
using UsuarioApi.DTOs;
namespace UsuarioApi.Interfaces;
public interface IUsuarioService
{
Task<List<UsuarioResponseDto>> ObtenerTodosAsync();
Task<UsuarioResponseDto?> ObtenerPorIdAsync(int id);
Task<UsuarioResponseDto> CrearAsync(CrearUsuarioDto dto);
Task<bool> ActualizarAsync(int id, ActualizarUsuarioDto dto);
Task<bool> EliminarAsync(int id);
}
```
Después implemente UsuarioService. Como regla mínima, el correo no debe repetirse:

```
using UsuarioApi.DTOs;
using UsuarioApi.Entities;
using UsuarioApi.Interfaces;
namespace UsuarioApi.Services;
public class UsuarioService : IUsuarioService
{
private readonly IUsuarioRepository _repository;
public UsuarioService(IUsuarioRepository repository)
{
_repository = repository;
}
public async Task<List<UsuarioResponseDto>> ObtenerTodosAsync()
{
var usuarios = await _repository.ObtenerTodosAsync();
return usuarios.Select(Mapear).ToList();
}
public async Task<UsuarioResponseDto?> ObtenerPorIdAsync(int id)
{
var usuario = await _repository.ObtenerPorIdAsync(id);
return usuario is null ? null : Mapear(usuario);
}
public async Task<UsuarioResponseDto> CrearAsync(CrearUsuarioDto dto)
{
var existente = await _repository.ObtenerPorCorreoAsync(dto.Correo);
if (existente is not null)
throw new InvalidOperationException("El correo ya está registrado.");
var usuario = new Usuario
{
Nombre = dto.Nombre.Trim(),
Correo = dto.Correo.Trim().ToLower(),
Telefono = dto.Telefono.Trim()
```

```
};
await _repository.CrearAsync(usuario);
return Mapear(usuario);
}
public async Task<bool> ActualizarAsync(int id, ActualizarUsuarioDto dto)
{
var usuario = await _repository.ObtenerPorIdAsync(id);
if (usuario is null) return false;
usuario.Nombre = dto.Nombre.Trim();
usuario.Correo = dto.Correo.Trim().ToLower();
usuario.Telefono = dto.Telefono.Trim();
usuario.Activo = dto.Activo;
await _repository.ActualizarAsync(usuario);
return true;
}
public async Task<bool> EliminarAsync(int id)
{
var usuario = await _repository.ObtenerPorIdAsync(id);
if (usuario is null) return false;
await _repository.EliminarAsync(usuario);
return true;
}
private static UsuarioResponseDto Mapear(Usuario u) =>
new(u.Id, u.Nombre, u.Correo, u.Telefono, u.Activo);
}
```
### 14. Paso 10 - Crear UsuariosController

```
using Microsoft.AspNetCore.Mvc;
using UsuarioApi.DTOs;
using UsuarioApi.Interfaces;
namespace UsuarioApi.Controllers;
[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
private readonly IUsuarioService _service;
public UsuariosController(IUsuarioService service)
{
_service = service;
}
[HttpGet]
public async Task<IActionResult> Get() =>
Ok(await _service.ObtenerTodosAsync());
[HttpGet("{id:int}")]
public async Task<IActionResult> GetById(int id)
{
```

```
var usuario = await _service.ObtenerPorIdAsync(id);
return usuario is null ? NotFound() : Ok(usuario);
}
[HttpPost]
public async Task<IActionResult> Post(CrearUsuarioDto dto)
{
try
{
var creado = await _service.CrearAsync(dto);
return CreatedAtAction(nameof(GetById), new { id = creado.Id }, creado);
}
catch (InvalidOperationException ex)
{
return BadRequest(new { mensaje = ex.Message });
}
}
[HttpPut("{id:int}")]
public async Task<IActionResult> Put(int id, ActualizarUsuarioDto dto)
{
var actualizado = await _service.ActualizarAsync(id, dto);
return actualizado ? NoContent() : NotFound();
}
[HttpDelete("{id:int}")]
public async Task<IActionResult> Delete(int id)
{
var eliminado = await _service.EliminarAsync(id);
return eliminado ? NoContent() : NotFound();
}
}
```
### 15. Paso 11 - Registrar dependencias en Program.cs

```
using Microsoft.EntityFrameworkCore;
using UsuarioApi.Data;
using UsuarioApi.Interfaces;
using UsuarioApi.Repositories;
using UsuarioApi.Services;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
var app = builder.Build();
if (app.Environment.IsDevelopment())
{
app.UseSwagger();
app.UseSwaggerUI();
```

```
}
app.UseHttpsRedirection();
app.MapControllers();
app.Run();
```
### 16. Paso 12 - Crear la base de datos con Migraciones

#### Ejecute los siguientes comandos:

```
dotnet ef migrations add InitialCreate
dotnet ef database update
```
Valide en SQL Server que exista la base SoftwareArchitectureDb y la tabla Usuarios.

### 17. Endpoints que deben funcionar

|Método|Endpoint|Acción|Respuesta esperada|
|---|---|---|---|
|GET|/api/usuarios|Listar usuarios|200 OK|
|GET|/api/usuarios/{id}|Consultar por Id|200 OK / 404|
|POST|/api/usuarios|Crear usuario|201 Created / 400|
|PUT|/api/usuarios/{id}|Actualizar usuario|204 / 404|
|DELETE|/api/usuarios/{id}|Eliminar usuario|204 / 404|

### 18. Datos para probar

#### POST /api/usuarios

```
{
"nombre": "Laura Gómez",
"correo": "laura.gomez@correo.com",
"telefono": "3001234567"
}
```
#### PUT /api/usuarios/1

```
{
"nombre": "Laura Gómez Pérez",
"correo": "laura.gomez@correo.com",
"telefono": "3119876543",
"activo": true
}
```
### 19. Preguntas de análisis obligatorias

1. ¿Por qué UsuariosController no debería consultar directamente AppDbContext?
2. ¿Qué principio SOLID se evidencia al depender de IUsuarioRepository en lugar de UsuarioRepository?
3. ¿Qué ventaja ofrece usar DTOs en lugar de devolver la entidad Usuario?
4. ¿En qué componente ubicó la regla de correo único y por qué?
5. ¿Qué tendría que cambiar si mañana SQL Server se reemplaza por otra tecnología?

|• • • • • • • • • • • • •|6. ¿Qué código HTTP retorna cada endpoint y por qué? 9. ¿Qué responsabilidad tiene AppDbContext? 20. Reto adicional Validación formal de correo y campos obligatorios. Búsqueda de usuarios por nombre o correo. Paginación en GET /api/usuarios. Eliminación lógica en lugar de eliminación física. Manejo global de excepciones mediante middleware. Auditoría básica con FechaActualizacion. 21. Entregables Proyecto .NET funcional. Diagrama de la arquitectura implementada. README con instrucciones para ejecutar el proyecto. Respuestas a las 10 preguntas de análisis. 22. Criterios de evaluación|7. ¿Dónde agregaría una validación para impedir nombres vacíos? 8. ¿Cómo probaría UsuarioService sin conectarse a SQL Server? 10. Dibuje el recorrido completo de una petición POST desde Swagger hasta SQL Server y de regreso. Después de completar el CRUD básico, implemente al menos DOS de las siguientes mejoras: Pruebas unitarias de UsuarioService usando un Repository simulado. Script o evidencia de la base de datos SQL Server creada. Capturas de Swagger demostrando las cinco operaciones CRUD.|
|---|---|---|
||Criterio CRUD funcional y conexión con SQL Server Separación Controller / Service / Repository Interfaces, DTOs e inyección de dependencias Manejo de respuestas HTTP y validaciones Calidad y organización del código Diagrama y respuestas de análisis Reto adicional|Valor 30% 20% 15% 10% 10% 10% 5%|
||23. Resultado esperado|Al finalizar, el estudiante debe poder explicar y demostrar cómo una decisión arquitectónica se materializa en código: el Controller recibe HTTP, el Service contiene el caso de uso, el Repository abstrae la persistencia, las interfaces controlan dependencias y SQL Server almacena la información. El objetivo no es únicamente que el CRUD funcione, sino que su estructura sea coherente con los principios estudiados en Software Architecture.|
