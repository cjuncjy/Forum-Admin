<template>
  <div class="sort">
    <el-form :inline="true" :model="searchForm">
      <el-form-item>
        <el-input v-model="searchForm.sortName" placeholder="分类名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDataList">查询</el-button>
        <el-button type="primary" @click="addOrUpdate()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      stripe
      v-loading="loading"
    >
      <el-table-column prop="id" label="id" align="center"> </el-table-column>
      <el-table-column prop="name" label="分类名" align="center">
      </el-table-column>
      <el-table-column prop="description" label="描述" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button
            @click="addOrUpdate(scope.row.id)"
            type="text"
            size="small"
          >
            修改
          </el-button>
          <el-button type="text" size="small" @click="deleteRow(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    >
    </el-pagination>
    <AddOrUpdate
      ref="addOrUpdate"
      v-if="dialogVisible"
      @refreshDataList="getDataList"
    />
  </div>
</template>

<script>
import { getSortList, deleteSort } from "@/api/sort.js";
import AddOrUpdate from "./components/AddOrUpdate";
export default {
  name: "Sort",
  data() {
    return {
      searchForm: {
        sortName: ""
      },
      pageSize: 5,
      pageIndex: 1,
      tableData: [],
      totalCount: 0,
      loading: false,
      dialogVisible: false
    };
  },
  components: {
    AddOrUpdate
  },
  methods: {
    addOrUpdate(id) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    deleteRow(id) {
      // id
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteSort(id).then(res => {
            if (res.code === 0) {
              this.$message.success("删除成功");
              this.getDataList();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataList() {
      this.loading = true;
      getSortList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        sortName: this.searchForm.sortName
      }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
          this.totalCount = res.totalCount;
        }
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDataList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getDataList();
    }
  },
  mounted() {
    this.getDataList();
  }
};
</script>

<style scoped lang="scss"></style>
