<template>
	<view class="login-container">
		<view class="logo-form">
			<view class="form-item">
				<view class="title">账号</view>
				<input class="uni-input" v-model="loginForm.username" focus placeholder="请输入账号" />
			</view>
			<view class="form-item">
				<view class="title">密码</view>
				<input class="uni-input"  v-model="loginForm.password"  focus placeholder="请输入密码" />
			</view>
			<view class="form-item auto-login">
				<view class="title">自动登录</view>
				<switch checked style="transform:scale(0.8);" />
			</view>
			<view class="login-btn" @click="loginBtn">登录</view>
			<view class="pass-item">
				<view class="pass-link">注册账号</view>
				<view>|</view>
				<view class="pass-link">忘记密码</view>
			</view>
		</view>
		<view class="other-login">
			<view class="icon-item">
				<image src="../../static/smart/wechat.png" mode=""></image>
			</view>
			<view class="icon-item">
				<image src="../../static/smart/qq.png" mode=""></image>
			</view>
			<view class="icon-item">
				<image src="../../static/smart/wb.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginForm:{
					username:'',
					password:''
				}
			};
		},
		onLoad() {
			uni.setStorage({
				key:'token',
				data:''
			})
		},
		methods:{
			loginBtn(){
				var obj = this.loginForm;
				if(obj.username&&obj.password){
					this.$request.post('/prod-api/api/login',this.loginForm).then(res=>{
						console.log(res)
						if(res.data.code==200){
							uni.showToast({
								title:"登录成功",
								icon:'success'
							})
							uni.setStorage({
								key:'token',
								data:res.data.token
							})
							setTimeout(()=>{
								uni.switchTab({
									url:"/pages/index/index"
								})
							},2000)
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none',
								duration: 2000
							})
						}
					})
				}else{
					uni.showToast({
						title:"信息不为空",
						icon:'error'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		height: 100vh;
		background-color: #f5f5f5;
		overflow: hidden;
	}
	.logo-form {
		margin-top: 40rpx;

		.auto-login {
			justify-content: space-between;
			margin-top: 20rpx;
		}

		.form-item {
			padding: 0 40rpx;
			display: flex;
			align-items: center;
			height: 86rpx;
			font-size: 30rpx;
			background-color: #fff;

			.title {
				margin-right: 40rpx;
			}

			.uni-input {
				font-size: 30rpx;
			}
		}

		.pass-item {
			display: flex;
			justify-content: center;
			font-size: 26rpx;
			color: $uni-text-color-grey;

			.pass-link {
				color: $uni-color-primary;
				width: 130rpx;
				text-align: center;
			}
		}

		.login-btn {
			width: 90%;
			margin: 60rpx auto;
			text-align: center;
			line-height: 80rpx;
			background-color: $uni-color-primary;
			color: #fff;
			border-radius: 10rpx;
		}
	}

	.other-login {
		width: 60%;
		margin-left: 20%;
		display: flex;
		justify-content: space-around;
		align-self: center;
		position: absolute;
		bottom: 60rpx;

		.icon-item {
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			border: 1rpx solid #cfcfcf;
			text-align: center;
			&:nth-child(1){
				background-color: rgba(0, 0, 0, .1);
			}
			image {
				width: 50rpx;
				height: 50rpx;
				margin-top: 8rpx;
			}
		}
	}
</style>