<template>

    <form @submit.prevent="save()">

        <label class="form-label">Usuario</label>
        <select v-model="userId" class="form-select" required>
            <option :value="user.id" v-for="user in userList">{{user.name}}</option>
        </select>


        <label class="form-label">Título</label>
        <input v-model="title" type="text" class="form-control" required>

        <label class="form-label">Content</label>
        <input v-model="content" type="text" class="form-control" required>

        <div class="actions">
            <button type="submit" class="btn btn-primary btn-sm">
                Guardar
            </button>
        </div>

        <p v-if="errorGeneral" class="error">
            {{ errorGeneral }}
        </p>

    </form>

</template>

<script setup>
    import {ref, onMounted} from 'vue';
    import api from '@/services/api';

    const emit = defineEmits(['onSave']);

    const userId = ref('');
    const title = ref('');
    const content = ref('');

    const save = async () => {
        const res = await api.post(`/notes`, {
            userId: userId.value,
            title: title.value,
            content: content.value,
            completed: false,
            createdAt: new Date().toISOString().split('T')[0]
        });
        emit('onSave', res.data);
    };

    const userList = ref([]);

    const loadUsers = async () => {
        const res = await api.get(`/users`);
        userList.value = res.data;
    };

    onMounted(async () => {
        await loadUsers();
    });

</script>

<style scoped>
    .actions {
        margin: 20px 0;
    }
</style>