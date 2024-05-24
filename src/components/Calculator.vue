<template>
    <div class="flex flex-col justify-center items-center p-3 text-xl font-mono">
      <p class="p-2">Input something like <code>1 + 1</code>.</p>
      <p>
        This calculator supports <code>+-*/^()</code>, whitespaces, and integers
        and floating numbers.
      </p>
  
      <div class="m-2">
        <input
          class="rounded-lg p-2"
          type="text"
          v-model="inputExpression"
          placeholder="1 + 2"
        />
      </div>
      <button
        @click="calcSum"
        class="
          my-2
          p-2
          border-2 border-black
          rounded-lg
          hover:bg-gray-300
          transition-all
        "
      >
        Calculate
      </button>
  
      <br />
      <span class="label"> {{ result }}</span>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted ,getCurrentInstance} from 'vue';
  import axios from "axios";
  
//   const requestObject = ref({
//   key: "Hello world from Electron!",
// });
const inputExpression = ref("1 + 2");
const result = ref("");
const instance = getCurrentInstance();
const SERVERURL = instance.appContext.config.globalProperties.SERVERURL;

const calcSum = () => {
  if (inputExpression.value != "") {
    let reqObj = { expression: inputExpression.value };
    axios
      .post(`${SERVERURL}/add`, reqObj)
      .then((response) => {
        result.value = `Result = ${response.data.message}`;
      })
      .catch(function (error) {
        console.error(error);
      });
  }
};

onMounted(() => {
  axios
    .get(`${SERVERURL}/echo`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});
  </script>
  
  <style>
  body,
  html {
    background-color: rgb(224, 223, 223);
    height: 99%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  #result {
    margin: 30px;
  }
  </style>