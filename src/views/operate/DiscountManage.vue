<template>
  <div class="info">
    <!--操作-->
    <div class="info-operating">
      <el-form :inline="true">
        <el-form-item>
          <!-- <router-link to="addBuddhist" style="text-decoration: none;color:#fff"> -->
            <el-button type="primary" size="medium" @click="addBtn()">
              <i class="el-icon-circle-plus"></i>&nbsp;
              新增优惠券
            </el-button>
            <el-button type="primary" size="medium" @click="releaseBtn()">
              <i class="el-icon-circle-plus"></i>&nbsp;
              发放优惠券
            </el-button>
          <!-- </router-link> -->
        </el-form-item>
      </el-form>
    </div>
    <!--数据-->
    <div class="info-main">
      <!--数据-表格-->
      <el-table :data="list" border style="width: 100%" stripe>
        <el-table-column prop="coupon_id" label="优惠券ID" align="center">
        </el-table-column>
        <el-table-column prop="coupon_type" label="劵类型" align="center"></el-table-column>
        <el-table-column prop="coupon_name" label="劵名称" align="center"></el-table-column>
        <el-table-column prop="coupon_price" label="面值(元)" align="center"></el-table-column>
        <el-table-column prop="coupon_expir_time" label="有效期(天)" align="center"></el-table-column>
        <el-table-column prop="coupon_amount" label="限量" align="center"></el-table-column>
        <el-table-column prop="already_grant_amount" label="已发量" align="center"></el-table-column>
        <el-table-column prop="coupon_status" label="状态" align="center"></el-table-column>
        <el-table-column  :width="350" label="操作" align="center">
          <template slot-scope="scope">
             <el-button  type="primary" size="small"  @click="editBtn(scope.$index,scope.row)">
                <i class="el-icon-edit-outline"></i> <b>编辑</b>
              </el-button>
            <el-button size="small" type="danger" @click="stopDialog(scope.row)">{{scope.row.coupon_status=="关闭"?'[启用]':'[关闭]'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    <!-- 编辑优惠券 -->
      <el-dialog
        title="编辑优惠券"
        :visible.sync="editVisible"
        width="40%"
        >
        <el-form label-width="80px" label-position="left" :model="editEdition">
          <el-form-item label="劵名称">
            <el-input v-model="editEdition.coupon_name"></el-input>
          </el-form-item>
          <!--上线方式-->
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="editEdition.coupon_status" @change="controlReadOnly">
          <el-radio label="启用"></el-radio>
          <el-radio label="关闭"></el-radio>
        </el-radio-group>
        <p>关闭仅仅对修改后的券有效，已发放的优惠券依然有效</p>
      </el-form-item>
          <el-form-item label="有效期" class="wid">
            <el-input v-model="editEdition.coupon_expir_time"></el-input>
            <span>天</span>
          </el-form-item>
          <el-form-item label="面值" class="wid">
            <el-input v-model="editEdition.coupon_price" :inline="true"></el-input>
            <span>元</span>
          </el-form-item>
          <el-form-item label="发放量" class="wid">
            <el-input v-model="editEdition.coupon_amount" :inline="true"></el-input>
            <span>张</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="edit-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="editOkBtn()">发布</el-button>
        </div>
      </el-dialog>
      <!--添加管理员-->
     <el-dialog
        title="添加优惠券"
        :visible.sync="addVisible"
        width="40%"
        >
        <el-form label-width="80px" label-position="left" :model="addEdition">
          <el-form-item label="劵名称">
            <el-input v-model="addEdition.coupon_name"></el-input>
          </el-form-item>
          <!--上线方式-->
      <el-form-item label="状态" prop="coupon_status">
        <el-radio-group v-model="addEdition.coupon_status" @change="controlReadOnly">
          <el-radio label="启用"></el-radio>
          <el-radio label="关闭"></el-radio>
        </el-radio-group>
        <p>关闭仅仅对修改后的券有效，已发放的优惠券依然有效</p>
      </el-form-item>
          <el-form-item label="有效期" class="wid">
            <el-input v-model="addEdition.coupon_expir_time"></el-input>
             <span>天</span>
          </el-form-item>
          <el-form-item label="面值" class="wid">
            <el-input v-model="addEdition.coupon_price" :inline="true"></el-input>
             <span>元</span>
          </el-form-item>
          <el-form-item label="发放量" class="wid">
            <el-input v-model="addEdition.coupon_amount" :inline="true"></el-input>
             <span>张</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="edit-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddOkBtn()">确认新增</el-button>
        </div>
      </el-dialog>
      <!--启用按钮-->
       <el-dialog
        title="提示"
        :visible.sync="useVisible"
        width="30%"
        center>
        <div class="tooltips">是否确定启用 ？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="useVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 发放 -->
      <el-dialog
        title="发放优惠券"
        :visible.sync="releaseVisible"
        width="30%"
        center>
        <el-form label-width="80px" label-position="left" :model="changeGoodsData" :rules="rules" ref="changeGoodsData">
          <el-form-item label="券名称" prop="coupon_name">
            <el-select v-model="changeGoodsData.coupon_name" >
                <el-option v-for="item in coupon_name" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员类型" prop="user_type">
            <el-select v-model="changeGoodsData.user_type" v-on:change="userSelect($event)">
                <el-option v-for="item in user_type" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发放人群" prop="user_accounts" v-show="isShow" >
            <el-input v-model="changeGoodsData.user_accounts" :inline="true"></el-input>
          </el-form-item>
      </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="releaseVisible = false">取 消</el-button>
          <el-button type="primary" @click="releaseRow('changeGoodsData')">确 定</el-button>
        </span>
      </el-dialog>
      <!--分页条-->
      <el-pagination :total=total :page-size="1" :current-page="1"  
      @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>

</template>

<script>
 import * as sysApi from "../../common/sys";
  export default {
    name: "EditionRelease",
    data() {
      var validatecouponName=(rule,value,callback)=>{
            if(value===""){
                callback(new Error("请选择券名称"));
            }
            callback();
        }
        var validateuserType=(rule,value,callback)=>{
            if(value===""){
                callback(new Error("请选择会员类型"));
            }
            callback();
        }
      return {

        isShow:false,
        releaseVisible: false, 
        useVisible:false,       //模态框可视化
        // rowIndex: '',                //当前点击行index值
        currentPage: 1,              //当前页
        pageSize: 20,                 //每页条数
        total: 1,                    //总条数
        editVisible:false,
        addVisible:false,
        rules: {
                coupon_name: [
                    {validator: validatecouponName,trigger: 'blur'}
                ],
                user_type: [
                    {validator: validateuserType,trigger: 'blur'}
                ]
                
            },

        //对话框获取保存数据
        editForm: {
          name:'',
          resourceId: '',
          rowIndex: '',                //当前点击行index值
        },
        editEdition: {
          coupon_name:'',
          coupon_status: '',
          coupon_expir_time:"",
          coupon_price:'',
         coupon_amount:''
          //账号
        },
        addEdition: {
          coupon_name:'',
          coupon_status: '',
          coupon_expir_time:"",
          coupon_price:'',
         coupon_amount:''
          //账号
        },
        //佛文当前页数据
        list: [],
        id:"1",
        changeGoodsData:{
          coupon_name:"",
          user_type:"",
          user_accounts:""
        },
        coupon_name:[],
        memberType:[],
        user_type:[],
      }
    },
    methods: {
         // 停用管理员
        stopDialog(row){
             var params={"id":row.id}
            if(row.coupon_status=="关闭"){
                      sysApi.startdissAccount(params)
                .then(res => {
                      if(res.success==true){
                          this.$message({
                            type: 'success',
                            message:res.info
                        });
                          var param={"is_grant":false,"page":this.currentPage};
    sysApi.discountManage(param)
        .then(data => {
          this.list = data.data;
          //this.currentPage = Data.pageNo;
          this.total =data.totalCount;
          console.log(data)
        })
                      }
                      
                   
                })
            }else{
                sysApi.stopdissAccount(params)
                .then(res => {
                            if(res.success==true){
                          this.$message({
                            type: 'success',
                            message:res.info
                        });
                          var param={"is_grant":false,"page":this.currentPage};
    sysApi.discountManage(param)
        .then(data => {
          this.list = data.data;
          //this.currentPage = Data.pageNo;
          this.total =data.totalCount;
          console.log(data)
        })
                      }
                })
            }
        },
        /** 编辑按钮点击事件 **/
      editBtn(index,row){
        this.editEdition = Object.assign({},row,true);
        this.editVisible=true;
        
      },
      // 确定编辑
      editOkBtn(){
        var params={
            "id":this.editEdition.id,// id， 如果是添加，则不需要传入，否则传入对应id
            "coupon_name":this.editEdition.coupon_name,//优惠券名字
            "coupon_status":this.editEdition.coupon_status,// 优惠券状态
            "coupon_expir_day":parseInt(this.editEdition.coupon_expir_time),// 有效期(天)
            "coupon_price":parseInt(this.editEdition.coupon_price),// 面值
             "coupon_amount":parseInt(this.editEdition.coupon_amount)//发放量
        };
         sysApi.editDisscount(params)
                .then(res => {
                    if(res.success===true){
                        this.$message({
                            type: 'success',
                            message:res.info
                        });
                        this.editVisible=false;
                          var param={"is_grant":false,"page":this.currentPage};
    sysApi.discountManage(param)
        .then(data => {
          this.list = data.data;
          //this.currentPage = Data.pageNo;
          this.total=data.totalCount;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
                    }
                })
      },
        /** 编辑对话框  ‘保存’  按钮点击事件 **/
      saveEdit(){
        if(this.editForm.name==''){
          this.$message.error('标题不能为空');
          return;
        }
        saveEdit(this.editForm.name,this.editForm.resourceId)
          .then(msg=>{
            this.list[this.editForm.rowIndex].name = this.editForm.name;
            this.$message.success('修改成功');
          })
          .catch(err=>console.log('请求异常信息:'+err));
        this.editVisible=false;
      },
       //根据上传方式改变日期选择框是否可操作
      controlReadOnly(){
        if(this.addEdition.status == '启用'){
          this.isReadOnly = true;
        }else{
          this.isReadOnly = false;
        }

      },
      addBtn(){
        this.addVisible=true;
      },
      AddOkBtn(){
         var params={
            "id":0,// id， 如果是添加，则不需要传入，否则传入对应id
            "coupon_name":this.addEdition.coupon_name,//优惠券名字
            "coupon_status":this.addEdition.coupon_status,// 优惠券状态
            "coupon_expir_day":parseInt(this.addEdition.coupon_expir_time),// 有效期(天)
            "coupon_price":parseInt(this.addEdition.coupon_price),// 面值
             "coupon_amount":parseInt(this.addEdition.coupon_amount)//发放量
        };
        sysApi.addDisscount(params)
                .then(res => {
                    if(res.success===true){
                        this.$message({
                            type: 'success',
                            message:res.info
                        });
                        this.addVisible=false;
                        var param={"is_grant":false,"page":this.currentPage};
    sysApi.discountManage(param)
        .then(data => {
          this.list = data.data;
          //this.currentPage = Data.pageNo;
          this.total=data.totalCount;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
                    }
                })
          .catch(err => console.log('请求异常信息:' + err));
      },
    // 发布按钮
    releaseBtn(index, row) {
        this.releaseVisible = true;
        this.coupon_name=new Array();
         this.user_type=new Array();
        //this.id=row.id;
            var param={"is_grant":true,"page":this.currentPage};
    sysApi.discountManage(param)
        .then(data => {
          for(var i=0;i<data.names.length;i++){
            this.coupon_name.push({ name: data.names[i], id:i+1})
          }
        })
      .catch(err => console.log('请求异常信息:' + err));
        sysApi.memberType()
        .then(data=>{
          if(data.success==true){
           for(var i=0;i<data.data.length;i++){
                    this.user_type.push({id:parseInt(i+1),name:data.data[i]})
                }
          }
          console.log(data);
        })
        .catch(err => console.log('请求异常信息:' + err));
      },
      userSelect(event){
        if(event!=="部分用户"){
          this.isShow=false;
        }else{
          this.isShow=true;
        }
      },
      releaseRow(formName){
        var params={"id":this.id,"user_type":this.changeGoodsData.user_type,"user_accounts":this.changeGoodsData.user_accounts,"coupon_name":this.changeGoodsData.coupon_name};
         this.$refs[formName].validate((valid) => {
            if (valid) {
        sysApi.releaseDisscount(params)
                .then(res => {
                    if(res.success===true){
                      this.releaseVisible = false;
                        this.$message({
                            type: 'success',
                            message:res.info
                        });
                    }
                })
                .catch(err => console.log('请求异常信息:' + err));
        } else {
            return false;
          }
        });
      },
   
      useBtn(index,row) {
        // console.log(index,row);
        this.editForm.rowIndex = index;
        //this.editForm.resourceId = row.buddhistResourceId;
        this.useVisible = true;
        // console.log(this.editForm.resourceId);
      },
    //downloadeBtn(){
        //  this.editForm.rowIndex = index;
        // this.editForm.resourceId = row.buddhistResourceId;
        //this.releaseVisible = true;
    //},
  
      /** 分页条点击事件 **/
      handleCurrentChange(val) {
        this.currentPage = parseInt(`${val}`);
        var param={"is_grant":false,"page":this.currentPage};
        sysApi.discountManage(param)
        .then(data => {
          this.list = data.data;
          //this.currentPage = Data.pageNo;
          this.total =data.totalCount;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
      }
    },
    created() {
      /**初次加载 数据列表 vue axios**/
      var param={"is_grant":false,"page":this.currentPage};
    sysApi.discountManage(param)
        .then(data => {
          this.list = data.data;
          //this.currentPage = Data.pageNo;
          this.total=data.totalCount;
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
    }
  }
</script>

<style scoped>
  .info-title {
    padding: 10px 15px;
    font-size: 13px;
    font-weight: bold;
    background: #f0f0f0;
    border-bottom: 1px solid #B5CFD9;
  }
.wid .el-input{
  width: 30%!important;
  float: left;
}
.wid span{
  width: 30%;
  float: left;
  margin-left: 10px;
}
  .info-operating {
    border-bottom: 1px solid #B5CFD9;
  }
.tip{
  width: 100%;
  margin-top:20px;


}
.tip p{
  text-align: center;
  color: #FF0000;
  

}
.el-checkbox, .el-checkbox__input{
  display: inline-block;
}
  .el-form-item {
    margin-bottom: 10px;
  }

  .el-pagination {
    text-align: center;
    padding: 30px 0;
  }

  .tooltips {
    text-align: center;
  }
</style>
