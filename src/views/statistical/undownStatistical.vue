<template>
    <div class="userstatistical">
        <ul class="headurl">
            <li>
                <p>卸载总数</p>
                <p>￥200</p>
            </li>
            <li>
                <p>今日卸载数</p>
                <p>10</p>
            </li>
            <li>
                <p>加速效果差</p>
                <p>7777</p>
            </li>
            <li>
                <p>没有我玩的游戏</p>
                <p>5885</p>
            </li>
            <li>
                <p>之前我能玩的游戏现在不能玩了</p>
                <p>5885</p>
            </li>
            <li>
                <p>已选择其他加速器</p>
                <p>5885</p>
            </li>
            <li>
                <p>太贵了</p>
                <p>5885</p>
            </li>
            <li>
                <p>网络环境改善</p>
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
      label="日期"prop="data">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="newUnload"
      label="新增卸载">
    </el-table-column>
    <el-table-column
      prop="PoorEffect"
      label="加速效果差"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="noGamePlay"
      label="没有我玩的游戏"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="canNotPlay"
      label="之前能玩的游戏现在不能玩了"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="otherChoice"
      label="已选择其他加速器"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="expensive"
      label="太贵了"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      prop="changeOnline"
      label="网络环境改善"
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
        {
          date: "2016-05-03",
          newUnload: "80",
          PoorEffect: "20%",
          noGamePlay: "25",
        canNotPlay:'50%',
        otherChoice: "25",
        expensive: "25",
        changeOnline: "25",
        },
       {
          date: "2016-05-03",
          newUnload: "80",
          PoorEffect: "20%",
          noGamePlay: "25",
        canNotPlay:'50%',
        otherChoice: "25",
        expensive: "25",
        changeOnline: "25",
        },
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
.headurl li:nth-child(5){
    width: 15%;
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


