import { createApp } from "vue";
import App from "./App2.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./index.css";

let app = createApp(App);

// global variables are defined in main.js
app.config.globalProperties.SERVERURL = "http://127.0.0.1:5000";

console.log("app==",app.config)
app.use(ElementPlus)
app.mount("#app");
