<template>
    <div class="master container-fluid">
        <div class="heading row">
            <h3>{{ name }}</h3>
        </div>

        <div class="setAndViewLogs row">
            <div>
                <button @click="getPan()" class="btn btn-primary btn-sm">PAN</button>
            </div>
            <div>
                <button @click="getOtp()" class="btn btn-primary btn-sm">OTP</button>
            </div>
            <div>
                <button @click="getAadhaar()" class="btn btn-primary btn-sm">AADHAAR</button>
            </div>
        </div>

        <div class="footerDiv mt-1">
            <button @click="$router.back()" class="btn btn-secondary btn-sm">Back</button>
        </div>
    </div>
</template>

<script>
import { post } from '../../callAPI'

export default {
    name: "integrationHome",
    data() {
        return {
            name: "Integration Dashboard",

            headers: {
                'SOURCE_SYSTEM': 'LOCAL'
                // 'SOURCE_SYSTEM': 'FINFINITY'
            },
        }
    },

    methods: {

        getPan() {
            let requestData = {
                "category": "individual-pii-data",
                "type": "pan-detail-v2",
                "applicationId": "Dashboard-realtime-KYC",
                "data": {
                    "panNumber": "AAAAK1579R",
                },
                "mode": "TEST",
            };

            post("/rest/pan/verification", requestData, { headers: this.headers })
                .then((response) => {
                    console.log("Response form Backend: ", response);
                })
                .catch((error) => {
                    // Handle the error
                    console.log("Error Occured!", error);
                })
        },

        getOtp() {
            let sendOtp = {
                "category": "individual-pii-data",
                "type": "aadhaar-offline-otp",
                "applicationId": "Dashboard-realtime-KYC",
                "data": {
                    "aadhaarNo": "947454636797"
                },
                "mode": "PROD"
            };

            post("/rest/sendOtp", sendOtp, { headers: this.headers })
                .then((response) => {
                    console.log("Response form Backend: ", response);
                })
                .catch((error) => {
                    // Handle the error
                    console.log("Error Occured!", error);
                })
        },

        getAadhaar() {
            let getAadhaar = {
                "category": "individual-pii-data",
                "type": "aadhaar-offline-file",
                "applicationId": "Dashboard-realtime-KYC",
                "data": {
                    "aadhaarNo": "947454636797",
                    "requestId": "aadhaar_v2_VDbxbcoyHiJTqmsBxemU",
                    "otp": "228254"
                },
                "mode": "PROD"
            }

            post("/rest/get/aadhaar", getAadhaar, { headers: this.headers })
                .then((response) => {
                    console.log("Response form Backend: ", response);
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
    height: 170px;
}

.heading {
    height: 45px;
    background: rgb(247, 149, 238);
    padding-top: 9px;
    padding-left: 16px;
}

.footerDiv {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: flex-end;
    background-color: #c9c9c9;
}

.setAndViewLogs {
    display: grid;
    grid-template-columns: auto auto auto auto;
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



