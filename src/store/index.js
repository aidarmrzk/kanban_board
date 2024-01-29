import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    plugins: [createPersistedState()],
    state: {
        categories: [
            {
                id: 0,
                title: 'Запланировано',
                isEditing: false
            },
            {
                id: 1,
                title: 'В работе',
                isEditing: false
            }
        ],
        tasks: [
            {
                id: '0',
                text: "Первая задача",
                categoryId: 0,
                isEditing: false
            },
            {
                id: '1',
                text: "Вторая задача",
                categoryId: 0,
                isEditing: false
            },
            {
                id: '2',
                text: "Третья задача",
                categoryId: 1,
                isEditing: false
            }
        ]
    },
    getters: {
        getTaskById: (state) => (taskId) => {
            return state.tasks.find((task) => task.id === taskId);
        },
    },
    mutations: {
        SET_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        ADD_CATEGORY(state, newCategory) {
            state.categories.push(newCategory);
        },
        DELETE_CATEGORY(state, category) {
            const index = state.categories.findIndex(x => x.id === category.id);
            state.categories.splice(index, 1);
        },
        EDIT_TITLE_CATEGORY(state, category) {
            const foundCategory = state.categories.find(x => x.id === category.id);
            foundCategory.isEditing = true;
        },
        CONFIRM_TITLE_CATEGORY(state, category) {
            const foundCategory = state.categories.find(x => x.id === category.id);
            foundCategory.isEditing = false;
        },
        ADD_TASK(state, newTask) {
            state.tasks.push(newTask);
        },
        DELETE_TASK(state, task) {
            const index = state.tasks.findIndex(x => x.id === task.id);
            state.tasks.splice(index, 1);
        },
        EDIT_TASK(state, task) {
            const foundTask = state.tasks.find(x => x.id === task.id);
            foundTask.isEditing = true;
        },
        CONFIRM_TEXT_TASK(state, task) {
            const foundTask = state.tasks.find(x => x.id === task.id);
            foundTask.isEditing = false;
        },
    },
});

export default store;