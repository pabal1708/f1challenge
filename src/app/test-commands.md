# 🧪 Suite de Tests - Guía de Uso

## Comandos para ejecutar tests

### Ejecutar todos los tests
```bash
ng test
```

### Ejecutar tests en modo watch (se ejecutan automáticamente al hacer cambios)
```bash
ng test --watch
```

### Ejecutar tests una sola vez (útil para CI/CD)
```bash
ng test --watch=false --browsers=ChromeHeadless
```

### Ejecutar tests con coverage
```bash
ng test --code-coverage
```

## 📋 Tests Creados

### ✅ HomeComponent (`/src/app/home/home.spec.ts`)
- **Renderizado**: Verifica que el componente se cree correctamente
- **Sidebar**: Confirma que se renderice el componente sidebar
- **Router Outlet**: Verifica la presencia del router-outlet para navegación

### ✅ DriversComponent (`/src/app/drivers/drivers.spec.ts`)
- **Renderizado**: Verifica creación del componente y título "Listado Completo de Pilotos"
- **Carga de datos**: Simula y verifica la carga de pilotos desde la API
- **Estado inicial**: Confirma que inicia con array vacío de pilotos

### ✅ TeamsComponent (`/src/app/teams/teams.spec.ts`)
- **Renderizado**: Verifica creación del componente y título "Equipos de Fórmula 1"
- **Carga de datos**: Simula y verifica la carga de equipos desde la API
- **Estado inicial**: Confirma que inicia con array vacío de equipos

### ✅ DriverSearchComponent (`/src/app/driver-search/driver-search.spec.ts`)
- **Renderizado**: Verifica creación del componente y título "Buscador de Pilotos"
- **Búsqueda manual**: Testa la función de búsqueda con el botón
- **Búsqueda automática**: Verifica el debounce y búsqueda automática
- **Validaciones**: Testa mensajes de warning, info y error
- **Limpeza de resultados**: Verifica que se limpien resultados con términos cortos

### ✅ StandingsComponent (`/src/app/standings/standings.spec.ts`)
- **Renderizado**: Verifica creación del componente
- **Contenido básico**: Confirma el contenido placeholder actual

## 🎯 Cobertura de Tests

Los tests cubren:
- ✅ **Creación de componentes**
- ✅ **Renderizado de títulos**
- ✅ **Funciones básicas** (cargar datos, buscar)
- ✅ **Manejo de errores**
- ✅ **Validaciones de entrada**
- ✅ **Estados iniciales**

## 🔧 Mocks y Servicios

- **F1ApiService**: Mockeado con jasmine.createSpyObj
- **NzMessageService**: Mockeado para testing de notificaciones
- **RouterTestingModule**: Para componentes con routing

## 📊 Estructura de los Mocks

```typescript
// Ejemplo de mock de respuesta de drivers
const mockDriversResponse: DriversApiResponse = {
  drivers: [
    {
      id: 1,
      name: 'Lewis',
      surname: 'Hamilton',
      nationality: 'British',
      birthday: '1985-01-07',
      url: 'http://test.com',
      number: 44,
      shortName: 'HAM'
    }
  ]
};
```

---

**Nota**: Los tests están diseñados para ser simples pero efectivos, cubriendo los casos de uso principales de cada componente.