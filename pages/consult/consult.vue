<template>
	<view class="inquiry-container">
		<view class="doctor-info">
			<image :src="imgUrl+'/prod-api'+doctorInfo.avatar" mode=""></image>
			<view>医生姓名：{{doctorInfo.name}}</view>
			<view>医生职称：{{doctorInfo.jobName}}</view>
			<view>执业编号：{{doctorInfo.practiceNo}}</view>
			<view>
				问题描述：
				<textarea  v-model="desc"/>
			</view>
			<view class="pic">
				<view>上传图片：</view>
				<uni-file-picker :value="fileList" limit="1" fileMediatype="image"  @select="fileUpload" />
				<!-- <van-uploader :file-list="fileList" max-count="1" @after-read="afterRead"/> -->
			</view>
			<view class="sub-btn" @click="submitBtn">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue:'',
				fileList: [],
				doctorInfo:{},
				desc:'',
				doctorId:'',
				index:0,
				imgUrl:''
			}
		},
		onLoad(option) {
			this.imgUrl = this.$url;
			this.index = option.n;
			this.doctorData(this.index);
		},
		methods: {
			  fileUpload(event) {
				 var imgSrc = event.tempFilePaths;
				 uni.uploadFile({
					 url:this.imgUrl+'/prod-api/common/upload',
					 filePath:imgSrc[0],
					 name: 'file',
					 header:{
						 'Authorization':uni.getStorageSync('token')
					 },
					 success(res) {
					 	console.log(res);
						var resulut = JSON.parse(res.data);
						console.log(resulut)
						this.imageValue = resulut.fileName
					 }
				 })
			  },
				doctorData(n){
					this.$request.get("/prod-api/api/pet-hospital/pet-doctor/list?typeId=1&pageSize=10&pageNum=1").then(res=>{
						this.doctorInfo = res.data.rows[n];
						console.log(this.doctorInfo);
						this.doctorId = res.data.rows[n].id
					})
				},
				submitBtn(){
					this.$request.post("/prod-api/api/pet-hospital/inquiry",
					{
						doctorId:parseInt(this.doctorId),
						question:this.desc,
						imageUrls:this.imageValue, 
					}).then(res=>{
						console.log(res);
						if(res.data.code==200){
							uni.showToast({
								title:"提交成功",
								icon:'success'
							})
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/pet/pet'
								})
							},2000)
						}
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
