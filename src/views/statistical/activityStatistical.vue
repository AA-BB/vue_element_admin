<template>
    <div class="userstatistical">
        <ul class="headurl">
            <li>
                <p>总流水</p>
                <p>￥200</p>
            </li>
            <li>
                <p>订单总数</p>
                <p>10</p>
            </li>
            <li>
                <p>已付款</p>
                <p>7777</p>
            </li>
            <li>
                <p>已付款人数</p>
                <p>5885</p>
            </li>
            <li>
                <p>已取消</p>
                <p>5885</p>
            </li>
            <li>
                <p>售后中</p>
                <p>5885</p>
            </li>
            <li>
                <p>已退款</p>
                <p>5885</p>
            </li>
            <li>
                <p>订单转化率</p>
                <p>5885</p>
            </li>
            <li>
                <p>付款转化率</p>
                <p>5885</p>
            </li>
            <li>
                <p>人均付费</p>
                <p>5885</p>
            </li>
            <li>
                <p>注册到付费转化率</p>
                <p>5885</p>
            </li>
        </ul>
        <!-- tab -->
        <div class="block">
            <span class="demonstration">日期</span>
                <el-date-picker
                    v-model="value5"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                </el-date-picker>
            
        </div>
        <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    border
    style="width:99%;margin-top:10px"
    @selection-change="handleSelectionChange">
    <el-table-column
      label="日期">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="orderCount"
      label="订单数">
    </el-table-column>
    <el-table-column
      prop="newOrderCount"
      label="新增订单数"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="todayOrderCountRate"
      label="今日新增订单率"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="hadPay"
      label="已付款"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="hadPayMan"
      label="已付款人数"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="afterSales"
      label="售后中"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="hadRefund"
      label="已退款"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="orderConversion"
      label="订单转化率"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="paymentConversion"
      label="付款转化率"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="payPerCapita"
      label="人均付费"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="regToPayRate"
      label="注册到付款转化率"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
    </div>
</template>
<script>
export default {
     data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value5: '',
      tableData3: [
      ]
    }
}
}
</script>
<style>
.headurl{
    widows: 100%;
    overflow: hidden;
}
.headurl li{
    width: 9%;
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
.block{
margin-top: 10px;
}
</style>


