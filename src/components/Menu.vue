<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import { isLogin } from '@/services/authService';
    import appMemory from '@/services/appMemory';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const loginStatus = ref(isLogin());
    const userName = ref(appMemory.get('userName') || '');

    let unsubscribeToken;
    let unsubscribeUser;

    onMounted(() => {
        
        unsubscribeToken = appMemory.subscribe('token', (nuevoToken) => {
            loginStatus.value = !!nuevoToken;
        });

        unsubscribeUser = appMemory.subscribe('userName', (nuevoNombre) => {
            userName.value = nuevoNombre || '';
        });
    });

    onUnmounted(() => {
        if (unsubscribeToken) unsubscribeToken();
        if (unsubscribeUser) unsubscribeUser();
    });

    const logout = () => {
        localStorage.clear();
        appMemory.clear(); 
        loginStatus.value = false;
        userName.value = '';
        router.push('/login');
    };
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <router-link to="/estacionamiento" class="navbar-brand">Estacionamiento</router-link>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>

                <div class="d-flex align-items-center">
                    <div class="nav-item d-flex align-items-center gap-3" v-if="loginStatus">
                        <span class="text-secondary">{{ userName }}</span>
                        <button class="btn btn-outline-danger btn-sm" @click="logout">Cerrar sesión</button>
                    </div>
                    <div class="nav-item" v-else>
                        <router-link to="/login" class="btn btn-sm btn-primary text-white">Iniciar sesión</router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>

.gap-3 {
    gap: 1rem !important;
}
</style>