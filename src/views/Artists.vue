<script>
import axios from "axios"
import Pagination from "../components/reusable/Pagination.vue"

export default {
	name: 'Artists',
	components: {
		// ProjectVideoSingle
        // AppBannerInt,
		// ProjectsPresentation,
		// Button,
		Pagination
	},
	data: () => {
		return {
			apiLink: process.env.VUE_APP_API_LINK,
			artistData: {},
			clientip: '',
			currentPage: 1,
			itemsPerPage: 10,
			artist: {},
			alpha: false,
			mostVies: false,
			mostArt: false,
		};
	},
	async mounted(){
		const loader = this.$loading.show({ loader: 'bars', color: '#0000FF',});

			this.getLastUploaded = await axios.get(`${this.apiLink}/api/Web/GetArtistsList`)

			.then(res => {

				// console.log(res.data);

				if( res.status == 200){
					loader.hide();
					this.artistData  = res.data
					// console.log(res.data)
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
	computed: {
		currentPageData() {
			const startIndex = (this.currentPage - 1) * this.itemsPerPage;
			const endIndex = startIndex + this.itemsPerPage;
		if (this.artistData.length) {
			return this.artistData.slice(startIndex, endIndex).map(a => ({
				...a
			}))
		}
		return []
		},
		totalPages() {
			return Math.ceil(this.artistData.length / this.itemsPerPage)
		}
	},
	methods: {
		alfabetSort() {
			this.alpha = true
			this.mostVies = false
			this.mostArt = false
			return this.artistData.sort((a, b) => {
			const lastNameA = a.lastName ? a.lastName.toLowerCase() : '';
			const lastNameB = b.lastName ? b.lastName.toLowerCase() : '';

			if (lastNameA < lastNameB) {
				return -1;
			}
			if (lastNameA > lastNameB) {
				return 1;
			}
			return 0;
			})
		},
		mostViewed() {
			this.alpha = false
			this.mostVies = true
			this.mostArt = false

			return this.artistData.sort((a, b) => {
				const viewsA = a.viewedVideoCounter;
				const viewsB = b.viewedVideoCounter;

				if (viewsA > viewsB) {
					return -1;
				}
				if (viewsA < viewsB) {
					return 1;
				}
				return 0;
			})
		},
		mostArts() {
			this.alpha = false
			this.mostVies = false
			this.mostArt = true
			return this.artistData.sort((a, b) => {
				const viewsA = a.artistArtworkCount;
				const viewsB = b.artistArtworkCount;

				if (viewsA > viewsB) {
					return -1;
				}
				if (viewsA < viewsB) {
					return 1;
				}
				return 0;
			})
		},
		prevPage () {
			if (this.currentPage > 1) {
				this.currentPage -= 1;
			}
		},
		nextPage () {
			if (this.currentPage < this.totalPages) {
				this.currentPage += 1;
			}
		},
		details(artist) {
			this.$router.push({name: 'Artist', params: {param: JSON.stringify(artist.artistId)}}).catch(() => {})
		}
	}
};
</script>

<template >
	<div class="mx-auto my-10 body_text">
		<button class="mr-10 font_links" :class="{ 'active-link': alpha }" @click=alfabetSort()>Азбучен ред</button>
		<button class="mr-10 font_links" :class="{ 'active-link': mostVies }" @click="mostViewed()">Най-гледани</button>
		<button class="font_links" :class="{ 'active-link': mostArt }" @click="mostArts()">Най-много творби</button>
		
	</div>
	<div class="flex flex-wrap">
		<div v-for="(item, index) in currentPageData" :key="index" class="flex items-start w-1/2 p-2">
			<img :src="item.avatarLink" class="w-1/4 h-auto mb-3 rounded-lg shadow-lg" />
			<div class="w-full ml-10 text-left body_text">
				<p class="hidden md:block">Фамилия: {{ item.lastName }}</p>
				<p class="hidden md:block">Държава: {{ item.countryName }}</p>
				<p class="hidden md:block">Контакти:</p>
				<p class="hidden md:block">Брой творби: {{ item.artistArtworkCount }}</p>
				<p class="hidden md:block">Описание за профила: </p>
				<p class="ml-5 mr-4 text-right small-font md:body_text" @click="details(item)"> Виж още...</p>
			</div>
		</div>
	</div>
	<div class="flex justify-end mr-32 body_text">
		<button class="mx-auto mr-10 small-font md:body_text" @click="prevPage" :disabled="currentPage == 1">Previous</button>
		<Pagination :currentPage="currentPage" :totalPages="totalPages" class="justify-end small-font md:body_text"/>
		<button class="small-font md:body_text" @click="nextPage" :disabled="currentPage == totalPages">Next</button>
	</div>
</template>

<style scoped>
.active-link {
		color: #000; /* Add your desired color for active links */
}
.small-font {
	font-size: 1.5rem;
}
</style>
