<script setup>
    import { ref, onMounted } from 'vue';
    import api from '@/services/api';
    const items = ref([]);

    const props = defineProps({
        id: String
    });

    const load = async () => {
        const res = await api.get(`/notes?_expand=user&userId=${props.id}`);
        items.value = res.data;
    };
    onMounted(async () => {
        await load();
    });
</script>
<template>
    <div>
        Lista de notas
        <br><br>
    </div>
    <div>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Título</th>
                <th scope="col">Contenido</th>
                <th scope="col">Completado</th>
                <th scope="col">Creado el</th>
                <th scope="col">Propietario</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items">
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.content }}</td>
                <td>{{ item.completed }}</td>
                <td>{{ item.createdAt }}</td>
                <td>{{ item?.user?.name }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<style>

</style>