<template>
	<view class="news-content">
		<view class="news-list">
			<view class="news-item" @click="goDetail(item.id)" v-for="(item,index) in dataList" :key="index">
				<image :src="imgUrl+'/prod-api'+item.cover" mode=""></image>
				<view class="info-right">
					<view class="desc">{{item.title}}</view>
					<view class="time">
						<view>{{item.tags}}</view>
						<view>{{item.publishDate}}</view>
					</view>
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
				dataList: []
			}
		},
		onLoad() {
			this.imgUrl = this.$url;
			this.getNewsData();
		},
		methods: {
			getNewsData(){
				this.$request.get("/prod-api/press/press/list").then(res=>{
					console.log(res);
					this.dataList = res.data.rows;
				})
			},
			goDetail(id){
				uni.navigateTo({
					url:"/pages/newsDetail/newsDetail?id="+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin flex-name($val: flex-start) {
		display: flex;
		justify-content: $val;
	}
	.news-list {
		padding: 20rpx;
		background-color: #fff;
		margin-top: 20rpx;
		.news-item {
			height: 160rpx;
			@include flex-name();
			align-items: center;
			border-bottom: 1rpx solid #cfcfcf;
			image {
				width: 200rpx;
				height: 120rpx;
			}
			.info-right {
				width: 500rpx;
				height: 120rpx;
				margin-left: 20rpx;
				font-size: 26rpx;
				color: #999;
				position: relative;
				.time {
					width: 100%;
					position: absolute;
					bottom: 0;
					@include flex-name(space-between);
				}
			}
		}
	}
</style>