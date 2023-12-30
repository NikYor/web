import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/app.css';
import BackToTop from 'vue-backtotop';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'


const feather = require('feather-icons');
feather.replace();

createApp(App)
	.use(router)
	.use(BackToTop)
	.use(VueSweetalert2)
	.use(LoadingPlugin)
	.use(VuePlyr, {plyr: {}})
	.mount('#app');

const appTheme = localStorage.getItem('theme');

// Check what is the active theme and change theme when user clicks on the theme button in header.
if (
	appTheme === 'dark' &&
	document.querySelector('body').classList.contains('app-theme')
) {
	document.querySelector('body').classList.add('bg-primary-dark');
} else {
	document.querySelector('body').classList.add('bg-secondary-light');
}
