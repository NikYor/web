<script>
import axios from "axios"
import ProjectVideoSingle from '../components/projects/ProjectVideoSingle.vue';
// import AppBannerInt from '@/components/shared/AppBannerInt';
// import ProjectsPresentation from '../components/projects/ProjectsPresentation.vue';
// import Button from '../components/reusable/Button.vue';

export default {
	name: 'Artist',
	components: {
		ProjectVideoSingle
        // AppBannerInt,
		// ProjectsPresentation,
		// Button,
	},
	data: () => {
		return {
			apiLink: process.env.VUE_APP_API_LINK,
			artistData: {},
			clientip: '',
            artist: {}
			
		};
	},
	async mounted(){
		const loader = this.$loading.show({ loader: 'bars', color: '#0000FF',});

			this.getLastUploaded = await axios.get(`${this.apiLink}/api/Web/GetArtistInfo/7cee6765-1e51-452b-a101-c16903799182`)

			.then(res => {

				//console.log(res_links_api);

				if( res.status == 200){
					loader.hide();
					this.artistData  = res.data
					console.log(res.data)
					// return res.data
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

			fetch('https://api.ipify.org?format=json')
			.then(response => response.json())
			.then(response => {
				this.clientip = response.ip;
			});

		
	},
};
</script>
<template>
<div class="container mx-auto body_text">
		<!-- Banner -->
		<!-- <AppBannerInt class="mb-5 sm:mb-8" /> -->

		<!-- Projects -->
		<!-- <ProjectsPresentation /> -->
		
        <div class="flex flex-wrap">
			<div class="w-full p-4 md:w-1/6">
				<p class="mt-5">{{ artistData.firstName }}</p>
				<img
					:src="artistData.avatarLink"
					class="h-64 mx-auto mt-5 shadow-lg rounded-xl sm:shadow-none"
					alt="{{ artistData.artistName}}"
				/>
			</div>
			<div class="w-full p-4 md:w-5/6 ">
				<div v-for="(art, index) in artistData.artistDescriptions" :key="index">
					<p class="mt-5">За мен от профила</p>
					<p class="pb-10 mt-4 mb-8 text-left border-b border-gray-300">
						{{ art.description }}
					</p>
				</div>
			</div>
		</div>

		<div class="flex flex-wrap">
			<div class="w-full pt-5 mt-5 md:w-1/6 ">

				<div class="float-left">
					
					<div class="">	
						<p class="pt-3 mt-5 mb-2 text-left body_text">
							Видео презентация
						</p>
					</div>
					
				</div>
				<div class="float-left w-full">

					<vue-plyr>
						<div class="plyr__video-embed" @click="updateCounterWatch()" >
							<iframe
							:src="`${artistData.videoPrezentationLink}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`"
							allowfullscreen
							allowtransparency
							allow="autoplay"
							width="90%"
							></iframe>
						</div>
					</vue-plyr>

				</div>
				<div class="float-left cont_left ">
					<p class="pt-3 mt-5 mb-2 text-left body_text">
						Контакти
					</p>
				</div>
				<div class="float-left cont_left ">
					<p class="pt-3 mt-5 mb-2 text-left body_text">
						Водещи тагове
					</p>
				</div>


		</div>

		<div class="w-full md:w-5/6 ">
			<div >
				<p class="min-h-full">Творби на автора</p>
					<div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:gap-10">
						<ProjectVideoSingle
							v-for="project in artistData.artWorks"
							:key="project.id"
							:project="project"
							:clientip="clientip"
							:artistName="artistData.firstName"
						/>
					</div>
				</div>
			</div>
		</div>
		



	</div>

</template>