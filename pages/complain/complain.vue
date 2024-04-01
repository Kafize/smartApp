<template>
	<view class="complain-container">
		<view class="top">
			<view class="add" @click="addBtn">新增+</view> 
		</view>
		<view class="complain-list">
			<view class="complain-content" v-for="(item,index) in complainList" :key="index">
				<view class="complain-item">
					<image :src="imgUrl+'/prod-api'+item.company.imgUrl" mode=""></image>
					<view class="complain-right">
						<view class="">快递名称：{{item.company.name}}</view>
						<view class="code">运单号：{{item.infoNo}}</view>
						<view class="code">投诉类别：{{item.questionType==1 ? '未收到货':'已收到货'}}</view>
					</view>
				</view>
				<view class="commont">投诉内容:
				<view>{{item.description}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				complainList:[],
				imgUrl:'',
				companyId:'',
				infoNo:'',
				companyName:''
			};
		},
		onLoad(options) {
			this.infoNo = options.No;
			this.companyId = parseInt(options.id);
			this.imgUrl = this.$url;
			this.companyName = options.name
			this.getComplainData();
		},
		methods:{
			getComplainData(){
				this.$request.get("/prod-api/api/logistics-inquiry/logistics_complaint/my-list").then(res=>{
					console.log(res);
					this.complainList = res.data.rows;
				})
			},
			addBtn(){
				uni.navigateTo({
					url:`/pages/addComplain/addComplain?id=${this.companyId}&No=${this.infoNo}&name=${this.companyName}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.complain-container{
		padding: 20rpx;
		.top{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 80rpx;
			margin-bottom: 30rpx;
			.add{
				border: 1px solid #ccc;
				width: 140rpx;
				height: 60rpx;
				font-size: 24rpx;
				border-radius: 10rpx;
				text-align: center;
				line-height: 60rpx;
				color: #1890FF;
			}
		}
		.complain-list{
			.complain-content{
				box-shadow: 0 0 10rpx #ccc;
				border-radius: 10rpx;
				padding: 20rpx;
				margin-bottom: 20rpx;
				.commont{
					view{
						line-height: 40rpx;
						font-size: 24rpx;
						color: #666;
						text-indent: 2em;
					}
					
				}
			}
			.complain-item{
				display: flex;
				image{
					width: 160rpx;
					height: 160rpx;
					border: 1px solid #ccc;
					border-radius: 10rpx;
				}
				.complain-right{
					width: 460rpx;
					margin-left: 20rpx;
					font-size: 26rpx;
					line-height: 60rpx;
				}
			}
		}
	}
</style>
