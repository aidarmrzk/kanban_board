<template>
<div class="wrapper">
    <button @click="addStage">Добавить стадию</button>
    <div class="container">
    <div
        v-for="category in categories"
        :key="category.id"
        @drop="onDrop($event, category)"
        class="droppable"
        @dragover.prevent
        @dragenter.prevent
    >
        <div class="stage-header">
        <div v-if="category.isEditing" class="stage-title">
            <input type="text" v-model="category.title">
            <svg @click="confirmTitleStage(category)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M5.67 8l1.55 1.56 3.11-3.12M15.35 8A7.35 7.35 0 11.65 8a7.35 7.35 0 0114.7 0z"></path></svg>
        </div>
        <div v-else class="stage-title">
            <h3>{{ category.title }}</h3>
            <svg @click="editTitleStage(category)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" type="ui"><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path><path d="M16 5l3 3"></path></svg>
        </div>
        <svg @click="deleteStage(category)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" type="ui"><path d="M4 7l16 0"></path><path d="M10 11l0 6"></path><path d="M14 11l0 6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path><path d="M9 7v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v3"></path></svg>
        </div>

        <button @click="addTask(category)">Добавить задачу</button>
        <div
        v-for="item in tasks.filter(x => x.categoryId === category.id)"
        :key="item.id"
        @dragstart="onDragStart($event, item)"
        class="draggable"
        draggable="true"
        @click="navigateToTaskDetail(item)"
        >
        <div class="text-container">
            <div v-if="item.isEditing" class="task-text">
            <textarea v-model="item.text"></textarea>
            <svg @click="confirmTextTask(item)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M5.67 8l1.55 1.56 3.11-3.12M15.35 8A7.35 7.35 0 11.65 8a7.35 7.35 0 0114.7 0z"></path></svg>
            </div>
            <div v-else class="task-text">
            <p>{{ item.text }}</p>
            <svg @click="editTextTask(item)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" type="ui"><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path><path d="M16 5l3 3"></path></svg>
            </div>
            <svg @click="deleteTask(item)" class="delete-task" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" type="ui"><path d="M4 7l16 0"></path><path d="M10 11l0 6"></path><path d="M14 11l0 6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path><path d="M9 7v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v3"></path></svg>
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
import router from '@/router/router';

const store = useStore();
const categories = computed(() => store.state.categories);
const tasks = computed(() => store.state.tasks);

const onDragStart = (event, item) => {
event.dataTransfer.dropEffect = 'move';
event.dataTransfer.effectAllowed = 'move';

event.dataTransfer.setData('itemId', item.id.toString());
}
const onDrop = (event, category) => {
const itemId = event.dataTransfer.getData('itemId')

const newTasks = tasks.value.map(x => {
    if (x.id === itemId) {
    x.categoryId = category.id;
    }
    return x;
})
store.commit('SET_TASKS', newTasks);
}

const addStage = () => {
const newStage = {
    id: generateId(),
    title: 'Новая стадия',
    isEditing: false
}
store.commit('ADD_CATEGORY', newStage);
}
const deleteStage = (category) => {
store.commit('DELETE_CATEGORY', category);
}
const editTitleStage = (category) => {
store.commit('EDIT_TITLE_CATEGORY', category);
}
const confirmTitleStage = (category) => {
store.commit('CONFIRM_TITLE_CATEGORY', category);
}

const addTask = (category) => {
const categoryId = category.id;
const newTask = {
    id: generateId(),
    text: "Новая задача",
    categoryId: categoryId,
    isEditing: false
}
store.commit('ADD_TASK', newTask);
}
const deleteTask = (item) => {
store.commit('DELETE_TASK', item);
}
const editTextTask = (item) => {
store.commit('EDIT_TASK', item);
}
const confirmTextTask = (item) => {
store.commit('CONFIRM_TEXT_TASK', item);
}

const generateId = () => {
const timestamp = new Date().getTime();
const random = Math.floor(Math.random() * 1000); // Добавляем случайное число до 1000

return `${timestamp}-${random}`;
}

const navigateToTaskDetail = (item) => {
router.push({ name: 'TaskDetail', params: { id: item.id } });
}
</script>

<style lang="scss" scoped>
.wrapper {
button {
    margin: 0 0 10px;
    border-radius: 5px;
    border: none;
    padding: 8px 16px;
    background-color: #3f6c9a;
    color: #fff;;
    font-weight: 600;
}
.container {
    display: flex;
    width: 100%;
    gap: 20px;
    .droppable {
    flex: 1;
    padding: 15px;
    border-radius: 5px;
    background: #2c3e50;
    margin: 0 0 10px;
    .stage-header {
        display: flex;
        justify-content: space-between;
        align-tasks: center;
        margin: 0 0 10px;
        height: 30px;
        gap: 10px;
        border-bottom: 1px solid #fff;
        .stage-title {
        display: flex;
        justify-content: space-between;
        align-tasks: center;
        flex: 1;
        gap: 5px;
        h3 {
            margin: 0;
            color: #fff;
        }
        input {
            flex: 1;
        }
        }
        svg {
        cursor: pointer;
        stroke: #fff;
        }
    }
    button {
        border-radius: 5px;
        border: none;
        padding: 5px 10px;
        background-color: #faffc4;
        color: #2c3e50;
        font-weight: 600;
    }
    }
    .draggable {
    padding: 5px;
    margin: 0 0 5px;
    .text-container {
        display: flex;
        justify-content: space-between;
        gap: 5px;
        .task-text {
        display: flex;
        justify-content: space-between;
        flex: 1;
        gap: 5px;
        padding: 5px;
        background: #fff;
        border-radius: 5px;
        textarea {
            flex: 1;
        }
        svg {
            cursor: pointer;
            stroke: #000;
        }
        p {
            margin: 0 5px;
        }
        }
        .delete-task {
        margin: 5px 0 0;
        cursor: pointer;
        }
    }
    }
}
}
</style>
