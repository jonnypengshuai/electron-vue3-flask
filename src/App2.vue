<template>
    <div class="container mt-2">Current App Path: {{ appPath }}</div>
    <div>
      <Calculator></Calculator>
    </div>
  </template>

<script setup>
import semver from "semver";
import axios from "axios";
import axiosRetry from "axios-retry";
import Calculator from "./components/Calculator.vue";
import { ref, onMounted ,getCurrentInstance} from 'vue';
const MIN_API_VERSION = "1.1.0";
const appPath = ref("");
const instance = getCurrentInstance();
const SERVERURL = instance.appContext.config.globalProperties.SERVERURL;

onMounted(async () => {
  const client = axios.create({ baseURL: `${SERVERURL}` });

  try {
    const response = await client.get("/echo", {
      "axios-retry": {
        retries: 5,
        retryDelay: axiosRetry.exponentialDelay,
      },
    });
    console.log(response.data);

    const apiVersionResponse = await axios.get(`${SERVERURL}/api_version`);
    if (
      semver.lte(
        semver.clean(MIN_API_VERSION),
        semver.clean(apiVersionResponse.data)
      )
    ) {
      console.log("API version satisfied");
    } else {
      alert("Invalid API version");
    }
  } catch (error) {
    console.error(error);
  }

  window.ipcRenderer.send("getAppPath");

  window.ipcRenderer.on("getAppPathResponse", (appPath) => {
    appPath.value = appPath;
  });
});
</script>

