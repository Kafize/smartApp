<template>
	<view class="doctor-container">
		<view class="doctor-item" v-for="(item,index) in doctorList" :key="index" @click="searchDoctor(index)">
			<image :src="imgUrl+'/prod-api'+item.avatar" mode=""></image>
			<view class="doctor-right">
				<view class="name">{{item.name}}</view>
				<view class="post">职称：{{item.jobName}}</view>
				<view class="code">职业编号：{{item.practiceNo}}</view>
				<view class="desc">擅长描述:{{item.goodAt}}</view>
				<view class="year">从业年限：{{item.workingYears}}年</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				doctorList:[],
				imgUrl:'',
			}
		},
		onLoad() {
			this.imgUrl = this.$url;
			this.doctorData()
		},
		methods: {
			doctorData(){
				this.$request.get("/prod-api/api/pet-hospital/pet-doctor/list?typeId=1&pageSize=10&pageNum=1").then(res=>{
					// console.log(res);
					this.doctorList = res.data.rows
				})
			},
			searchDoctor(n){
				uni.navigateTo({
					url:"/pages/consult/consult?n="+n
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.doctor-container{
		padding: 20rpx;
		.doctor-item{
			display: flex;
			margin-bottom: 20rpx;
			color: #999;
			image{
				width: 180rpx;
				height: 180rpx;
				margin-right: 20rpx;
			}
			.doctor-right{
				line-height: 36rpx;
				font-size: 24rpx;
				.desc{
					width: 500rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.name{
					font-weight: bold;
					color: #333;
				}
			}
		}
	}
</style>
