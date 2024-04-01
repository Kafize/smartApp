<template>
	<view class="logistic-container">
		<view class="search">
			<input class="search-input" confirm-type="search" @confirm="searchBtn" placeholder="搜索" />
		</view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular indicator-dots="true" autoplay="true" :interval="3000" duration="500">
				<swiper-item v-for="(item,index) in bannerList" :key="index" @click="goNewsDetail(item.id)">
					<image :src="imgUrl+'/prod-api'+item.imgUrl" mode="" style="width: 100%;"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="logistic-list">
			<view class="logistic-title">物流公司推荐</view>
			<view class="logistic-sort">
				<view class="logistic-item" v-for="(item,index) in logisticList" :key="index" @click="godetail(item.id)">
					<image :src="imgUrl+'/prod-api'+item.imgUrl" mode=""></image>
					<view class="title">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="other-company">
			<view class="logistic-title">其他物流公司</view>
			<view class="choose">
				<radio-group @change="radioChange" class="radio-list">
						<label class="radio-item" v-for="(item, index) in redioList" :key="item.value">
								<radio :value="item.value" color="#1890FF" :checked="index === current" />
							  <view>{{item.name}}</view>
						</label>
					</radio-group>
					<view class="choose-list">
						<view class="choose-item" v-for="(item,index) in otherLogistic" :key="index">{{item.name}}</view>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import toPinyin from "../../common/toPinyin.js"
	export default {
		data() {
			return {
				imgUrl:'',
				bannerList:[],
				logisticList:[],
				current:0,
				otherLogistic:[],
				redioList:[
					{
							value: '1',
							name: 'Z-A排序',
							checked: 'true'
					},
					{
							value: '2',
							name: 'A-Z排序'
					},
				]
			};
		},
		onLoad() {
			console.log(this.$url);
			this.imgUrl = this.$url;
			this.getBanner();
			this.logisticData();
			this.otherData()
		},
		methods:{
			getBanner(){
				this.$request.get("/prod-api/api/logistics-inquiry/ad-banner/list").then(res=>{
					console.log(res);
					this.bannerList = res.data.data;
				})
			},
			logisticData(){
				this.$request.get("/prod-api/api/logistics-inquiry/logistics_company/list").then(res=>{
					var arr=res.data.rows;
					// this.logisticList = res.data.rows.slice(0,12);
					arr.forEach(item=>{
						if(item.isRecommend=="Y"){
							this.logisticList.push(item)
						}
					})
					console.log(this.logisticList)
				})
			},
			otherData(){
				this.$request.get("/prod-api/api/logistics-inquiry/logistics_company/list").then(res=>{
					var newArr= res.data.rows;
					newArr.filter(item=>{
						Object.assign(item,{initial:toPinyin.chineseToInitials(toPinyin.chineseToPinYin(item.name))})
					})
					this.otherLogistic=newArr.sort((a, b) => (b.initial + '').localeCompare(a.initial + ''));
				})
			},
			goNewsDetail(val){
				uni.navigateTo({
					url:"/pages/newsDetail/newsDetail?id="+val
				})
			},
			radioChange(e){
				var data = e.detail.value;
				this.otherLogistic.filter(item=>{
					Object.assign(item,{initial:toPinyin.chineseToInitials(toPinyin.chineseToPinYin(item.name))})
				})
				if(data==2){
					this.otherLogistic=this.otherLogistic.sort((a, b) => (a.initial + '').localeCompare(b.initial + ''));
				}else if(data==1){
					this.otherLogistic=this.otherLogistic.sort((a, b) => (b.initial + '').localeCompare(a.initial + ''));
				}
			},
			searchBtn(e){
				if(e.detail.value){
					uni.navigateTo({
						url:`/pages/wayDetail/wayDetail?id=${e.detail.value}`
					})
				}else{
					uni.showToast({
						icon:'error',
						title:"内容不为空",
						duration:2000
					})
				}

			},
			godetail(val){
				console.log(val)
				uni.navigateTo({
					url:`/pages/wlDetail/wlDetail?id=${val}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
@mixin flexName($val:flex-start) {
	display: flex;
	justify-content: $val;
}
.search{
	width: 85%;
	height: 60rpx;
	margin: 20rpx auto;
	border-radius: 50rpx;
	border: 1rpx solid #999;
	.search-input{
		width: 100%;
		font-size: 30rpx;
		height: 60rpx;
		margin-left: 30rpx;
	}
}
.logistic-container{
	padding: 20rpx;
	.logistic-title{
		line-height: 40rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #1890FF;
		text-indent: .5em;
		border-left: 10rpx solid #1890FF;
	}
	.logistic-list{
		margin-top: 40rpx;
		.logistic-sort{
			margin-top: 40rpx;
			@include flexName();
			flex-wrap: wrap;
			.logistic-item{
				width: 25%;
				text-align: center;
				image{
					width: 140rpx;
					height: 140rpx;
				}
				.title{
					font-size: 26rpx;
					line-height: 60rpx;
				}
			}
		}
		
	}
	.choose{
		.radio-list{
			margin-top: 20rpx;
			@include flexName();
		}
		.radio-item{
			@include flexName();
			align-items: center;
			margin-right: 20rpx;
			font-size: 29rpx;
		}
		.choose-list{
			margin-top: 20rpx;
			line-height: 60rpx;
			font-size: 28rpx;
		}
	}
}
</style>
