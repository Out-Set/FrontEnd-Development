<template>
    <div class="master">
        <div>
            <h2 class="heading">{{ name }}</h2>
        </div>

        <div class="setAndViewLogs">

            <!-- Set Expression -->
            <div>
                <h3 class="main">Set Cron Value</h3>
                <select v-model="cron" style="width: 100px;">
                    <option v-for="cron in crons" :key="cron" :value="cron">{{ cron }}</option>
                </select>&nbsp;

                <router-link to="/scheduleTask">
                    <button v-on:click="setCronToLS()" class="mb-5"
                        :class="{ active: this.$route.path === '/scheduleTask' }" aria-current="page">Set
                    </button>
                </router-link>
            </div>

            <!-- Get Logs -->
            <div>
                <h3 class="main">View Logs</h3>
                <select v-model="cron" style="width: 100px;">
                    <option v-for="cron in crons" :key="cron" :value="cron">{{ cron }}</option>
                </select>&nbsp;

                <router-link :to="{ path: this.cron === 'cron-1' ? '/cron1Logs' : '/cron2Logs' }">
                    <button 
                        :class="{ active: this.$route.path === '/cronLogs' }" aria-current="page">View
                    </button>
                </router-link>
            </div>

            <!-- Stop prog Execution -->
            <div>
                <h3 class="main">Stop and Start</h3>
                <select v-model="cron" style="width: 100px;">
                    <option v-for="cron in crons" :key="cron" :value="cron">{{ cron }}</option>
                </select>&nbsp;
                <button v-on:click="stopCron(this.cron)">Stop</button>&nbsp;
                <button v-on:click="startCron(this.cron)">Start</button>
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
            crons: ['cron-1', 'cron-2'],
            cron: 'cron-1'

        }
    },

    methods: {
        setCronToLS() {
            localStorage.setItem('cronName', this.cron);
        },

        stopCron(cron) {
            console.log('cron-name: ',cron);
            axios.post('http://localhost:8082/tasks/stop?task='+cron) // Dynamic-Cron
                .then((response) => {
                    console.log("Response form Backend: ", response);
                    this.logs = response.data
                })
                .catch((error) => {
                    // Handle the error
                    console.log("Error Occured!", error);
                })
        },

        startCron(cron) {
            console.log('cron-name: ',cron);
            axios.post('http://localhost:8082/tasks/startAtInit?task='+cron) // Dynamic-Cron
                .then((response) => {
                    console.log("Response form Backend: ", response);
                    this.logs = response.data
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

select{
    padding: 3px 10px;
}

button {
  border: none;
  border-radius: 3px;
  margin-bottom: 10px;
  padding: 4px 20px;
}
button:hover{
  background: #1397AA;
  color: white;
}


</style>