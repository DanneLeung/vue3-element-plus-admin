<template>
  <el-dialog
    v-model="visible"
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
  >
    <el-form
      ref="dataFormRef"
      :model="dataForm"
      :rules="dataRules"
      label-width="120px"
      @keyup.enter="submitHandle()"
    >
      <el-form-item prop="username" label="用户名">
        <el-input v-model="dataForm.username" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="fullname" label="姓名">
        <el-input v-model="dataForm.fullname" placeholder="姓名" />
      </el-form-item>
      <el-form-item prop="mobile" label="手机号">
        <el-input v-model="dataForm.mobile" placeholder="手机号" />
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="dataForm.email" placeholder="邮箱" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="dataForm.password"
          type="password"
          placeholder="密码"
        />
      </el-form-item>
      <el-form-item prop="roleIds" label="所属角色">
        <el-select
          v-model="dataForm.roleIds"
          multiple
          placeholder="所属角色"
          style="width: 100%"
        >
          <el-option
            v-for="role in roleList"
            :key="role.id"
            :label="role.name"
            :value="role.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitHandle()">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useUserApi, useUserUpdateApi } from "@/api/system/user";
import { useRoleListApi } from "@/api/system/role";
import { message } from "@/utils/message";

const emit = defineEmits(["refreshDataList"]);

const visible = ref(false);
const roleList = ref<any[]>([]);
const dataFormRef = ref();

const dataForm = reactive({
  id: 0,
  username: "",
  fullname: "",
  password: "",
  email: "",
  mobile: "",
  roleIds: [] as any[],
  status: 1
});

const init = (id?: number) => {
  visible.value = true;
  dataForm.id = null;

  // 重置表单数据
  if (dataFormRef.value) {
    dataFormRef.value.resetFields();
  }
  // id 存在则为修改
  if (id) {
    getUser(id);
  }
  getRoleList();
};

// 获取信息
const getUser = (id: number) => {
  useUserApi(id).then((res: any) => {
    Object.assign(dataForm, res);
  });
};

// 获取机构列表
const getRoleList = () => {
  return useRoleListApi().then((res: any[]) => {
    roleList.value = res;
  });
};
const updateUser = (data: any) => {
  return useUserUpdateApi(data);
};

const dataRules = ref({
  username: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
  fullname: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
  mobile: [{ required: true, message: "必填项不能为空", trigger: "blur" }]
});

// 表单提交
const submitHandle = () => {
  dataFormRef.value.validate((valid: boolean) => {
    if (!valid) {
      return false;
    }
    updateUser(dataForm)
      .then(() => {
        message("数据修改成功!", {
          type: "success",
          duration: 1000,
          onClose: () => {
            visible.value = false;
            emit("refreshDataList");
          }
        });
      })
      .catch(e => {
        message("数据修改异常:" + e, { type: "error", duration: 10000 });
      });
  });
};

defineExpose({
  init
});
</script>
