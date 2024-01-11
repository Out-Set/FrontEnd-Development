<template>
    <sideBar></sideBar>

    <spinner v-if="loader"></spinner>

    <div class="master container-fluid">
        <div class="allData">
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
                            <!-- <th scope="col">Task Type</th>
                        <th scope="col">Task Name</th> -->
                            <th scope="col">LAST START TIME</th>
                            <th scope="col">NEXT RUN TIME</th>
                            <th scope="col">EXECUTION STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in (paginatedItems)" :key="data.jobName">
                            <td>{{ data.logID }}</td>
                            <!-- <td>{{ data.taskType }}</td>
                        <td>{{ data.taskName }}</td> -->
                            <td>{{ dateFormat(data.startTime) }}</td>
                            <td>{{ dateFormat(data.nextStartTime) }}</td>
                            <td>{{ data.executionStatus }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="footerDiv mt-1">

                <ul class="pagination pagination-sm justify-content-center mx-auto">
                    <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                        <a class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous">
                            <span aria-hidden="true">Previous</span>
                        </a>
                    </li>

                    <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                        <a class="page-link" @click="changePage(currentPage + 1)" aria-label="Next">
                            <span aria-hidden="true">Next</span>
                        </a>
                    </li>
                </ul>

                <button @click="$router.back()" class="btn btn-secondary btn-sm">Back</button>
            </div>

        </div>
    </div>
</template>
  
<script>
import moment from 'moment';
import { get } from '../../callAPI'
import spinner from '../spinner.vue'
import sideBar from '../sideBar.vue';

export default {
    name: "commonLogs",
    components: {
        spinner,
        sideBar
    },
    data() {
        return {
            log: 'Common-Logs',
            logs: [],

            taskNames: [],
            taskName: '',

            loader: true,

            filteredData: [],

            itemsPerPage: 10,
            currentPage: 1,
        }
    },

    mounted() {
        // Get list of item
        const taskNames = JSON.parse(localStorage.getItem('taskNames'));
        console.log('Task Names: ', taskNames);
        this.taskNames = taskNames;
        this.taskName = this.taskNames[0]
        console.log('Task Names: ', this.taskNames, 'task name: ', this.taskName);

        get('/logs/getCommonLogs')
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
        },

        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
    },

    computed: {

        totalPages() {
            return Math.ceil(this.filteredData.length / this.itemsPerPage);
        },

        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredData.slice(startIndex, endIndex);
        },
    }
};

</script>
  
<style scoped>
.master {
    margin-left: 10%;
}

@media (max-width: 767px) {
    .master {
        margin-left: 1%;
    }
}

.allData {
    width: 89.8%;
}

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
    background: rgb(247, 149, 238);
    padding-top: 10px;
}

.footerDiv {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    background-color: #c9c9c9;
}
</style>