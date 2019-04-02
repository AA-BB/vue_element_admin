<template>
    <div>
        <el-table :data="tableData" border style="width:100%">
            <el-table-column label="优惠券ID" prop="coupon_id" align="center"></el-table-column>
            <el-table-column label="券类型" prop="coupon_type" align="center"></el-table-column>
            <el-table-column label="券名称" prop="coupon_name" align="center"></el-table-column>
            <el-table-column label="面值（元）" prop="coupon_price" align="center"></el-table-column>
            <el-table-column label="有效期（天）" prop="coupon_expir_time" align="center"></el-table-column>
            <el-table-column label="过期时间" prop="overdue_time" align="center"></el-table-column>
            <el-table-column label="获得时间" prop="coupon_get_time" align="center"></el-table-column>
            <el-table-column label="状态" prop="user_coupon_status" align="center"></el-table-column>
        </el-table>
        <el-pagination :total=total :page-size="1" :current-page="1" 
        :page-sizes="[5,10,20]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
</template>
<script>
import * as sysApi from "../../../common/sys";
export default {
    data() {
        return {
            tableData: [],
            total:10,
            currentPage:1,
        }
    },
   created(){
        if(this.$route.params.id){
            this.id=parseInt(this.$route.params.id);
            localStorage.setItem('Pageid',this.id);
            var id=parseInt(localStorage.getItem("Pageid"));
        }else{
             var id=parseInt(localStorage.getItem("Pageid"));
        }
      
      var param={"id":id,"page":this.currentPage};
        sysApi.codeDetail(param)
        .then(data => {
            if(data.success==true){
                this.tableData=data.data;
                this.total=data.total_count;
            }
         
        })
         .catch(err => console.log('请求异常信息:' + err));
    }
}
</script>


