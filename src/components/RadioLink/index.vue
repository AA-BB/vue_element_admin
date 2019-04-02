<template>
<div class="radio-banner" >
    <el-radio-group v-model="model.value" @change="changeRadio">
        <el-col :span="24" v-for="(item, index) in items" style="margin-bottom:10px">
            <el-radio :label="item.label" :key="index">
                    <span>{{item.label}}</span>
                    <template v-if="item.subItems" >
                        <el-input class="special_input" :disabled="item.subItems.isShow && item.label !== model.value" style="margin-left:10px" size="small" v-if="item.subItems.type === 'input'" v-model="model[item.subItems.prop]" @change="handleInputChange"></el-input>
                    </template>
             </el-radio>
        </el-col>
    </el-radio-group>
</div>
    
</template>
<script>
export default {
    props: {
        model: {
            type: Object
        },
        items: {
            type: Array
        }
    },
    methods: {
        changeRadio(radio) {
            var thiz = this;
            this.items.filter(function(item){
                if (item.subItems) {
                    item.subItems.isShow = true;
                    if (item.label == radio) {
                        item.subItems.isShow = false;
                        thiz.model.selectValue = thiz.model[item.subItems.prop];
                    }
                }
            })
        },
        handleInputChange(value) {
            this.model.selectValue = value;
        }
    }
}
</script>
<style lang="scss">
.radio-banner{
    border: 1px solid #dcdfe6;
    padding: 20px;
}
.radio-link {
    height: 35px;
    line-height: 35px;
}
.el-radio {
    .el-radio__label {
        span {
            display: inline-block;
            width: 100px;
        }
    }
}
.special_input input{
    width:70%;
}
.el-radio+.el-radio {
    margin-left: 0px;
}
</style>


