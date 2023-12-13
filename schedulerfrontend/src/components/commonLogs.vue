<template>
    <spinner v-if="loader"></spinner>

    <div class="container-fluid">
        <div class="heading row">
            <h3>Common-Logs</h3>
        </div>

        <div class="filter">Task Name
            <select v-model="taskName" @change="filter()" style="width: 100px;">
                <option v-for="taskName in taskNames" :key="taskName" :value="taskName">{{ taskName }}</option>
            </select>
        </div>

        <div class="allDataDiv" style="">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">LogID</th>
                        <th scope="col">Task Type</th>
                        <th scope="col">Task Name</th>
                        <th scope="col">LAST START TIME</th>
                        <th scope="col">NEXT RUN TIME</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in (filteredData)" :key="data.jobName">
                        <td>{{ data.logID }}</td>
                        <td>{{ data.taskType }}</td>
                        <td>{{ data.taskName }}</td>
                        <td> {{ dateFormat(data.startTime) }} </td>
                        <td>{{ dateFormat(data.nextStartTime) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="footerDiv mt-1">
            <button @click="$router.back()" class="btn btn-secondary btn-sm">Back</button>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import moment from 'moment';
import spinner from './spinner.vue'

export default {
    name: "commonLogs",
    components: {
        spinner
    },
    data() {
        return {
            log: 'Common-Logs',
            logs: [],

            taskNames: [],
            taskName: '',

            loader: true,

            filteredData: [],

            ip: 'localhost'
        }
    },

    mounted() {
        // Get list of item
        const taskNames = JSON.parse(localStorage.getItem('taskNames'));
        console.log('Task Names: ', taskNames);
        this.taskNames = taskNames;
        this.taskName = this.taskNames[0]
        console.log('Task Names: ', this.taskNames, 'task name: ', this.taskName);

        axios.get('http://'+this.ip+':8081/BitsFlow-App/logs/getCommonLogs') // bitsflow-intg
        // axios.get('http://localhost:8082/logs/getCommonLogs') // Dynamic-Cron
            .then((response) => {
                console.log("Response form Backend: ", response);
                this.logs = response.data
                this.loader = false

                // Filter on start according to taskType
                this.filteredData = [];
                const taskType = localStorage.getItem('taskType');
                for (const log of this.logs) {
                    if (log.taskType === taskType) {
                        this.filteredData.push(log);
                    }
                }
                this.filter();
                console.log('filteredData', this.filteredData[0]);
            })
            .catch((error) => {
                // Handle the error
                console.log("Error Occured!", error);
            })
    },

    methods: {
        dateFormat(date) {
            return moment(date).format('Do MMM YYYY, h:mm:ss a');
        },

        filter() {
            this.filteredData = [];
            for (const log of this.logs) {
                if (log.taskName === this.taskName) {
                    this.filteredData.push(log);
                }
            }
        }
    }
};

</script>
  
<style scoped>
.filter {
    text-align: right;
    margin: 5px;
    justify-content: right;
    margin-right: 0px;
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

.heading {
    height: 45px;
    background: lightcoral;
    padding-top: 10px;
}

.footerDiv {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    background-color: #c9c9c9;
}

@media (max-width: 767px) {
    .masterDiv {
        margin-left: 1%;
    }
}
</style>