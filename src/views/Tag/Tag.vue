<template>
  <div class="tag">
    <el-form :inline="true" :model="searchForm">
      <el-form-item>
        <el-input
          v-model="searchForm.name"
          placeholder="标签名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchForm.sortId"
          placeholder="请选择所属分类"
          clearable
          filterable
        >
          <el-option
            v-for="item in sortList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
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
      <el-table-column prop="label_name" label="标签名" align="center">
      </el-table-column>
      <el-table-column prop="sort_name" label="所属分类名" align="center">
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
      :sortList="sortList"
      @refreshDataList="getDataList"
    />
  </div>
</template>

<script>
import { getLabelList, deleteLabel } from "@/api/label.js";
import { getAllSort } from "@/api/sort.js";
import AddOrUpdate from "./components/AddOrUpdate";
export default {
  name: "Tag",
  data() {
    return {
      searchForm: {
        name: "",
        sortId: ""
      },
      pageSize: 5,
      pageIndex: 1,
      tableData: [],
      totalCount: 0,
      loading: false,
      dialogVisible: false,
      sortList: []
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
      this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteLabel(id).then(res => {
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
      getLabelList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        name: this.searchForm.name,
        sortId: this.searchForm.sortId
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
    },
    getSortList() {
      getAllSort().then(res => {
        if (res.code === 0) {
          this.sortList = res.data;
        }
      });
    }
  },
  mounted() {
    this.getDataList();
    this.getSortList();
  }
};
</script>

<style scoped lang="scss"></style>
