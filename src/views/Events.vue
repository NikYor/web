<script>
// import AppBannerInt from '@/components/shared/AppBannerInt';
// import ProjectsPresentation from '../components/projects/ProjectsPresentation.vue';
// import Button from '../components/reusable/Button.vue';
import axios from "axios"

export default {
	name: 'Events',
	components: {
		// AppBannerInt,
		// ProjectsPresentation,
		// Button,
	},
	data: () => {
		return {
			apiLink: process.env.VUE_APP_API_LINK,
			eventsData: {},
			clientip: '',
			expand: false,
			artist: {}
		};
	},
	async mounted() {
		const loader = this.$loading.show({ loader: 'bars', color: '#0000FF', });

		this.getLastUploaded = await axios.get(`${this.apiLink}/api/Web/EventsList`)

			.then(res => {

				if (res.status == 200) {
					loader.hide();
					this.eventsData = res.data
				}
				else {
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

				if (error.response) {
					this.$swal.fire({
						title: 'Възникна проблем?',
						text: error.response.data,
						icon: 'warning',
					})
				}
				else {
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
	methods: {
		expandText(item) {
			this.expand = true
			this.artist = item
		},
		hideForm() {
			this.expand = false;
		},
		handleOverlayClick(event) {
      // Check if the click is outside the box
			if (event.target.classList.contains('overlay')) {
				this.hideForm();
			}
		},


	}
};
</script>

<template >
	<div class="mx-auto mt-10 body_text">
		<div v-for="(item, index) in eventsData" :key="index"
			class="container flex w-full pb-5 mx-auto mt-5 border-b border-gray-300 ">
			<img :src="item.posterLink"
				class="flex w-full h-auto p-4 mb-5 ml-2 shadow-lg rounded-xl sm:shadow-none sm:w-1/2 md:w-1/4 sm:h-1/2"
				alt="{{ item.firstName}}" />
			<div class="flex-wrap w-full ml-5 text-left p-7 avatar sm:w-1/2 md:w-1/4 ">
				<!-- <div class="flex"> -->
					<p class="body-text sm:text-sm md:text-2xl ld:text-4xl">{{ item.firstName }}</p>
					<p class="body-text sm:text-sm md:text-2xl ld:text-4xl">{{ item.countryName }}</p>
					<!-- <p class="body-text sm:text-sm md:text-2xl ld:text-4xl small-font">Контакти от соц. мрежи </p>
						<p>{{ item.artistContacts.social1 }}</p> -->
					<img :src="item.avatarLink" class="w-32 shadow-lg rounded-xl sm:shadow-none sm:w-full md:w-1/2 sm:h-auto"
					alt="{{ item.artistName}}" />
				<!-- </div> -->
			</div>
			<div class="flex-wrap w-full p-4 ml-12 text-left avatar sm:w-1/2 md:w-1/4">
				<div>
					<p class="body-text sm:text-sm md:text-2xl ld:text-4xl small-font">Дата/Час</p>
					<!-- <p class="small-font">Период на провеждане </p> -->
					<p class="body-text sm:text-sm md:text-2xl ld:text-4xl">{{ item.fromDate.split('T')[0] + ' ' + item.fromDate.split('T')[1] }}/<br>{{
						item.toDate.split('T')[0] + ' ' + item.toDate.split('T')[1] }}</p>
				</div>
				<p class="body-text sm:text-sm md:text-2xl ld:text-4xl small-font">Място: <span class="body-text sm:text-sm md:text-2xl ld:text-4xl">{{ item.location }}</span></p>
				<div class="body-text sm:text-sm md:text-2xl ld:text-4xl small-font">
					Контакти:
					<p class="body-text sm:text-sm md:text-2xl ld:text-4xl">{{ item.artistContacts.address1 }}</p>
					<p class="body-text sm:text-sm md:text-2xl ld:text-4xl">{{ item.artistContacts.address2 }}</p>
				</div>
			</div>
			<div class="flex-wrap w-full p-4 pr-5 ml-12 sm:w-1/2 md:w-1/4">
				<div class="pb-12 text-left ">
					<p class="body-text sm:text-sm md:text-2xl ld:text-4xl small-font">Описание </p>
					<p class="body-text sm:text-sm md:text-2xl ld:text-4xl">{{ item.description.length > 50 ? item.description.substr(0, 50).concat('...') : item.description }}</p>
					<p class="text-right"><button v-if="item.description.length > 50" @click="expandText(item)" class="body-text sm:text-sm md:text-2xl ld:text-4xl small-font"> Виж още </button></p>
				</div>
				<div class="pb-12 text-left">
					<p class="body-text sm:text-sm md:text-2xl ld:text-4xl small-font">Тагове</p>
				</div>
			</div>
		</div>


		<div v-if="expand" class="overlay" @click="handleOverlayClick">
			<div class="border-b card border-black-300 bgimg">
				<div @click="hideForm()" class="flex justify-end">
					<img src="../assets/images/close.png" :width="40">
				</div>
				<div class="p-3">
					<div>
						<img :src="artist.posterLink"
							class="flex-wrap p-4 mx-auto mb-5 shadow-lg rounded-xl sm:shadow-none sm:w-1/2 md:w-1/4 sm:h-1/4"
							alt="{{ artist.firstName}}" />
					</div>
					<div>
						<div class="pb-12 text-left">
							<p>{{ artist.description }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.avatar {
	align-self: start;
	text-wrap: nowrap;
	/* height: 416px; */
}

.small-font {
	font-size: 1.5rem;
}

.center-container {
	justify-content: center;
	align-items: center;
	height: 100%;
}

.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(230, 227, 227, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
	overflow: auto;
}

.card {
	max-width: 70%;
	border: 3px solid #1f1e1e;
	border-radius: 8px;
	overflow: hidden;
	margin: 16px;
	background-color: rgb(255, 254, 253);
}</style>
