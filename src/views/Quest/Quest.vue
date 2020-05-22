<template>
  <div class="tag">
    <el-form :inline="true" :model="searchForm">
      <el-form-item>
        <el-select
          v-model="searchForm.userId"
          placeholder="请选择用户"
          filterable
          clearable
        >
          <el-option
            v-for="item in userList"
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
      <el-table-column prop="username" label="用户名" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="adoptedId" label="采纳的评论id" align="center">
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
      :labelList="labelList"
      :userList="userList"
      @refreshDataList="getDataList"
    />
  </div>
</template>

<script>
import { getAllLabel } from "@/api/label.js";
import { getAllUser } from "@/api/user";
import AddOrUpdate from "./components/AddOrUpdate";
import { getQuestList, deleteQuest } from "@/api/quest.js";
export default {
  name: "Quest",
  data() {
    return {
      searchForm: {
        userId: ""
      },
      pageSize: 5,
      pageIndex: 1,
      tableData: [],
      totalCount: 0,
      loading: false,
      dialogVisible: false,
      labelList: [],
      userList: []
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
      this.$confirm("此操作将永久删除该问题, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteQuest(id).then(res => {
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
      getQuestList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        userId: this.searchForm.userId
      }).then(res => {
        console.log(res);
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
    getOtherList() {
      getAllLabel().then(res => {
        if (res.code === 0) {
          this.labelList = res.data;
        }
      });
      getAllUser().then(res => {
        if (res.code === 0) {
          this.userList = res.data;
        }
      });
    }
  },
  mounted() {
    this.getDataList();
    this.getOtherList();
  }
};
</script>
