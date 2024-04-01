<template>
	<view class="inquiry-container">
		<view class="doctor-info">
			<image :src="imgUrl+'/prod-api'+caseInfo.doctor.avatar" mode=""></image>
			<view>医生姓名：{{caseInfo.doctor.name}}</view>
			<view>医生职称：{{caseInfo.doctor.jobName}}</view>
			<view>执业编号：{{caseInfo.doctor.practiceNo}}</view>
			<view>
				咨询描述：
				<view>{{caseInfo.question}}</view>
			</view>
			<view class="pic">
				<view>上传图片：</view>
				<image :src="imgUrl+'/prod-api'+caseInfo.imageUrls" mode=""></image>
			</view>
			<view class="question-list">
				<view>医生回复：</view>
				<view class="question-item">
					<image src="../../static/smart/pig.png" mode=""></image>
					<view>{{caseInfo.doctor.goodAt}}</view>
				</view>
			</view>
			<view class="sub-btn" @click="quizBtn">去提问</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				caseInfo:{},
				idx:0,
				imgUrl:''
			}
		},
		onLoad(option) {
			this.imgUrl = this.$url;
			this.idx = option.n;
			this.caseData(this.idx);
		},
		methods: {
				caseData(n){
					this.$request.get("/prod-api/api/pet-hospital/inquiry/list?pageNum=1&pageSize=10").then(res=>{
						this.caseInfo = res.data.rows[n];
						console.log(this.caseInfo)
					})
				},
				quizBtn(){
					uni.navigateTo({
						url:'/pages/consult/consult?n='+this.idx
					})
				}
		}
	}
</script>

<style lang="scss" scoped>
.inquiry-container{
	padding: 20rpx;
	color: #000;
	line-height: 80rpx;
	font-size: 28rpx;
	image{
		border-radius: 10rpx;
		width: 100%;
		height: 400rpx;
	}
	textarea{
		width: 100%;
		height: 150rpx;
		border: 1rpx solid #efefef;
		text-indent: 2em;
		color: #999;
	}
	.pic{
		image{
			width: 200rpx;
			height: 200rpx;
		}
	}
	.question-list{
		.question-item{
			display: flex;
			align-items: center;
			margin-top: 20rpx;
			font-size: 24rpx;
			image{
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
		}
	}
	.sub-btn{
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #fff;
		background-color: #1890FF;
		border-radius: 10rpx;
		margin: 20rpx auto;
	}
}
</style>
