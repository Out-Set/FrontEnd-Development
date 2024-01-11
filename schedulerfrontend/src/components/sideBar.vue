<template>
    <div class="sidebar">
        <div class="logoDiv" @click="gotoHome()">
            <h5>Home</h5>
        </div>
        <br>

        <ul class="nav nav-pills flex-column mb-auto">
            <li>
                <router-link to="/schedulerHome"> <button class="text-start customButton"
                        :class="{ active: this.$route.path.startsWith('/schedulerHome'), customButton: true }"> &nbsp;
                        Scheduler</button>
                </router-link>
            </li>

            <li>
                <router-link to="/serviceIdentifiers"><button class="text-start customButton"
                        :class="{ active: this.$route.path.startsWith('/serviceIdentifiers'), customButton: true }">&nbsp;
                        Audit Log</button></router-link>
            </li>


        </ul>
    </div>
    <!-- Page content -->
    <div class="main">
        <nav class="navbar">
            <div class="container-fluid">
                <span @click="gotoHome()" class="integration-Home"><strong>Integration Dashboard</strong></span>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'sideBar',
    methods: {
        gotoHome() {
            this.$router.push('/schedulerHome')
        },
    },

}
</script>

<style scoped>
.logoDiv{
    margin-top: 4px;
    color: brown;
}
.navbar {
    background-color: #5ee9e9;
}

.container-fluid {
    background-color: #5ee9e9;
}

.integration-Home {
    font-size: 30px;
    text-decoration: none;
    color: #fffafa;
    margin-left: 35%;
    cursor: default;
}

.sidebar {
    height: 100%;
    width: 11%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: white;
    overflow-x: hidden;
    box-shadow: 2px 2px 3px #818181;
}

/* Style links inside the sidebar */
.customButton {
    padding: 10px 12px 10px 20px;
    font-size: 18px;
    color: black;
    display: block;
    border: none;
    background: none;
    width: 100%;
    margin-left: 12px;
}

/* Change color on hover */
.sidebar button:hover {
    background-color: #afaedd;
    color: white;

}

.main {
    margin-left: 11%;
    padding: 0px 10px;
    background-color: #5ee9e9;
}

.active {
    background-color: #5e5bec;
    color: white;
}

ul li {
    margin-left: 5px;
}

a {
    font-size: 20px;
    color: black;

    border: none;
    background: none;

    text-decoration: none;
}

@media (max-width: 767px) {
    .customButton {
        padding: 1px 1px 1px 1px;
        font-size: 15px;
        color: black;
        border: none;
        background: none;
        width: 80%;
        /* margin-right: 10px; */
        margin-left: 0px;

    }

    .sidebar {
        height: 60px;
        /* width: 194px; */
        position: relative;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
        overflow-x: none;
        background-color: white;
        box-shadow: 0px 0px 0px #818181;
        display: flex;
    }

    .main {
        position: relative;
        top: 1px;
        margin-left: 1%;
        /* Same as the width of the sidebar */
        padding: 0px 10px;
        background-color: #017e7e;
    }

    .flex-column {
        flex-direction: row !important;
        width: 30%;
    }

    .active {
        background-color: #5e5bec;
        color: white;
    }
}
</style>
