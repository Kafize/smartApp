<template>
	<view class="pet-container">
		<view class="pet-title">宠物品种</view>
		<view class="pet-list">
			<view class="pet-item" v-for="(item,index) in zoonList" :key="index" @click="searchDoctor">
				<image :src="imgUrl+'/prod-api'+item.imgUrl" mode="" ></image>
				<view class="name">{{item.name}}</view>
			</view>
		</view>
		<view class="pet-title">我的问诊</view>
		<view class="refer-list">
			<view class="refer-item" v-for="(item,index) in mineCase" :key="index" @click="referDetail(index)">
				<image :src="imgUrl+'/prod-api'+item.imageUrls" mode=""></image>
				<view class="refer-right">
					<view class="name">{{item.doctor.name}}</view>
					<view class="desc"> 案例描述： {{item.question}}</view>
				</view>
			</view>
		</view>
		<view class="pet-title">问诊案例</view>
		<view class="refer-list">
			<view class="refer-item" v-for="(item,index) in referList" :key="index" @click="caseDetail(index)">
				<image :src="imgUrl+'/prod-api'+item.imageUrls" mode=""></image>
				<view class="refer-right">
					<view class="name">{{item.doctor.name}}</view>
					<view class="desc"> 案例描述： {{item.question}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				zoonList:[],
				mineCase:[],
				referList:[],
				imgUrl:'',
			};
		},
		onLoad() {
			this.imgUrl = this.$url;
			this.sortData();
			this.referData()
			this.myCaseData()
		},
		methods:{
			// 宠物分类
			sortData(){
				this.$request.get("/prod-api/api/gov-service-hotline/pet-type/list?pealCategoryId=4&pageNum=1&pageSize=10").then(res=>{
					// console.log(res);
					this.zoonList = res.data.rows
				})
			},
			referData(){
				this.$request.get("/prod-api/api/pet-hospital/inquiry/list").then(res=>{
					this.referList = res.data.rows
				})
			},
			myCaseData(){
				this.$request.get("/prod-api/api/pet-hospital/inquiry/my-list").then(res=>{
					console.log(res)
					this.mineCase = res.data.rows
				})
			},
			searchDoctor(){
				console.log(11);
				uni.navigateTo({
					url:'/pages/doctor/doctor'
				})
			},
			referDetail(idx){
				uni.navigateTo({
					url:'/pages/consultDetail/consultDetail?n='+idx
				})
			},
			caseDetail(n){
				uni.navigateTo({
					url:'/pages/caseDetail/caseDetail?n='+n
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	@mixin flex-name($val:flex-start) {
		display: flex;
		justify-content: $val;
	}
	.pet-container{
		padding: 20rpx;
		.pet-title{
			line-height: 40rpx;
			font-size: 28rpx;
			font-weight: bold;
			color: #1890FF;
			text-indent: .5em;
			border-left: 10rpx solid #1890FF;
			margin: 30rpx 0;
		}
		.pet-list{
			@include flex-name();
			flex-wrap: wrap;
			.pet-item{
				width: 20%;
				text-align: center;
				font-size: 28rpx;
				line-height: 40rpx;
				margin-bottom: 20rpx;
				image{
					width: 64rpx;
					height: 64rpx;
				}
			}
		}
		.refer-list{
			padding: 20rpx;
			box-shadow: 0 0 10rpx #999;
			.refer-item{
				@include flex-name();
				margin-bottom: 20rpx;
				image{
					width: 220rpx;
					height: 140rpx;
					margin-right: 20rpx;
					border-radius: 10rpx;
				}
				.refer-right{
					line-height: 50rpx;
					font-size: 28rpx;
					.name{
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
