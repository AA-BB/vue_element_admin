<template>
    <div class="app-container">
        <el-col :span="24" style="padding-bottom: 0px">
                     <el-button type="primary" size="medium" @click="addClassifyBtn()">
              <i class="el-icon-circle-plus"></i>&nbsp;
              添加分类
            </el-button>
        </el-col>
        <el-col :span="24" style="margin-top:20px">
            <el-table :data="tableData" border style="width:100%">
                <el-table-column label="排序" prop="class_sort" align="center"></el-table-column>
                <el-table-column label="状态" prop="class_status" align="center"></el-table-column>
                <el-table-column label="分类级别" prop="classifyLevel" align="center"></el-table-column>
                 <el-table-column label="分类名称" prop="class_name" align="center"></el-table-column>
                <el-table-column label="备注" prop="class_remark" align="center"></el-table-column>
                <el-table-column label="操作" prop="operation" align="center" :width="400">
                    <template slot-scope="scope">
                        <el-button size="small"  @click="changeBtn(scope.$index,scope.row)">
                            <i class="el-icon-edit-outline"></i> <b>修改</b>
                        </el-button>
                        <router-link :to="{name:'二级分类',params: {id:scope.row.id,status:scope.row.class_status}}"><el-button size="small" type="danger" >查看二级</el-button></router-link>
                    </template>
                    
                </el-table-column>
            </el-table>
        </el-col>
        <!-- 添加商品 -->
         <el-dialog
        title="添加游戏分类"
        :visible.sync="addClassify"
        width="30%"
        center>
         <el-form label-width="80px" label-position="left" :model="addClassifyData">
          <el-form-item label="分类名">
            <el-input v-model="addClassifyData.class_name"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="addClassifyData.class_sort" :inline="true"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="class_status">
        <el-radio-group v-model="addClassifyData.class_status">
          <el-radio label="上架"></el-radio>
          <el-radio label="下架"></el-radio>
        </el-radio-group>
      </el-form-item>
           <el-form-item label="备注">
            <el-input v-model="addClassifyData.class_remark" :inline="true"></el-input>
          </el-form-item>
         
        </el-form>
        <div slot="footer" class="edit-footer">
          <el-button @click="addClassify = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd()">发布</el-button>
        </div>
      </el-dialog>
         <!-- x修改商品 -->
         <el-dialog
        title="编辑商品"
        :visible.sync="changeGlassify"
        width="30%"
        center>
         <el-form label-width="80px" label-position="left" :model="changeGlassifyData">
          <el-form-item label="分类名">
            <el-input v-model="changeGlassifyData.class_name"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="changeGlassifyData.class_sort" :inline="true"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="class_status">
        <el-radio-group v-model="changeGlassifyData.class_status">
          <el-radio label="上架"></el-radio>
          <el-radio label="下架"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
            <el-input v-model="changeGlassifyData.class_remark" :inline="true"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="edit-footer">
          <el-button @click="changeGlassify = false">取 消</el-button>
          <el-button type="primary" @click="editAdd()">确定</el-button>
        </div>
      </el-dialog>

    <el-pagination :total=total :page-size="1" :current-page="1"  
      @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
</template>
<script>
import * as sysApi from "../../common/sys";
export default {
    data() {
        return {
            tableData: [],
            total:1,
            form:{
              classifyLevel:"一级"
            },
            classifyLevel:[{
              id:1,
              name:"一级"
            },{
              id:2,
              name:"二级"
            }],
            upVisible:false,
            downVisible:false,
            currentPage:1,
            isShowDetail: false,
            deleteVisible:false,
            addClassify:false,
            changeGlassify:false,
        editForm:{
          name:'',
          resourceId:'',
          rowIndex:'',                //当前点击行index值
        },
        addClassifyData:{
           class_name:"",
            class_sort:"",
            class_status:"",
            class_remark:"",
        },
         changeGlassifyData:{
            class_name:"",
            class_sort:"",
            class_status:"",
            class_remark:"",
            id:""
        },
        updownId:""
     
        }
    },
    methods: {
        addClassifyBtn(row) {
            this.addClassify=true;
        },
        saveAdd(){
          var pa={
              "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mzc2OTY2MDcsImlhdCI6MTUzNzY5MzAwN30.KZSLIw6fApRJ4XBp9caZmrN6NTDEdsij9n3Haxvspps",// token
              "id":0,// id,添加的时候不需要传入，修改的时候传入对于的id
              "name":this.addClassifyData.class_name,// 分类名称
              "sort":parseInt(this.addClassifyData.class_sort),// 排序
              "status":this.addClassifyData.class_status,//状态
              "remark":this.addClassifyData.class_remark//备注
                }
         sysApi.editClassManage(pa)
            .then(res => {
                  if(res.success==true){
                      this.total=res.total_count;
                      this.addClassify=false;
                       var pa={
                'page':1 //第几页
                }
                sysApi.gameClassManage(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(res);
                })
                  }
                    console.log(res);
                })
        },
        /** 删除按钮点击事件 **/
      deleteBtn(index,row){
        this.editForm.rowIndex = index;
        this.editForm.resourceId = row.buddhistResourceId;
        this.deleteVisible=true;
      },
      /** 编辑按钮点击事件 **/
      changeBtn(index,row){
        this.changeGlassifyData = Object.assign({},row,true);
        this.changeGlassify=true;
      },
      editAdd(){
        var pa={
              "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mzc2OTY2MDcsImlhdCI6MTUzNzY5MzAwN30.KZSLIw6fApRJ4XBp9caZmrN6NTDEdsij9n3Haxvspps",// token
              "id":this.changeGlassifyData.id,// id,添加的时候不需要传入，修改的时候传入对于的id
              "name":this.changeGlassifyData.class_name,// 分类名称
              "sort":parseInt(this.changeGlassifyData.class_sort),// 排序
              "status":this.changeGlassifyData.class_status,//状态
              "remark":this.changeGlassifyData.class_remark//备注
                }
         sysApi.editClassManage(pa)
            .then(res => {
                  if(res.success==true){
                      this.total=res.total_count;
                      this.changeGlassify=false;
                       var pa={
                'page':1 //第几页
                }
                sysApi.gameClassManage(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(res);
                })
                  }
                    console.log(res);
                })
      },
        // 分頁
       handleCurrentChange(val) {
        this.currentPage = parseInt(`${val}`);
        var pa={
                'page':this.currentPage //第几页
                }
         sysApi.gameClassManage(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(res);
                })
        .catch(err => console.log('请求异常信息:' + err));
      }
   
    },
    created(){
         var pa={
                'page':this.currentPage //第几页
                }
         sysApi.gameClassManage(pa)
                .then(res => {
                  for(var i=0;i<res.data.length;i++){
                    res.data[i].newParam="classifyLevel";
                    res.data[i].classifyLevel="一级"
                  }
                    this.tableData= res.data;
                    this.total=res.total_count;
                    console.log(this.tableData);
                })
                .catch(err => console.log('请求异常信息:' + err));
    }
}
</script>
<style>
 .el-form-item {
    margin-bottom: 10px;
  }
.el-button--small{
    margin-right: 10px;
}
</style>



