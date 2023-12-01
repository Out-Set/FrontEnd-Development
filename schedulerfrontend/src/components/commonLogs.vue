<template>
    <div>
      <div>
        <h3 class="heading">{{ log}}</h3>
      </div>
  
      <div class="allDataDiv" style="">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">LogID</th>
              <th scope="col">Task Type</th>
              <th scope="col">Task Name</th>
              <th scope="col">LAST START TIME</th>
              <th scope="col">NEXT RUN TIME</th>
              <!-- <th scope="col">LAST RUN DURATION</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in (logs)" :key="data.jobName">
              <td>{{ data.logID }}</td>
              <td>{{ data.taskType }}</td>
              <td>{{ data.taskName }}</td>
              <td> {{ dateFormat(data.startTime) }} </td>
              <td>{{ dateFormat(data.nextStartTime) }}</td>
              <!-- <td>{{ data.lastRunDuration }}</td> -->
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="footerDiv mt-1">
        <button @click="$router.back()" class="btn btn-secondary btn-sm mt-5">Back</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import moment from 'moment';
  
  export default {
    name: "commonLogs",
    data() {
      return {
        log: 'Common-Logs',
        logs: []
      }
    },
  
    mounted() {
      axios.get('http://localhost:8082/logs/getCommonLogs') // Dynamic-Cron
      // axios.get('http://localhost:8081/getCron1Logs') // Scheduler
        .then((response) => {
          console.log("Response form Backend: ", response);
          this.logs = response.data
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
  
    }
  };
  
  </script>
  
  <style scoped>
  .allDataDiv {
    padding: auto;
    width: 100%;
    height: 410px;
    overflow: scroll;
  }
  .table{
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
    height: 40px;
    background: lightcoral;
    padding-top: 13px;
    padding-left: 16px;
  }
  
  .footerDiv {
    width: 100%;
    height: 25px;
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