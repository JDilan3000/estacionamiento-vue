# Sistema de Control de Estacionamiento

Este proyecto es una aplicación web desarrollada con Vue 3, Vite y TypeScript, conectada a un backend simulado mediante `json-server-auth`. Permite gestionar el registro de vehículos de los empleados de la empresa, organizados por áreas de trabajo.

## Características

- Autenticación segura basada en Axios.
- Operaciones CRUD completas para el control de vehículos.
- Buscador en tiempo real por nombre de empleado.
- Filtro dinámico por tipo de vehículo.

---

## Instrucciones para la Ejecución Local

Siga estos pasos para clonar, instalar y levantar el proyecto sin errores de dependencias:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/JDilan3000/estacionamiento-vue.git](https://github.com/JDilan3000/estacionamiento-vue.git)
cd estacionamiento-vue
```

### 2. Configurar variables de entorno (Opcional)
Si es necesario, configure la URL base de la API creando un archivo .env en la raíz con el siguiente contenido:

```bash
VITE_API_URL=http://localhost:3000
```

### 3. Ejecutar la instalación de dependencias
Descargue los paquetes locales requeridos tanto para el frontend como para el backend simulado:

```bash
npm install
```

### 4. Levantar la Base de Datos y Autenticación (Backend)
Inicie el servidor de datos con soporte de reglas JWT en el puerto 3000 mediante npx:

```bash
npx json-server-auth db.json --port 3000 -r routes.json
```

### 5. Ejecutar el Servidor de Desarrollo (Frontend)
En una nueva terminal, ejecute el siguiente comando para inicializar la interfaz de usuario:

```bash
npm run dev
```

Acceda a la aplicación mediante el enlace local generado en pantalla (usualmente http://localhost:5173).