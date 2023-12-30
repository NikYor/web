<script>
import feather from 'feather-icons';
import axios from "axios"
import ProjectVideoSingle from './ProjectVideoSingle.vue';
// import projects from '../../data/projects';

export default {
	components: { 
		ProjectVideoSingle, 
	},
	data: () => {
		return {
			
			projectsHeading: 'Projects Portfolio',
			selectedCategory: '',
			searchProject: '',
			getLastUploaded: [],
			getMostPopularTags: [],
			getMostlyWatched: [],
			apiLink: process.env.VUE_APP_API_LINK,
			clientip: ''
			//res_links_api:null
		};
	},
	async mounted(){

		feather.replace();

		this.getDataLastUploadedFromApi();

		this.getDataMostPopularTagsFromApi();

		this.getDataMostlyWatchedFromApi();

		fetch('https://api.ipify.org?format=json')
			.then(response => response.json())
			.then(response => {
				this.clientip = response.ip;
		});
		
	},
	methods: {
		
		async getDataLastUploadedFromApi(){
			const loader = this.$loading.show({ loader: 'bars', color: '#0000FF',});

			this.getLastUploaded = await axios.get(`${this.apiLink}/api/Web/GetLastUploaded`)

			.then(res => {

				//console.log(res_links_api);

				if( res.status == 200){
					loader.hide();
					return res.data
				}
				else{
					loader.hide();
					this.$swal.fire({
					title: 'Възникна проблем?',
					text: "Няма връзка със сървъра",
					icon: 'warning',
					})
				}
			})
			.catch(error => {
				loader.hide();  

				if( error.response ){
					// console.log(error.response.data); // => the response payload 
					this.$swal.fire({
					title: 'Възникна проблем?',
					text: error.response.data,
					icon: 'warning',
				})
				}
				else{
				this.$swal.fire({
					title: 'Възникна проблем?',
					text: error,
					icon: 'warning',
				})
				}

				return 0;
				
			});
		},
		async getDataMostPopularTagsFromApi(){
			const loader = this.$loading.show({ loader: 'bars', color: '#0000FF',});

			this.getMostPopularTags = await axios.get(`${this.apiLink}/api/Web/GetMostPopularTags`)

			.then(res => {

				//console.log(res_links_api);

				if( res.status == 200){
					loader.hide();
					return res.data
				}
				else{
					loader.hide();
					this.$swal.fire({
					title: 'Възникна проблем?',
					text: "Няма връзка със сървъра",
					icon: 'warning',
					})
				}
			})
			.catch(error => {
				loader.hide();  

				if( error.response ){
					// console.log(error.response.data); // => the response payload 
					this.$swal.fire({
					title: 'Възникна проблем?',
					text: error.response.data,
					icon: 'warning',
				})
				}
				else{
				this.$swal.fire({
					title: 'Възникна проблем?',
					text: error,
					icon: 'warning',
				})
				}

				return 0;
				
			});
		},
		async getDataMostlyWatchedFromApi(){
			const loader = this.$loading.show({ loader: 'bars', color: '#0000FF',});

			this.getMostlyWatched = await axios.get(`${this.apiLink}/api/Web/GetMostlyWatched`)

			.then(res => {

				//console.log(res_links_api);

				if( res.status == 200){
					loader.hide();
					return res.data
				}
				else{
					loader.hide();
					this.$swal.fire({
					title: 'Възникна проблем?',
					text: "Няма връзка със сървъра",
					icon: 'warning',
					})
				}
			})
			.catch(error => {
				loader.hide();  

				if( error.response ){
					// console.log(error.response.data); // => the response payload 
					this.$swal.fire({
					title: 'Възникна проблем?',
					text: error.response.data,
					icon: 'warning',
				})
				}
				else{
				this.$swal.fire({
					title: 'Възникна проблем?',
					text: error,
					icon: 'warning',
				})
				}

				return 0;
				
			});
		},
	},
};
</script>

<template>
	<!-- Projects grid -->
	<section class="pt-10 sm:pt-14">
		<!-- Projects grid title -->
		<div class="text-center">
			<p
				class="font-general-semibold text-2xl sm:text-5xl font-semibold mb-2 text-ternary-dark dark:text-ternary-light"
			>
				<!-- {{ projectsHeading }} -->
			</p>
		</div>

		<!-- Filter and search projects -->
		<div class="mt-10 sm:mt-10">
		</div>

		<!-- Projects grid -->
		<div class="text_ab text-left ">

			<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 mt-6 sm:gap-10">
				<div>
					<p class="mt-5">Стартъп събиращ галерии и творци, готови да покажат истинската действителност от целия спектър на визуалното изкуство.</p>
					<p class="mt-5">Една презентация, като лична изповед на творбата, даже и да не е била реално осъзната по време на създаването и .</p>
				</div>
				<div>
					<p class="mt-5">Без ограничение в спектъра на отношенията ни , такива каквито сме без маски, показани от дъното на душата си.</p>
					<p class="mt-5">Без оправдания, без невинност, а жертва на самите нас, първични и опорочаващи всичко наоколо</p>
				</div>
				<div>
					<p class="mt-5">Слаби, сами, уплашени и неразбрани, но верни на себе си и пред съвестта си .</p>
					<p class="mt-5">“От сътворението и до днес е имало и вярваме ще има хора осъзнати, които остават свежи и държат да покажат изкуството си като протест срещу света и неговата бездушност”</p>
				</div>
			</div>
				
		</div> 

		<div class="right_pr mt-12">

			
			<p class="bl-font mt-5 text-left mt-12">Най-гледани</p>
			<div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-6 sm:gap-10">
				<ProjectVideoSingle
					v-for="project in getMostlyWatched"
					:key="project.artWorkId"
					:project="project"
					:clientip="clientip"
					:artistName="null"
				/>
			</div>
			<router-link
				to="/projects"
				class="more_links"
				>
				<p class="mt-10 pt-5">Виж още....</p>
			</router-link>
		</div>

		<div class="right_pr mt-12">
			<p class="bl-font mt-5 text-left mt-12">Водещи тагове</p>
			<div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-6 sm:gap-10">
				<ProjectVideoSingle
					v-for="project in getLastUploaded"
					:key="project.artWorkId"
					:project="project"
					:clientip="clientip"
					:artistName="null"
				/>
			</div>
			<router-link
				to="/projects"
				class="more_links"
				>
				<p class="mt-10 pt-5">Виж още....</p>
			</router-link>
		</div>

		<div class="right_pr mt-12">
			<p class="bl-font mt-5 text-left mt-12">Последно качени</p>
			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 mt-6 sm:gap-10">
				<ProjectVideoSingle
					v-for="project in getMostPopularTags"
					:key="project.artWorkId"
					:project="project"
					:clientip="clientip"
					:artistName="null"
				/>
			</div>
			<router-link
				to="/projects"
				class="more_links"
				>
				<p class="mt-10 pt-5">Виж още....</p>
			</router-link>
		</div>

		<div class="footer_va">
			<p>
				<router-link
					to="/projects"
					class="footer_links"
					>
					Language
				</router-link> &nbsp;&nbsp;&nbsp;
				2009 - 2023 vanyaart.com - Visual Area for Nowadays Yearning Art is inspared by Vanya
			</p>

		</div>
		
	</section>
</template>

<style scoped></style>
