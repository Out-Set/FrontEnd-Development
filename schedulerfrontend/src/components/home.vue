<template>
    <div class="master">
        <div>
            <h2 class="heading">{{ name }}</h2>
        </div>

        <div style="margin-top: 15px">
            Select Task Type
            <select v-model="taskType" @change="fetchTaskNames()" style="width: 100px;">
                <option v-for="taskType in taskTypes" :key="taskType" :value="taskType">{{ taskType }}</option>
            </select>
        </div>

        <div class="setAndViewLogs">

            <!-- Set Expression -->
            <div>
                <h3 class="main">Set Cron Value</h3>
                <select v-model="taskName" style="width: 100px;">
                    <option v-for="taskName in taskNames" :key="taskName" :value="taskName">{{ taskName }}</option>
                </select>&nbsp;

                <router-link to="/scheduleTask">
                    <button v-on:click="setTaskToLS()" class="mb-5"
                        :class="{ active: this.$route.path === '/scheduleTask' }" aria-current="page">Set
                    </button>
                </router-link>
            </div>

            <!-- Stop prog Execution -->
            <div>
                <h3 class="main">Stop and Start</h3>
                <select v-model="taskStartStop" style="width: 100px;">
                    <option v-for="taskName in taskNames" :key="taskName" :value="taskName">{{ taskName }}</option>
                </select>&nbsp;
                <button v-on:click="stopTask(this.taskStartStop)">Stop</button>&nbsp;
                <button v-on:click="startAtInit(this.taskStartStop)">Start</button>
            </div>

            <!-- View Logs -->
            <div>
                <h3 class="main">Common Logs</h3>
                <router-link to="/commonLogs">
                    <button :class="{ active: this.$route.path === '/commonLogs' }" aria-current="page">View
                    </button>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "homePage",
    data() {
        return {
            name: "Cron Dashboard",

            taskTypes: ['proc', 'api', 'method'],
            taskType: 'proc',

            taskNames: [],
            taskName: '',

            taskStartStop: '',
        }
    },

    mounted() {
        axios.get('http://localhost:8082/scheduledTask/findTaskName/proc') // Dynamic-Cron
            .then((response) => {
                console.log("Response form Backend: ", response);
                this.taskNames = response.data
                this.taskName = this.taskNames[0]
                this.taskStartStop = this.taskNames[0]
                localStorage.setItem('taskType', this.taskType);
            })
            .catch((error) => {
                // Handle the error
                console.log("Error Occured!", error);
            })
    },

    watch: {
        taskType(taskType) {
            console.log('Task Type: ', taskType);
            localStorage.setItem('taskType', this.taskType);
        }
    },

    methods: {
        setTaskToLS() {
            localStorage.setItem('taskName', this.taskName);
        },

        stopTask(taskStartStop) {
            console.log('task-name: ', taskStartStop);
            axios.post('http://localhost:8082/tasks/stop?taskName=' + taskStartStop) // Dynamic-Cron
                .then((response) => {
                    console.log("Response form Backend: ", response);
                    this.logs = response.data
                })
                .catch((error) => {
                    // Handle the error
                    console.log("Error Occured!", error);
                })
        },

        startAtInit(taskStartStop) {
            console.log('task-name: ', taskStartStop);
            axios.post('http://localhost:8082/tasks/startAtInit?taskName=' + taskStartStop) // Dynamic-Cron
                .then((response) => {
                    console.log("Response form Backend: ", response);
                    this.logs = response.data
                })
                .catch((error) => {
                    // Handle the error
                    console.log("Error Occured!", error);
                })
        },

        fetchTaskNames() {
            console.log('Task type selected:', this.taskType);
            axios.get('http://localhost:8082/scheduledTask/findTaskName/' + this.taskType) // Dynamic-Cron
                .then((response) => {
                    console.log("Response form Backend: ", response);
                    this.taskNames = response.data
                    this.taskName = this.taskNames[0]
                    this.taskStartStop = this.taskNames[0]
                })
                .catch((error) => {
                    // Handle the error
                    console.log("Error Occured!", error);
                })
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.master {
    margin-top: 0px;
    padding-top: 0px;
    background: lightblue;
    height: 660px;
}

.heading {
    height: 40px;
    background: lightcoral;
    padding-top: 13px;
    padding-left: 16px;
}

.main {
    text-decoration: underline;
    margin-bottom: 5px;
}

.setAndViewLogs {
    display: grid;
    grid-template-columns: auto auto auto;
    margin-top: 50px;
}

select {
    padding: 3px 10px;
}

button {
    border: none;
    border-radius: 3px;
    margin-bottom: 10px;
    padding: 4px 20px;
}

button:hover {
    background: #1397AA;
    color: white;
}
</style>