<script>
import axios from "axios"

export default {
	props: ['project' , 'clientip', 'artistName'],
	data: () => {
		return {
			counter:null,
			apiLink: process.env.VUE_APP_API_LINK,
			nameArt: '',
		};
	},
	mounted() {
		if (this.artistName != null)
			{this.nameArt = this.artistName;}
		else
			{this.nameArt = this.project.artist}
	},
	methods: {
		
		async updateCounterWatch(){
			const loader = this.$loading.show({ loader: 'bars', color: '#0000FF',});

			const body = 
			{ 
				"ArtWorkId" : this.project.artWorkId,
				"Ip" : this.clientip,
			};

			this.counter = await axios.post(`${this.apiLink}/api/ArtWork/UpdateVideoPlaysCounter` , body)

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
	}
};
</script>

<template>
	
	<div class="float-left w-64 h-64 ml-2 mt-2 body_text">
		<div class="float-left">
			<router-link
				to="/projects/single-project"
				class=" hover:shadow-xl cursor-pointer mb-10 sm:mb-0 hover:underline hover:text-blue-600"
				aria-label="Single Project"
			>
				<div class="body_text">	
					<p class="text-left  mt-5 mb-2">
						<!-- {{ project.author }} -->
						{{ nameArt }}
					</p>
				</div>

			</router-link>
		</div>
		<div class="float-left w-full">

			<vue-plyr>
				<div class="plyr__video-embed" @click="updateCounterWatch()" >
					<iframe
					:src="`${project.videoPrezentation}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`"
					allowfullscreen
					allowtransparency
					allow="autoplay"
					></iframe>
				</div>
			</vue-plyr>

		</div>
		
		<div class="float-left">
			<router-link
				to="/projects/single-project"
				class=" hover:shadow-xl cursor-pointer mb-10 sm:mb-0 hover:underline hover:text-blue-600"
				aria-label="Single Project"
			>		
				<div class="px-4 ">
					<p class="text-center  mt-5">
						{{ project.caption }}
					</p>
				</div>
			</router-link>
		</div>

	</div>
		
	
</template>

<style scoped>
	.video_frame_bg {
		background-image: url("@/assets/images/VideoBgSm.png");
		background-size: cover;
		background-repeat: no-repeat;
		width:200px;
		height:153px;
		padding-top: 25px;

		/* padding: 15%;  */
		
		
		/* padding-left: 20px;
		padding-top: 15px;
		width: 85%;
		height:80% */
	}
	.iclass{
		/* margin-bottom:10px;
		background-image: url("@/assets/images/VideoBg.png");
		background-size: contain;
		background-repeat: no-repeat; */
		width: 160px;
		margin-left:20px;
		
		/* height:70% */
	}

	.play_icon {
		position: relative;
		margin-top: -60px;
		margin-left:80px;
		/* top:50%; */
	}

</style>
