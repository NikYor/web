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
							src="@/assets/images/home-logo-left-int.png"
							alt="Developer"
							width="380"
				/>
				</div>	
			</div>
			
			<div class="hidden ml-5 center lg:inline">
					<img class="p-0 m-auto"
					v-if="theme === 'light'"
					:src="`/images${$route.path}.png`"
					alt="Developer"
					width="1000"
			/>
			</div>

			<div class="hidden right lg:inline" style="width:15%">
				<div class = "w-full mt-0 rup">
					<router-link
					to="/arts"
					class="font_links"
					:class="{ 'active-link': $route.path === '/arts' }"
					>
					Arts<br>
					</router-link>
				</div>
				<div class = "w-full rup">
					<router-link
						to="/artists"
						class="font_links"
						:class="{ 'active-link': $route.path === '/artists' }"
					>
					Artists<br>
					</router-link>	
				</div>
				<div class = "w-full rup">
					<router-link
						to="/events"
						class="font_links"
						:class="{ 'active-link': $route.path === '/events' }"
						>
						Events<br>
					</router-link>	
				</div>
				<div class = "w-full rup">
					<router-link
						to="/about"
						class="font_links"
						:class="{ 'active-link': $route.path === '/about' }"
						>
						About<br>
					</router-link>	
				</div>
				<div class = "w-full rup">
					<a href="http://localhost:3000/signIn" class="font_links">Login</a>
				</div>
				<div class = "mt-2 rup">
					<router-link
					to="/search"
					class="font_links"
					:class="{ 'active-link': $route.path === '/search' }"
					>
					Search<br>
					</router-link>
				</div>
				
			</div>

	</section>
</template>

<style scoped>
	.active-link {
		color: #000; /* Add your desired color for active links */
	}
</style>
