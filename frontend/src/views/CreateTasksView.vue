<template>
    <div class="q-gutter-md" style="max-width: 400px;">
        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="title" label="Task Title" />
            <q-input v-model="description" label="Description" />
            <q-select v-model="status" :options="statusOptions" label="Status" />
            <q-input v-model="due_date" label="Due Date" type="datetime-local" />
            <q-btn type="submit" label="Submit" color="primary" />
        </q-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '../router';

const title = ref('');
const description = ref('');
const status = ref('Pending');
const due_date = ref('');
const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" }
];

// เมื่อฟอร์มถูกส่ง
const onSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "title": title.value,
        "description": description.value,
        "status": status.value,
        "due_date": due_date.value
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // เปลี่ยน URL จาก /users เป็น /tasks
    fetch("http://localhost:8800/api/v1/tasks", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            alert(result.message);
            if (result.status === 'ok') {
                router.push('/tasks'); // ถ้าสำเร็จจะพาไปหน้า Task
            }
        })
        .catch((error) => console.error(error));
}
</script>
