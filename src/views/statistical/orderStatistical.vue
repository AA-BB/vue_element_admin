<template>
    <div class="userstatistical">
        <ul class="headurl">
            <li>
                <p>总流水</p>
                <p>￥{{ulData.total_money}}</p>
            </li>
            <li>
                <p>订单总数</p>
                <p>{{ulData.total_order_count}}</p>
            </li>
            <li>
                <p>已付款</p>
                <p>{{ulData.paid_order_count}}</p>
            </li>
            <li>
                <p>已付款人数</p>
                <p>{{ulData.paid_user_count}}</p>
            </li>
            <li>
                <p>已取消</p>
                <p>{{ulData.cancel_order_count}}</p>
            </li>
            <li>
                <p>售后中</p>
                <p>{{ulData.after_sale_count}}</p>
            </li>
            <li>
                <p>已退款</p>
                <p>{{ulData.refund_order_count}}</p>
            </li>
            <li>
                <p>订单转化率</p>
                <p>{{ulData.order_rate}}%</p>
            </li>
            <li>
                <p>付款转化率</p>
                <p>{{ulData.paid_rate}}%</p>
            </li>
            <li>
                <p>人均付费</p>
                <p>{{ulData.per_user_paid}}</p>
            </li>
            <li>
                <p>注册到付费转化率</p>
                <p>{{ulData.register_to_pay_rate}}%</p>
            </li>
        </ul>
        <!-- tab -->
         <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" :model="form" label-width="80px" >
                    <el-form-item label="日期">
<div class="block">
<el-date-picker
v-model="form.date"
type="datetimerange"
range-separator="至"
start-placeholder="开始日期"
end-placeholder="结束日期"   @change="onPick" format="yyyy年MM月dd日 HH:mm:ss">
</el-date-picker>
</div>
</el-form-item>

                 <el-form-item>
                        <el-button type="primary" @click="exportToExcel()">导出Excel</el-button>
                    </el-form-item>
            </el-form>
        </el-col>
        <!-- @selection-change="handleSelectionChange" -->
        <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    border
    style="width:99%;margin-top:10px"
    
    >
    <el-table-column
      label="日期" prop="date_time">
    </el-table-column>
    <el-table-column
      prop="order_count"
      label="订单数">
    </el-table-column>
    <el-table-column
      prop="newly_add_count"
      label="新增订单数"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="newly_add_rate"
      label="今日新增订单率"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="paid_count"
      label="已付款"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="paid_user_count"
      label="已付款人数"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="after_sale_count"
      label="售后中"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="refund_count"
      label="已退款"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="orderConversion"
      label="订单转化率"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="pay_rate"
      label="付款转化率"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="per_user_pay"
      label="人均付费"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="regToPayRate"
      label="注册到付款转化率"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
     <!--分页条-->
      <el-pagination :total=total :page-size="1" :current-page=currentPage  
      @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
</template>
<script>
import * as sysApi from "../../common/sys";
import { export_json_to_excel } from "../../vendor/Export2Excel";
import {formatDate} from "../../common/utils";
export default {
     data() {
      return {
        form:{
                   date:formatDate(new Date(),'yyyy-MM-dd HH:mm:ss'),
                starttime:"",
                endtime:"",
            },
        total:1,
        currentPage:1,
        ulData:{

        },
      tableData3: [
      ]
    }
},
methods:{
           handleCurrentChange(val) {
        this.currentPage = parseInt(`${val}`);
         var pa1={"start_time":this.form.starttime,"stop_time":this.form.endtime,"page":this.currentPage};
  // 列表
  sysApi.orderList(pa1)
                .then(res => {
                    if(res.success==true){
                        this.total =res.total_count;
                    this.tableData3=res.data;
                    console.log(res);
                    }
                })
                .catch(err => console.log('请求异常信息:' + err));
      },
     exportToExcel() {
            require.ensure([], () => {
                const tHeader = ['日期','订单数','新增订单数','今日新增订单率','已付款','已付款人数','售后中','已退款','订单转化率','付款转化率','人均付费','注册到付款转化率'];
                const filterVal = ['date','order_count',"newly_add_count",'newly_add_rate','paid_count','paid_user_count','after_sale_count','refund_count','orderConversion','pay_rate','per_user_pay','regToPayRate'];
                const list = this.tableData3;
                const data = this.formatJson(filterVal,list);
                export_json_to_excel(tHeader, data, '列表excel');
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
    onPick(val){
                  if(val==null){
                   var start_time="";
                    var end_time="";
              }else{
            var start_time=formatDate(val[0],'yyyy-MM-dd');
            var end_time=formatDate(val[1],'yyyy-MM-dd');

              }
          this.form.starttime=start_time;
          this.form.endtime=end_time;
          var pa1={"start_time":this.form.starttime,"stop_time":this.form.endtime,"page":1};
          sysApi.orderList(pa1)
                .then(res => {
                    this.total =res.total_count;
                     this.tableData3=res.data;
                    console.log(res);
                })
                .catch(err => console.log('请求异常信息:' + err));
      },
},
  created(){
         //这里是post请求？en
        // for(var i=0;i<this.value5.length;i++){
        //   var start=this.value5[0];
        //   var stop=this.value5[1];
        // }
        
  // 列表
var pa1={"start_time":this.form.starttime,"stop_time":this.form.endtime,"page":1};
  sysApi.orderList(pa1)
                .then(res => {
                    if(res.success==true){
                        this.total =res.total_count;
                    this.tableData3=res.data;
                    console.log(res);
                    }
                })
                .catch(err => console.log('请求异常信息:' + err));
var pa={"start_time":this.form.starttime,"stop_time":this.form.endtime};
         sysApi.orderStatis(pa)
                .then(res => {
                    this.ulData=res.data;
                    console.log(res);
                })
                .catch(err => console.log('请求异常信息:' + err));
  
    }
}
</script>
<style>
.el-form-item__label{
    text-align: left;
    width:auto!important;
}
.el-form--inline{
    margin:10px 0
}
.headurl{
    width: 100%;
    display: flex;
    overflow: hidden;
}
.userstatistical .el-date-editor .el-range-input{
    width: 88%!important;
}
.headurl li{
    flex: 1;
    list-style: none;
    padding:10px 0;
    float: left;
    
    background: #fff;
    border-right: 1px solid #eee

}
.headurl li p{
    text-align: center;
    line-height: 35px;
}
.headurl li p:nth-child(1){
    color: #409EFF;
}
.demonstration{
    background: #409EFF;
    display: inline-block;
    width: 80px;
    height:38px;
    line-height: 38px;
    border-radius: 5px;
    margin-right: 5px;
    text-align: center;
    color: #fff;
}
</style>


