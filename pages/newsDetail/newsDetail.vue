<template>
	<view class="detail-content">
		<image :src="imgUrl+'/prod-api'+detailObj.cover" mode=""></image>
		<view class="title-list">
			<view class="title">
				<view>{{detailObj.tags}}</view>
				<view>发布于{{detailObj.publishDate}}</view>
			</view>
			<view class="desc">
				<rich-text :nodes="detailObj.content"></rich-text>
			</view> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailObj:{},
				imgUrl:'',
			}
		},
		onLoad(option) {
			this.imgUrl = this.$url;
			console.log(option);
			if(option.id){
				this.getData(parseInt(option.id));
			}
		},
		methods: {
			getData(id){
				console.log(id);
				this.$request.get(`/prod-api/press/press/${id}`).then(res=>{
					console.log(res)
					this.detailObj = res.data.data;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-content{
		image{
			width: 100%;
			height: 340rpx;
		}
		.title-list{
			padding: 0 40rpx;
			.title{
				line-height: 80rpx;
				color: #999;
				font-size: 28rpx;
				display: flex;
				justify-content: space-between;
			}
			.desc{
				font-size: 30rpx;
				line-height: 50rpx;
				text-indent: 2em;
			}
		}
	}
</style>
