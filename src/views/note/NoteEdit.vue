<script setup>
    import {ref, onMounted} from 'vue';
    import api from '@/services/api.js'

    const props = defineProps({
        item: Object
    });
    const emit = defineEmits(['onSave']);
    const save = async ()=>{
        const rest = await api.patch(`/notes/${props.item.id}`,{
            userId: props.item.userId,
            title: props.item.title,
            content: props.item.content,
            completed: props.item.completed
        });
        emit('onSave', rest.data);
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

<template>
    <form @submit.prevent="save()">

        <label class="form-label">Usuario</label>
        <select v-model="item.userId" class="form-select" required>
            <option :value="user.id" v-for="user in userList">{{user.name}}</option>
        </select>

        <label class="form-label">Título</label>
        <input v-model="item.title" type="text" class="form-control" required>

        <label class="form-label">Content</label>
        <input v-model="item.content" type="text" class="form-control" required>

        <br>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="completed" v-model="item.completed">
            <label class="form-check-label" for="completed">
                Completado
            </label>
        </div>

        <div class="actions">
        <button type="submit" class="btn btn-primary btn-sm" >Guardar</button>
        </div>

    </form>
</template>

<style>

    .actions {
        margin: 20px 0;
    }

</style>