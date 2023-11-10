<template>
  <div class="master">
    <div>
      <h3 class="heading">Set Schedule</h3>
    </div>

    <div class="selectdiv">
      <!-- <div style="display: flex;"> -->
        <!-- <strong>Second:</strong>&nbsp;
        <select v-model="second" style="width:150px; margin-bottom: 20px; margin-right: 20px;">
          <option value="*" disabled selected>*</option>
          <option v-for="second in seconds" :key="second" :value="second">{{ second }}</option>
        </select>

        <strong>Minute:</strong>&nbsp;
        <select v-model="minute" style="width:150px; margin-bottom: 20px; margin-right: 20px;">
          <option value="*" disabled selected>*</option>
          <option v-for="minute in minutes" :key="minute" :value="minute">{{ minute }}</option>
        </select>

        <strong>Hours:</strong>&nbsp;
        <select v-model="hour" style="width:150px; margin-right: 20px; margin-bottom: 20px; ">
          <option value="*" disabled selected>*</option>
          <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
        </select>

        <strong>Date:</strong>&nbsp;
        <select v-model="date" style="width:150px; margin-bottom: 20px; margin-right: 20px;">
          <option value="*" disabled selected>*</option>
          <option v-for="date in dates" :key="date" :value="date">{{ date }}</option>
        </select>

        <strong>Month:</strong>&nbsp;
        <select v-model="month" style="width:150px; margin-bottom: 20px; margin-right: 20px;">
          <option value="*" disabled selected>*</option>
          <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
        </select>

        <strong>Day:</strong>&nbsp;
        <select v-model="day" style="width:150px; margin-bottom: 20px; margin-right: 20px;">
          <option value="*" disabled selected>*</option>
          <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
        </select>
      </div>

      <div>
        <button disabled ref="enable_btn" class="reschedule-bt" v-on:click="set()">Set Schedule
        </button>
      </div> -->

      <div style="padding-top: 20px;">
        <strong>Write Your cron Expression</strong>&nbsp;
        <input type="text" v-model="expression">&nbsp;
        <button ref="cron-btn" class="reschedule-bt" v-on:click="setCronExp()">Set Schedule</button>&nbsp;&nbsp;

        <strong>Enter Delay in MilliSecond</strong>&nbsp;
        <input type="number" v-model="delay">&nbsp;
        <button ref="cron-btn" class="reschedule-bt" v-on:click="setDelay()">Set Delay</button>
      </div>

    </div>

  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: "HelloWorld",
  data() {
    return {
      seconds: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
      second: '*',

      minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
      minute: '*',

      hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      hour: '*',

      dates: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      date: '*',

      months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      month: '*',

      days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      day: '*',

      selectedData: "",
      expression: "",
      delay: 0
    }
  },

  mounted() {
    console.log("hello ....");

    console.log("Second: ", this.second);
    console.log("Minute: ", this.minute);
    console.log("Hour: ", this.hour);
    console.log("Date: ", this.date);
    console.log("Month: ", this.month);
    console.log("Day: ", this.day);
  },

  watch: {

    second(newSecond) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Second: ${newSecond}`);
    },

    minute(newMinute) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Minute: ${newMinute}`);
    },

    hour(newHour) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Hour: ${newHour}`);
    },

    date(newDate) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Date: ${newDate}`);
    },

    month(newMonth) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Month: ${newMonth}`);
    },

    day(newDay) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Day: ${newDay}`);
    },

  },

  methods: {
    set() {
      console.log(this.second, this.minute, this.hour, this.date, this.month, this.day);
      this.selectedData = this.second + " " + this.minute + " " + this.hour + " " + this.date + " " + this.month + " " + this.day
      console.log(typeof this.selectedData, this.selectedData);

      axios.post('http://localhost:8081/dynamicSchedule/cronVal', this.selectedData)
        .then((response) => {
          console.log("Response form Backend: ", response);
        })
        .catch((error) => {
          // Handle the error
          console.log("Error Occured!", error);
        });
    },

    setCronExp() {
      console.log(typeof this.expression, this.expression);

      // axios.post('http://localhost:8081/dynamicSchedule/cronVal', this.expression)
      axios.post('http://localhost:8081/BitsFlow-App/springScheduler/cronVal', this.expression)
        .then((response) => {
          console.log("Response form Backend: ", response);
        })
        .catch((error) => {
          // Handle the error
          console.log("Error Occured!", error);
        });
    },

    setDelay(){
      console.log(typeof this.delay, this.delay);
      axios.get('http://localhost:8081/dynamicSchedule/delayVal?delay='+this.delay)
        .then((response) => {
          console.log("Response form Backend: ", response);
        })
        .catch((error) => {
          // Handle the error
          console.log("Error Occured!", error);
        });
    }
  }
};
</script>


<style scoped>
.master {
  margin-top: 0px;
  padding-top: 0px;
  background: lightblue;
}

.selectdiv {
  margin-left: 20px;
}

.heading {
  height: 55px;
  background: lightcoral;
  padding-top: 13px;
  padding-left: 16px;
}

.reschedule-bt {
  border: none;
  background: #1397AA;
  border-radius: 3px;
  height: 27px;
  margin-bottom: 10px;
}

@media (max-width: 767px) {
  .masterDiv {
    margin-left: 1%;
  }
}
</style>
