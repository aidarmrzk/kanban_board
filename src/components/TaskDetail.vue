<template>
<div>
    <h2>Детали задачи</h2>
    <p>{{ task.text }}</p>
    
    
    <router-link to="/">Назад к доске</router-link>
</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();
const taskId = ref(route.params.id);

const task = computed(() => {
    return store.getters.getTaskById(taskId.value);
});
</script>