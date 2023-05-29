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
      <el-form-item prop="name" label="名称">
        <el-input v-model="dataForm.name" placeholder="名称" />
      </el-form-item>
      <el-form-item prop="description" label="说明">
        <el-input v-model="dataForm.description" placeholder="说明" />
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-form-item label="菜单权限">
            <el-tree
              ref="menuListTree"
              :data="menuList"
              :props="{ label: 'title', children: 'children' }"
              node-key="id"
              accordion
              show-checkbox
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="数据权限">
            <el-tree
              ref="orgListTree"
              :data="orgList"
              :props="{ label: 'name', children: 'children' }"
              node-key="id"
              accordion
              show-checkbox
            />
          </el-form-item>
        </el-col> -->
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitHandle()">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus/es";
import { useRoleApi } from "@/api/system/role";
import { useMenuListApi } from "@/api/system/menu";
// import { useOrgListApi } from "@/api/system/dept";

const emit = defineEmits(["refreshDataList"]);

const visible = ref(false);
const menuList = ref([]);
// const orgList = ref([]);
// const orgListTree = ref();
const menuListTree = ref();
const dataFormRef = ref();

const dataForm = reactive({
  id: "",
  name: "",
  menuIds: [] as any[],
  orgIdList: [],
  description: ""
});

const init = (id?: number) => {
  visible.value = true;
  dataForm.id = "";

  // 重置表单数据
  if (dataFormRef.value) {
    dataFormRef.value.resetFields();
  }
  if (menuListTree.value) {
    menuListTree.value.setCheckedKeys([]);
  }
  // if (orgListTree.value) {
  //   orgListTree.value.setCheckedKeys([]);
  // }

  // id 存在则为修改
  if (id) {
    getRole(id);
  }

  // 菜单列表
  getMenuList();

  // 机构列表
  // getOrgList();
};

// 获取菜单列表
const getMenuList = () => {
  return useMenuListApi().then((res: any[]) => {
    menuList.value = res;
  });
};

// 获取机构列表
// const getOrgList = () => {
//   return useOrgListApi().then(res => {
//     orgList.value = res.data;
//   });
// };

// 获取信息
const getRole = (id: number) => {
  useRoleApi(id).then((res: any) => {
    Object.assign(dataForm, res);

    // dataForm.menuIds.forEach(item => menuListTree.value.setChecked(item, true));
    menuListTree.value.setCheckedKeys(dataForm.menuIds);
    // orgListTree.value.setCheckedKeys(dataForm.orgIdList);
  });
};

const dataRules = ref({
  name: [{ required: true, message: "必填项不能为空", trigger: "blur" }]
});

// 表单提交
const submitHandle = () => {
  dataFormRef.value.validate((valid: boolean) => {
    if (!valid) {
      return false;
    }
    dataForm.menuIds = [
      ...menuListTree.value.getHalfCheckedKeys(),
      ...menuListTree.value.getCheckedKeys()
    ];
    // dataForm.orgIdList = orgListTree.value.getCheckedKeys();

    ElMessage.success({
      message: "操作成功",
      duration: 500,
      onClose: () => {
        visible.value = false;
        emit("refreshDataList");
      }
    });
  });
};

defineExpose({
  init
});
</script>
