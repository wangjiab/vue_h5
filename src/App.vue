<template>
	<div id="app">
		<input type="text" v-model="orderCount" placeholder="请输入B端套餐订购量">
		<input type="text" v-model="courseCount" placeholder="请输入B端转正式套餐量">
		<input type="text" v-model="familyOrderCount" placeholder="请输入C端联帮在家订购量">
		<!-- <div id="js-btn" @click="computedMoney">计算我的收益</div> -->
		<div class="result">
			<p>B端服务收益：
				<b>{{serverMoney}}</b>元</p>
			<p>B端转正返利：
				<b>{{courseMoney}}</b>元</p>
			<p>C端订购返利：
				<b>{{familyMoney}}</b>元</p>
			<p>合计收益：
				<b>{{allMoney}}</b>元</p>
		</div>
		<!-- {{orderCount}}
			{{courseCount}}
				{{familyOrderCount}} -->
	</div>
</template>
<script src="./vm.js"></script>
<style lang="scss" src="common/css/index.scss"></style>
