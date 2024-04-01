<template>
	<view class="home-content">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular indicator-dots="true" autoplay="true" :interval="1000" duration="500">
				<swiper-item v-for="(item,index) in bannerList" :key="index" @click="bannerNewsDetail(item.targetId)">
					<image :src="imgUrl+'/prod-api'+item.advImg" mode="" style="width: 100%;"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 推荐服务 -->
		<view class="server-content">
			<view class="title">推荐服务</view>
			<view class="server-list">
				<view class="server-item" v-for="(item,index) in serverList" :key="index" >
					<view class="server-icon">
						<image :src="imgUrl+'/prod-api'+item.imgUrl" mode=""></image>
					</view> 
					<view class="icon-title">{{item.serviceName}}</view>
				</view>
				 <view class="server-item">
					<view class="server-icon">
						<image src="../../static/smart/metro.png" mode=""></image>
					</view> 
					<view class="icon-title">更多</view>
				</view>
			</view>
		</view>
		<view class="news-list">
			<view class="news-item" v-for="(item,index) in dataList" :key="index" @click="goNewsDetail(item.id)">
				<image :src="imgUrl+'/prod-api'+item.cover" mode="" class="news-img" ></image>
				<view class="info-right">
					<view class="content">{{item.subTitle}}</view>
					<view class="time">{{item.publishDate}}</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:'',
				bannerList:[],
				serverList:[],
				dataList:[],
				newsId:0
			}
		},
		onLoad() {
			console.log(this.$url)
			this.imgUrl = this.$url;
			this.getBanner();
			this.getServer();
			this.getNewsData();
		},
		methods: {
			getBanner(){
				this.$request.get("/prod-api/api/rotation/list?Num=1&pageSize=8").then(res=>{
					console.log(res);
					this.bannerList = res.data.rows;
				})
			},
			// 推荐服务
			getServer(){
				this.$request.get('/prod-api/api/service/list',{ isRecommend:"N" }).then(res=>{
					this.serverList = res.data.rows;
				})
			},
			getNewsData(){
				this.$request.get("/prod-api/press/press/list").then(res=>{
					// console.log(res);
					this.dataList = res.data.rows.slice(0,3);
					// this.newsId = res.data.rows[0].id;
				})
			},
			bannerNewsDetail(val){
				uni.navigateTo({
					url:"/pages/newsDetail/newsDetail?id="+val
				})
			},
			goNewsDetail(val){
				console.log(val)
				uni.navigateTo({
					url:"/pages/newsDetail/newsDetail?id="+val
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
@mixin flex-name($val:flex-start) {
	display: flex;
	justify-content: $val;
}
.home-content{
	height: 100%;
	background-color: #f5f5f5;
	padding: 20rpx;
	.server-content{
		padding: 20rpx;
		background-color: #fff;
		margin-top: 20rpx;
		.title{
			font-weight: bold;
			line-height: 90rpx;
			border-bottom: 1rpx solid #cfcfcf
		}
		.server-list{
			@include flex-name(space-between);
			flex-wrap: wrap;
			.server-item{
				width: 30%;
				font-size: 24rpx;
				height: 120rpx;
				text-align: center;
				margin: 24rpx 0;
				.server-icon{
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					background-color: rgba(120, 164, 250, 1);
					margin: 10rpx auto;
					image{
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						margin-top: 10rpx;
					}
				}
			}
		}
	}
	.news-list{
		padding: 20rpx;
		background-color: #fff;
		margin-top: 30rpx;
		.news-item{
			@include flex-name();
			margin-bottom: 30rpx;
			.news-img{
				width: 340rpx;
				height: 140rpx;
				overflow: hidden;
			}
			.info-right{
				width: 500rpx;
				margin-left: 20rpx;
				font-size: 26rpx;
				color: #999;
				position: relative;
				.time{
					position: absolute;
					bottom: 0;
				}
			}
		}
	}
}
</style>