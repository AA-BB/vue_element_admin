<template>
    <div class="app-container">
        <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" :model="form" label-width="80px" >
                    <el-form-item label="状态">
                        <el-select v-model="form.value" v-on:change="indexSelect($event)">
                            <el-option v-for="item in status" :key="item.statusId" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支付方式">
                        <el-select v-model="form.payment" v-on:change="paySelect($event)">
                            <el-option v-for="item in payments" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <el-select v-model="form.goodsname" v-on:change="goodsSelect($event)">
                            <el-option v-for="item in goodsname" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="搜索">
                        <el-input v-model="form.searchKey" placeholder="输入订单号、用户ID、用户账号搜索" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="search()"></el-button>
                    </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24" style="margin-top:20px">
            <el-table :data="tableData" border style="width:100%">
                <el-table-column label="订单编号" prop="order_number" align="center"></el-table-column>
                <el-table-column label="状态" prop="order_status" align="center"></el-table-column>
                <el-table-column label="用户ID" prop="user_id" align="center"></el-table-column>
                <el-table-column label="商品名称" prop="product_name" align="center"></el-table-column>
                <el-table-column label="用户账号" prop="user_account" align="center"></el-table-column>
                <el-table-column label="支付总额（元）" prop="pay_amount" align="center"></el-table-column>
                <el-table-column label="支付方式" prop="pay_type" align="center"></el-table-column>
                <el-table-column label="下单时间" prop="pay_time" align="center"></el-table-column>
                <el-table-column label="操作" prop="operation" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.row)">[详细]</el-button>
                        <template v-if="scope.row.order_status=='已付款'">
                            <el-button type="text" @click="refund(scope.row)">[退款]</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :total=total :page-size="1" :current-page="1"  @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
        </el-col>
        <!-- 查看详细 -->
        <el-dialog title="订单详细" :visible.sync="isShowDetail" center width="800px">
            <el-row>
              <el-col :span="24">
                  <el-button type="primary" size="small" style="margin-bottom:10px">用户信息</el-button>
                  <table class="table table-user">
                      <tbody>
                          <tr>
                              <td>用户ID</td>
                              <td>{{detailForm.user_id}}</td>
                              <td>用户手机</td>
                              <td>{{detailForm.user_phone}}</td>
                          </tr>
                          <tr>
                              <td>用户账号</td>
                              <td>{{detailForm.user_account}}</td>
                              <td>售后次数</td>
                              <td>{{detailForm.after_sale_count}}</td>
                          </tr>
                      </tbody>
                  </table>
              </el-col>
              <el-col :span="24" style="margin-top:10px">
                  <el-button type="info" size="small" style="margin-bottom:10px">订单信息</el-button>
                  <table class="table table-order">
                      <tbody>
                          <tr>
                              <td>订单号</td>
                              <td>{{detailForm.order_number}}</td>
                              <td>订单状态</td>
                              <td>{{detailForm.order_status}}</td>
                          </tr>
                          <tr>
                              <td>支付方式</td>
                              <td>{{detailForm.pay_type}}</td>
                              <td>应支付金额</td>
                              <td>{{detailForm.pay_amount}}</td>
                          </tr>
                          <tr>
                              <td>下单时间</td>
                              <td>{{detailForm.submit_time}}</td>
                               <td>优惠券抵扣</td>
                              <td>{{detailForm.discount_amount}}</td>
                          </tr>
                          <tr>
                              <td>支付时间</td>
                              <td>{{detailForm.pay_time}}</td>
                                <td>实付金额</td>
                              <td>{{detailForm.total_amount}}</td>
                          </tr>
                          <tr>
                              <td class="red">{{showIs==true?"申请退款时间":''}}</td>
                              <td class="red">{{detailForm.apply_refund_time}}</td>
                              <td class="red">{{showIs==true?"退款金额":''}}</td>
                              <td class="red">{{showIs==true?detailForm.refund_amount:''}}</td>
                          </tr>
                      </tbody>
                  </table>
              </el-col>
              <el-col :span="24" style="margin-top:10px">
                  <el-button type="warning" size="small" style="margin-bottom:10px">商品信息</el-button>
                  <table class="table table-user">
                      <tbody>
                          <tr>
                              <td>套餐类型</td>
                              <td>{{detailForm.product_name}}</td>
                              <td>到期时间</td>
                              <td>{{detailForm.product_expiry_time}}</td>
                          </tr>
                          <tr>
                              <td>开始时间</td>
                              <td>{{detailForm.product_start_time}}</td>
                              <td></td>
                              <td></td>
                          </tr>
                      </tbody>
                  </table>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer" style="text-align:right">
                <el-button type="primary" @click="isShowDetail = false">确定</el-button>
            </span>
        </el-dialog>
           <!--退款按钮-->
        <el-dialog  title="退款"   :visible.sync="refundVisible" width="30%"  center>
            <div class="tooltips">是否确认同意退款?</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="refundVisible = false">取 消</el-button>
                <el-button type="primary" @click="refund_okBtn()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import * as sysApi from "../common/sys";
export default {
    data() {
        return {
            isActive:false,
            form: {
                searchKey: '',
                value: '',
                payment: '',
                goodsname:"",
                pay_type:''
            },
            refundVisible:false,
            currentPage:1,
            detailForm: {
                user_id: "",
                user_phone: "",
                user_account: "",
                order_number: "",
                order_status: "",
                pay_type: "",
                pay_amount: "",
                submit_time: "",
                pay_time: "",
                apply_after_sale_time: "",
                after_sale_count: "",
                product_expiry_time: "",
                packageEndTime: "",
                product_start_time: "",
            },
            total:1,
            tableData: [{
                order_number: "1212131313",
                order_status: "13265699624",
                user_id: "13265699624",
                product_name:"黃金會員季度卡",
                user_account: "454545454",
                pay_amount: "￥30",
                pay_type: "微信",
                pay_time: "2018.08.23  12:20:20",
               
            }],
            isShowDetail: false,
            payments: [{
                id: 1,
                name: '全部'
            },{
                id: 2,
                name: '支付宝'
            },{
                id: 3,
                name: '微信'
            }],
            goodsObj:{},
            goodsname:[],
            showIs:false,
            showIs_1:false,
            rowDetailId:'',
            status: [
                {
                    statusId: 1,
                    label: '全部'
                },
                {
                    statusId: 2,
                    label: '已付款'
                },
                {
                    statusId:3,
                    label: '待付款'
                },
                {
                    statusId:4,
                    label: '已完结'
                },
                {
                    statusId:5,
                    label: '已取消'
                },
                // {
                //     statusId:5,
                //     label: '售后中'
                // },
                {
                    statusId:6,
                    label: '已退款'
                },
                {
                    statusId: 7,
                    label: '退款中'
                }
            ]
        }
    },
    methods: {
        // 搜索框選擇
        search(){
            if(this.form.searchKey==""){
                this.$message({
                            type: 'error',
                            message:"搜索框内容不能为空"
                        });
                        return;
            }
            var pa={"status":this.form.value,"pay_type":this.form.payment,"product_name":this.form.goodsname,"condition":this.form.searchKey,"page":this.currentPage};
         sysApi.orderManage(pa)
                .then(res => {
                       for(var i in res.data){
                        if(res.data[i].pay_type=="wx_qrcode"){
                            res.data[i].pay_type="微信"
                        }else{
                            res.data[i].pay_type="支付宝"
                        }
                    }
                    this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(this.tableData);
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 狀態選擇
        indexSelect(event){
             this.currentPage=1;
             if(event=="全部"){
                 this.form.value="";
             }else{
                this.form.value=event;
             }
            var pa={"status":this.form.value,"pay_type":this.form.payment,"product_name":this.form.goodsname,"condition":this.form.searchKey,"page":this.currentPage};
         sysApi.orderManage(pa)
                .then(res => {
                       for(var i in res.data){
                        if(res.data[i].pay_type=="wx_qrcode"){
                            res.data[i].pay_type="微信"
                        }else{
                            res.data[i].pay_type="支付宝"
                        }
                    }
                    this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(this.tableData);
                })
                .catch(err => {
                    console.log(err)
                })
        },
        paySelect(event){
            if(event=="全部"){
                 this.form.payment="";
             }else if(event=="微信"){
                this.form.payment="wx_qrcode";
             }else{
                 this.form.payment="ali_qrcode";
             }
            this.currentPage=1;
            var pa={"status":this.form.value,"pay_type":this.form.payment,"product_name":this.form.goodsname,"condition":this.form.searchKey,"page":this.currentPage};
         sysApi.orderManage(pa)
                .then(res => {
                       for(var i in res.data){
                        if(res.data[i].pay_type=="wx_qrcode"){
                            res.data[i].pay_type="微信"
                        }else{
                            res.data[i].pay_type="支付宝"
                        }
                    }
                    this.total=res.total_count;
                    this.tableData=res.data;
                    console.log(this.tableData);
                })
                .catch(err => {
                    console.log(err)
                })
        },
        goodsSelect(event){
            if(event=="全部"){
                 this.form.goodsname="";
             }else{
                this.form.goodsname=event;
             }
            this.currentPage=1;
            var pa={"status":this.form.value,"pay_type":this.form.payment,"product_name":this.form.goodsname,"condition":this.form.searchKey,"page":this.currentPage};
         sysApi.orderManage(pa)
                .then(res => {
                       for(var i in res.data){
                        if(res.data[i].pay_type=="wx_qrcode"){
                            res.data[i].pay_type="微信"
                        }else{
                            res.data[i].pay_type="支付宝"
                        }
                    }
                    this.total=res.total_count;
                    this.tableData=res.data;
                    console.log(this.tableData);
                })
                .catch(err => {
                    console.log(err)
                })
        },
        handleEdit(row) {
            this.isShowDetail = true;
            this.detailForm = Object.assign({},row,true);
            if(row.order_status=="退款中"||row.order_status=="已退款"||row.order_status=="售后中"){
                this.showIs=true;
            }else{
                this.showIs=false;
            }
            var pa={"id":this.detailForm.id};
            sysApi.orderDes(pa)
                .then(res => {
                    console.log(res);
                    if(res.data.pay_type=="wx_qrcode"){
                        res.data.pay_type="微信"
                    }else{
                         res.data.pay_type="支付宝"
                    }
                     this.detailForm=res.data;
                   
                })
              
        },
        refund(row){
            this.refundVisible=true;
            this.rowDetailId=row.order_number;
        },
        refund_okBtn(){
             var pa={"order_number":this.rowDetailId};
            sysApi.tuikuan(pa)
                .then(res => {
                    if(res.success==true){
                        this.refundVisible=false;
                        this.$message({
                            type:'success',
                            message:res.info
                        })
        var pa={"status":this.form.value,"pay_type":this.form.payment,"product_name":this.form.goodsname,"condition":this.form.searchKey,"page":1};
         sysApi.orderManage(pa)
                .then(res => {
                       for(var i in res.data){
                        if(res.data[i].pay_type=="wx_qrcode"){
                            res.data[i].pay_type="微信"
                        }else{
                            res.data[i].pay_type="支付宝"
                        }
                    }
                    this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(this.tableData);
                })
                .catch(err => {
                    console.log(err)
                })
                    }
                })
        },
          /** 分页条点击事件 **/
      handleCurrentChange(val) {
        this.currentPage = parseInt(`${val}`);
        var pa={"status":this.form.value,"pay_type":this.form.payment,"product_name":this.form.goodsname,"condition":this.form.searchKey,"page":this.currentPage};
         sysApi.orderManage(pa)
                .then(res => {
                       for(var i in res.data){
                        if(res.data[i].pay_type=="wx_qrcode"){
                            res.data[i].pay_type="微信"
                        }else{
                            res.data[i].pay_type="支付宝"
                        }
                    }
                    this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(this.tableData);
                })
                .catch(err => {
                    console.log(err)
                })
  
      }
    },
      created(){
         //这里是post请求？en
         var pa={"status":this.form.value,"pay_type":this.form.payment,"product_name":this.form.goodsname,"condition":this.form.searchKey,"page":this.currentPage};
         sysApi.orderManage(pa)
                .then(res => {
                    for(var i in res.data){
                        if(res.data[i].pay_type=="wx_qrcode"){
                            res.data[i].pay_type="微信"
                        }else{
                            res.data[i].pay_type="支付宝"
                        }
                    }
                    this.tableData=res.data;
                    this.total=res.total_count;
                })
         .catch(err => console.log('请求异常信息:' + err));
    var param={"page":this.currentPage,'is_search':true}
    sysApi.goodsManage(param)
        .then(data => {
            if(data.success==true){
                console.log(data);
                for(var i=0;i<data.product_names.length;i++){
                    this.goodsname.push({id:parseInt(i+1),name:data.product_names[i]})
                }
            }
            
        })
        .catch(err => console.log('请求异常信息:' + err));
    }
}
</script>
<style lang="scss">
.btn_hide{
    display: none;
}
.table{
    position: relative;
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
    empty-cells: show;
    td {
        border: 1px #eee solid;
        width: 25%;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        text-align: center;
        &.red {
            color: red;
        }
    }
}
.el-table td, .el-table th{
    padding:4px 0!important;
}
</style>



