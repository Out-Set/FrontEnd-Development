<template>
  <div class="master">
    <div>
      <h3 class="heading">Set Schedule</h3>
    </div>

    <div class="selectdiv">

      <div class="type" style="margin-bottom: 20px;">
        <input type="radio" id="one" value="One" name="cron" v-model="picked" />
        <label for="one">Create Cron Expression</label><br>

        <input type="radio" id="two" value="Two" name="cron" v-model="picked" />
        <label for="two">Write Cron Expression</label>
      </div>

      <!-- SelectCron -->
      <div id="selectCron" style="display: grid;">
        <div>
          <strong>Cron:</strong>
          <input type="text" id="cron" v-model="cronExpression" disabled>
        </div>

        <div
          style="padding-top: 10px; padding-bottom: 25px; display: grid; grid-template-columns: auto auto auto auto auto auto;">
          <div>
            <strong>Second:</strong>
            <select v-model="sType">
              <option v-for="sType in sTypes" :key="sType" :value="sType">{{ sType }}</option>
            </select>

            <select v-model="second">
              <option v-for="second in seconds" :key="second" :value="second">{{ second }}</option>
            </select>
          </div>

          <div>
            <strong>Minute:</strong>
            <select v-model="mType">
              <option v-for="mType in mTypes" :key="mType" :value="mType">{{ mType }}</option>
            </select>

            <select v-model="minute">
              <option v-for="minute in minutes" :key="minute" :value="minute">{{ minute }}</option>
            </select>
          </div>

          <div>
            <strong>Hour:</strong>
            <select v-model="hType">
              <option v-for="hType in hTypes" :key="hType" :value="hType">{{ hType }}</option>
            </select>

            <select v-model="hour">
              <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
            </select>
          </div>

          <div>
            <strong>Date:</strong>
            <select v-model="date" style="width: 100px;">
              <option v-for="date in dates" :key="date" :value="date">{{ date }}</option>
            </select>
          </div>

          <div>
            <strong>Month:</strong>
            <select v-model="month" style="width: 100px;">
              <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
            </select>
          </div>

          <div>
            <strong>Day:</strong>
            <select v-model="day" style="width: 100px;">
              <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
            </select>
          </div>

        </div>

        <div style="margin-right: 20px;">
          <button disabled ref="enable_btn" class="reschedule-bt" v-on:click="set()">Set Schedule
          </button>
        </div>

      </div>

      <!-- WriteCron -->
      <div style="padding-top: 50px; padding-bottom: 25px;" id="writeCron">
        <strong>Write Your cron Expression</strong>&nbsp;
        <input type="text" v-model="expression">&nbsp;
        <button ref="cron-btn" class="reschedule-bt" v-on:click="setCronExp()">Set Schedule</button>&nbsp;&nbsp;

        <!-- <strong>Enter Delay in MilliSecond</strong>&nbsp;
        <input type="number" v-model="delay">&nbsp;
        <button ref="cron-btn" class="reschedule-bt" v-on:click="setDelay()">Set Delay</button> -->
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
      sTypes: ['every', 'specific'],
      sType: 'every',

      mTypes: ['every', 'specific'],
      mType: 'every',

      hTypes: ['every', 'specific'],
      hType: 'every',

      seconds: ['All', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
      second: 'All',

      minutes: ['All', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
      minute: 'All',

      hours: ['All', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      hour: 'All',

      dates: ['All', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      date: 'All',

      months: ['All', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      month: 'All',

      days: ['All', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      day: 'All',

      selectedData: "",
      expression: "",
      delay: 0,

      cSecond: '*',
      cMinute: '*',
      cHour: '*',
      cronExpression: '* * * * * *',

      cDate: '*',
      cMonth: '*',
      cDay: '*',

      picked: ''
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

    picked(pickedChoice) {
      console.log(pickedChoice);
      if (this.picked === 'One') {
        document.getElementById("writeCron").style.display = "none";
        document.getElementById("selectCron").style.display = "block";
      } else {
        document.getElementById("selectCron").style.display = "none";
        document.getElementById("writeCron").style.display = "block";
        document.getElementById("writeCron").style.paddingTop = "20px";
      }

    },

    second(newSecond) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Second: ${newSecond}`);
      this.setCron()
    },

    minute(newMinute) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Minute: ${newMinute}`);
      this.setCron()
    },

    hour(newHour) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Hour: ${newHour}`);
      this.setCron()
    },

    sType(newType) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Type: ${newType}`);
      this.cronExpression = `* ${this.cMinute} ${this.cHour} ${this.cDate} ${this.cMonth} ${this.cDay}`
      this.second = 'All'
    },

    mType(newType) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Type: ${newType}`);
      this.cronExpression = `${this.cSecond} * ${this.cHour} ${this.cDate} ${this.cMonth} ${this.cDay}`
      this.minute = 'All'
    },

    hType(newType) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Type: ${newType}`);
      this.cronExpression = `${this.cSecond} ${this.cMinute} * ${this.cDate} ${this.cMonth} ${this.cDay}`
      this.hour = 'All'
    },


    date(newDate) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Date: ${newDate}`);
      this.setCron()
    },

    month(newMonth) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Month: ${newMonth}`);
      this.setCron()
    },

    day(newDay) {
      this.$refs.enable_btn.disabled = false
      console.log(`Selected Day: ${newDay}`);
      this.setCron()
    },

  },

  methods: {
    setCron() {
      //Set Second
      if (this.second !== 'All') {
        if (this.sType === 'every') {
          if (this.second !== '0') {
            this.cSecond = `0/${this.second}`
            this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.date} ${this.month} ${this.day}`
          } else {
            this.cSecond = `${this.second}`
            this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.date} ${this.month} ${this.day}`
          }
        }
        else {
          this.cSecond = `${this.second}`
          this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.date} ${this.month} ${this.day}`
        }
      } else {
        this.cSecond = '*'
        this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.date} ${this.month} ${this.day}`
      }

      // Set Minute
      if (this.minute !== 'All') {
        if (this.mType === 'every') {
          if (this.minute !== '0') {
            this.cMinute = `0/${this.minute}`
            this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.date} ${this.month} ${this.day}`
          } else {
            this.cMinute = `${this.minute}`
            this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.date} ${this.month} ${this.day}`
          }
        }
        else {
          this.cMinute = `${this.minute}`
          this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.date} ${this.month} ${this.day}`
        }
      } else {
        this.cMinute = '*'
        this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.date} ${this.month} ${this.day}`
      }


      // Set Hour
      if (this.hour !== 'All') {
        if (this.hType === 'every') {
          if (this.hour !== '0') {
            this.cHour = `0/${this.hour}`
            this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.cDate} ${this.cMonth} ${this.cDay}`
          } else {
            this.cHour = `${this.hour}`
            this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.cDate} ${this.cMonth} ${this.cDay}`
          }
        }
        else {
          this.cHour = `${this.hour}`
          this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.cDate} ${this.cMonth} ${this.cDay}`
        }
      } else {
        this.cHour = '*'
        this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.cDate} ${this.cMonth} ${this.cDay}`
      }


      // Set Date
      if (this.date !== 'All') {
        this.cDate = `${this.date}`
        this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.cDate} ${this.cMonth} ${this.cDay}`
      } else {
        this.cDate = '*'
        this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.cDate} ${this.cMonth} ${this.cDay}`
      }


      // Set Month
      if (this.month !== 'All') {
        this.cMonth = `${this.month}`
        this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.cDate} ${this.cMonth} ${this.cDay}`
      } else {
        this.cMonth = '*'
        this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.cDate} ${this.cMonth} ${this.cDay}`
      }


      // Set Day
      if (this.day !== 'All') {
        this.cDay = `${this.day}`
        this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.cDate} ${this.cMonth} ${this.cDay}`
      } else {
        this.cDay = '*'
        this.cronExpression = `${this.cSecond} ${this.cMinute} ${this.cHour} ${this.cDate} ${this.cMonth} ${this.cDay}`
      }

    },

    set() {
      console.log(this.second, this.minute, this.hour, this.date, this.month, this.day);
      this.selectedData = this.second + " " + this.minute + " " + this.hour + " " + this.date + " " + this.month + " " + this.day
      console.log(typeof this.selectedData, this.selectedData);

      axios.post('http://localhost:8081/dynamicSchedule/cronVal', this.cronExpression)
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

      axios.post('http://localhost:8081/dynamicSchedule/cronVal', this.expression)
        // axios.post('http://localhost:8081/BitsFlow-App/springScheduler/cronVal', this.expression)
        .then((response) => {
          console.log("Response form Backend: ", response);
        })
        .catch((error) => {
          // Handle the error
          console.log("Error Occured!", error);
        });
    },

    setDelay() {
      console.log(typeof this.delay, this.delay);
      axios.get('http://localhost:8081/dynamicSchedule/delayVal?delay=' + this.delay)
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
  height: 20px;
  margin-bottom: 10px;
}

@media (max-width: 767px) {
  .masterDiv {
    margin-left: 1%;
  }
}
</style>
