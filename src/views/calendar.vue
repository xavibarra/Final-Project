<template>
  <Nav />
  <div>
    {{ dia }}, {{ mes }} {{date.getDate()}}, {{date.getFullYear()}}
    </div>
  <div>
    {{ dateTime.hours }}:{{ dateTime.minutes }}:{{ dateTime.seconds }}
  </div>

</template>

<script setup>
import Nav from "../components/Nav.vue";

</script>
<script>
const date = new Date();
export default {
  name: "App",
  data() {
    return {
      dateTime: {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      },
      timer: undefined,
    };
  },
  methods: {
    setDateTime() {
      const date = new Date();
      this.dateTime = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      };
    },
  },
  beforeMount() {
    this.timer = setInterval(this.setDateTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
let dia = "";
if (date.getDay() === 1) {
  dia = "Monday";
} else if (date.getDay() === 2) {
    dia = "Tuesday";
}else if (date.getDay() === 3) {
    dia = "Wednesday";
}else if (date.getDay() === 4) {
    dia = "Thursday";
}else if (date.getDay() === 5) {
    dia = "Friday";
}else if (date.getDay() === 6) {
    dia = "Saturday";
}else if (date.getDay() === 0) {
    dia = "Sunday";
}


let mes = "";
if (date.getMonth() === 0) {
    mes = "January";
}else if(date.getMonth() === 1) {
    mes = "February";
}else if(date.getMonth() === 2) {
    mes = "March";
}else if(date.getMonth() === 3) {
    mes = "April";
}else if(date.getMonth() === 4) {
    mes = "May";
}else if(date.getMonth() === 5) {
    mes = "June";
}else if(date.getMonth() === 6) {
    mes = "July";
}else if(date.getMonth() === 7) {
    mes = "August";
}else if(date.getMonth() === 8) {
    mes = "September";
}else if(date.getMonth() === 9) {
    mes = "October";
}else if(date.getMonth() === 10) {
    mes = "Nobember";
}else if(date.getMonth() === 11) {
    mes = "December";
}


</script>
<style>
.reloj {
  width: 300px;
  font-size: 3rem;
}
</style>
