<template>
	<a class="link--mallki" :class="className"> {{ text }}
		<span :data-letters="text"></span>
    <span :data-letters="text"></span>
  </a>
</template>


<script>
	export default {
		props: {
			className:{
				type: String
			},
			text: {
				type: String,
				default: 'vue-element-admin'
			}
		}
	}
</script>

<style>
	.link--mallki {
		position: relative;
		font-weight: 800;
		color: #4dd9d5;
		line-height: 1;
		font-family: 'Dosis', sans-serif;
		transition: color 0.5s 0.25s;
		overflow: hidden;
	}
	.link--mallki:hover {
	  transition: none;				/* 颜色透明时无动画 */			
	  color: transparent;
	}
	.link--mallki::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		width: 100%;
		height: 6px;
		margin-top: -3px;
		background-color: #3888fa;
		transform: translate3d(-100%, 0, 0);			/* 向左偏移100% */
		transition: transform .4s cubic-bezier(.7, 0, .3, 1);							/* 偏移动画 */
	}
	.link--mallki:hover::before {
		transform: translate3d(100%, 0, 0);
	}
	.link--mallki span {
		position: absolute;
		width: 100%;
		height: 50%;
		left: 0;
		top: 0;
		overflow: hidden;
	}
	.link--mallki span::before {
		content: attr(data-letters);
		position: absolute;
		left: 0;
		width: 100%;
		color: #3888fa;
		transition: transform .5s;
	}
	.link--mallki span:nth-child(2) {
		top: 50%;
	}
	.link--mallki span:first-child::before {
		top: 0;
		transform: translate3d(0, 100%, 0);  /* 向上偏移100% */
	}
	.link--mallki span:nth-child(2)::before {
		bottom: 0;
		transform: translate3d(0, -100%, 0);		/* 向下偏移100% */
	}
	.link--mallki:hover span::before {
		transition-delay: .3s;
		transform: translate3d(0, 0, 0);			/* 复位 */
		transition-timing-function: cubic-bezier(.2, 1, .3, 1);
	}
</style>