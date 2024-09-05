<template>
	
	<div class="app">
		<LoginComponent/>
		<Navbar class="nav"/>
		<div class="side-child">
			<Sidebar class="side"/>
			<router-view class="child"/>
		</div>
		
	</div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'


</script>

<style lang="scss">
:root {
	--primary: #00567a;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.nav{
	width: 100%;
	height: 80px;
}
.side-child{
	display: flex;
	
}
.child{
	width: 100%;
	
}

.side{
	width: 20%;
}
.app {
	display: contents;

	main {
		flex: 1 1 0;
		padding: 2rem;

		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}
</style>