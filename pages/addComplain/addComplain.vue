<template>
	<view class="add-complain">
		<view class="add-item">
			<view>公司名称：</view>
			<input v-model="name" placeholder="请输入类别">
		</view>
		<view class="add-item"> 
			<view>运单号：</view>
			<input v-model="infoNo" placeholder="请输入类别">
		</view>
		<view class="add-item"> 
			<view class="type">投诉类别:</view> 
			<uni-data-select
				v-model="type"
				:localdata="range"
				@change="changeType"
			></uni-data-select>
		</view>
		<view class="add-item"> 
			<view>投诉内容:</view>
		</view>
		<textarea v-model="desc" placeholder="请描述内容..." />
		<view class="add-btn" @click="comfirm">确认</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				infoNo:'',
				type:'',
				desc:'',
				id:'',
				range: [
					{ value: 1, text: "未收到货" },
					{ value: 2, text: "已收到货" },
				],
			};
		},
		onLoad(option) {
			console.log(option)
			if(JSON.stringify(option) != "{}"){
				this.id = option.id;
				this.name = option.name;
				this.infoNo = option.No;
			}
			
		},
		methods:{
			changeType(e){
				this.type = e;
			},
			comfirm(){
				if(this.type&&this.desc){
					this.$request.post('/prod-api/api/logistics-inquiry/logistics_complaint',{
						companyId:parseInt(this.id),
						infoNo:this.infoNo,
						questionType:this.type,
						description:this.desc
					}).then(res=>{
						console.log(res);
						if(res.data.code==200){
							setTimeout(()=>{
								uni.showToast({
									title:"投诉成功",
									icon:'success'
								})
								uni.navigateTo({
									url:`/pages/complain/complain?id=${this.id}&No=${this.infoNo}&name=${this.name}`
								})
							},2000)
						}
					})
				}else{
					uni.showToast({
						title:"投诉失败",
						icon:'error'
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add-complain{
		padding: 40rpx;
		.add-item{
			height: 50rpx;
			line-height: 50rpx;
			font-size: 28rpx;
			border-left: 10rpx solid #1890FF;
			margin-bottom: 50rpx;
			text-indent: .5em;
			display: flex;
			.type{
				margin-right: 30rpx;
			}
			input{
				width: 400rpx;
				margin-left: 20rpx;
				border-bottom: 1px solid #ccc;
				height: 50rpx;
				line-height: 50rpx;
			}
		}
		textarea{
			width: 100%;
			height: 300rpx;
			font-size: 28rpx;
			border: 1px solid #ccc;
			border-radius: 10rpx;
			text-indent: 2em;
			margin-top: 30rpx;
			line-height: 60rpx;
		}
		.add-btn{
			width: 240rpx;
			margin: 30rpx auto;
			background-color: #1890FF;
			color: #fff;
			text-align: center;
			border-radius: 10rpx;
			line-height: 80rpx;
			font-size: 26rpx;
		}
	}
</style>
