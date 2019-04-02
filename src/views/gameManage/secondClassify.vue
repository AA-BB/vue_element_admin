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
                              <template v-if="form.status=='上架'">
                            <el-button size="small"  @click="changeBtn(scope.$index,scope.row)">
                                <i class="el-icon-edit-outline"></i><b>修改</b>
                            </el-button>
                            <el-button size="small"  @click="deleBtn(scope.$index,scope.row)">
                                <i class="el-icon-edit-outline"></i> <b>删除</b>
                            </el-button>
                        </template>
                        <template v-else></template>
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
     <el-dialog
        title="提示"
        :visible.sync="deleteVisible"
        width="30%"
        center>
        <div class="tooltips">删除不可恢复，是否确定删除 ？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow()">确 定</el-button>
        </span>
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
            id:"",
            tableData: [],
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
            total:1,
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
            id:""
        },
         changeGlassifyData:{
            class_name:"",
            class_sort:"",
            class_status:"",
            class_remark:"",
            id:""
        },
        deleId:"",
        form:{
            status:""
        },
        class_status:""
        
     
        }
    },
    methods: {
        // 删除分类】
        deleBtn(index,row){
            this.deleteVisible=true;
            this.deleId=row.id;
        },
        deleteRow(){
            var pa={
                "id":this.deleId,
                "first_id":this.id,//一级id
                }
         sysApi.deleSecond(pa)
                .then(res => {
                    if(res.success==true){
                         this.deleteVisible=false;
                         this.$message({
                             type:"success",
                             message:res.info
                         })
                         var pa={
                                'page':this.currentPage, //第几页
                                "id":this.id
                        }
                        sysApi.secondClass(pa)
                            .then(res => {
                                this.tableData=res.data;
                                this.total=res.total_count;
                                console.log(res);
                        })
                    }
                    console.log(res);
                })
        },
        // 编辑二级分类
        /** 编辑按钮点击事件 **/
      changeBtn(index,row){
        this.changeGlassifyData = Object.assign({},row,true);
        this.changeGlassify=true;
      },
      editAdd(){
        var pa={
              "id":this.changeGlassifyData.id,// id,添加的时候不需要传入，修改的时候传入对于的id
              "name":this.changeGlassifyData.class_name,// 分类名称
                "first_id":parseInt(localStorage.getItem("id")), //一级分类的id
              "sort":parseInt(this.changeGlassifyData.class_sort),// 排序
              "status":this.changeGlassifyData.class_status,//状态
              "remark":this.changeGlassifyData.class_remark//备注
                }
         sysApi.addsecondClass(pa)
            .then(res => {
                  if(res.success==true){
                      this.total=res.total_count;
                      this.changeGlassify=false;
                         var pa={
                            'page':this.currentPage, //第几页
                            "id":this.id
                        }
                        sysApi.secondClass(pa)
                        .then(res => {
                            this.tableData=res.data;
                            this.total=res.total_count;
                            console.log(res);
                        })
                  }
                    console.log(res);
                })
      },
        // 添加二级分类
       addClassifyBtn(row) {
            this.addClassify=true;
        },
        saveAdd(){
          var pa={
              "id":0,// id,添加的时候不需要传入，修改的时候传入对于的id
              "name":this.addClassifyData.class_name,// 分类名称
              "first_id":parseInt(localStorage.getItem("id")), //一级分类的id
              "sort":parseInt(this.addClassifyData.class_sort),// 排序
              "status":this.addClassifyData.class_status,//状态
              "remark":this.addClassifyData.class_remark//备注
                }
         sysApi.addsecondClass(pa)
            .then(res => {
                  if(res.success==true){
                      this.total=res.total_count;
                      this.addClassify=false;
                   var pa={
                        'page':this.currentPage, //第几页
                        "id":this.id
                    }
                    sysApi.secondClass(pa)
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
            'page':this.currentPage, //第几页
            "id":this.id
        }
         sysApi.secondClass(pa)
            .then(res => {
                this.tableData=res.data;
                this.total=res.total_count;
                console.log(res);
            })
        .catch(err => console.log('请求异常信息:' + err));
      }
    },
    created(){
         if(this.$route.params.id){
            this.id=parseInt(this.$route.params.id);
            localStorage.setItem('id',this.$route.params.id);
        }else{
            this.id=parseInt(localStorage.getItem("id"));
        }
        if(this.$route.params.status){
            this.form.status=this.$route.params.status;
            localStorage.setItem('status',this.$route.params.status);
        }else{
            this.form.status=parseInt(localStorage.getItem("status"));
        }
       
         var pa={
            'page':this.currentPage, //第几页
            "id":this.id
        }
         sysApi.secondClass(pa)
            .then(res => {
                for(var i=0;i<res.data.length;i++){
                    res.data[i].newParam="classifyLevel";
                    res.data[i].classifyLevel="二级"
                }
                this.tableData=res.data;
                this.total=res.total_count;
                console.log(res);
            })
            .catch(err => console.log('请求异常信息:' + err));
    }
}
</script>
<style>
 .el-form-item {
    margin-bottom: 10px;
  }

</style>



