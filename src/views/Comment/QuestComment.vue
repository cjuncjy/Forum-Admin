<template>
  <div class="sort">
    <el-form :inline="true" :model="searchForm">
      <el-form-item>
        <el-input v-model="searchForm.key" placeholder="搜索条件"></el-input>
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
      <el-table-column prop="questionId" label="问答id" align="center">
      </el-table-column>
      <el-table-column prop="questionTitle" label="问答标题" align="center">
      </el-table-column>
      <el-table-column prop="fromUserName" label="来自" align="center">
      </el-table-column>
      <el-table-column prop="toUserName" label="评论给" align="center">
      </el-table-column>
      <el-table-column prop="content" label="内容" align="center">
      </el-table-column>
      <el-table-column prop="createAt" label="更新时间" align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.createAt) }}
        </template>
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
import AddOrUpdate from "./components/AddOrUpdate";
import { getQuestComment, deleteComment } from "@/api/comment";
export default {
  name: "Comment",
  data() {
    return {
      searchForm: {
        key: ""
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
        this.$refs.addOrUpdate.init(id, true);
      });
    },
    deleteRow(id) {
      // id
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteComment(id, true).then(res => {
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
      getQuestComment({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        key: this.searchForm.key
      }).then(res => {
        if (res.code === 0) {
          console.log(res);
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
