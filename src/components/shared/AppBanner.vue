<script>
import feather from 'feather-icons';

export default {
	name: 'Home',
	data: () => {
		return {
			theme: '',
		};
	},
	created() {
		this.theme = localStorage.getItem('theme') || 'light';
	},
	mounted() {
		feather.replace();
		this.theme = localStorage.getItem('theme') || 'light';
	},
	updated() {
		feather.replace();
	},
	methods: {},
};
</script>

<template>
	<section
		class="flex flex-col items-center sm:justify-between sm:flex-row"
	>   	
			
			
			<div class="hidden left lg:inline">
				<div class="hidden center lg:inline">
							<img class="p-0 m-0"
							v-if="theme === 'light'"
							src="@/assets/images/home-logo-left.png"
							alt="Developer"
							width="800"
				/>
				</div>
				<div class = "ldown">
						Aрт стартъп за артисти, готови да приемат провокацията покаяние за гледна точка в творбата им.	
				</div>		
			</div>
			
			<div class="hidden center lg:inline">
					<img class="p-0 m-auto"
					v-if="theme === 'light'"
					src="@/assets/images/head.png"
					alt="Developer"
					width="350"
			/>
			</div>

			<div class="hidden right lg:inline">
				<div class = "w-full mt-0 rup">
					<router-link
					to="/arts"
					class="font_links"
					>
					&#8729; Arts<br>
					</router-link>
				</div>
				<div class = "w-full mt-4 rup">
					<router-link
						to="/artists"
						class="font_links"
					>
					&#8729; Artists<br>
					</router-link>	
				</div>
				<div class = "w-full mt-4 rup">
					<router-link
						to="/projects"
						class="font_links"
						>
						&#8729; Events<br>
					</router-link>	
				</div>
				<div class = "w-full mt-4 mb-12 rup">
					<router-link
						to="/projects"
						class="font_links"
						>
						&#8729; About<br>
					</router-link>	
				</div>
				<div class = "w-full mt-12 mb-8 rdown">
					<router-link
					to="/projects"
					class="font_links"
					>
					&#8729; Language
					</router-link>
				</div>
				<div class = "w-full mt-5 rdown">
					<a href="http://localhost:3000/signIn" class="font_links">&#8729; Login</a>
					<!-- <router-link
					to="/contacts"
					class="font_links"
					>
					Login
					</router-link> -->
				</div>
				<div class = "mt-5 rdown">
					<router-link
					to="/projects"
					class="font_links"
					>
					&#8729; Search<br>
					</router-link>
				</div>
				
			</div>
				
			
			
		
		

		<!-- Banner left contents -->

		<!-- <div class="w-full text-left md:w-1/3">
			
		</div>
		<div class="w-full text-left md:w-1/3">
			<img
				v-if="theme === 'light'"
				src="@/assets/images/head.png"
				alt="Developer"
				width="800"
			/>
		</div>
		<div class="w-full text-left md:w-1/3">
			
		</div> -->

		<!-- Banner right illustration -->
		<!-- <div class="float-right w-full text-right md:w-2/3">
			<img
				v-if="theme === 'light'"
				src="@/assets/images/head.png"
				alt="Developer"
				width="600"
			/>
			<img
				v-else
				src="@/assets/images/head.png"
				alt="Developer"
				width="600"
			/>
		</div> -->


	</section>
</template>

<style scoped></style>
