<template>
	<view class="detail-container">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular indicator-dots="true" autoplay="true" :interval="3000" duration="500">
				<swiper-item v-for="(item,index) in wlObj.newsList" :key="index">
					<image :src="imgUrl+'/prod-api'+item.imgUrl" mode="" style="width: 100%;"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="company-desc">
			<view class="logistic-title">公司简介</view>
			<view class="desc">{{wlObj.introduce}}</view>
			<view class="logistic-title">运输方法</view>
			<view class="traffic-type">{{wlObj.shippingMethod}}</view>
			<view class="logistic-title">运费介绍</view>
			<view class="fee-introduce">
				<view>目的地：{{wlObj.priceList[0].areaName}}</view>
				<view>文件首重：{{wlObj.priceList[0].fileStart}}kg</view>
				<view>文件递增价格：{{wlObj.priceList[0].fileStep}}元</view>
				<view>物品首重：{{wlObj.priceList[0].objStart}}kg</view>
				<view>物品递增价格：{{wlObj.priceList[0].objStep}}元</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wlObj:{},
				imgUrl:'',
			}
		},
		onLoad(option) {
			this.imgUrl = this.$url;
			this.getData(parseInt(option.id));
		},
		methods: {
			getData(id){
				this.$request.get(`/prod-api/api/logistics-inquiry/logistics_company/${id}`).then(res=>{
					console.log(res);
					this.wlObj=res.data.data;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.detail-container{
		padding: 20rpx;
		.logistic-title{
			line-height: 40rpx;
			font-size: 28rpx;
			font-weight: bold;
			color: #1890FF;
			text-indent: .5em;
			border-left: 10rpx solid #1890FF;
			margin: 30rpx 0;
		}
		.company-desc{
			margin-top: 20rpx;
			.desc{
				line-height: 50rpx;
				text-indent: 2em;
			}
			.fee-introduce,.traffic-type{
				font-size: 28rpx;
				line-height: 60rpx;
				color: #666;
			}
		}
	}
</style>
