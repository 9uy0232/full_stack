<script setup>
import { ref } from "vue";
import router from "../router";

// ปรับคอลัมน์ให้ตรงกับข้อมูลใน Tasks
const columns = [
    { name: 'id', align: 'center', label: 'Task ID', field: 'id', sortable: true },
    { name: 'title', align: 'center', label: 'Task Title', field: 'title', sortable: true },
    { name: 'description', align: 'center', label: 'Description', field: 'description', sortable: true },
    { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
    { name: 'due_date', align: 'center', label: 'Due Date', field: 'due_date', sortable: true },
    { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
];

const rows = ref([]);

// ดึงข้อมูล Tasks
const fetchData = async () => {
    fetch('http://localhost:8800/api/v1/tasks')
        .then(res => res.json())
        .then(result => {
            rows.value = result;
        });
};
fetchData();

// การสร้าง Task ใหม่
const onCreate = () => {
    router.push('/createTasks');
};

// การแก้ไข Task
const onEdit = (id) => {
    router.push('/updateTask/' + id);
};

// การลบ Task
const onDelete = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`http://localhost:8800/api/v1/tasks/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            alert(result.message);
            if (result.status === "ok") {
                router.push('/');
            }
            fetchData();
        })
        .catch((error) => console.log('error', error));
};
</script>
