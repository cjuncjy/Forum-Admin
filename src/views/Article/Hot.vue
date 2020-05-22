<template>
  <div class="ordinary">
    <el-form :inline="true" :model="searchForm">
      <el-form-item>
        <el-select
          v-model="searchForm.sortId"
          placeholder="请选择分类"
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
      style="width: 100%;"
      border
      stripe
      v-loading="loading"
    >
      <el-table-column prop="id" label="id" align="center"> </el-table-column>
      <el-table-column prop="username" label="所属用户" align="center">
      </el-table-column>
      <el-table-column prop="title" label="文章名" align="center" width="150">
      </el-table-column>
      <el-table-column
        prop="content"
        label="文章内容"
        align="center"
        show-overflow-tooltip
        width="150"
      >
      </el-table-column>
      <el-table-column prop="sortName" label="分类名" align="center">
      </el-table-column>
      <el-table-column
        prop="labelsName"
        label="类别名"
        align="center"
        width="150"
      >
      </el-table-column>
      <el-table-column prop="path" label="头像路径" align="center" width="150">
      </el-table-column>
      <el-table-column prop="views" label="查看人数" align="center">
      </el-table-column>
      <el-table-column prop="commentCount" label="评论数" align="center">
      </el-table-column>
      <el-table-column prop="likeCount" label="点赞数" align="center">
      </el-table-column>
      <el-table-column prop="createAt" label="创建时间" align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.createAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updateAt" label="更新时间" align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.updateAt) }}
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
import { getHotList, deleteArticle } from "@/api/article.js";
import { getAllSort } from "@/api/sort.js";
export default {
  name: "Hot",
  data() {
    return {
      searchForm: {
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
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteArticle(id).then(res => {
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
      getHotList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
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
    getSort() {
      getAllSort().then(res => {
        this.sortList = res.data;
      });
    }
  },
  mounted() {
    this.getDataList();
    this.getSort();
  }
};
</script>

<style scoped lang="scss"></style>
