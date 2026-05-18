<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary">Control de vehículos</h2>
      <button class="btn btn-success" @click="openCreateModal">Registrar Vehículo</button>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <input 
          v-model="searchQuery" 
          type="text" 
          class="form-control" 
          placeholder="Buscar por nombre de empleado..."
        />
      </div>
      <div class="col-md-6">
        <select v-model="filterType" class="form-select">
          <option value="">Todos los tipos de vehículo</option>
          <option value="automóvil">Automóvil</option>
          <option value="moto">Moto</option>
        </select>
      </div>
    </div>

    <div class="table-responsive bg-white p-3 rounded shadow-sm">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>Empleado</th>
            <th>Área de Trabajo</th>
            <th>Tipo de Vehículo</th>
            <th>Número de Placa</th>
            <th>Color</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehicle in filteredVehicles" :key="vehicle.id">
            <td><strong>{{ vehicle.employeeName }}</strong></td>
            <td><span class="badge bg-secondary text-capitalize">{{ vehicle.area }}</span></td>
            <td>
              <span v-if="vehicle.vehicleType === 'automóvil'">Automóvil</span>
              <span v-else>Moto</span>
            </td>
            <td><code class="text-dark fw-bold">{{ vehicle.plateNumber }}</code></td>
            <td>{{ vehicle.color }}</td>
            <td class="text-center">
              <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-primary" @click="openEditModal(vehicle)">Editar</button>
                <button class="btn btn-outline-danger" @click="handleDelete(vehicle.id)">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredVehicles.length === 0">
            <td colspan="6" class="text-center text-muted py-4">
              No se encontraron registros de vehículos que coincidan con los filtros.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BaseModal v-model="showModal">
      <h3 class="mb-3 text-dark">{{ isEditing ? 'Editar Registro' : 'Registrar Movilidad' }}</h3>
      <form @submit.prevent="handleSubmit">
        
        <div class="mb-3">
          <label class="form-label fw-bold">Nombre del Empleado</label>
          <input v-model="form.employeeName" type="text" class="form-control" required placeholder="Ej: Pedro Flores" />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Área en la que Trabaja</label>
          <select v-model="form.area" class="form-select" required>
            <option value="producción">Producción</option>
            <option value="finanzas">Finanzas</option>
            <option value="contabilidad">Contabilidad</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Tipo de Vehículo</label>
          <select v-model="form.vehicleType" class="form-select" required>
            <option value="automóvil">Automóvil</option>
            <option value="moto">Moto</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Número de Placa</label>
          <input v-model="form.plateNumber" type="text" class="form-control" required placeholder="Ej: 4721-XYZ" />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Color del Vehículo</label>
          <input v-model="form.color" type="text" class="form-control" required placeholder="Ej: Blanco, Rojo" />
        </div>

        <button type="submit" class="btn btn-primary w-100 mt-2">
          {{ isEditing ? 'Guardar Cambios' : 'Registrar Ingreso' }}
        </button>
      </form>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from '@/services/vehicleService';
import BaseModal from '@/components/BaseModal.vue';

const vehicles = ref([]);
const searchQuery = ref('');
const filterType = ref('');
const showModal = ref(false);
const isEditing = ref(false);
const currentId = ref(null);

const form = ref({
  employeeName: '',
  area: 'producción',
  vehicleType: 'automóvil',
  plateNumber: '',
  color: ''
});

const loadVehicles = async () => {
  try {
    const res = await getVehicles();
    vehicles.value = res.data;
  } catch (error) {
    console.error("Error al cargar los vehículos:", error);
  }
};

const filteredVehicles = computed(() => {
  return vehicles.value.filter(vehicle => {
    const matchesName = vehicle.employeeName.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesType = filterType.value === '' || vehicle.vehicleType === filterType.value;
    return matchesName && matchesType;
  });
});

const openCreateModal = () => {
  isEditing.value = false;
  currentId.value = null;
  form.value = { employeeName: '', area: 'producción', vehicleType: 'automóvil', plateNumber: '', color: '' };
  showModal.value = true;
};

const openEditModal = (vehicle) => {
  isEditing.value = true;
  currentId.value = vehicle.id;
  form.value = { ...vehicle };
  showModal.value = true;
};

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await updateVehicle(currentId.value, form.value);
    } else {
      await createVehicle(form.value);
    }
    showModal.value = false;
    await loadVehicles();
  } catch (error) {
    console.error("Error al procesar el formulario:", error);
  }
};

const handleDelete = async (id) => {
  if (confirm("¿Está seguro de remover este vehículo del estacionamiento?")) {
    try {
      await deleteVehicle(id);
      await loadVehicles();
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  }
};

onMounted(loadVehicles);
</script>