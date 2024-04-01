<template>
	<view>
		<view class="search">
			<input class="search-input" v-model="infoNo" confirm-type="search" @confirm="searchBtn" placeholder="搜索" />
		</view>
		<view  v-if="Object.keys(wayObj).length>0">
			<view class="way-info">
				<image :src="picUrl+'/prod-api'+wayObj.company.imgUrl" mode=""></image>
				<view class="way-right">
					<view class="name">物流名称：{{wayObj.company.name}}</view>
					<view class="code">单 &nbsp;&nbsp;  &nbsp;&nbsp;号：{{wayObj.infoNo}}</view>
					<view class="phone"><van-icon name="phone-o" /> <text>电 &nbsp;&nbsp;话：{{wayObj.company.phone}}</text> </view>
				</view>
			</view>
			<view class="wl-step">
				<uni-section type="line" title="物流信息" padding>
					<uni-steps :options="steps" direction="column"  :active="active"/>
				</uni-section>
				<view class="btn" @click="wxBtn">物流投诉</view>
			</view>
		</view>
		<view v-else class="empty-info">
			暂无信息
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				picUrl: '',
				wayObj: {},
				active: 0,
				infoNo: 'ST0001',
				steps: [],
			}
		},
		onLoad(option) {
			this.infoNo=option.id
			this.picUrl = this.$url;
			this.getCode(this.infoNo);
		},
		methods: {
			getCode(val) {
				this.$request.get(`/prod-api/api/logistics-inquiry/logistics_info/${val}`).then(res => {
					console.log(res)
					if(res.data.code==200){
						this.wayObj = res.data.data;
						var oldArr = res.data.data.stepList;
						oldArr.map(item=>{
							let obj = {
								title:item.addressAt+'【'+item.stateName+'】',
								desc:item.eventAt
							}
							this.steps.push(obj);
						}) 
						this.active = this.steps.length-1;
					}else{
						this.wayObj = {};
					}
					
				})
			},
			searchBtn(){
				console.log(this.infoNo)
				this.getCode(this.infoNo)
			},
			wxBtn(){
				uni.navigateTo({
					url:`/pages/complain/complain?id=${this.wayObj.companyId}&No=${this.wayObj.infoNo}&name=${this.wayObj.company.name}`
					// url:`/pages/addComplain/addComplain?id=${this.wayObj.companyId}&name=${this.wayObj.company.name}&No=${this.wayObj.infoNo}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.empty-info{
		text-align: center;
		line-height: 100rpx;
		font-size: 36rpx;
		color: #666;
	}
	.search {
		width: 85%;
		height: 60rpx;
		margin: 20rpx auto;
		border-radius: 50rpx;
		border: 1rpx solid #999;

		.search-input {
			width: 100%;
			font-size: 30rpx;
			height: 60rpx;
			margin-left: 30rpx;
		}
	}
	.wl-step{
		padding: 20rpx 50rpx;
		.btn{
			width: 340rpx;
			height: 70rpx;
			font-size: 28rpx;
			border: 1px solid #ccc;
			border-radius: 10rpx;
			text-align: center;
			line-height: 70rpx;
			margin: 40rpx auto;
		}
	}
	.way-info {
		display: flex;
		padding: 20rpx 50rpx;
		image {
			width: 140rpx;
			height: 140rpx;
			border: 1px solid #ddd;
			margin-right: 20rpx;
		}
		.way-right {
			width: 400rpx;
			font-size: 28rpx;

			.name {
				color: yellowgreen;
			}

			.code {
				line-height: 80rpx;
				color: #999;
			}
			.phone {
				display: flex;
				// line-height: 40rpx;
				align-items: center;
			}
		}
	}
</style>