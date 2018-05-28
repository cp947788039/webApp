
import util from 'common/js/util'
import config from 'common/js/config'
import popup from 'popup'
require('common/js/jquery.cookie.js')
require('common/css/base.scss')
require('common/js/resize.js')


var app = new Vue({
    el: '#content',
    data: {
        orderCode:util.getQueryString('orderCode')||'',
        isSuccess:false,
        isLoading:true,
        timer:null,
        timeout:10000,
        status:null,
        timer:null,
    },
    mounted() {
       this.getPayResult();
    },
    methods: {
        // 循环查询支付结果
        getPayResult(){
            this.timer = setInterval(()=>{
                util.ajax({
                    async:false,
                    url:config.baseApi+`retail-user-app-acc/api/orders/${this.orderCode}/pay-result`,
                    success:data=>{
                        if(data.data.status == 2 || data.data.status == 3){
                            this.status=data.data.status
                            this.isLoading=false;
                            clearInterval(this.timer)
                        }
                    },
                    goingError:true,
                    error:()=>{
                        this.status=3
                        this.isLoading=false;
                    }
                })
            },1500)
            
            setTimeout(()=>{
                clearInterval(this.timer)
                this.isLoading=false;
            },this.timeout)
        },
        goToMyOrder(){
            if(util.isApp){
                appSDK.goToMyOrders();
            }else{
                this.$router.push({name:'myOrders'})
            }
        }
    }
})
