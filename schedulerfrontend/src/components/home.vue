<template>
    <div class="master">
        <div>
            <h2 class="heading">{{ name }}</h2>
        </div>


        <div class="setAndViewLogs">

            <!-- Set Expression -->
            <div>
                <h3 class="main">Set Cron Value</h3>
                <span>Selet Cron:</span>
                <select v-model="cron" style="width: 100px;">
                    <option v-for="cron in crons" :key="cron" :value="cron">{{ cron }}</option>
                </select>&nbsp;

                <router-link to="/scheduleTask">
                    <button v-on:click="setCronToLS()" class="enable-disable-reschedule mb-5"
                        :class="{ active: this.$route.path === '/scheduleTask' }" aria-current="page">Click to Set
                    </button>
                </router-link>
            </div>

            <!-- Get Logs -->
            <div>
                <h3 class="main">See Logs</h3>
                <span>Selet Cron:</span>
                <select v-model="cron" style="width: 100px;">
                    <option v-for="cron in crons" :key="cron" :value="cron">{{ cron }}</option>
                </select>&nbsp;

                <router-link :to="{ path: this.cron === 'cron-1' ? '/cron1Logs' : '/cron2Logs' }">
                    <button class="enable-disable-reschedule mb-5"
                        :class="{ active: this.$route.path === '/cronLogs' }" aria-current="page">Click to See
                    </button>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
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
        setCronToLS(){
            localStorage.setItem('cronName', this.cron);
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
    grid-template-columns: auto auto;
    margin-top: 50px;
}
</style>