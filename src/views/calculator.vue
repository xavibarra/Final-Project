<template>
  <Nav/>
  <div class="output">
    <div class="outputCalc">{{ calculatorValue || 0 }}</div>
  </div>
  <div class="buttonsc">
    <div
      class="buttonc"
      v-for="n in btnArr"
      :key="n"
      :class="{ operator: ['C', '*', '/', '-', '+', '%', '='].includes(n) }"
    >
      <div @click="action(n)">
        {{ n }}
      </div>
    </div>
  </div>
</template>
<script setup>
import Nav from "../components/Nav.vue";
</script>
<script>
export default {
  data() {
    return {
      calculatorValue: "",
      btnArr: [
        "C",
        "*",
        "/",
        "-",
        "7",
        "8",
        "9",
        "+",
        "4",
        "5",
        "6",
        "%",
        "1",
        "2",
        "3",
        "=",
        "0",
        ".",
      ],
      operator: null,
      previousCalculatorValue: "",
    };
  },
  methods: {
    action(n) {
      /* Append value */
      if (!isNaN(n) || n === ".") {
        this.calculatorValue += n + "";
      }
      /* Clear value */
      if (n === "C") {
        this.calculatorValue = "";
      }
      /* Percentage */
      if (n === "%") {
        this.calculatorValue = this.calculatorValue / 100 + "";
      }
      /* Operators */
      if (["/", "*", "-", "+"].includes(n)) {
        this.operator = n;
        this.previousCalculatorValue = this.calculatorValue;
        this.calculatorValue = "";
      }
      /* Calculate result using the eval function */
      if (n === "=") {
        this.calculatorValue = eval(
          this.previousCalculatorValue + this.operator + this.calculatorValue
        );
        this.previousCalculatorValue = "";
        this.operator = null;
      }
    },
  },
};
</script>

<style></style>