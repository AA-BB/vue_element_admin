<template>
    <div class="app-container">
        <el-col :span="24" style="padding-bottom: 0px">
                     <el-button type="primary" size="medium" @click="newGenerateBtn()">
              <i class="el-icon-circle-plus"></i>&nbsp;
              新增兑换码
            </el-button>
        </el-col>
        <el-col :span="24" style="margin-top:20px">
            <el-table :data="tableData" border style="width:100%">
                <el-table-column label="兑换码ID" prop="exchange_code_id" align="center"></el-table-column>
                <el-table-column label="兑换码名称" prop="exchange_code_name" align="center"></el-table-column>
                <el-table-column label="时长" prop="duration" align="center"></el-table-column>
                 <el-table-column label="生成后有效期(天)" prop="validity_day" align="center"></el-table-column>
                <el-table-column label="生成量" prop="total_amount" align="center"></el-table-column>
                <el-table-column label="已兑换" prop="used_amount" align="center"></el-table-column>
                <el-table-column label="操作" prop="operation" align="center" :width="400">
                    <template slot-scope="scope">
                        <!-- <el-button size="small"  @click="changeBtn(scope.$index,scope.row)">
                            <i class="el-icon-edit-outline"></i> <b>修改</b>
                        </el-button>
                        <el-button size="small" type="danger" @click="deleteBtn(scope.$index,scope.row)">
                            下架
                        </el-button>
                        <el-button size="small" type="danger" @click="deleteBtn(scope.$index,scope.row)">
                            删除
                        </el-button> -->
                         <el-button size="small"  @click="generateBtn(scope.$index,scope.row)">
                            <i class="el-icon-edit-outline"></i> <b>生成</b>
                        </el-button>
                        <el-button size="small" type="danger" @click="editBtn(scope.$index,scope.row)">
                            编辑
                        </el-button>
                        <router-link :to="{ name: '生成记录', params: { id: scope.row.id }}"><el-button size="small">生成记录</el-button></router-link>
                        <!-- <el-button size="small" type="danger" @click="sendParams(scope.row)">
                            生成记录
                        </el-button> -->
                    </template>
                    
                </el-table-column>
            </el-table>
        </el-col>
        <!-- 查看详细 -->
        <el-dialog title="订单详细" :visible.sync="isShowDetail" center width="30%">
            <div>混子</div>
        </el-dialog>
        <!-- 删除 -->
         <el-dialog
        title="生成兑换码"
        :visible.sync="generateVisible"
        width="30%"
        center>
       <el-form label-width="80px" label-position="left" :model="generateData">
          <el-form-item label="生成数量">
            <el-input v-model="generateData.total_amount"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="generateVisible = false">取 消</el-button>
          <el-button type="primary" @click="generateOkBtn()">确 定</el-button>
        </span>
      </el-dialog>
        <!-- 添加商品 -->
         <el-dialog
        title="新增兑换码"
        :visible.sync="newGenerateVisible"
        width="30%"
        center class="newGenerate">
         <el-form label-width="80px" label-position="left" :model="newGenerateData" :rules="rules" ref="newGenerateData">
          <el-form-item label="兑换码名称" prop="exchange_code_name">
            <el-input v-model="newGenerateData.exchange_code_name"></el-input>
          </el-form-item>
          <el-form-item label="时长" prop="duration">
            <el-input v-model="newGenerateData.duration"></el-input>
          </el-form-item>
          <el-form-item label="生成数量" prop="total_amount">
            <el-input v-model="newGenerateData.total_amount" :inline="true"></el-input>
          </el-form-item>
          <!-- <el-form-item label="有效期" prop="validity_day">
        <el-radio-group v-model="newGenerateData.validity_day" v-on:change="goodsSelect($event)">
          <el-radio label="限时"></el-radio>
          <el-radio label="不限"></el-radio>
        </el-radio-group> --> 
        <el-form-item label="有效期" prop="validity_day">
            <el-select v-model="newGenerateData.validity_day" v-on:change="goodsSelect($event)">
                <el-option v-for="item in validity_day" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
            <template>
              <el-input :inline="true" v-show="isShow" v-model="newGenerateData.day"></el-input>
            </template>
                         
        </el-form-item>
        
      </el-form-item>
        </el-form>
        <div slot="footer" class="edit-footer">
          <el-button @click="addGoods = false">取 消</el-button>
          <el-button type="primary" @click="saveOkAdd('newGenerateData')">确定新增</el-button>
        </div>
      </el-dialog>
         <!-- x修改商品 -->
         <el-dialog
        title="编辑商品"
        :visible.sync="changeGoods"
        width="30%"
        center class="editGenerate">
         <el-form label-width="80px" label-position="left" :model="changeGoodsData">
          <el-form-item label="兑换码名称" prop="exchange_code_name">
            <el-input v-model="changeGoodsData.exchange_code_name" disabled></el-input>
          </el-form-item>
          <el-form-item label="时长" prop="duration">
            <el-input v-model="changeGoodsData.duration" disabled></el-input>
          </el-form-item>
          <el-form-item label="生成数量" prop="total_amount">
            <el-input v-model="changeGoodsData.total_amount" :inline="true"></el-input>
          </el-form-item>
          <!-- <el-form-item label="有效期" prop="validity_day">
        <el-radio-group v-model="newGenerateData.validity_day" v-on:change="goodsSelect($event)">
          <el-radio label="限时"></el-radio>
          <el-radio label="不限"></el-radio>
        </el-radio-group> -->
 <!-- v-on:change="goodsSelect2($event)" -->
        <el-form-item label="有效期" prop="validity_day">
            <el-select v-model="changeGoodsData.validity_day" disabled>
                <el-option v-for="item in validity_day" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
            <template>
              <el-input :inline="true" v-show="isShow" v-model="changeGoodsData.day"></el-input>
            </template>
                         
        </el-form-item>
        
      </el-form-item>
        </el-form>
        <div slot="footer" class="edit-footer">
          <el-button @click="changeGoods = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit('changeGoods')">确定</el-button>
        </div>

        
      </el-dialog>
 <!--分页条-->
      <el-pagination :total=total :page-size="1" :current-page=currentPage 
      @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    
    </div>
</template>
<script>
import * as sysApi from "../../common/sys";
export default {
    data() {
      var validateName=(rule, value, callback)=>{
            if(value===""){
                callback(new Error('请输入商品名'));

            }
            callback();
        };
        var validateDuration=(rule,value,callback)=>{
            if(value===""){
                callback(new Error("请输入时长"));
            }
            callback();
        }
        var validateTotalAmount=(rule,value,callback)=>{
            if(value===""){
                callback(new Error("请输入生成总量"));
            }
            callback();
        }
      
        return {
            tableData: [],
            timeDay:"",
            timeDay2:"",
            rules: {
                exchange_code_name: [
                    {validator: validateName,trigger: 'blur'}
                ],
                duration: [
                    {validator: validateDuration,trigger: 'blur'}
                ],
                total_amount: [
                    {validator: validateTotalAmount,trigger: 'blur'}
                ],
                
            },
            id:"",
            total:1,
            currentPage: 1,
            isShow:false,
            isShowDetail: false,
            generateVisible:false,
            newGenerateVisible:false,
            addGoods:false,
            changeGoods:false,
        generateData:{
          total_amount:'',     //生成数量
        },
        _index:"",
        validity_day:[{
                 id:2,
                name:"限时"
            },{
                id:1,
                name:"不限"
            }],
        newGenerateData:{
            exchange_code_name:"",
            duration:"",
            total_amount:"",
            validity_day:"",
            day:"",
            timeDay:""
        },
          changeGoodsData:{
           exchange_code_name:"",
            duration:"",
            total_amount:"",
            validity_day:"",
            day:""
        },
     
        }
    },
    methods: {
      
    // 编辑
    editBtn(index,row){
      this.changeGoodsData = Object.assign({},row,true);
      this.changeGoods=true;
      console.log(this.changeGoodsData);
    },
    //  goodsSelect2(event){
    //       if(event=="限时"){
    //         this.isShow=true;
    //         this.changeGoodsData.validity_day="限时";
    //       }else{
    //         this.isShow=false;
    //         this.changeGoodsData.validity_day="永久";
    //         this.timeDay2="永久";
    //       }
    //     },
    saveEdit(formName){
              var param={
                "id":this.changeGoodsData.id,
                "exchange_code_name":this.changeGoodsData.exchange_code_name,
                "duration":parseInt(this.changeGoodsData.duration),
                //"validity_day":this.changeGoodsData.validity_day=="限时"?this.changeGoodsData.day:"永久",
                "validity_day":this.changeGoodsData.validity_day,
                "total_amount":parseInt(this.changeGoodsData.total_amount)};
           sysApi.addRedcode(param)
              .then(data => {
                if(data.success===true){
                  console.log(data)
                  this.$message({
                    type:'success',
                    message:data.info
                    })
                      var param={"page":this.currentPage};
    sysApi.redcodeManage(param)
        .then(data => {
          this.tableData = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
                }
           this.changeGoods=false;
           //？看生成吧  
        })
        
    },
      // 生成兑换码
      generateBtn(index,row){
        this.generateVisible=true;
        this.id=row.id;
      },
      generateOkBtn(){
        var param={"id":parseInt(this.id),"count":parseInt(this.generateData.total_amount)};
        console.log(param)
        sysApi.shengchengRedcode(param)
        .then(data => {
        //  alert(data.success);

          if(data.success===true){
          console.log(data)
          this.$message({
            type:'success',
            message:data.info
          })
           var param={"page":this.currentPage};
    sysApi.redcodeManage(param)
        .then(data => {
          this.tableData = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
          this.generateVisible=false;
          //window.location.reload();
          }
        }); //这里我清空了暂时没有
        
      },
      changeBtn(index,row){
        this.changeGoodsData.goodsName=row.goodsName;
        this.changeGoodsData.time=row.time;
        this.changeGoodsData.salePrice=row.salePrice;
        this.changeGoodsData.goodsOrder=row.goodsOrder;
        this.changeGoodsData.disCount=row.disCount;
        if(row.status=="在售"){
            this.changeGoodsData.status="在售";
        }else{
             this.changeGoodsData.status="下架";
        }
        this.changeGoods=true;
      },
      //新增兑换码
        newGenerateBtn() {
            this.newGenerateVisible=true;
        },
        goodsSelect(event){
          if(event=="限时"){ 
            this.isShow=true;
            this.newGenerateData.validity_day="限时";
          }else{
            this.isShow=false;
            this.newGenerateData.validity_day="永久";
            this.newGenerateData.timeDay="永久";
          }
        },
        // 确定新增兑换码
        saveOkAdd(formName){
            if(this.newGenerateData.validity_day=="永久"){
            this.newGenerateData.timeDay="永久";
          }else{
            this.newGenerateData.timeDay=this.newGenerateData.day
          }
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var param={
                "id":0,
                "exchange_code_name":this.newGenerateData.exchange_code_name,
                "duration":parseInt(this.newGenerateData.duration),
                "validity_day":this.newGenerateData.timeDay,
                "total_amount":parseInt(this.newGenerateData.total_amount)};
           sysApi.addRedcode(param)
              .then(data => {
                if(data.success===true){
                  console.log(data)
                  this.$message({
                    type:'success',
                    message:data.info
                    })
                     var param={"page":this.currentPage};
    sysApi.redcodeManage(param)
        .then(data => {
          this.tableData = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
                }
           this.newGenerateVisible=false;
           //？看生成吧  
        })
          } else {
            return false;
          }
        });
        },
        /** 删除按钮点击事件 **/
      deleteBtn(index,row){
        this.editForm.rowIndex = index;
        this.editForm.resourceId = row.buddhistResourceId;
        this.deleteVisible=true;
      },
      // 分頁
       handleCurrentChange(val) {
        this.currentPage = parseInt(`${val}`);
        var param={"page":this.currentPage};
         sysApi.redcodeManage(param)
        .then(data => {
          this.tableData = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
      }
   
    },
    created(){
  var param={"page":this.currentPage};
    sysApi.redcodeManage(param)
        .then(data => {
          this.tableData = data.data;
          this.total =data.total_count;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
        }
}
</script>
<style>
 .el-form-item {
    margin-bottom: 22px;
  }
  .newGenerate .el-form--label-left .el-form-item__label,.editGenerate .el-form--label-left .el-form-item__label{
    width: 100px!important;
  }
   .newGenerate .el-form-item__content,.editGenerate .el-form-item__content{
    margin-left: 100px!important;
  }

</style>



