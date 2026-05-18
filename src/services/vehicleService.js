import api from './api';

// Obtener todos los vehículos registrados
export const getVehicles = () => {
    return api.get('/vehicles');
};

// Registrar la movilidad de un nuevo empleado
export const createVehicle = (vehicleData) => {
    return api.post('/vehicles', vehicleData);
};

// Editar la información del vehículo o empleado
export const updateVehicle = (id, vehicleData) => {
    return api.put(`/vehicles/${id}`, vehicleData);
};

// Eliminar el registro del estacionamiento
export const deleteVehicle = (id) => {
    return api.delete(`/vehicles/${id}`);
};