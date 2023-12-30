<script>
import axios from "axios"
// import Artist from "./Artist.vue";
import Pagination from "../components/reusable/Pagination.vue"
// import { VueElement } from "vue";
export default {
	name: 'Artist',
	components: {
		// ProjectVideoSingle
        // AppBannerInt,
		// ProjectsPresentation,
		// Button,
		// Artist,
		Pagination
	},
	data: () => {
		return {
			apiLink: process.env.VUE_APP_API_LINK,
			artistData: {},
			clientip: '',
			currentPage: 1,
			totalPages: 5,
			itemsPerPage: 6
		};
	},
	async mounted(){
		const loader = this.$loading.show({ loader: 'bars', color: '#0000FF',});

			this.getLastUploaded = await axios.get(`${this.apiLink}/api/Web/GetArtistsList`)

			.then(res => {

				console.log(res.data);

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
	},
	methods: {
		alfabetSort() {
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
	}
};
</script>

<template >
	<div class="mx-auto my-10 body_text">
		<button class="mr-10" @click=alfabetSort()>Азбучен ред</button>
		<button class="mr-10" @click="mostViewed()">Най-гледани</button>
		<button @click="mostArts()">Най-много творби</button>
		
		<Pagination :currentPage="currentPage" :totalPages="totalPages" class="mx-auto"/>
		<button class="mx-auto mr-10" @click="prevPage">Previous</button>
		<button @click="nextPage">Next</button>
	</div>
	<div class="flex flex-wrap">
		<div v-for="(item, index) in currentPageData" :key="index" class="flex items-start w-1/2 p-2">
			<img :src="item.avatarLink" class="w-1/4 h-auto mb-3 rounded-lg shadow-lg" />
			<div class="w-full ml-10 text-left body_text">
				<p>Фамилия: {{ item.lastName }}</p>
				<p>Държава: {{ item.countryName }}</p>
				<p>Контакти:</p>
				<p>Брой творби: {{ item.artistArtworkCount }}</p>
				<p>Описание за профила: </p>
				<button class="ml-5 mr-4 text-right body_text" @click="details(item)"> Виж още...</button>
			</div>
			<div class="flex items-end">
			</div>
		</div>
	</div>
</template>

<style scoped></style>
