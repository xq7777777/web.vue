<template>
  <el-descriptions
    title="任务详情"
    direction="vertical"
    :column="4"
    border:
  >
    <el-descriptions-item label="Username">{{task.name}}</el-descriptions-item>
    <el-descriptions-item label="Telephone">{{task.assignTime}}</el-descriptions-item>
    <el-descriptions-item label="Place" :span="2">{{task.deadline}}</el-descriptions-item>
    <el-descriptions-item label="Remarks">
      <el-tag size="32px">任务详情</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Address"
      >{{task.description}}
    </el-descriptions-item>
  </el-descriptions>

</template>
<script>
export default {
    data(){
      return {
        task: {
          name: '任务1',
          assignTime: '2023-09-07 10:00',
          deadline: '2023-09-09 18:00',
          description: '这个任务需要在2天内完成开发工作'  
        }
      }
    }

};
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>