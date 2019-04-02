<template>
    <div class="app-container goods_manage">
        <el-col :span="24" style="padding-bottom: 0px">
                     <el-button type="primary" size="medium" @click="addGoods=true">
              <i class="el-icon-circle-plus"></i>&nbsp;
              添加商品
            </el-button>
        </el-col>
        <el-col :span="24" style="margin-top:20px">   
            <el-table :data="tableData" border style="width:100%">
                <el-table-column label="排序" prop="product_sort" align="center"></el-table-column>
                <el-table-column label="状态" prop="product_status" align="center"></el-table-column>
                <el-table-column label="商品名称" prop="product_name" align="center"></el-table-column>
                <el-table-column label="商品类型" prop="product_type" align="center"></el-table-column>
                <el-table-column label="时长" prop="duration" align="center"></el-table-column>
                <el-table-column label="原价" prop="origin_price" align="center"></el-table-column>
                <el-table-column label="售价(元)" prop="product_price" align="center"></el-table-column>
                <el-table-column label="操作" prop="operation" align="center" :width="400">
                    <template slot-scope="scope">
                        <el-button size="small"  @click="changeBtn(scope.$index,scope.row)">
                            <i class="el-icon-edit-outline"></i> <b>修改</b>
                        </el-button>
                         <template v-if="scope.row.product_status=='在售'">
                            <el-button size="small" type="success" @click="downBtn(scope.row)">
                              下架
                            </el-button>
                        </template>
                        <template v-else="scope.row.product_status=='下架'">
                            <el-button size="small" type="success" @click="upBtn(scope.row)">
                              上架
                            </el-button>
                        </template>
                        
                        <el-button size="small" type="danger" @click="deleteBtn(scope.row)">
                            删除
                        </el-button>
                    </template>
                    
                </el-table-column>
            </el-table>
        </el-col>
        <!-- 查看详细 -->
        <el-dialog title="订单详细" :visible.sync="isShowDetail" center width="30%">
            <div>混子</div>
        </el-dialog>
        <!-- 删除 -->
         <!-- <el-dialog
        title="提示"
        :visible.sync="deleteVisible"
        width="30%"
        center>
        <div class="tooltips">删除不可恢复，是否确定删除 ？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow()">确 定</el-button>
        </span>
      </el-dialog> -->
        <!-- 添加商品 -->
         <el-dialog
        title="添加商品"
        :visible.sync="addGoods"
        width="30%"
        center>
         <el-form label-width="80px" label-position="left" :model="addGoodsData" :rules="rules" ref="addGoodsData">
          <el-form-item label="商品名" prop="product_name">
            <el-input v-model="addGoodsData.product_name"></el-input>
          </el-form-item>
          <el-form-item label="商品类型" prop="product_type">
            <el-radio-group v-model="addGoodsData.product_type" v-on:change="radio_c($event)">
              <el-radio label="个人版"></el-radio>
              <el-radio label="扫码版"></el-radio>
              <el-radio label="安卓版"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="时长" prop="duration" v-show="!show">
            <el-input v-model="addGoodsData.duration" class="day_input"></el-input>天
          </el-form-item>
           <el-form-item label="时长" prop="duration" v-show="show">
            <el-input v-model="addGoodsData.day" class="day_input"></el-input>天
            <el-input v-model="addGoodsData.hour" class="day_input"></el-input>小时
          </el-form-item>
          <el-form-item label="售价" prop="product_price">
            <el-input v-model="addGoodsData.product_price" :inline="true"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="product_sort">
            <el-input v-model="addGoodsData.product_sort" :inline="true"></el-input>
          </el-form-item>
           <el-form-item label="原价" prop="origin_price">
            <el-input v-model="addGoodsData.origin_price" :inline="true"></el-input>
          </el-form-item>
           <!-- @change="controlReadOnly" -->
          <el-form-item label="状态" prop="product_status">
        <el-radio-group v-model="addGoodsData.product_status">
          <el-radio label="在售"></el-radio>
          <el-radio label="下架"></el-radio>
        </el-radio-group>
      </el-form-item>
        </el-form>
        <div slot="footer" class="edit-footer">
          <el-button @click="addGoods = false">取 消</el-button>
          <el-button type="primary" @click="addGoodsOkbtn('addGoodsData')">确定添加</el-button>
        </div>
      </el-dialog>
         <!-- x修改商品 -->
         <el-dialog
        title="编辑商品"
        :visible.sync="changeGoods"
        width="30%"
        center>
         <el-form label-width="80px" label-position="left" :model="changeGoodsData">
          <el-form-item label="商品名">
            <el-input v-model="changeGoodsData.product_name"></el-input>
          </el-form-item>
          <el-form-item label="商品类型" prop="product_type">
            <el-radio-group v-model="changeGoodsData.product_type" disabled>
              <el-radio label="个人版"></el-radio>
              <el-radio label="扫码版"></el-radio>
              <el-radio label="安卓版"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="时长" prop="duration" v-show="!show">
            <el-input v-model="changeGoodsData.duration" class="day_input" ></el-input>天
          </el-form-item>
           <el-form-item label="时长" prop="duration" v-show="show">
            <el-input v-model="changeGoodsData.day" class="day_input" ></el-input>天
            <el-input v-model="changeGoodsData.hour" class="day_input" ></el-input>小时
          </el-form-item>
          <el-form-item label="售价">
            <el-input v-model="changeGoodsData.product_price" :inline="true"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="changeGoodsData.product_sort" :inline="true"></el-input>
          </el-form-item>
           <el-form-item label="原价">
            <el-input v-model="changeGoodsData.origin_price" :inline="true"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="product_status">
        <el-radio-group v-model="changeGoodsData.product_status" disabled>
          <el-radio label="在售"></el-radio>
          <el-radio label="下架"></el-radio>
        </el-radio-group>
      </el-form-item>
        </el-form>
        <div slot="footer" class="edit-footer">
          <el-button @click="changeGoods = false">取 消</el-button>
          <el-button type="primary" @click="changeOkBtn()">确定</el-button>
        </div>
      </el-dialog>
<!--分页条-->
      <el-pagination :total=total :page-size="1" :current-page="1"  
      @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    
    </div>
</template>
<script>
 import * as sysApi from "../../common/sys";
export default {
    data() {
      var validateProductName=(rule, value, callback)=>{
            if(value===""){
                callback(new Error('请输入商品名'));

            }
            callback();
        };
        // var validateDuration=(rule,value,callback)=>{
        //     if(value===""){
        //         callback(new Error("请输入时长"));
        //     }
        //     callback();
        // }
        var validateProductPrice=(rule,value,callback)=>{
            if(value===""){
                callback(new Error("请输入售价"));
            }
            callback();
        }
        var validateProductSort=(rule,value,callback)=>{
            if(value===""){
                callback(new Error("请输入排序"));
            }
            callback();
        }
        return {
            tableData: [{
              product_sort:"月度卡",
            product_status:"30天",
            product_name:"",
            duration:"123546",
            discount:"",
            product_price:"",
            }],
            rules: {
                product_name: [
                    {validator: validateProductName,trigger: 'blur'}
                ],
                // duration: [
                //     {validator: validateDuration,trigger: 'blur'}
                // ],
                product_price: [
                    {validator: validateProductPrice,trigger: 'blur'}
                ],
                product_sort: [
                    {validator: validateProductSort,trigger: 'blur'}
                ]
            },
            total:1,
            isShowDetail: false,
            deleteVisible:false,
            addGoods:false,
            changeGoods:false,
        editForm:{
          name:'',
          resourceId:'',
          rowIndex:'',                //当前点击行index值
        },
        addGoodsData:{
          product_type:"",
            product_sort:"",
            product_status:"在售",
            product_name:"",
            duration:"",
            origin_price:"",
            product_price:"",
            day:'',
            hour:'',
            product_num:''
        },
        currentPage:1,
          changeGoodsData:{
            origin_price:"",
            product_type:"",
            day:"",
            hour:"",
             product_sort:"",
            product_status:"",
            product_name:"",
            duration:"",
            discount:"",
            product_price:"",
        },
        goodtype:'',
        show:false,
        product_num:0
     
        }
    },
    methods: {
      radio_c(event){
        this.goodtype=event;
           if(event=="个人版"){
             this.addGoodsData.product_num=0;
              this.product_num=0;
              this.show=false;
           }else if(event=="安卓版"){
              this.addGoodsData.product_num=3;
              this.product_num=3;
              this.show=false;
           }
           else{
             this.addGoodsData.product_num=2;
              this.product_num=2;
               this.show=true;
           }
      },
           /** 编辑按钮点击事件 **/
      changeBtn(index,row){
        this.changeGoodsData = Object.assign({},row,true);
          if(row.product_type=="个人版"){
             this.product_num=0
              this.show=false;
           }else if(row.product_type=="扫码版"){
             this.product_num=2
               this.show=true;
           }else if(row.product_type=="安卓版"){
             this.product_num=3
               this.show=false;
           }
        if(row.product_status=="在售"){
            this.changeGoodsData.product_status="在售";
        }else{
             this.changeGoodsData.product_status="下架";
        }
        this.changeGoods=true;
      },
      // 確定修改按鈕
      changeOkBtn(){
        var param={
          "id":this.changeGoodsData.id,
          "product_name":this.changeGoodsData.product_name,
          "product_status":this.changeGoodsData.product_status,
        "product_price":parseFloat(this.changeGoodsData.product_price),
        "product_sort":parseInt(this.changeGoodsData.product_sort),
        "duration":parseInt(this.changeGoodsData.duration),
        "discount":"",
        "origin_price":parseFloat(this.changeGoodsData.origin_price),
        "product_type":parseInt(this.product_num),
        "day":parseInt(this.changeGoodsData.day)?parseInt(this.changeGoodsData.day):0,
        "hour":parseInt(this.changeGoodsData.hour)?parseInt(this.changeGoodsData.hour):0,
        }
        console.log(param);
         sysApi.editGoods(param)
        .then(data => {
          if(data.success==true){
             this.changeGoods=false;
          console.log(data)
          this.$message({
            type:'success',
            message:data.info
          })
          this.init();
          }
        })
        .catch(err => console.log('请求异常信息:' + err));

      },
      // 确定添加商品
      addGoodsOkbtn(formName) {
            this.$refs[formName].validate((valid) => {
          if (valid) {
               var params={
                 "id":0,
                 "product_name":this.addGoodsData.product_name,
                 "product_status":this.addGoodsData.product_status,
                  "product_price":parseFloat(this.addGoodsData.product_price),
                  "product_sort":parseInt(this.addGoodsData.product_sort),
                  "duration":parseInt(this.addGoodsData.duration),
                  "discount":"",
                  "origin_price":parseFloat(this.addGoodsData.origin_price),
                  "product_type":parseInt(this.addGoodsData.product_num),
                  "day":parseInt(this.addGoodsData.day)?parseInt(this.addGoodsData.day):0,
                  "hour":parseInt(this.addGoodsData.hour)?parseInt(this.addGoodsData.hour):0,
                }
               sysApi.editGoods(params)
                .then(res => {
                    if(res.success===true){
                        this.addGoods=false;
                         this.$message({
                            type: 'success',
                            message:res.info
                        });
                     this.init();
                    }
                })
              .catch(err => console.log('请求异常信息:' + err));
          } else {
            return false;
          }
        });
        },
        // 商品上架
        upBtn(row){
          var param={"id":row.id};
          sysApi.upGoods(param)
        .then(data => {
          if(data.success===true){
              row.product_status="在售"
              this.$message({
                  type: 'success',
                  message:data.info
              });
              }
        })
        .catch(err => console.log('请求异常信息:' + err));
        },
         // 商品下架
        downBtn(row){
          var param={"id":row.id};
          sysApi.downGoods(param)
        .then(data => {
          if(data.success===true){
                        row.product_status="下架"
                        this.$message({
                            type: 'success',
                            message:data.info
                        });
                    }
        })
        .catch(err => console.log('请求异常信息:' + err));
        },
        /** 删除按钮点击事件 **/
      deleteBtn(row){
        var param={"id":row.id};
          sysApi.deleteGoods(param)
        .then(data => {
          if(data.success===true){
                        this.$message({
                            type: 'success',
                            message:data.info
                        });
                   this.init();
                    }
        })
        .catch(err => console.log('请求异常信息:' + err));
      },
      
       /** 分页条点击事件 **/
      handleCurrentChange(val) {
        this.currentPage = parseInt(`${val}`);
          this.init();
      },
      init(){
          var param={"page":this.currentPage,'is_search':false}
    sysApi.goodsManage(param)
        .then(data => {
           console.log(data)
          for(var i in data.data){
            if(data.data[i].product_type==0){
              data.data[i].product_type="个人版"

            }else if(data.data[i].product_type==2){
              data.data[i].product_type="扫码版";
               if(data.data[i].day!=0&&data.data[i].hour!=0){
                            var time=data.data[i].day+"天"+data.data[i].hour+"小时"
                        }else if(data.data[i].day==0&&data.data[i].hour!=0){
                            var time=data.data[i].hour+"小时"
                        }else if(data.data[i].hour==0&&data.data[i].day!=0){
                            var time=data.data[i].day+"天"
                        }
              data.data[i].duration=time
            }else if(data.data[i].product_type==3){
              data.data[i].product_type="安卓版"
            }
          }
          this.tableData = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
      }
   
    },
    created() {
      /**初次加载 数据列表 vue axios**/
    this.init();
    }
}
</script>
<style>
.day_input{
    width: 20%;
    margin-right: 2%;
  }
 .goods_manage .el-form-item {
    margin-bottom: 22px!important;
  }
  .app-container .el-radio-group{
    width: 100%;
  }
  .app-container .el-radio{
width: 20%;
  }

</style>



