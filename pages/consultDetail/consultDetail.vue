<template>
	<view class="inquiry-container">
		<view class="doctor-info">
			<image :src="imgUrl+'/prod-api'+doctorInfo.doctor.avatar" mode=""></image>
			<view>医生姓名：{{doctorInfo.doctor.name}}</view>
			<view>医生职称：{{doctorInfo.doctor.jobName}}</view>
			<view>执业编号：{{doctorInfo.doctor.practiceNo}}</view>
			<view>
				咨询描述：
				<view>{{doctorInfo.question}}</view>
			</view>
			<view class="pic">
				<view>图片：</view>
				<image :src="imgUrl+'/prod-api'+doctorInfo.doctor.avatar" mode=""></image>
			</view>
			<view class="question-list">
				<view>问答列表：</view>
				<view class="question-item" v-for="(item,index) in questionList" :key="index">
					<view class="van-ellipsis">{{item.content}}</view>
					<view>{{item.createTime.substring(0,11) }}</view>
				</view>
			</view>
			<view>
				追问：
				<textarea style="height: 100rpx;" v-model="requestion" placeholder="输入追问问题"/>
			</view>
			<view class="sub-btn" @click="sendBtn">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList: [],
				questionList:[],
				requestion:'',
				inquiryId:11,
				doctorInfo:{},
				index:0,
				imgUrl:''
			}
		},
		onLoad(option) {
			this.imgUrl = this.$url;
			this.index = option.n
			this.questionData();
			this.myCaseData(this.index);
		},
		methods: {
			myCaseData(n){
				this.$request.get("/prod-api/api/pet-hospital/inquiry/my-list").then(res=>{
					this.doctorInfo = res.data.rows[n];
				})
			},
				questionData(){
					this.$request.get("/prod-api/api/pet-hospital/inquiry-message/list?inquiryId=11").then(res=>{
						this.questionList = res.data.rows
					})
				},
				sendBtn(){
					if(this.requestion){
						this.$request.post("/prod-api/api/pet-hospital/inquiry-message",{
							inquiryId:this.inquiryId,
							content:this.requestion
						}).then(res=>{
							if(res.data.code==200){
								this.questionData();
								this.requestion = "";
							}
						})
					}
					
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
			justify-content: space-between;
			align-items: center;
			line-height: 40rpx;
			font-size: 24rpx;
			view:nth-child(1){
				width: 500rpx;
				margin-left: 20rpx;
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
