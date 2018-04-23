<style lang="sass" scoped>
.container {
	background-color: #f2f2f2;
	min-height: 100%;
}
.swiper-container {
	width: 100%;
	height: 3.8rem;
	.swiper-slide{
	    width:100%;
	    height:100%;
	    img{
	        width:100%;
	        height: 3.8rem;
	    }
	    a{
	        display:block;
	        overflow:hidden;
	    }
	}
}
.type-navbar{
    white-space: nowrap;
    height: 0.88rem;
    width: 100%;
    background-color: #fff;
}
::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
}
.type-box{
    width:1.6rem;
    box-sizing: content-box;
    font-size: 0.24rem;
    line-height: 0.84rem;
    text-align: center;
    display: inline-block;
    overflow: hidden;
}
.type-navbar-item{
    border-bottom: 0.04rem solid #fff;
}
.type-item-on{
    border-bottom: 0.04rem solid #e64340;
}
.goods-container{
    display: flex;
    justify-content: space-between;  
    flex-wrap:wrap;
    box-sizing: content-box;
    padding: 0.24rem;
}
.goods-box{
    width: 3.39rem;
    height: 4.72rem;
    background-color: #fff;
    overflow: hidden;
    margin-bottom: 0.24rem;
}
.goods-box .img-box{
    width: 3.39rem;
    height: 3.39rem;
    overflow: hidden;
}
.goods-box .img-box img{
    width: 3.39rem;
    height: 3.39rem;
}
.goods-box .goods-title{
    width: 2.8rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 0.24rem;
    padding: 0.24rem 0 0 0;
    color:#000;
    margin-left: 0.24rem;
}
.goods-box .goods-price{
    width: 2.8rem;
    overflow: hidden;
    font-size: 0.24rem;
    padding: 0.24rem 0;
    color:#e64340;
    margin-left: 0.24rem;
}
.no-more-goods{
    text-align: center;
    font-size: 0.24rem;
    padding-bottom:0.48rem; 
    color: #999;
}
.type-container{
    width: 100%;
    height: 0.88rem;
    background-color: #fff;
    overflow: hidden;
}
.notice{
    display: flex;
    justify-content: space-between;  
    flex-wrap:wrap;
    height: 0.8rem;
    line-height: 0.8rem;
    width: 750rem;
    margin-top: 1rem;
    background-color: #fff;
}
.notice_swiper{
    padding-top:0.15rem;
    padding-bottom: 0.15rem;
    height: 0.5rem;
    line-height: 0.5rem;
    width: 6.35rem;
}
.notice_iteml {
    padding-left: 0.25rem;
    padding-top: 0.15rem;
    padding-bottom: 0.15rem;
    font-size: 0.26rem;
    width: 0.8rem;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #999;
}
.notice_itemr {
    padding-left: 1rem;
    font-size: 0.26rem;
    overflow: hidden;
    color: #e64340;
    width: 6.35rem;
    height: 0.5rem;
    line-height: 0.5rem;
}
.pos-fiexd{
    position: fixed;
    top: 0;
    left: 0;
}
.coupons{
    margin-top:1rem;
    width: 100%;
    height: 1.8rem;
    overflow: hidden;
}
.coupons-scroll{
    white-space: nowrap;
    height: 1.8rem;
    width: 100%;
    background-color: #fff;
}
.coupons-item{
    width:3rem;
    height: 1.8rem;
    margin: 1rem;
    padding-top: 0.2rem;
    padding-left: 0.15rem;
    background-color: #f1a83b;
    box-sizing: content-box;
    font-size: 20rem;
    line-height: 35rem;
    overflow: hidden;
    color: #fff;
    display: inline-block;
}
.search-view{
    position:fixed;
    left:0;
    right:0;
    top:0;
    z-index:500;
    width: 100%;
    height: 100rem;
    background: gray;
    display: flex;
    flex-direction: column;
}
.serarch-content{
    background: white;
    width:650rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: auto;
    padding-left: 20rem;
    padding-bottom: auto;
    margin: auto;
    height: 70rem;
    border-radius:5px 5px;
}
.search-icon{
    width: 40rem;
    height: 40rem;
    margin-right: 20rem;
}
.search-input{
    width: 500rem;
    font-size: 28rem;
}
.search-btn{
    width: 150rem;
    height: 70rem;
    margin-right: 0rem;
    background-color:blueviolet;
    font-size: 28rem;
    align-items: center;
    border-top-left-radius: 0rem;
    border-bottom-left-radius: 0rem;
    color:#fff;
    border:none;
    position: relative;
}
</style>
<template>
<div class="container">
    <div class="swiper-container swiper-container-banner">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in banners" :key="index">
                <a :href="item.actLink">
                    <img src="../../../assets/common/images/gods-default-icon.png" :data-echo="item.picUrl|imgBaseUrl" :data-id="item.businessId">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
    <div class="type-container">
        <div class="type-navbar">
            <div class="type-box" v-for="(item,id) in categories" :key="id">
                <div :id="item.id" class="type-navbar-item" :class="activeCategoryId == item.id ? 'type-item-on' : ''" @click="tabClick(item)">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
    <div class="search-div" style="background:{{ scrollTop === 0 ?'-webkit-linear-gradient(top, rgba(105,195,170, 1), rgba(105,195,170, 0.3))' :( scrollTop<200 ? 'rgba(105,195,170,'+(scrollTop/400+0.3) +')' : 'rgba(105,195,170,1)')  }} ">
    <div class="serarch-content">
      <image src="/images/search-pic.png" class="search-icon" />
      <input placeholder="请输入搜索内容" class="search-input" maxlength="30" confirm-type="搜索" v-model='searchInput' @click.key.13='toSearch'>
      </input>
      <button class='search-btn' @click.key.13="toSearch">搜索
      </button>
    </div>
  </div>
    <div v-if="noticeList" class="notice">
      <div class="notice_iteml">公告：</div>
      <swiper v-if="noticeList" class="notice_swiper" vertical="true" autoplay="true" circular="true" interval="3000">
        <router-link v-for="(item,id) in noticeList.dataList" :key="id"  to="{name:'notice',query:{id:item.id}}">
          <swiper-item >
            <div class="notice_itemr">{{item.title}}</div>
          </swiper-item>
        </router-link>
      </swiper>
    </div>
    <div class="coupons" v-show="hasNoCoupons">
        <div class="coupons-scroll">
            <div class="coupons-item" v-for="(item,idx) in coupons" :key="idx"  @click="gitCoupon" data-id="{{item.id}}">
               <div>{{item.moneyMax | currency}}元 </div>
               <div>{{item.name}} </div>
               <div>满 {{item.moneyHreshold}} 元使用 </div>
               <div v-if="item.dateEndType == 0"> {{item.dateEnd}} 前有效 </div>
               <div v-if="item.dateEndType == 1"> 领取 {{item.dateEndDays}} 天内有效 </div>
            </div>
        </div>
    </div>
    <div class="goods-container">
        <div class="goods-box" v-for="(item,index) in goods" key="index" @click="toDetailsTap(item)">
           <div class="img-box">
              <img :src="item.pic+'_m'" class="image"/>
           </div>
           <div class="goods-title">{{item.name}}</div>
           <div style='display:flex;'>
            <div class="goods-price">{{item.minPrice | currency}}</div>
            <div v-if="item.originalPrice && item.originalPrice > 0" class="goods-price" style='color:#aaa;text-decoration:line-through'>{{item.originalPrice | currency}}</div>
           </div>           
        </div>
    </div>
    <div v-show="loadingMoreHidden ? true : false" class="no-more-goods">没有更多啦</div>
</div>
</template>
<script>
    export default{
        data(){
            return{
            	indicatorDots: true,
			    autoplay: true,
			    interval: 3000,
			    duration: 1000,
			    loadingHidden: false , // loading
			    userInfo: {},
			    swiperCurrent: 0,  
			    selectCurrent:0,
			    categories: [],
			    activeCategoryId: 0,
			    goods:[],
			    scrollTop:"0",
			    loadingMoreHidden:true,
			    hasNoCoupons:true,
			    coupons: [],
			    searchInput: '',
            }
        },
        mounted(){
        	this.$nextTick(()=>{
                new Swiper ('.swiper-container-banner', {
                    autoplay: 5000,
                    loop: true,
                    pagination: '.swiper-pagination',
                }) 
            })
        	this.getList();
        },
        methods:{
        	tabClick(item) {
			    this.getGoodsList(item.id);
			},
			toDetailsTap(item){
				this.$router.push({name:goodsDetails,query:{id:item.id}});
			},
			getList() {
			    util.ajax({
			        url: config.baseApi + '/banner/list',
			        data: {
			            key: 'mallName'
			        },
			        success: (data)=> {
				        if (data.data.code == 404) {
				            popup.alert({
				                title: '请在后台添加 banner 轮播图片'
				          })
				        } else {
				        	this.banners = data.data.data;
				        }
			      }
			    })
			    util.ajax({
			        url: config.baseApi +'/shop/goods/category/all',
			        success: (data) => {
			        	let categories = [{id:0, name:"全部"}];
			        	if (data.data.code == 0) {
			          		for (let i = 0; i < data.data.data.length; i++) {
			            		categories.push(data.data.data[i]);
			          		}
			        	}
			        	this.categories=categories;
			        	this.activeCategoryId=0;
				        this.getGoodsList(0);
				    }
			    })
			    this.getCoupons();
			    this.getNotice();
			},
			getGoodsList(categoryId) {
			    if (categoryId == 0) {
			      categoryId = "";
			    }
			    util.ajax({
			      	url: config.baseApi +'/shop/goods/list',
			      	data: {
			        	categoryId: categoryId,
			        	nameLike: this.searchInput
			      	},
			      	success:(data)=> {
			      		this.goods=[];
			      		this.loadingMoreHidden=true;
				        let goods = [];
				        if (data.data.code != 0 || data.data.data.length == 0) {
				          this.loadingMoreHidden=false;
				          return;
				        }
				        for(let i=0;i<data.data.data.length;i++){
				          goods.push(data.data.data[i]);
				        }
				        this.goods = goods;
			      	}
			    })
			},
			getCoupons() {
			    util.ajax({
			      	url: config.baseApi + '/discounts/coupons',
			      	data: {
			        	type: ''
			      	},
			      	success: function (data) {
			        	if (data.data.code == 0) {
			        		this.hasNoCoupons=false;
			        		this.coupons=data.data.data;
			       		}
			      	}
			    })
			},
			gitCoupon(item) {
			    util.ajax({
			      	url: config.baseApi + '/discounts/fetch',
			      	data: {
			        	id: item.id,
			        	token: app.globalData.token
			      	},
			      	success:(data)=> {
				        if (data.data.code == 20001 || data.data.code == 20002) {
				          	popup.alert({title:'来晚了！'});
				          	return;
				        }
				        if (data.data.code == 20003) {
				        	popup.alert({title:'您领过了，别贪心哦~'});
				          	return;
				        }
				        if (data.data.code == 30001) {
				        	popup.alert({title:'您的积分不足！'});
				          	return;
				        }
				        if (data.data.code == 20004) {
				        	popup.alert({title:'已过期~'});
				          	return;
				        }
				        if (data.data.code == 0) {
				        	popup.alert({title:'领取成功，赶紧去下单吧~'});
				        } else {
				        	popup.alert({title:res.data.msg});
				        }
			      	}
			    })
			},
		  	getNotice() {
		    	util.ajax({
		      		url: config.baseApi + '/notice/list',
		      		data: { pageSize:5},
		      		success:(data)=> {
		        		if (data.data.code == 0) {
		        			this.noticeList=data.data.data;
		        		}
		      		}
		    	})
		  	},
		  	toSearch(){
		    	this.getGoodsList(this.data.activeCategoryId);
		  	}
        }
    }
</script>