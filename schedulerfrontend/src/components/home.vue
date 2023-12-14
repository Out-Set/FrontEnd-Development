<template>
    <div class="master container-fluid">
        <div class="heading row">
            <h3>{{ name }}</h3>
        </div>

        <div class="mt-2">
            Select Task Type
            <select v-model="taskType" @change="fetchTaskNames()" style="width: 100px;">
                <option v-for="taskType in taskTypes" :key="taskType" :value="taskType">{{ taskType }}</option>
            </select>
        </div>

        <div class="setAndViewLogs row">

            <!-- Set Expression -->
            <div>
                <p class="main">Reset Cron Value</p>
                <select v-model="taskName" style="width: 100px;">
                    <option v-for="taskName in taskNames" :key="taskName" :value="taskName">{{ taskName }}</option>
                </select>&nbsp;

                <router-link to="/scheduleTask">
                    <button v-on:click="setTaskToLS()" class="btn btn-primary btn-sm"
                        :class="{ active: this.$route.path === '/scheduleTask' }" aria-current="page">Reset
                    </button>
                </router-link>
            </div>

            <!-- Stop prog Execution -->
            <div>
                <p class="main">Stop and Start</p>
                <select v-model="taskStartStop" style="width: 100px;">
                    <option v-for="taskName in taskNames" :key="taskName" :value="taskName">{{ taskName }}</option>
                </select>&nbsp;
                <button class="btn btn-primary btn-sm" v-on:click="stopTask(this.taskStartStop)">Stop</button>&nbsp;
                <button class="btn btn-primary btn-sm" v-on:click="startAtInit(this.taskStartStop)">Start</button>
            </div>

            <!-- View Logs -->
            <div>
                <p class="main">Common Logs</p>
                <router-link to="/commonLogs">
                    <button class="btn btn-primary btn-sm"
                        :class="{ active: this.$route.path === '/commonLogs' }" aria-current="page">View
                    </button>
                </router-link>
            </div>
        </div>
        <div style="height: 1px; background: black; margin-top: 50px"></div>

        <div>
            <p class="main" style="background-color: burlywood;">All Tasks With Status</p>

            <div class="allDataDiv" style="">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">TaskID</th>
                            <th scope="col">Task Type</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in (tasksWithStatus)" :key="data.jobName">
                            <td>{{ data.id }}</td>
                            <td>{{ data.taskType }}</td>
                            <td>{{ data.taskName }}</td>
                            <td> {{ data.status }} </td>
                        </tr>
                    </tbody>
                </table>
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

            tasksWithStatus: [],
            
            ip: 'localhost'
        }
    },
    // 8081/BitsFlow-App
    mounted() {
        axios.get('http://'+this.ip+':8081/BitsFlow-App/scheduledTask/findTaskName/proc') // bitsflow-intg
        // axios.get('http://localhost:8082/scheduledTask/findTaskName/proc') // Dynamic-Cron
            .then((response) => {
                console.log("Response form Backend: ", response);
                this.taskNames = response.data
                this.taskName = this.taskNames[0]
                this.taskStartStop = this.taskNames[0]

                //save list of tasks to Local Storage
                localStorage.setItem('taskNames', JSON.stringify(response.data));
                localStorage.setItem('taskType', this.taskType);
            })
            .catch((error) => {
                // Handle the error
                console.log("Error Occured!", error);
            })

        // Tasks with status
        axios.get('http://'+this.ip+':8081/BitsFlow-App/scheduledTask/tasksWithStatus') // bitsflow-intg
        // axios.get('http://localhost:8082/scheduledTask/tasksWithStatus') // Dynamic-Cron
            .then((response) => {
                console.log("tasksWithStatus form Backend: ", response);
                this.tasksWithStatus = [];
                this.tasksWithStatus = response.data
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
            axios.post('http://'+this.ip+':8081/BitsFlow-App/tasks/stop?taskName=' + taskStartStop) // bitsflow-intg
            // axios.post('http://localhost:8082/tasks/stop?taskName=' + taskStartStop) // Dynamic-Cron
                .then((response) => {
                    console.log("Response form Backend: ", response);
                    this.logs = response.data
                    location.reload();
                })
                .catch((error) => {
                    // Handle the error
                    console.log("Error Occured!", error);
                })
        },

        startAtInit(taskStartStop) {
            console.log('task-name: ', taskStartStop);
            axios.post('http://'+this.ip+':8081/BitsFlow-App/tasks/startAtInit?taskName=' + taskStartStop) // bitsflow-intg
            // axios.post('http://localhost:8082/tasks/startAtInit?taskName=' + taskStartStop) // Dynamic-Cron
                .then((response) => {
                    console.log("Response form Backend: ", response);
                    this.logs = response.data
                    location.reload();
                })
                .catch((error) => {
                    // Handle the error
                    console.log("Error Occured!", error);
                })
        },

        fetchTaskNames() {
            console.log('Task type selected:', this.taskType);
            axios.get('http://'+this.ip+':8081/BitsFlow-App/scheduledTask/findTaskName/' + this.taskType) // bitsflow-intg
            // axios.get('http://localhost:8082/scheduledTask/findTaskName/' + this.taskType) // Dynamic-Cron
                .then((response) => {
                    console.log("Response form Backend: ", response);
                    this.taskNames = response.data
                    this.taskName = this.taskNames[0]
                    this.taskStartStop = this.taskNames[0]

                    //save list of tasks to Local Storage
                    localStorage.setItem('taskNames', JSON.stringify(response.data));
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
    height: 251px;
}

.heading {
    height: 45px;
    background: lightcoral;
    padding-top: 9px;
    padding-left: 16px;
}

.main {
    text-decoration: underline;
    /* margin-bottom: 5px; */
}

.setAndViewLogs {
    display: grid;
    grid-template-columns: auto auto auto;
    margin-top: 50px;
}

select {
    /* padding: 5px 10px 0px 10px; */
    padding-top: 6px;
    padding-left: 7px;
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

.allDataDiv {
    padding: auto;
    width: 100%;
    height: 410px;
    overflow: scroll;
}

.table {
    width: 1275px;
}

thead tr th {
    background-color: lightskyblue;
    font-size: 14px;
}

tbody tr td {
    font-size: 12px;
}

thead {
    position: sticky;
    top: 0;
}
</style>



