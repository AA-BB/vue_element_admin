<template>
    <div>
        <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" :model="form" label-width="80px" >
                    <el-form-item label="排序">
                        <el-select v-model="form.sort" v-on:change="selectSort($event)">
                            <el-option v-for="item in sort" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="搜索">
                        <el-input v-model="form.searchKey" placeholder="输入管理员名称、账号搜索" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="search()"></el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="exportToExcel()">导出Excel</el-button>
                    </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24" style="margin-top:20px">
            <el-table :data="tableData" border style="width:100%">
                <el-table-column label="账号名称" prop="user_name" align="center"></el-table-column>
                <el-table-column label="账号" prop="user_number" align="center"></el-table-column>
                <el-table-column label="所属模块" prop="module" align="center"></el-table-column>
                <el-table-column label="操作" prop="content" align="center"></el-table-column>
                <el-table-column label="时间" prop="create_time" align="center"></el-table-column>
            </el-table>
            <el-pagination :total=total :page-size="1" :current-page="1"  @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
        </el-col>
    </div>
</template>
<script>
import { export_json_to_excel } from "../../vendor/Export2Excel";
import * as sysApi from "../../common/sys";
export default {
    data() {
        return {
            form: {
                sort: '时间从近到远',
                searchKey: ''
            },
            currentPage:1,
            total:1,
            sort: [{
                id: 1,
                name: '时间从近到远'
            },{
                id: 2,
                name: '时间从远到近'
            }],
            tableData: [],
            boolean:true,
        }
    },
    methods: {
        exportToExcel() {
            require.ensure([], () => {
                const tHeader = ['账号名称','账号','所属模块','操作','时间'];
                const filterVal = ['user_name','user_number',"module",'content','create_time'];
                const list = this.tableData;
                const data = this.formatJson(filterVal,list);
                export_json_to_excel(tHeader, data, '列表excel');
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        selectSort(event){
            if(event=="时间从近到远"){
                this.form.sort="时间从近到远";
                this.boolean=true
            }else{
                this.form.sort="时间从远到近";
                this.boolean=false
            }
             var pa={"desc":this.boolean,'condition':this.form.searchKey,"page":1};
         sysApi.optionForm(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count
                    console.log(res);
                })
               .catch(err => console.log('请求异常信息:' + err));
      
        },
        search(){
         var pa={"desc":this.boolean,'condition':this.form.searchKey,"page":1};
         sysApi.optionForm(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count
                    console.log(res);
                })
               .catch(err => console.log('请求异常信息:' + err));
        },
        handleCurrentChange(val){
          this.currentPage = parseInt(`${val}`);
         
         var pa={"desc":this.boolean,'condition':this.form.searchKey,"page":this.currentPage};
         sysApi.optionForm(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count
                    console.log(res);
                })
               .catch(err => console.log('请求异常信息:' + err));
      }
    },
     created(){
         var pa={"desc":this.boolean,'condition':this.form.searchKey,"page":this.currentPage};
         sysApi.optionForm(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count
                    console.log(res);
                })
               .catch(err => console.log('请求异常信息:' + err));
  
    }
}
</script>
<style>
.el-form-item:last-child{
    margin-top: 0px!important;
}
</style>

