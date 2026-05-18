const projects = [
  {
    id: 'p8-dual',
    externalName: 'P8 dual',
    internalName: 'R2351',
    modelName: 'K1352',
    managerAccount: 'wangwei',
    status: '进行中',
    archived: false,
    salesability: '不可销售',
    unsellableReason: '仍处于设计或测试阶段',
    description: '面向海外市场的双屏 POS 设备。',
    members: [
      { userAccount: 'wangwei', role: '硬件项目经理' },
      { userAccount: 'lina', role: '软件项目经理' },
      { userAccount: 'chenchen', role: '技术支持' },
      { userAccount: 'zhaolei', role: '销售' },
    ],
    stages: [
      { name: '提出想法', assignees: [{ type: 'department', name: '销售部' }, { type: 'department', name: '产品部' }], status: '已完成' },
      { name: '讨论可行性', assignees: [{ type: 'department', name: '产品部' }], status: '已完成' },
      { name: '核算成本', assignees: [{ type: 'department', name: '运营部' }], status: '已完成' },
      { name: '硬件设计', assignees: [{ type: 'user', account: 'wangwei' }, { type: 'department', name: '硬件部' }], status: '已完成' },
      { name: '软件适配', assignees: [{ type: 'user', account: 'lina' }, { type: 'department', name: '软件部' }], status: '进行中' },
      { name: '测试生产', assignees: [{ type: 'department', name: '测试部' }, { type: 'department', name: '车间' }], status: '未开始' },
      { name: '试用', assignees: [{ type: 'department', name: '技术支持部' }], status: '未开始' },
      { name: '客户推广', assignees: [{ type: 'department', name: '销售部' }, { type: 'department', name: '技术支持部' }], status: '未开始' },
    ],
    projectCustomers: [
      { customerName: 'Nova Retail', region: '德国', projectStatus: '推广阶段', requirements: [
        { id: 'REQ-001', title: '支持多语言收据模板', userStory: '作为门店经理，我希望根据国家切换收据语言，以便服务当地客户。', value: '减少前台人工解释成本', acceptance: '可选择至少中英两种语言模板；打印内容正确', priority: '高', status: '待评估', proposer: 'Nova Retail', creator: '赵磊', date: '2026-05-05', taskId: '' },
        { id: 'REQ-002', title: '远程批量升级', userStory: '作为运维人员，我希望批量升级设备，以便降低门店维护成本。', value: '减少现场维护次数', acceptance: '可对指定设备组批量下发升级任务', priority: '高', status: '已采纳', proposer: 'Nova Retail', creator: '赵磊', date: '2026-05-07', taskId: '' },
      ] },
      { customerName: 'Siam Pay', region: '泰国', projectStatus: '客户调试阶段', requirements: [
        { id: 'REQ-003', title: '支持多语言收据模板', userStory: '作为区域运营，我希望为不同国家设置收据语言，以便统一服务体验。', value: '降低培训复杂度', acceptance: '支持按国家配置语言模板', priority: '中', status: '待评估', proposer: 'Siam Pay', creator: '高静', date: '2026-05-08', taskId: '' },
        { id: 'REQ-004', title: '低电量提醒', userStory: '作为店员，我希望设备在低电量时提醒，以避免交易中断。', value: '减少交易失败', acceptance: '低于 20% 电量时提醒', priority: '中', status: '待评估', proposer: 'Siam Pay', creator: '高静', date: '2026-05-09', taskId: '' },
      ] },
    ],
    projectMaterials: [
      { name: '硬件接口说明_v2.pdf', sourceStage: '硬件设计', shareTarget: '项目资料区', publishedAt: '2026-05-10 11:00' },
    ],
  },
  {
    id: 's6-mini',
    externalName: 'S6 mini',
    internalName: 'R2290',
    modelName: 'K1290',
    managerAccount: 'zhouhang',
    status: '进行中',
    archived: false,
    salesability: '不可销售',
    unsellableReason: '仍处于设计或测试阶段',
    description: '轻量级移动收银终端。',
    members: [
      { userAccount: 'zhouhang', role: '硬件项目经理' },
      { userAccount: 'sunqian', role: '软件项目经理' },
    ],
    stages: [
      { name: '提出想法', assignees: [{ type: 'department', name: '销售部' }, { type: 'department', name: '产品部' }], status: '已完成' },
      { name: '讨论可行性', assignees: [{ type: 'department', name: '产品部' }], status: '已完成' },
      { name: '核算成本', assignees: [{ type: 'department', name: '运营部' }], status: '进行中' },
      { name: '硬件设计', assignees: [{ type: 'department', name: '硬件部' }], status: '未开始' },
    ],
    projectCustomers: [
      { customerName: 'Nova Retail', region: '德国', projectStatus: '试用阶段', requirements: [] },
    ],
    projectMaterials: [],
  },
  {
    id: 'x10-pro',
    externalName: 'X10 Pro',
    internalName: 'R2410',
    modelName: 'K1410',
    managerAccount: 'liuyang',
    status: '已完成',
    archived: true,
    salesability: '不可销售',
    unsellableReason: '产品过老，不再继续推广',
    description: '高端桌面式 POS 设备。',
    members: [
      { userAccount: 'liuyang', role: '硬件项目经理' },
      { userAccount: 'gaojing', role: '销售' },
    ],
    stages: [
      { name: '提出想法', assignees: [{ type: 'department', name: '销售部' }, { type: 'department', name: '产品部' }], status: '已完成' },
      { name: '讨论可行性', assignees: [{ type: 'department', name: '产品部' }], status: '已完成' },
      { name: '核算成本', assignees: [{ type: 'department', name: '运营部' }], status: '已完成' },
      { name: '硬件设计', assignees: [{ type: 'department', name: '硬件部' }], status: '已完成' },
      { name: '软件适配', assignees: [{ type: 'department', name: '软件部' }], status: '已完成' },
      { name: '测试生产', assignees: [{ type: 'department', name: '测试部' }], status: '已完成' },
      { name: '试用', assignees: [{ type: 'department', name: '技术支持部' }], status: '已完成' },
      { name: '客户推广', assignees: [{ type: 'department', name: '销售部' }], status: '已完成' },
    ],
    projectCustomers: [
      { customerName: 'Nova Retail', region: '德国', projectStatus: '稳定出货阶段', requirements: [] },
    ],
    projectMaterials: [],
  },
  {
    id: 'm5-plus',
    externalName: 'M5 Plus',
    internalName: 'R2510',
    modelName: 'K1510',
    managerAccount: 'hejing',
    status: '进行中',
    archived: false,
    salesability: '可销售',
    unsellableReason: '',
    description: '已完成设计测试并进入客户推广的移动 POS。',
    members: [
      { userAccount: 'hejing', role: '硬件项目经理' },
      { userAccount: 'wuyue', role: '销售' },
    ],
    stages: [
      { name: '硬件设计', assignees: [{ type: 'department', name: '硬件部' }], status: '已完成' },
      { name: '软件适配', assignees: [{ type: 'department', name: '软件部' }], status: '已完成' },
      { name: '测试生产', assignees: [{ type: 'department', name: '测试部' }], status: '已完成' },
      { name: '客户推广', assignees: [{ type: 'department', name: '销售部' }], status: '进行中' },
    ],
    projectCustomers: [],
    projectMaterials: [],
  },
];

const templates = [
  {
    name: '标准 POS 产品流程',
    scope: '通用',
    status: '启用',
    updatedAt: '2026-05-15',
    stages: ['提出想法', '讨论可行性', '核算成本', '硬件设计', '软件适配', '测试生产', '试用', '客户推广'],
  },
  {
    name: '海外定制产品流程',
    scope: '海外项目',
    status: '草稿',
    updatedAt: '2026-05-15',
    stages: ['提出想法', '讨论可行性', '硬件设计', '软件适配', '客户调试', '客户下单'],
  },
];

const resourceData = {
  users: [
    { name: '张敏', account: 'zhangmin', departments: ['产品部', '运营部'], globalRoles: ['系统管理员'], directPermissions: ['button:customer-statuses:toggle'], status: '启用' },
    { name: '王伟', account: 'wangwei', departments: ['硬件部', '产品部'], globalRoles: ['普通员工'], directPermissions: [], status: '启用' },
    { name: '李娜', account: 'lina', departments: ['软件部'], globalRoles: ['普通员工'], directPermissions: [], status: '启用' },
    { name: '陈晨', account: 'chenchen', departments: ['技术支持部'], globalRoles: ['普通员工'], directPermissions: ['button:customers:create', 'button:customers:edit'], status: '停用' },
    { name: '赵磊', account: 'zhaolei', departments: ['销售部'], globalRoles: ['普通员工'], directPermissions: [], status: '启用' },
    { name: '高静', account: 'gaojing', departments: ['销售部'], globalRoles: ['普通员工'], directPermissions: [], status: '启用' },
    { name: '周航', account: 'zhouhang', departments: ['硬件部'], globalRoles: ['普通员工'], directPermissions: [], status: '启用' },
    { name: '孙倩', account: 'sunqian', departments: ['软件部'], globalRoles: ['普通员工'], directPermissions: [], status: '启用' },
    { name: '刘洋', account: 'liuyang', departments: ['硬件部'], globalRoles: ['普通员工'], directPermissions: [], status: '启用' },
    { name: '何静', account: 'hejing', departments: ['硬件部'], globalRoles: ['普通员工'], directPermissions: [], status: '启用' },
    { name: '吴越', account: 'wuyue', departments: ['销售部'], globalRoles: ['普通员工'], directPermissions: [], status: '启用' },
  ],
  departments: [
    { name: '产品部', parent: '-' },
    { name: '硬件部', parent: '-' },
    { name: '软件部', parent: '-' },
    { name: '技术支持部', parent: '-' },
    { name: '销售部', parent: '-' },
    { name: '运营部', parent: '-' },
    { name: '测试部', parent: '-' },
    { name: '车间', parent: '-' },
  ],
  roles: [
    { name: '系统管理员', type: '全局角色', permissions: ['menu:dashboard', 'menu:templates', 'menu:resources', 'menu:orders', 'menu:analytics', 'button:templates:create', 'button:templates:edit', 'button:templates:copy', 'button:templates:toggle', 'button:orders:create', 'button:orders:edit', 'button:orders:delete', 'button:task-statuses:create', 'button:task-statuses:edit', 'button:task-statuses:toggle', 'button:task-statuses:delete', 'button:task-statuses:add-transition', 'button:task-statuses:delete-transition'], status: '启用' },
    { name: '普通员工', type: '全局角色', permissions: ['menu:dashboard'], status: '启用' },
    { name: '项目负责人', type: '项目内角色', permissions: ['menu:projects', 'menu:tasks', 'button:projects:create', 'button:projects:edit', 'button:tasks:create'], status: '启用' },
    { name: '硬件项目经理', type: '项目内角色', permissions: ['menu:projects', 'menu:tasks', 'button:projects:create', 'button:projects:edit', 'button:tasks:create'], status: '启用' },
    { name: '软件项目经理', type: '项目内角色', permissions: ['menu:projects', 'menu:tasks', 'button:projects:create', 'button:projects:edit', 'button:tasks:create'], status: '启用' },
    { name: '技术支持', type: '项目内角色', permissions: ['menu:projects', 'menu:tasks', 'button:tasks:create'], status: '启用' },
    { name: '销售', type: '项目内角色', permissions: ['menu:projects', 'menu:tasks', 'button:tasks:create'], status: '启用' },
  ],
};

const buttonPermissionRegistry = [
  { key: 'button:dashboard:view-all', name: '工作台 / 查看全部', target: '查看全部', location: '工作台' },
  { key: 'button:projects:create', name: '项目管理 / 新建项目', target: '新建项目', location: '项目管理' },
  { key: 'button:projects:view-detail', name: '项目管理 / 查看详情', target: '查看详情', location: '项目管理' },
  { key: 'button:projects:edit', name: '项目管理 / 编辑', target: '编辑', location: '项目管理' },
  { key: 'button:projects:archive', name: '项目管理 / 归档或恢复', target: '归档 / 恢复', location: '项目管理' },
  { key: 'button:project-detail:edit', name: '项目详情 / 编辑项目', target: '编辑项目', location: '项目详情' },
  { key: 'button:project-detail:archive', name: '项目详情 / 归档项目', target: '归档项目', location: '项目详情' },
  { key: 'button:project-detail:stage-detail', name: '项目详情 / 阶段查看详情', target: '查看详情', location: '项目详情' },
  { key: 'button:project-detail:customers-entry', name: '项目详情 / 客户列表入口', target: '进入', location: '项目详情' },
  { key: 'button:project-detail:materials-entry', name: '项目详情 / 项目资料区入口', target: '进入', location: '项目详情' },
  { key: 'button:project-detail:requirement-overview-entry', name: '项目详情 / 需求纵览入口', target: '进入', location: '项目详情' },
  { key: 'button:project-edit:save', name: '项目编辑 / 保存项目', target: '保存项目', location: '项目编辑' },
  { key: 'button:tasks:create', name: '任务管理 / 新建任务', target: '新建任务', location: '任务管理' },
  { key: 'button:tasks:save', name: '任务管理 / 保存任务', target: '保存任务', location: '任务管理' },
  { key: 'button:task-detail:save', name: '任务详情 / 保存修改', target: '保存修改', location: '任务详情' },
  { key: 'button:task-detail:publish-comment', name: '任务详情 / 发布留言', target: '发布留言', location: '任务详情' },
  { key: 'button:stage-detail:create-task', name: '阶段详情 / 从该阶段新建任务', target: '从该阶段新建任务', location: '阶段详情' },
  { key: 'button:stage-detail:blocker-help', name: '阶段详情 / 卡点求助', target: '卡点求助', location: '阶段详情' },
  { key: 'button:stage-detail:create-blocker-task', name: '阶段详情 / 创建卡点任务', target: '创建卡点任务', location: '阶段详情' },
  { key: 'button:stage-detail:publish-file', name: '阶段详情 / 发布到项目资料区', target: '发布到项目资料区', location: '阶段详情' },
  { key: 'button:stage-detail:publish-record', name: '阶段详情 / 发布记录', target: '发布记录', location: '阶段详情' },
  { key: 'button:project-customers:link', name: '项目客户 / 关联已有客户', target: '关联已有客户', location: '项目客户' },
  { key: 'button:project-customers:save-link', name: '项目客户 / 保存关联', target: '保存关联', location: '项目客户' },
  { key: 'button:project-customers:requirements', name: '项目客户 / 需求列表', target: '需求列表', location: '项目客户' },
  { key: 'button:requirements:create', name: '客户需求 / 新增需求', target: '新增需求', location: '客户需求' },
  { key: 'button:requirements:save', name: '客户需求 / 保存需求', target: '保存需求', location: '客户需求' },
  { key: 'button:requirements:void', name: '客户需求 / 作废需求', target: '作废需求', location: '客户需求' },
  { key: 'button:requirements:delete', name: '客户需求 / 删除需求', target: '删除需求', location: '客户需求' },
  { key: 'button:templates:create', name: '流程模板 / 新建模板', target: '新建模板', location: '流程模板' },
  { key: 'button:templates:copy', name: '流程模板 / 复制模板', target: '复制模板', location: '流程模板' },
  { key: 'button:templates:edit', name: '流程模板 / 编辑模板', target: '编辑模板', location: '流程模板' },
  { key: 'button:templates:toggle', name: '流程模板 / 启用或停用', target: '启用 / 停用', location: '流程模板' },
  { key: 'button:templates:delete', name: '流程模板 / 删除模板', target: '删除', location: '流程模板' },
  { key: 'button:templates:add-stage', name: '流程模板 / 新增阶段', target: '新增阶段', location: '流程模板' },
  { key: 'button:templates:move-stage-up', name: '流程模板 / 阶段上移', target: '上移', location: '流程模板' },
  { key: 'button:templates:move-stage-down', name: '流程模板 / 阶段下移', target: '下移', location: '流程模板' },
  { key: 'button:templates:save', name: '流程模板 / 保存模板', target: '保存模板', location: '流程模板' },
  { key: 'button:users:create', name: '用户管理 / 新增', target: '新增', location: '用户管理' },
  { key: 'button:users:edit', name: '用户管理 / 编辑', target: '编辑', location: '用户管理' },
  { key: 'button:users:toggle', name: '用户管理 / 启用或停用', target: '启用 / 停用', location: '用户管理' },
  { key: 'button:departments:create', name: '部门管理 / 新增', target: '新增', location: '部门管理' },
  { key: 'button:departments:edit', name: '部门管理 / 编辑', target: '编辑', location: '部门管理' },
  { key: 'button:departments:delete', name: '部门管理 / 删除', target: '删除', location: '部门管理' },
  { key: 'button:roles:create', name: '角色管理 / 新增', target: '新增', location: '角色管理' },
  { key: 'button:roles:edit', name: '角色管理 / 编辑', target: '编辑', location: '角色管理' },
  { key: 'button:roles:delete', name: '角色管理 / 删除', target: '删除', location: '角色管理' },
  { key: 'button:customers:create', name: '客户管理 / 新增', target: '新增', location: '客户管理' },
  { key: 'button:customers:edit', name: '客户管理 / 编辑', target: '编辑', location: '客户管理' },
  { key: 'button:customers:delete', name: '客户管理 / 删除', target: '删除', location: '客户管理' },
  { key: 'button:customer-statuses:create', name: '客户状态配置 / 新增', target: '新增', location: '客户状态配置' },
  { key: 'button:customer-statuses:edit', name: '客户状态配置 / 编辑', target: '编辑', location: '客户状态配置' },
  { key: 'button:customer-statuses:toggle', name: '客户状态配置 / 启用或停用', target: '启用 / 停用', location: '客户状态配置' },
  { key: 'button:customer-statuses:delete', name: '客户状态配置 / 删除', target: '删除', location: '客户状态配置' },
  { key: 'button:task-statuses:create', name: '任务状态配置 / 新增状态', target: '新增状态', location: '任务状态配置' },
  { key: 'button:task-statuses:edit', name: '任务状态配置 / 编辑状态', target: '编辑状态', location: '任务状态配置' },
  { key: 'button:task-statuses:toggle', name: '任务状态配置 / 启用或停用', target: '启用 / 停用', location: '任务状态配置' },
  { key: 'button:task-statuses:delete', name: '任务状态配置 / 删除状态', target: '删除状态', location: '任务状态配置' },
  { key: 'button:task-statuses:add-transition', name: '任务状态配置 / 新增流转', target: '新增流转', location: '任务状态配置' },
  { key: 'button:task-statuses:delete-transition', name: '任务状态配置 / 删除流转', target: '删除流转', location: '任务状态配置' },
  { key: 'button:orders:create', name: '订单管理 / 新增订单', target: '新增订单', location: '订单管理' },
  { key: 'button:orders:edit', name: '订单管理 / 编辑订单', target: '编辑订单', location: '订单管理' },
  { key: 'button:orders:delete', name: '订单管理 / 删除订单', target: '删除订单', location: '订单管理' },
  { key: 'button:orders:view-history', name: '订单管理 / 查看修改记录', target: '查看修改记录', location: '订单管理' },
];

const customers = [
  {
    name: 'Nova Retail',
    shortName: 'Nova',
    region: '德国',
    salesOwners: ['赵磊'],
    supportOwners: ['陈晨'],
    status: '合作中',
  },
  {
    name: 'Siam Pay',
    shortName: 'Siam',
    region: '泰国',
    salesOwners: ['高静'],
    supportOwners: ['陈晨'],
    status: '潜在客户',
  },
  {
    name: 'Andes Market',
    shortName: 'Andes',
    region: '智利',
    salesOwners: ['赵磊'],
    supportOwners: ['陈晨'],
    status: '已停用',
  },
];

const customerProjectStatusOptions = [
  { name: '推广阶段', active: true },
  { name: '客户调试阶段', active: true },
  { name: '试用阶段', active: true },
  { name: '客户下单阶段', active: true },
  { name: '稳定出货阶段', active: true },
];

const taskStatusOptions = [
  { name: '待处理', active: true, semantic: '普通' },
  { name: '进行中', active: true, semantic: '普通' },
  { name: '已完成', active: true, semantic: '完成' },
  { name: '已拒绝', active: true, semantic: '拒绝' },
];

const taskStatusTransitions = [
  { from: '待处理', to: '进行中' },
  { from: '待处理', to: '已拒绝' },
  { from: '进行中', to: '已完成' },
  { from: '进行中', to: '已拒绝' },
  { from: '已拒绝', to: '进行中' },
];

const orders = [
  {
    id: 'ORD-202605-001',
    orderDate: '2026-05-02',
    customerName: 'Nova Retail',
    projectName: 'M5 Plus',
    quantity: 180,
    specification: '4GB + 64GB / 欧规充电器 / 黑色',
    expectedShipDate: '2026-06-05',
    plannedShipDate: '2026-06-03',
    softwareVersion: 'v3.2.1',
    currency: 'USD',
    unitPrice: 168,
    amount: 30240,
    creator: '赵磊',
    histories: [
      { modifier: '张敏', modifiedAt: '2026-05-06 14:20', changes: '计划发货日期：2026-06-01 → 2026-06-03', reason: '客户要求与门店开业时间对齐' },
    ],
  },
  {
    id: 'ORD-202604-008',
    orderDate: '2026-04-18',
    customerName: 'Siam Pay',
    projectName: 'P8 dual',
    quantity: 120,
    specification: '双屏 / 泰语键盘膜 / 银色',
    expectedShipDate: '2026-05-28',
    plannedShipDate: '2026-05-30',
    softwareVersion: 'v2.8.0-beta',
    currency: 'USD',
    unitPrice: 236,
    amount: 28320,
    creator: '高静',
    histories: [],
  },
  {
    id: 'ORD-202503-014',
    orderDate: '2025-03-12',
    customerName: 'Nova Retail',
    projectName: 'X10 Pro',
    quantity: 60,
    specification: '桌面旗舰版 / NFC / 德语包',
    expectedShipDate: '2025-04-10',
    plannedShipDate: '2025-04-08',
    softwareVersion: 'v5.1.4',
    currency: 'EUR',
    unitPrice: 320,
    amount: 19200,
    creator: '赵磊',
    histories: [],
  },
];

const tasks = [
  {
    id: 'KPM-101',
    title: '确认支付模块语言包',
    description: '核对中英文语言包与收据模板，确认海外版本可正常展示。',
    project: 'P8 dual',
    stage: '软件适配',
    category: '需求',
    status: '进行中',
    priority: '高',
    creator: '张敏',
    assignees: ['李娜'],
    participants: ['王伟'],
    expectedCompletionAt: '2026-05-20',
    dueDate: '2026-05-20',
    source: '阶段详情',
    customerName: 'Nova Retail',
    attachments: [
      { name: '支付语言包说明.pdf', type: 'PDF', size: '860 KB', uploader: '李娜', time: '2026-05-16 10:20' },
    ],
    comments: [
      { author: '李娜', time: '2026-05-17 09:10', text: '英语文案已确认，今天补齐德国版特殊字段。', attachments: [] },
    ],
  },
  {
    id: 'KPM-102',
    title: '整理客户推广演示脚本',
    description: '整理销售与技术支持联合演示时使用的讲解脚本。',
    project: 'P8 dual',
    stage: '客户推广',
    category: '技术支持',
    status: '待处理',
    priority: '中',
    creator: '张敏',
    assignees: ['陈晨'],
    participants: ['王伟', '赵磊'],
    expectedCompletionAt: '2026-05-24',
    dueDate: '2026-05-24',
    source: '任务管理',
    customerName: 'Nova Retail',
    attachments: [],
    comments: [],
  },
  {
    id: 'KPM-103',
    title: '确认试产测试清单',
    description: '确认试产前的硬件、软件与车间检查项。',
    project: 'S6 mini',
    stage: '测试生产',
    category: '其他',
    status: '已完成',
    priority: '高',
    creator: '周航',
    assignees: ['周航'],
    participants: [],
    expectedCompletionAt: '2026-05-10',
    dueDate: '2026-05-10',
    source: '任务管理',
    customerName: 'Nova Retail',
    attachments: [],
    comments: [],
  },
];

const currentUser = '张敏';
const prototypeToday = '2026-05-18';
const taskCategoryOptions = ['需求', 'Bug', '技术支持', '其他'];

const views = document.querySelectorAll('.view');
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');
const projectTable = document.getElementById('project-table');
const myProjects = document.getElementById('my-projects');
const projectDetail = document.getElementById('project-detail');
const projectEdit = document.getElementById('project-edit');
const stageDetail = document.getElementById('stage-detail');
const customerPlaceholder = document.getElementById('customer-placeholder');
const projectMaterials = document.getElementById('project-materials');
const languageToggle = document.getElementById('language-toggle');
const templateList = document.getElementById('template-list');
const templateSearch = document.getElementById('template-search');
const templateStatusFilter = document.getElementById('template-status-filter');
const resourceContent = document.getElementById('resource-content');
const projectSearch = document.getElementById('project-search');
const salesabilityFilter = document.getElementById('salesability-filter');
const archiveFilter = document.getElementById('archive-filter');
const customerRequirements = document.getElementById('customer-requirements');
const requirementOverview = document.getElementById('requirement-overview');
const wizardContent = document.getElementById('wizard-content');
const taskManagement = document.getElementById('task-management');
const taskDetail = document.getElementById('task-detail');
const orderManagement = document.getElementById('order-management');
const analyticsContent = document.getElementById('analytics-content');
const loginScreen = document.getElementById('login-screen');
const appShell = document.getElementById('app-shell');
const loginForm = document.getElementById('login-form');
const loginAccount = document.getElementById('login-account');
const loginPassword = document.getElementById('login-password');
const loginError = document.getElementById('login-error');
const userMenuTrigger = document.getElementById('user-menu-trigger');
const userDropdown = document.getElementById('user-dropdown');

let selectedProjectId = 'p8-dual';
let selectedStageIndex = 4;
let selectedCustomerIndex = 0;
let selectedTaskId = 'KPM-101';
let wizardStep = 1;
let selectedResourceTab = 'users';
let projectCustomerFormOpen = false;
let taskFormOpen = false;
let requirementFormOpen = false;
let blockerHelpFormOpen = false;
let stageTaskFormOpen = false;
let memberModalOpen = false;
let taskDetailReturnView = 'tasks';
let resourceFormOpen = false;
let resourceEditIndex = null;
let resourceSearchKeyword = '';
let permissionTypeFilter = '全部类型';
let editingProjectId = null;
let selectedTemplateIndex = 0;
let projectWizardDraft = null;
let templateFormOpen = false;
let templateEditIndex = null;
let templateDraftStages = [];
let templateDraftMeta = { name: '', scope: '', status: '草稿' };
let templateSearchKeyword = '';
let templateStatusKeyword = '全部状态';
let taskTransitionFormOpen = false;
let orderFormOpen = false;
let orderEditIndex = null;
let orderHistoryModalOpen = false;
let selectedOrderId = null;
let analyticsTab = 'orders';
let analyticsOrderPeriod = '年度';
let analyticsYear = '2026';
let analyticsQuarter = 'Q2';
let analyticsMonth = '05';
let analyticsProjectFilter = [];
let selectedSupportCustomer = 'Nova Retail';
let supportTaskModalId = null;
let mapDragState = null;
let mapOffset = { x: 0, y: 0 };
let taskFormState = {
  project: projects[0].externalName,
  stage: projects[0].stages[0].name,
  category: '其他',
  source: '任务管理',
};

const titles = {
  dashboard: ['工作台', '查看你参与的项目和当前进度'],
  projects: ['项目管理', '统一查看产品型号、阶段和负责人'],
  tasks: ['任务管理', '管理来自任务页或阶段详情的执行任务'],
  orders: ['订单管理', '维护客户订单、交付计划和修改记录'],
  analytics: ['统计看板', '按订单、资源和技术支持维度查看经营情况'],
  'task-detail': ['任务详情', '编辑任务信息、查看关联对象并围绕问题协作'],
  'project-detail': ['项目详情', '查看完整流程、责任人和阶段状态'],
  'project-edit': ['编辑项目', '维护项目基础信息与销售状态'],
  'stage-detail': ['阶段详情', '沉淀阶段资料与按时间排序的协作记录'],
  customers: ['客户列表', '维护当前项目下每个客户的独立状态'],
  materials: ['项目资料区', '查看从各阶段显式共享出来的可信资料'],
  requirements: ['客户需求列表', '维护单个客户在当前项目下的需求记录'],
  'requirement-overview': ['需求纵览', '查看并提炼多个客户的通用需求'],
  'create-project': ['新建项目', '通过四步完成项目初始化'],
  templates: ['流程模板', '维护可复用的产品生命周期流程'],
  resources: ['资源管理', '维护用户、部门、角色、权限和客户基础资料'],
};

function showView(viewName) {
  views.forEach((view) => view.classList.toggle('active', view.id === `${viewName}-view`));
  navItems.forEach((item) => item.classList.toggle('active', item.dataset.view === viewName));
  const [title, subtitle] = titles[viewName];
  pageTitle.textContent = title;
  pageSubtitle.textContent = subtitle;
}

function badgeClass(status) {
  if (status === '已完成') return 'done';
  if (status === '进行中') return 'progress';
  return 'pending';
}

function requirementBadgeClass(status) {
  if (status === '已采纳' || status === '已实现') return 'done';
  if (status === '实现中') return 'progress';
  if (status === '已作废' || status === '已拒绝') return 'invalid';
  return 'pending';
}

function taskBadgeClass(status) {
  const semantic = taskStatusSemantic(status);
  if (semantic === '完成') return 'done';
  if (status === '进行中') return 'progress';
  if (semantic === '拒绝') return 'invalid';
  return 'pending';
}

function normalizePersonList(values = []) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function taskAssigneeNames(task) {
  return task.assignees?.length ? task.assignees : task.assignee ? [task.assignee] : [];
}

function taskPersonLabel(values, fallback = '-') {
  return values?.length ? values.join('、') : fallback;
}

function activeTaskStatusNames() {
  return taskStatusOptions.filter((status) => status.active).map((status) => status.name);
}

function taskStatusSemantic(statusName) {
  return taskStatusOptions.find((status) => status.name === statusName)?.semantic || '普通';
}

function allowedNextTaskStatuses(statusName) {
  return taskStatusTransitions
    .filter((transition) => transition.from === statusName)
    .map((transition) => transition.to)
    .filter((name) => taskStatusOptions.some((status) => status.name === name && status.active));
}

function availableTaskDetailStatuses(task) {
  return [...new Set([task.status, ...allowedNextTaskStatuses(task.status)])];
}

function userDisplayNames() {
  return resourceData.users.map((user) => user.name);
}

function customerByName(name) {
  return customers.find((customer) => customer.name === name);
}

function customerSalesOwners(customerName) {
  return customerByName(customerName)?.salesOwners || [];
}

function customerSupportOwners(customerName) {
  return customerByName(customerName)?.supportOwners || [];
}

function salesUsers() {
  return resourceData.users.filter((user) => user.departments.includes('销售部'));
}

function supportUsers() {
  return resourceData.users.filter((user) => user.departments.includes('技术支持部'));
}

function searchablePeopleInput(id, selectedPeople = [], placeholder = '搜索姓名，多个用逗号分隔') {
  return `
    <input id="${id}" class="text-input" list="${id}-options" value="${selectedPeople.join('、')}" placeholder="${placeholder}" />
    ${renderUserDatalist(`${id}-options`)}
  `;
}

function collectPeopleInputValue(id) {
  return normalizePersonList((document.getElementById(id)?.value || '').split(/[、,，]/));
}

function renderUserDatalist(id) {
  return `
    <datalist id="${id}">
      ${userDisplayNames().map((name) => `<option value="${name}"></option>`).join('')}
    </datalist>
  `;
}

function buttonPermissionCatalog() {
  return buttonPermissionRegistry.map((permission) => ({
    ...permission,
    type: '按钮权限',
  }));
}

function menuPermissionCatalog() {
  return [...navItems].map((item) => ({
    key: `menu:${item.dataset.view}`,
    name: `菜单 / ${item.textContent.trim()}`,
    type: '菜单权限',
    target: item.textContent.trim(),
    location: '左侧主菜单',
  }));
}

function systemPermissionCatalog() {
  return [...menuPermissionCatalog(), ...buttonPermissionCatalog()];
}

function permissionByKey(permissionKey) {
  return systemPermissionCatalog().find((permission) => permission.key === permissionKey);
}

function permissionDisplayName(permissionKey) {
  return permissionByKey(permissionKey)?.name || permissionKey;
}

function userByAccount(account) {
  return resourceData.users.find((user) => user.account === account);
}

function userName(account) {
  return userByAccount(account)?.name || '待分配';
}

function userDepartmentLabel(account) {
  return joinValues(userByAccount(account)?.departments || []);
}

function projectManagerName(project) {
  return userName(project.managerAccount);
}

function projectRoleOptions() {
  return resourceData.roles.filter((role) => role.type === '项目内角色' && role.status === '启用');
}

function defaultProjectMemberRole() {
  return projectRoleOptions().find((role) => role.name === '项目负责人')?.name || projectRoleOptions()[0]?.name || '待分配';
}

function ensureManagerMembership(members, managerAccount) {
  if (!managerAccount || members.some((member) => member.userAccount === managerAccount)) return members;
  return [...members, { userAccount: managerAccount, role: defaultProjectMemberRole() }];
}

function projectMemberUser(member) {
  return userByAccount(member.userAccount);
}

function assigneeLabel(assignee) {
  return assignee.type === 'user' ? userName(assignee.account) : assignee.name;
}

function stageOwnerLabel(stage) {
  return joinValues((stage.assignees || []).map(assigneeLabel), '待配置');
}

function stagePrimaryOwner(stage) {
  const userAssignee = (stage.assignees || []).find((assignee) => assignee.type === 'user');
  return assigneeLabel(userAssignee || stage.assignees?.[0] || { type: 'department', name: '待配置' });
}

function stageResponsibleUserNames(stage) {
  return normalizePersonList(
    (stage.assignees || [])
      .filter((assignee) => assignee.type === 'user')
      .map((assignee) => userName(assignee.account)),
  );
}

function fileTypeLabel(file) {
  if (file.type.startsWith('image/')) return '图片';
  if (file.type.startsWith('video/')) return '视频';
  return '文件';
}

function nextTaskId() {
  const maxTaskNumber = tasks.reduce((max, task) => {
    const current = Number(task.id.split('-')[1]);
    return Number.isNaN(current) ? max : Math.max(max, current);
  }, 100);
  return `KPM-${maxTaskNumber + 1}`;
}

function nextOrderId() {
  const currentMonth = prototypeToday.slice(0, 7).replace('-', '');
  const maxOrderNumber = orders
    .filter((order) => order.id.includes(currentMonth))
    .reduce((max, order) => {
      const current = Number(order.id.split('-').at(-1));
      return Number.isNaN(current) ? max : Math.max(max, current);
    }, 0);
  return `ORD-${currentMonth}-${String(maxOrderNumber + 1).padStart(3, '0')}`;
}

function nextRequirementId() {
  const maxRequirementNumber = projects
    .flatMap((project) => project.projectCustomers)
    .flatMap((customer) => customer.requirements)
    .reduce((max, requirement) => {
      const current = Number(requirement.id?.split('-')[1]);
      return Number.isNaN(current) ? max : Math.max(max, current);
    }, 0);
  return `REQ-${String(maxRequirementNumber + 1).padStart(3, '0')}`;
}

function findRequirementById(requirementId) {
  for (const project of projects) {
    for (let customerIndex = 0; customerIndex < project.projectCustomers.length; customerIndex += 1) {
      const customer = project.projectCustomers[customerIndex];
      const requirementIndex = customer.requirements.findIndex((requirement) => requirement.id === requirementId);
      if (requirementIndex >= 0) {
        return {
          project,
          customer,
          customerIndex,
          requirement: customer.requirements[requirementIndex],
          requirementIndex,
        };
      }
    }
  }
  return null;
}

function findRequirementByTaskId(taskId) {
  for (const project of projects) {
    for (let customerIndex = 0; customerIndex < project.projectCustomers.length; customerIndex += 1) {
      const customer = project.projectCustomers[customerIndex];
      const requirementIndex = customer.requirements.findIndex((requirement) => requirement.taskId === taskId);
      if (requirementIndex >= 0) {
        return {
          project,
          customer,
          customerIndex,
          requirement: customer.requirements[requirementIndex],
          requirementIndex,
        };
      }
    }
  }
  return null;
}

function syncRequirementStatusFromTask(task) {
  const linked = findRequirementByTaskId(task.id);
  if (!linked) return;
  if (taskStatusSemantic(task.status) === '完成') linked.requirement.status = '已实现';
  if (taskStatusSemantic(task.status) === '拒绝') linked.requirement.status = '已拒绝';
  if (taskStatusSemantic(task.status) === '普通') linked.requirement.status = '实现中';
}

function resetTaskFormState() {
  taskFormState = {
    project: projects[0].externalName,
    stage: projects[0].stages[0].name,
    category: '其他',
    source: '任务管理',
  };
}

function activeCustomerProjectStatuses() {
  return customerProjectStatusOptions.filter((status) => status.active).map((status) => status.name);
}

function ensureStageCollaborationData() {
  projects.forEach((project) => {
    project.stages.forEach((stage) => {
      if (!stage.files) stage.files = [];
      if (!stage.messages) stage.messages = [];
    });
  });

  const p8 = projects.find((project) => project.id === 'p8-dual');
  if (p8) {
    p8.stages[4].files = [
      { name: '软件适配方案_v3.pdf', type: 'PDF', size: '2.4 MB', uploader: '李娜', time: '2026-05-13 10:20' },
      { name: '固件演示.mp4', type: '视频', size: '38 MB', uploader: '李娜', time: '2026-05-12 16:40' },
      { name: '屏幕布局.png', type: '图片', size: '1.2 MB', uploader: '陈晨', time: '2026-05-11 09:15' },
    ];
    p8.stages[4].messages = [
      {
        author: '李娜',
        time: '2026-05-14 17:30',
        text: '已完成支付模块适配，等待硬件版本 B 的最终确认。',
        attachments: [{ name: 'payment-adapter-log.txt', type: '文件' }],
      },
      {
        author: '陈晨',
        time: '2026-05-13 14:10',
        text: '补充海外客户演示视频，方便后续推广团队复用。',
        attachments: [{ name: 'demo-walkthrough.mp4', type: '视频' }],
      },
      {
        author: '李娜',
        time: '2026-05-12 09:05',
        text: '上传新版 UI 截图，供技术支持提前熟悉界面。',
        attachments: [{ name: 'ui-preview.png', type: '图片' }],
      },
    ];
  }
}

function ensureTaskCollaborationData() {
  tasks.forEach((task) => {
    task.description ||= '';
    task.creator ||= currentUser;
    task.assignees = normalizePersonList(task.assignees || (task.assignee ? [task.assignee] : []));
    task.participants = normalizePersonList(task.participants || []);
    task.expectedCompletionAt ||= task.dueDate || '-';
    task.attachments ||= [];
    task.comments ||= [];
  });
}

function ongoingStageNames(project) {
  return project.stages.filter((stage) => stage.status === '进行中').map((stage) => stage.name);
}

function nextProjectId(externalName) {
  const base = externalName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project';
  let candidate = base;
  let suffix = 2;
  while (projects.some((project) => project.id === candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

function renderDashboard() {
  myProjects.innerHTML = projects.filter((project) => !project.archived).slice(0, 2).map((project) => `
    <article class="project-card">
      <div>
        <h3>${project.externalName}</h3>
        <p>${project.internalName} / ${project.modelName}</p>
      </div>
      <div>
        <strong>${ongoingStageNames(project).join('、') || '暂无进行中阶段'}</strong>
        <p>进行中阶段</p>
      </div>
      <div>
        <strong>${projectManagerName(project)}</strong>
        <p>项目负责人</p>
      </div>
      <button class="ghost-btn" data-project-id="${project.id}">查看详情</button>
    </article>
  `).join('');
}

function renderProjectTable(filter = '') {
  const normalized = filter.trim().toLowerCase();
  const salesability = salesabilityFilter?.value || '全部销售状态';
  const archiveState = archiveFilter?.value || '全部归档状态';
  const rows = projects.filter((project) => {
    const matchesKeyword = [project.externalName, project.internalName, project.modelName]
      .some((value) => value.toLowerCase().includes(normalized));
    const matchesSalesability = salesability === '全部销售状态' || project.salesability === salesability;
    const matchesArchive = archiveState === '全部归档状态'
      || (archiveState === '未归档' && !project.archived)
      || (archiveState === '已归档' && project.archived);
    return matchesKeyword && matchesSalesability && matchesArchive;
  });

  projectTable.innerHTML = rows.map((project) => `
    <tr>
      <td>${project.externalName}</td>
      <td>${project.internalName}</td>
      <td>${project.modelName}</td>
      <td>${ongoingStageNames(project).map((name) => `<span class="badge progress">${name}</span>`).join(' ') || '<span class="badge pending">暂无进行中阶段</span>'}</td>
      <td>${projectManagerName(project)}</td>
      <td><span class="badge ${project.salesability === '可销售' ? 'done' : 'pending'}">${project.salesability}</span></td>
      <td>${project.status}</td>
      <td><span class="badge ${project.archived ? 'pending' : 'done'}">${project.archived ? '已归档' : '未归档'}</span></td>
      <td class="row-actions">
        <button class="ghost-btn" data-project-id="${project.id}">查看详情</button>
        <button class="ghost-btn" data-action="open-project-edit" data-project-id="${project.id}">编辑</button>
        <button class="${project.archived ? 'muted-btn' : 'danger-btn'}" data-action="toggle-project-archive" data-project-id="${project.id}">
          ${project.archived ? '恢复' : '归档'}
        </button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="9">暂无匹配项目</td></tr>';
}

function renderProjectDetail() {
  const project = projects.find((item) => item.id === selectedProjectId);
  const inProgress = ongoingStageNames(project);

  projectDetail.innerHTML = `
    <div class="detail-grid">
      <div class="detail-main">
        <section class="panel">
          <div class="detail-head">
            <div>
              <h2>${project.externalName}</h2>
              <p>${project.internalName} / ${project.modelName}</p>
            </div>
            <div class="inline-actions">
              <span class="badge ${project.status === '已完成' ? 'done' : 'progress'}">${project.status}</span>
              <span class="badge ${project.archived ? 'pending' : 'done'}">${project.archived ? '已归档' : '未归档'}</span>
              <button class="ghost-btn" data-action="open-project-edit" data-project-id="${project.id}">编辑项目</button>
              <button class="${project.archived ? 'muted-btn' : 'danger-btn'}" data-action="toggle-project-archive" data-project-id="${project.id}">
                ${project.archived ? '恢复项目' : '归档项目'}
              </button>
            </div>
          </div>
          <div class="project-meta">
            <div class="meta-item">
              <span>进行中阶段</span>
              <strong>${inProgress.join('、') || '暂无'}</strong>
            </div>
            <div class="meta-item">
              <span>项目负责人</span>
              <strong>${projectManagerName(project)}</strong>
            </div>
            <div class="meta-item">
              <span>阶段数量</span>
              <strong>${project.stages.length}</strong>
            </div>
            <div class="meta-item">
              <span>销售状态</span>
              <strong>${project.salesability}${project.salesability === '不可销售' ? ` · ${project.unsellableReason}` : ''}</strong>
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <div>
              <h2>阶段状态</h2>
              <p>阶段可并行进行，由对应负责人维护各自状态</p>
            </div>
          </div>
          <div class="timeline">
            ${project.stages.map((stage, index) => `
              <article class="stage-card">
                <div class="detail-head">
                  <div>
                    <h3>${stage.name}</h3>
                    <p>${stageOwnerLabel(stage)}</p>
                  </div>
                  <div class="stage-status-control">
                    <span class="badge ${badgeClass(stage.status)}">${stage.status}</span>
                    <select class="select-input compact" data-stage-index="${index}">
                      <option ${stage.status === '未开始' ? 'selected' : ''}>未开始</option>
                      <option ${stage.status === '进行中' ? 'selected' : ''}>进行中</option>
                      <option ${stage.status === '已完成' ? 'selected' : ''}>已完成</option>
                    </select>
                    <button class="ghost-btn compact-btn" data-action="open-stage-detail" data-stage-detail-index="${index}">查看详情</button>
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      </div>

      <div class="detail-side">
        <section class="info-card">
          <div class="panel-head compact-head">
            <div>
              <h3>项目成员</h3>
              <p>${project.members.length} 人</p>
            </div>
            <button class="ghost-btn" data-action="open-member-modal">查看 / 维护</button>
          </div>
          <p>成员较多时不在详情页直接铺开，避免页面失焦；点击人数后统一维护。</p>
        </section>

        <section class="info-card">
          <div class="panel-head compact-head">
            <div>
              <h3>客户列表</h3>
              <p>${project.projectCustomers.length} 个关联客户</p>
            </div>
            <button class="ghost-btn" data-action="open-customers">进入</button>
          </div>
          <p>查看当前项目关联的客户，以及每个客户在当前产品下的独立状态。</p>
        </section>

        <section class="info-card">
          <div class="panel-head compact-head">
            <div>
              <h3>项目资料区</h3>
              <p>${project.projectMaterials.length} 份共享资料</p>
            </div>
            <button class="ghost-btn" data-action="open-materials">进入</button>
          </div>
          <p>查看由阶段负责人显式发布、供后续阶段复用的资料。</p>
        </section>
        <section class="info-card">
          <div class="panel-head compact-head">
            <div>
              <h3>需求纵览</h3>
              <p>提炼客户共性需求</p>
            </div>
            <button class="ghost-btn" data-action="open-requirement-overview">进入</button>
          </div>
          <p>查看多个客户重复出现或可抽象为产品能力的通用需求。</p>
        </section>

        <section class="info-card">
          <h3>说明</h3>
          <p>${project.description}</p>
          <p>阶段资料默认继承阶段详情权限；需要跨阶段复用时，再显式发布到项目资料区。</p>
        </section>
      </div>
    </div>

    ${memberModalOpen ? `
      <div class="modal-backdrop">
        <section class="modal-card member-modal">
          <div class="panel-head">
            <div>
              <h2>${project.externalName} 项目成员</h2>
              <p>可新增、调整角色或移除成员；项目负责人会自动保留在成员中。</p>
            </div>
          </div>
          ${renderProjectMemberRows(project.members, 'data-member-modal-user', 'data-member-modal-role', project.managerAccount)}
          <div class="customer-form-actions">
            <button class="muted-btn" data-action="close-member-modal">取消</button>
            <button class="primary-btn" data-action="save-project-members-modal">保存成员</button>
          </div>
        </section>
      </div>
    ` : ''}
  `;
}

function renderProjectEdit() {
  const project = projects.find((item) => item.id === editingProjectId);

  projectEdit.innerHTML = `
    <div class="edit-project-stack">
      <section class="panel">
        <div class="panel-head">
          <div>
            <h2>编辑 ${project.externalName}</h2>
            <p>统一维护基础信息、项目成员和阶段负责人</p>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-field">
            <label>对外名称</label>
            <input id="edit-project-external-name" class="text-input" value="${project.externalName}" />
          </div>
          <div class="form-field">
            <label>内部名称</label>
            <input id="edit-project-internal-name" class="text-input" value="${project.internalName}" />
          </div>
          <div class="form-field">
            <label>Model 名称</label>
            <input id="edit-project-model-name" class="text-input" value="${project.modelName}" />
          </div>
          <div class="form-field">
            <label>项目负责人</label>
            <select id="edit-project-manager" class="select-input">
              ${resourceData.users.map((user) => `<option value="${user.account}" ${project.managerAccount === user.account ? 'selected' : ''}>${user.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>项目状态</label>
            <select id="edit-project-status" class="select-input">
              ${['进行中', '已完成'].map((status) => `<option ${project.status === status ? 'selected' : ''}>${status}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>销售状态</label>
            <select id="edit-project-salesability" class="select-input">
              ${['可销售', '不可销售'].map((status) => `<option ${project.salesability === status ? 'selected' : ''}>${status}</option>`).join('')}
            </select>
          </div>
          <div class="form-field full">
            <label>不可销售原因</label>
            <select id="edit-project-unsellable-reason" class="select-input">
              ${['仍处于设计或测试阶段', '产品过老，不再继续推广', '被遗弃的老项目'].map((reason) => `<option ${project.unsellableReason === reason ? 'selected' : ''}>${reason}</option>`).join('')}
            </select>
          </div>
          <div class="form-field full">
            <label>项目描述</label>
            <textarea id="edit-project-description" rows="4">${project.description}</textarea>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="section-intro">
          <h3>项目成员</h3>
          <p>成员引用真实用户，并在当前项目内分配项目角色；项目负责人会自动进入成员列表。</p>
        </div>
        ${renderProjectMemberRows(project.members, 'data-edit-member-user', 'data-edit-member-role', project.managerAccount)}
      </section>

      <section class="panel">
        <div class="section-intro">
          <h3>阶段负责人</h3>
          <p>阶段可绑定多个负责用户和部门，作为后续协作、卡点求助和资料权限的依据。</p>
        </div>
        <div class="stage-assignment-list">
          ${project.stages.map((stage, index) => renderStageAssigneeSelector(stage, index, stage.assignees, 'edit')).join('')}
        </div>
      </section>

      <div class="customer-form-actions">
        <button class="muted-btn" data-view="projects">取消</button>
        <button class="primary-btn" data-action="save-project-edit">保存项目</button>
      </div>
    </div>
  `;
}

function renderStageDetail() {
  const project = projects.find((item) => item.id === selectedProjectId);
  const stage = project.stages[selectedStageIndex];
  const sortedMessages = [...stage.messages].sort((a, b) => b.time.localeCompare(a.time));

  stageDetail.innerHTML = `
    <div class="stage-detail-grid">
      <div class="detail-main">
        <section class="panel">
          <div class="detail-head">
            <div>
              <h2>${stage.name}</h2>
              <p>${project.externalName} / ${stageOwnerLabel(stage)}</p>
            </div>
            <span class="badge ${badgeClass(stage.status)}">${stage.status}</span>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <div>
              <h2>阶段留言</h2>
              <p>阶段负责成员可记录文字、照片、视频或其他附件，按时间倒序展示</p>
            </div>
            <div class="inline-actions">
              <button class="ghost-btn" data-action="create-task-from-stage">从该阶段新建任务</button>
              <button class="primary-btn" data-action="open-blocker-help-modal">卡点求助</button>
            </div>
          </div>

          <div class="message-composer">
            <textarea id="stage-message-text" rows="4" placeholder="记录阶段进展、问题或补充说明"></textarea>
            <div class="message-actions">
              <label class="muted-btn file-label">
                选择附件
                <input id="stage-message-files" type="file" multiple />
              </label>
              <button class="primary-btn" data-action="publish-stage-message">发布记录</button>
            </div>
          </div>

          <div class="message-list">
            ${sortedMessages.map((message) => `
              <article class="message-card">
                <div class="detail-head">
                  <div>
                    <h3>${message.author}</h3>
                    <p>${message.time}</p>
                  </div>
                </div>
                <p>${message.text}</p>
                ${message.attachments.length ? `
                  <div class="attachment-list">
                    ${message.attachments.map((attachment) => `<span>${attachment.type} · ${attachment.name}</span>`).join('')}
                  </div>
                ` : ''}
              </article>
            `).join('')}
          </div>
        </section>
      </div>

      <div class="detail-side">
        <section class="info-card">
          <div class="panel-head compact-head">
            <div>
              <h3>阶段资料库</h3>
              <p>支持任意格式文件</p>
            </div>
          </div>

          <label class="primary-btn upload-label">
            上传文件
            <input id="stage-file-input" type="file" multiple />
          </label>

          <div class="file-list">
            ${stage.files.map((file) => `
              <div class="file-row">
                <div>
                  <strong>${file.name}</strong>
                  <small>${file.type} · ${file.size} · ${file.uploader} · ${file.time}</small>
                </div>
                <div class="file-actions">
                  <button class="ghost-btn">下载</button>
                  <button class="ghost-btn" data-action="publish-stage-file" data-file-name="${file.name}">发布到项目资料区</button>
                </div>
              </div>
            `).join('') || '<p class="empty-note">暂无阶段文件</p>'}
          </div>
        </section>
      </div>
    </div>

    ${stageTaskFormOpen ? `
      <div class="modal-backdrop">
        <section class="modal-card">
          <div class="panel-head">
            <div>
              <h2>从 ${stage.name} 新建任务</h2>
              <p>保留当前项目和阶段上下文，不跳出阶段详情。</p>
            </div>
          </div>
          <div class="form-grid">
            <div class="form-field full">
              <label>任务标题</label>
              <input id="stage-task-title" class="text-input" placeholder="例如 补充客户推广演示素材" />
            </div>
            <div class="form-field full">
              <label>任务描述</label>
              <textarea id="stage-task-description" rows="4" placeholder="说明任务背景、目标和交付标准"></textarea>
            </div>
            <div class="form-field">
              <label>任务分类</label>
              <select id="stage-task-category" class="select-input">
                ${taskCategoryOptions.map((category) => `<option ${category === '其他' ? 'selected' : ''}>${category}</option>`).join('')}
              </select>
            </div>
            <div class="form-field">
              <label>优先级</label>
              <select id="stage-task-priority" class="select-input">
                <option>中</option>
                <option>高</option>
                <option>低</option>
              </select>
            </div>
            <div class="form-field">
              <label>执行者</label>
              ${searchablePeopleInput('stage-task-assignees', stageResponsibleUserNames(stage), '搜索姓名，支持多人')}
            </div>
            <div class="form-field">
              <label>参与者</label>
              ${searchablePeopleInput('stage-task-participants', [], '搜索姓名，支持多人')}
            </div>
            <div class="form-field">
              <label>预期完成时间</label>
              <input id="stage-task-expected-completion-at" class="text-input" type="date" value="2026-05-30" />
            </div>
          </div>
          <div class="customer-form-actions">
            <button class="muted-btn" data-action="close-stage-task-modal">取消</button>
            <button class="primary-btn" data-action="save-stage-task">创建任务</button>
          </div>
        </section>
      </div>
    ` : ''}

    ${blockerHelpFormOpen ? `
      <div class="modal-backdrop">
        <section class="modal-card">
          <div class="panel-head">
            <div>
              <h2>新增卡点求助任务</h2>
              <p>任务将自动流转给阶段负责人，并把项目负责人加入参与者</p>
            </div>
          </div>
          <div class="form-grid">
            <div class="form-field full">
              <label>卡点标题</label>
              <input id="blocker-task-title" class="text-input" placeholder="例如 等待硬件版本 B 最终确认" />
            </div>
            <div class="form-field full">
              <label>问题描述</label>
              <textarea id="blocker-task-description" rows="4" placeholder="说明卡住的原因、需要谁协助、希望何时解决"></textarea>
            </div>
            <div class="form-field">
              <label>优先级</label>
              <select id="blocker-task-priority" class="select-input">
                <option>高</option>
                <option>中</option>
                <option>低</option>
              </select>
            </div>
            <div class="form-field">
              <label>任务分类</label>
              <select id="blocker-task-category" class="select-input">
                ${taskCategoryOptions.map((category) => `<option ${category === '其他' ? 'selected' : ''}>${category}</option>`).join('')}
              </select>
            </div>
            <div class="form-field">
              <label>预期完成时间</label>
              <input id="blocker-task-due-date" class="text-input" type="date" value="2026-05-22" />
            </div>
          </div>
          <div class="helper-strip">
            <span>负责人：${stagePrimaryOwner(stage)}</span>
            <span>参与者：${projectManagerName(project)}</span>
          </div>
          <div class="customer-form-actions">
            <button class="muted-btn" data-action="close-blocker-help-modal">取消</button>
            <button class="primary-btn" data-action="save-blocker-help-task">创建卡点任务</button>
          </div>
        </section>
      </div>
    ` : ''}
  `;
}

function renderProjectCustomers() {
  const project = projects.find((item) => item.id === selectedProjectId);
  const availableCustomers = customers.filter(
    (customer) => !project.projectCustomers.some((item) => item.customerName === customer.name),
  );

  customerPlaceholder.innerHTML = `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>${project.externalName} 的客户列表</h2>
          <p>维护客户与当前项目的关联关系，以及客户在当前产品下的状态</p>
        </div>
        <button class="primary-btn" data-action="toggle-project-customer-form">${projectCustomerFormOpen ? '收起关联' : '关联已有客户'}</button>
      </div>

      ${projectCustomerFormOpen ? `
        <div class="customer-form">
          <div class="form-grid">
            <div class="form-field">
              <label>选择客户</label>
              <select id="project-customer-name" class="select-input">
                ${availableCustomers.map((customer) => `<option>${customer.name}</option>`).join('') || '<option>暂无可关联客户</option>'}
              </select>
            </div>
            <div class="form-field">
              <label>项目内状态</label>
              <select id="project-customer-status" class="select-input">
                ${activeCustomerProjectStatuses().map((status) => `<option>${status}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="customer-form-actions">
            <button class="muted-btn" data-action="toggle-project-customer-form">取消</button>
            <button class="primary-btn" data-action="save-project-customer" ${availableCustomers.length ? '' : 'disabled'}>保存关联</button>
          </div>
        </div>
      ` : ''}

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>客户名称</th>
              <th>国家 / 区域</th>
              <th>当前状态</th>
              <th>负责销售</th>
              <th>负责技术支持</th>
              <th>需求</th>
            </tr>
          </thead>
          <tbody>
            ${project.projectCustomers.map((customer, index) => `
              <tr>
                <td>${customer.customerName}</td>
                <td>${customer.region}</td>
                <td>
                  <select class="select-input compact customer-status-select" data-project-customer-index="${index}">
                    ${activeCustomerProjectStatuses().map((status) => `<option ${customer.projectStatus === status ? 'selected' : ''}>${status}</option>`).join('')}
                  </select>
                </td>
                <td>${taskPersonLabel(customerSalesOwners(customer.customerName))}</td>
                <td>${taskPersonLabel(customerSupportOwners(customer.customerName))}</td>
                <td><button class="ghost-btn" data-action="open-customer-requirements" data-customer-index="${index}">需求列表</button></td>
              </tr>
            `).join('') || '<tr><td colspan="6">暂无关联客户</td></tr>'}
          </tbody>
        </table>
      </div>
      <p class="empty-note">客户基础资料来自资源管理；客户在当前项目下的状态单独维护。</p>
    </section>
  `;
}

function renderCustomerRequirements() {
  const project = projects.find((item) => item.id === selectedProjectId);
  const customer = project.projectCustomers[selectedCustomerIndex];

  customerRequirements.innerHTML = `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>${customer.customerName} 的需求列表</h2>
          <p>需求记录参考敏捷开发格式</p>
        </div>
        <button class="primary-btn" data-action="toggle-requirement-form">${requirementFormOpen ? '收起新增' : '新增需求'}</button>
      </div>
      ${requirementFormOpen ? `
        <div class="customer-form">
          <div class="form-grid">
            <div class="form-field full">
              <label>需求标题</label>
              <input id="requirement-title" class="text-input" placeholder="例如 支持离线支付重试" />
            </div>
            <div class="form-field full">
              <label>用户故事</label>
              <textarea id="requirement-user-story" rows="3" placeholder="作为……，我希望……，以便……"></textarea>
            </div>
            <div class="form-field">
              <label>业务价值</label>
              <input id="requirement-value" class="text-input" placeholder="例如 减少支付失败率" />
            </div>
            <div class="form-field">
              <label>优先级</label>
              <select id="requirement-priority" class="select-input">
                <option>中</option>
                <option>高</option>
                <option>低</option>
              </select>
            </div>
            <div class="form-field full">
              <label>验收标准</label>
              <textarea id="requirement-acceptance" rows="3" placeholder="写清楚如何判断该需求已满足"></textarea>
            </div>
            <div class="form-field full checkbox-field">
              <label>
                <input id="requirement-create-task" type="checkbox" checked />
                同时创建关联任务，并默认流转给需求创建者（${currentUser}）
              </label>
            </div>
          </div>
          <div class="customer-form-actions">
            <button class="muted-btn" data-action="toggle-requirement-form">取消</button>
            <button class="primary-btn" data-action="save-requirement">保存需求</button>
          </div>
        </div>
      ` : ''}
      <div class="requirement-list">
        ${customer.requirements.map((item, index) => `
          <article class="requirement-card">
            <div class="detail-head">
              <div>
                <h3>${item.title}</h3>
                <p>${item.proposer} · 创建者 ${item.creator || '-'} · ${item.date}</p>
              </div>
              <span class="badge ${requirementBadgeClass(item.status)}">${item.status}</span>
            </div>
            <p><strong>用户故事：</strong>${item.userStory}</p>
            <p><strong>业务价值：</strong>${item.value}</p>
            <p><strong>验收标准：</strong>${item.acceptance}</p>
            <div class="attachment-list">
              <span>需求编号 · ${item.id}</span>
              <span>优先级 · ${item.priority}</span>
              ${item.taskId
                ? `<button class="inline-link" data-action="open-task-detail" data-task-id="${item.taskId}" data-return-view="requirements">关联任务 · ${item.taskId}</button>`
                : '<span>未关联任务</span>'}
            </div>
            <div class="requirement-card-actions">
              ${item.status !== '已作废'
                ? `<button class="ghost-btn" data-action="void-requirement" data-requirement-index="${index}">作废需求</button>`
                : ''}
              <button class="danger-btn" data-action="delete-requirement" data-requirement-index="${index}">删除</button>
            </div>
          </article>
        `).join('') || '<p class="empty-note">暂无需求记录</p>'}
      </div>
    </section>
  `;
}

function renderRequirementOverview() {
  const project = projects.find((item) => item.id === selectedProjectId);
  const grouped = new Map();

  project.projectCustomers
    .flatMap((customer) => customer.requirements.map((requirement) => ({ customer, requirement })))
    .filter(({ requirement }) => requirement.status !== '已作废')
    .forEach(({ customer, requirement }) => {
    if (!grouped.has(requirement.title)) grouped.set(requirement.title, []);
    grouped.get(requirement.title).push(customer.customerName);
  });

  requirementOverview.innerHTML = `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>${project.externalName} 的需求纵览</h2>
          <p>汇总客户共性需求，方便产品提取和抽象</p>
        </div>
      </div>
      <div class="requirement-list">
        ${[...grouped.entries()].map(([title, customers]) => `
          <article class="requirement-card">
            <div class="detail-head">
              <div>
                <h3>${title}</h3>
                <p>涉及客户：${customers.join('、')}</p>
              </div>
              <span class="badge ${customers.length > 1 ? 'progress' : 'pending'}">${customers.length > 1 ? '共性需求' : '单客户需求'}</span>
            </div>
          </article>
        `).join('') || '<p class="empty-note">暂无需求数据</p>'}
      </div>
    </section>
  `;
}

function renderProjectMaterials() {
  const project = projects.find((item) => item.id === selectedProjectId);

  projectMaterials.innerHTML = `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>${project.externalName} 的项目资料区</h2>
          <p>承接由阶段显式发布出来、供项目内成员复用的可信资料</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>资料名称</th>
              <th>来源阶段</th>
              <th>发布目标</th>
              <th>发布时间</th>
            </tr>
          </thead>
          <tbody>
            ${project.projectMaterials.map((material) => `
              <tr>
                <td>${material.name}</td>
                <td>${material.sourceStage}</td>
                <td>${material.shareTarget}</td>
                <td>${material.publishedAt}</td>
              </tr>
            `).join('') || '<tr><td colspan="4">暂无共享资料</td></tr>'}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderTaskManagement() {
  const keyword = document.getElementById('task-keyword')?.value.trim().toLowerCase() || '';
  const projectFilter = document.getElementById('task-project-filter')?.value || '全部项目';
  const statusFilter = document.getElementById('task-status-filter')?.value || '全部状态';
  const priorityFilter = document.getElementById('task-priority-filter')?.value || '全部优先级';
  const assigneeFilter = document.getElementById('task-assignee-filter')?.value || '全部执行者';
  const categoryFilter = document.getElementById('task-category-filter')?.value || '全部分类';

  const filteredTasks = tasks.filter((task) => {
    const matchesKeyword = !keyword || [
      task.id,
      task.title,
      task.stage,
      task.category,
      task.description,
      ...taskAssigneeNames(task),
      ...(task.participants || []),
    ].some((value) => value.toLowerCase().includes(keyword));
    const matchesProject = projectFilter === '全部项目' || task.project === projectFilter;
    const matchesStatus = statusFilter === '全部状态' || task.status === statusFilter;
    const matchesPriority = priorityFilter === '全部优先级' || task.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === '全部执行者' || taskAssigneeNames(task).includes(assigneeFilter);
    const matchesCategory = categoryFilter === '全部分类' || task.category === categoryFilter;
    return matchesKeyword && matchesProject && matchesStatus && matchesPriority && matchesAssignee && matchesCategory;
  });

  taskManagement.innerHTML = `
    <div class="toolbar task-toolbar">
      <input id="task-keyword" type="search" value="${keyword}" placeholder="搜索任务编号 / 标题 / 阶段" />
      <select id="task-project-filter" class="select-input compact-filter">
        ${['全部项目', ...new Set(tasks.map((task) => task.project))].map((item) => `<option ${item === projectFilter ? 'selected' : ''}>${item}</option>`).join('')}
      </select>
      <select id="task-status-filter" class="select-input compact-filter">
        ${['全部状态', ...activeTaskStatusNames()].map((item) => `<option ${item === statusFilter ? 'selected' : ''}>${item}</option>`).join('')}
      </select>
      <select id="task-priority-filter" class="select-input compact-filter">
        ${['全部优先级', '高', '中', '低'].map((item) => `<option ${item === priorityFilter ? 'selected' : ''}>${item}</option>`).join('')}
      </select>
      <select id="task-assignee-filter" class="select-input compact-filter">
        ${['全部执行者', ...new Set(tasks.flatMap((task) => taskAssigneeNames(task)))].map((item) => `<option ${item === assigneeFilter ? 'selected' : ''}>${item}</option>`).join('')}
      </select>
      <select id="task-category-filter" class="select-input compact-filter">
        ${['全部分类', ...taskCategoryOptions].map((item) => `<option ${item === categoryFilter ? 'selected' : ''}>${item}</option>`).join('')}
      </select>
      <button class="primary-btn" data-action="toggle-task-form">${taskFormOpen ? '收起新建' : '新建任务'}</button>
    </div>

    ${taskFormOpen ? `
      <div class="panel task-form-panel">
        <div class="form-grid">
          <div class="form-field full">
            <label>任务标题</label>
            <input id="task-title" class="text-input" placeholder="例如 确认海外版本支付语言包" />
          </div>
          <div class="form-field full">
            <label>任务描述</label>
            <textarea id="task-description" rows="3" placeholder="说明任务背景、目标和交付标准"></textarea>
          </div>
          <div class="form-field">
            <label>所属项目</label>
            <select id="task-project" class="select-input">
              ${projects.map((project) => `<option ${taskFormState.project === project.externalName ? 'selected' : ''}>${project.externalName}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>来源阶段</label>
            <select id="task-stage" class="select-input">
              ${projects.find((project) => project.externalName === taskFormState.project)?.stages.map((stage) => `<option ${taskFormState.stage === stage.name ? 'selected' : ''}>${stage.name}</option>`).join('') || ''}
            </select>
          </div>
          <div class="form-field">
            <label>任务分类</label>
            <select id="task-category" class="select-input">
              ${taskCategoryOptions.map((category) => `<option ${taskFormState.category === category ? 'selected' : ''}>${category}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>优先级</label>
            <select id="task-priority" class="select-input">
              <option>中</option>
              <option>高</option>
              <option>低</option>
            </select>
          </div>
          <div class="form-field">
            <label>执行者</label>
            ${searchablePeopleInput('task-assignees', [], '搜索姓名，支持多人')}
          </div>
          <div class="form-field">
            <label>参与者</label>
            ${searchablePeopleInput('task-participants', [], '搜索姓名，支持多人')}
          </div>
          <div class="form-field">
            <label>预期完成时间</label>
            <input id="task-expected-completion-at" class="text-input" type="date" value="2026-05-30" />
          </div>
          <div class="form-field">
            <label>创建者</label>
            <input class="text-input" value="${currentUser}" disabled />
          </div>
        </div>
        <div class="customer-form-actions">
          <button class="muted-btn" data-action="toggle-task-form">取消</button>
          <button class="primary-btn" data-action="save-task">保存任务</button>
        </div>
      </div>
    ` : ''}

    <div class="panel">
      <div class="panel-head">
        <div>
          <h2>任务列表</h2>
          <p>产品逻辑参考 Jira，并保留 KPM 的项目 / 阶段上下文</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>编号</th>
              <th>标题</th>
              <th>分类</th>
              <th>项目</th>
              <th>来源阶段</th>
              <th>状态</th>
              <th>优先级</th>
              <th>创建者</th>
              <th>执行者</th>
              <th>参与者</th>
              <th>预期完成时间</th>
              <th>来源</th>
            </tr>
          </thead>
          <tbody>
            ${filteredTasks.map((task) => `
              <tr>
                <td><button class="inline-link" data-action="open-task-detail" data-task-id="${task.id}" data-return-view="tasks">${task.id}</button></td>
                <td>${task.title}</td>
                <td>${task.category}</td>
                <td>${task.project}</td>
                <td>${task.stage}</td>
                <td><span class="badge ${taskBadgeClass(task.status)}">${task.status}</span></td>
                <td>${task.priority}</td>
                <td>${task.creator}</td>
                <td>${taskPersonLabel(taskAssigneeNames(task), '待分配')}</td>
                <td>${taskPersonLabel(task.participants)}</td>
                <td>${task.expectedCompletionAt || '-'}</td>
                <td>${task.source}</td>
              </tr>
            `).join('') || '<tr><td colspan="12">暂无匹配任务</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderTaskDetail() {
  const task = tasks.find((item) => item.id === selectedTaskId);
  const linked = findRequirementByTaskId(task.id);
  const expectedCompletionValue = task.expectedCompletionAt && task.expectedCompletionAt !== '-' ? task.expectedCompletionAt : '';

  taskDetail.innerHTML = `
    <div class="task-detail-grid">
      <div class="detail-main">
        <section class="panel">
          <div class="detail-head">
            <div>
              <p>${task.id}</p>
              <h2>${task.title}</h2>
            </div>
            <span class="badge ${taskBadgeClass(task.status)}">${task.status}</span>
          </div>
          <div class="project-meta task-meta-grid">
            <div class="meta-item">
              <span>所属项目</span>
              <strong>${task.project}</strong>
            </div>
            <div class="meta-item">
              <span>来源阶段</span>
              <strong>${task.stage}</strong>
            </div>
            <div class="meta-item">
              <span>任务分类</span>
              <strong>${task.category}</strong>
            </div>
            <div class="meta-item">
              <span>来源</span>
              <strong>${task.source}</strong>
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <div>
              <h2>任务信息</h2>
              <p>可在这里维护任务描述、优先级、执行者、参与者和预期完成时间</p>
            </div>
          </div>
          <div class="form-grid task-edit-form">
            <div class="form-field full">
              <label>任务描述</label>
              <textarea id="task-detail-description" rows="4" placeholder="说明任务背景、目标和交付标准">${task.description || ''}</textarea>
            </div>
            <div class="form-field">
              <label>优先级</label>
              <select id="task-detail-priority" class="select-input">
                ${['高', '中', '低'].map((priority) => `<option ${task.priority === priority ? 'selected' : ''}>${priority}</option>`).join('')}
              </select>
            </div>
            <div class="form-field">
              <label>预期完成时间</label>
              <input id="task-detail-expected-completion-at" class="text-input" type="date" value="${expectedCompletionValue}" />
            </div>
            <div class="form-field">
              <label>执行者</label>
              ${searchablePeopleInput('task-detail-assignees', taskAssigneeNames(task), '搜索姓名，支持多人')}
            </div>
            <div class="form-field">
              <label>参与者</label>
              ${searchablePeopleInput('task-detail-participants', task.participants || [], '搜索姓名，支持多人')}
            </div>
          </div>
          <div class="customer-form-actions">
            <button class="primary-btn" data-action="save-task-detail">保存修改</button>
          </div>
        </section>

        ${linked ? `
          <section class="panel">
            <div class="panel-head">
              <div>
                <h2>关联需求</h2>
                <p>${linked.customer.customerName} · ${linked.requirement.id}</p>
              </div>
              <button class="ghost-btn" data-action="open-linked-requirement" data-requirement-id="${linked.requirement.id}">查看需求</button>
            </div>
            <article class="requirement-card linked-requirement-card">
              <div class="detail-head">
                <div>
                  <h3>${linked.requirement.title}</h3>
                  <p>${linked.requirement.proposer} · 创建者 ${linked.requirement.creator || '-'} · ${linked.requirement.date}</p>
                </div>
                <span class="badge ${requirementBadgeClass(linked.requirement.status)}">${linked.requirement.status}</span>
              </div>
              <p><strong>用户故事：</strong>${linked.requirement.userStory}</p>
            </article>
          </section>
        ` : ''}

        <section class="panel">
          <div class="panel-head">
            <div>
              <h2>任务附件</h2>
              <p>可上传照片、视频或其他格式文件</p>
            </div>
            <label class="ghost-btn upload-label">
              上传文件
              <input id="task-file-input" type="file" multiple />
            </label>
          </div>
          <div class="file-list">
            ${task.attachments.map((file) => `
              <div class="file-row">
                <div>
                  <strong>${file.name}</strong>
                  <small>${file.type} · ${file.size} · ${file.uploader} · ${file.time}</small>
                </div>
              </div>
            `).join('') || '<p class="empty-note">暂无任务附件</p>'}
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <div>
              <h2>任务讨论</h2>
              <p>参与者和执行者可围绕问题留言，并附带相关文件</p>
            </div>
          </div>
          <div class="message-composer">
            <textarea id="task-comment-text" rows="3" placeholder="补充进展、问题或需要其他成员协助的内容"></textarea>
            <div class="message-actions">
              <label class="ghost-btn file-label">
                添加附件
                <input id="task-comment-files" type="file" multiple />
              </label>
              <button class="primary-btn" data-action="publish-task-comment">发布留言</button>
            </div>
          </div>
          <div class="message-list">
            ${task.comments.map((comment) => `
              <article class="message-card">
                <div class="detail-head">
                  <div>
                    <h3>${comment.author}</h3>
                    <p>${comment.time}</p>
                  </div>
                </div>
                <p>${comment.text || '补充附件'}</p>
                ${comment.attachments?.length ? `
                  <div class="attachment-list">
                    ${comment.attachments.map((file) => `<span>${file.name} · ${file.type}</span>`).join('')}
                  </div>
                ` : ''}
              </article>
            `).join('') || '<p class="empty-note">暂无讨论记录</p>'}
          </div>
        </section>
      </div>

      <div class="detail-side">
        <section class="info-card">
          <h3>任务状态</h3>
          <select id="task-detail-status" class="select-input">
            ${availableTaskDetailStatuses(task).map((status) => `<option ${task.status === status ? 'selected' : ''}>${status}</option>`).join('')}
          </select>
          ${linked ? '<p>状态为“已完成”时，关联需求自动标记为“已实现”；状态为“已拒绝”时，关联需求自动标记为“已拒绝”。</p>' : ''}
        </section>

        <section class="info-card">
          <h3>执行信息</h3>
          <div class="detail-facts">
            <div>
              <span>创建者</span>
              <strong>${task.creator}</strong>
            </div>
            <div>
              <span>执行者</span>
              <strong>${taskPersonLabel(taskAssigneeNames(task), '待分配')}</strong>
            </div>
            <div>
              <span>参与者</span>
              <strong>${taskPersonLabel(task.participants)}</strong>
            </div>
            <div>
              <span>优先级</span>
              <strong>${task.priority}</strong>
            </div>
            <div>
              <span>预期完成时间</span>
              <strong>${task.expectedCompletionAt || '-'}</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

function formatMoney(amount, currency) {
  return `${currency} ${Number(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function orderProjectNames() {
  return [...new Set(orders.map((order) => order.projectName))];
}

function orderFieldLabel(field) {
  return {
    orderDate: '下单日期',
    customerName: '下单客户',
    projectName: '项目信息',
    quantity: '数量',
    specification: '具体规格',
    expectedShipDate: '期望发货日期',
    plannedShipDate: '计划发货日期',
    softwareVersion: '软件版本号',
    currency: '币种',
    unitPrice: '单价',
  }[field];
}

function renderOrderForm(editingOrder = null) {
  const order = editingOrder || {
    customerName: customers[0]?.name || '',
    projectName: projects[0]?.externalName || '',
    currency: 'USD',
    quantity: 1,
    unitPrice: 0,
    orderDate: prototypeToday,
    expectedShipDate: prototypeToday,
    plannedShipDate: prototypeToday,
    softwareVersion: '',
    specification: '',
  };

  return `
    <div class="panel task-form-panel">
      <div class="section-intro">
        <h3>${editingOrder ? `编辑 ${editingOrder.id}` : '新增订单'}</h3>
        <p>${editingOrder ? '修改订单时必须填写原因，系统会自动保留修改记录。' : '新增订单后，销售额会直接进入统计看板。'}</p>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label>下单日期</label>
          <input id="order-date" class="text-input" type="date" value="${order.orderDate}" />
        </div>
        <div class="form-field">
          <label>下单客户</label>
          <select id="order-customer" class="select-input">
            ${customers.map((customer) => `<option ${order.customerName === customer.name ? 'selected' : ''}>${customer.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>项目信息</label>
          <select id="order-project" class="select-input">
            ${projects.map((project) => `<option ${order.projectName === project.externalName ? 'selected' : ''}>${project.externalName}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>数量</label>
          <input id="order-quantity" class="text-input" type="number" min="1" value="${order.quantity}" />
        </div>
        <div class="form-field full">
          <label>具体规格</label>
          <input id="order-specification" class="text-input" value="${order.specification}" placeholder="例如 4GB + 64GB / 黑色 / 欧规充电器" />
        </div>
        <div class="form-field">
          <label>期望发货日期</label>
          <input id="order-expected-ship-date" class="text-input" type="date" value="${order.expectedShipDate}" />
        </div>
        <div class="form-field">
          <label>计划发货日期</label>
          <input id="order-planned-ship-date" class="text-input" type="date" value="${order.plannedShipDate}" />
        </div>
        <div class="form-field">
          <label>软件版本号</label>
          <input id="order-software-version" class="text-input" value="${order.softwareVersion}" placeholder="例如 v3.2.1" />
        </div>
        <div class="form-field">
          <label>币种</label>
          <select id="order-currency" class="select-input">
            ${['USD', 'EUR', 'CNY'].map((currency) => `<option ${order.currency === currency ? 'selected' : ''}>${currency}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>单价</label>
          <input id="order-unit-price" class="text-input" type="number" min="0" step="0.01" value="${order.unitPrice}" />
        </div>
        <div class="form-field">
          <label>创建人</label>
          <input class="text-input" value="${editingOrder?.creator || currentUser}" disabled />
        </div>
        ${editingOrder ? `
          <div class="form-field full">
            <label>修改原因</label>
            <textarea id="order-change-reason" rows="3" placeholder="请说明为什么修改该订单"></textarea>
          </div>
        ` : ''}
      </div>
      <div class="customer-form-actions">
        <button class="muted-btn" data-action="cancel-order-form">取消</button>
        <button class="primary-btn" data-action="save-order">${editingOrder ? '保存修改' : '保存订单'}</button>
      </div>
    </div>
  `;
}

function renderOrderManagement() {
  const keyword = document.getElementById('order-keyword')?.value.trim().toLowerCase() || '';
  const filteredOrders = orders.filter((order) => !keyword || [
    order.id,
    order.customerName,
    order.projectName,
    order.specification,
    order.softwareVersion,
  ].some((value) => value.toLowerCase().includes(keyword)));
  const editingOrder = orderEditIndex === null ? null : orders[orderEditIndex];
  const selectedHistoryOrder = orders.find((order) => order.id === selectedOrderId);

  orderManagement.innerHTML = `
    <div class="toolbar">
      <input id="order-keyword" type="search" value="${keyword}" placeholder="搜索订单号 / 客户 / 项目 / 规格" />
      <button class="primary-btn" data-action="toggle-order-form">${orderFormOpen && orderEditIndex === null ? '收起新增' : '新增订单'}</button>
    </div>
    ${orderFormOpen ? renderOrderForm(editingOrder) : ''}
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>订单列表</h2>
          <p>新增、修改、删除均可受权限控制；修改订单时自动沉淀审计记录。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>订单号</th>
              <th>下单日期</th>
              <th>客户</th>
              <th>项目</th>
              <th>数量</th>
              <th>规格</th>
              <th>期望发货</th>
              <th>计划发货</th>
              <th>软件版本</th>
              <th>金额</th>
              <th>创建人</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${filteredOrders.map((order) => {
              const index = orders.indexOf(order);
              return `
              <tr>
                <td>${order.id}</td>
                <td>${order.orderDate}</td>
                <td>${order.customerName}</td>
                <td>${order.projectName}</td>
                <td>${order.quantity}</td>
                <td>${order.specification}</td>
                <td>${order.expectedShipDate}</td>
                <td>${order.plannedShipDate}</td>
                <td>${order.softwareVersion}</td>
                <td>${formatMoney(order.amount, order.currency)}</td>
                <td>${order.creator}</td>
                <td class="row-actions">
                  <button class="ghost-btn" data-action="edit-order" data-order-index="${index}">编辑</button>
                  <button class="ghost-btn" data-action="open-order-history" data-order-id="${order.id}">修改记录</button>
                  <button class="danger-btn" data-action="delete-order" data-order-index="${index}">删除</button>
                </td>
              </tr>
            `;
            }).join('') || '<tr><td colspan="12">暂无匹配订单</td></tr>'}
          </tbody>
        </table>
      </div>
    </section>
    ${orderHistoryModalOpen && selectedHistoryOrder ? `
      <div class="modal-backdrop">
        <section class="modal-card">
          <div class="panel-head">
            <div>
              <h2>${selectedHistoryOrder.id} 修改记录</h2>
              <p>保留修改人、时间、内容和原因</p>
            </div>
          </div>
          <div class="audit-list">
            ${selectedHistoryOrder.histories.map((history) => `
              <article class="audit-card">
                <strong>${history.modifier}</strong>
                <span>${history.modifiedAt}</span>
                <p>${history.changes}</p>
                <small>原因：${history.reason}</small>
              </article>
            `).join('') || '<p class="empty-note">暂无修改记录</p>'}
          </div>
          <div class="customer-form-actions">
            <button class="primary-btn" data-action="close-order-history">关闭</button>
          </div>
        </section>
      </div>
    ` : ''}
  `;
}

function filteredOrdersForAnalytics() {
  return orders.filter((order) => {
    const [year, month] = order.orderDate.split('-');
    const quarter = `Q${Math.ceil(Number(month) / 3)}`;
    const matchesProject = !analyticsProjectFilter.length || analyticsProjectFilter.includes(order.projectName);
    const matchesPeriod = analyticsOrderPeriod === '年度'
      ? year === analyticsYear
      : analyticsOrderPeriod === '季度'
        ? year === analyticsYear && quarter === analyticsQuarter
        : year === analyticsYear && month === analyticsMonth;
    return matchesProject && matchesPeriod;
  });
}

function regionSummary(region) {
  const regionCustomers = customers.filter((customer) => customer.region === region);
  const sales = new Set(regionCustomers.flatMap((customer) => customer.salesOwners || []));
  const support = new Set(regionCustomers.flatMap((customer) => customer.supportOwners || []));
  const soldProjects = new Set(orders.filter((order) => regionCustomers.some((customer) => customer.name === order.customerName)).map((order) => order.projectName));
  return {
    salesCount: sales.size,
    supportCount: support.size,
    soldProjects: [...soldProjects],
  };
}

function renderOrderAnalytics() {
  const filteredOrders = filteredOrdersForAnalytics();
  const totalsByCurrency = filteredOrders.reduce((acc, order) => {
    acc[order.currency] = (acc[order.currency] || 0) + order.amount;
    return acc;
  }, {});
  const totalQuantity = filteredOrders.reduce((sum, order) => sum + Number(order.quantity), 0);
  const grouped = orderProjectNames().map((projectName) => {
    const projectOrders = filteredOrders.filter((order) => order.projectName === projectName);
    return {
      projectName,
      count: projectOrders.length,
      quantity: projectOrders.reduce((sum, order) => sum + Number(order.quantity), 0),
      amountText: Object.entries(projectOrders.reduce((acc, order) => {
        acc[order.currency] = (acc[order.currency] || 0) + order.amount;
        return acc;
      }, {})).map(([currency, amount]) => formatMoney(amount, currency)).join(' / ') || '-',
    };
  }).filter((item) => item.count);

  analyticsContent.innerHTML = `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>订单统计</h2>
          <p>按年、季度、月份查看指定项目的销售额、订单数和产品数量</p>
        </div>
      </div>
      <div class="analytics-filter-grid">
        <div class="form-field">
          <label>统计周期</label>
          <select id="analytics-period" class="select-input">
            ${['年度', '季度', '月份'].map((period) => `<option ${analyticsOrderPeriod === period ? 'selected' : ''}>${period}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>年份</label>
          <select id="analytics-year" class="select-input">
            ${['2025', '2026'].map((year) => `<option ${analyticsYear === year ? 'selected' : ''}>${year}</option>`).join('')}
          </select>
        </div>
        ${analyticsOrderPeriod === '季度' ? `
          <div class="form-field">
            <label>季度</label>
            <select id="analytics-quarter" class="select-input">
              ${['Q1', 'Q2', 'Q3', 'Q4'].map((quarter) => `<option ${analyticsQuarter === quarter ? 'selected' : ''}>${quarter}</option>`).join('')}
            </select>
          </div>
        ` : ''}
        ${analyticsOrderPeriod === '月份' ? `
          <div class="form-field">
            <label>月份</label>
            <select id="analytics-month" class="select-input">
              ${['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((month) => `<option ${analyticsMonth === month ? 'selected' : ''}>${month}</option>`).join('')}
            </select>
          </div>
        ` : ''}
        <div class="form-field full">
          <label>项目</label>
          ${renderCheckboxOptions(orderProjectNames().map((name) => ({ name })), analyticsProjectFilter, 'data-analytics-project')}
        </div>
      </div>
      <div class="summary-grid analytics-summary">
        <article class="summary-card">
          <span>销售额</span>
          <strong>${Object.entries(totalsByCurrency).map(([currency, amount]) => formatMoney(amount, currency)).join(' / ') || '-'}</strong>
        </article>
        <article class="summary-card">
          <span>订单数量</span>
          <strong>${filteredOrders.length}</strong>
        </article>
        <article class="summary-card">
          <span>产品数量</span>
          <strong>${totalQuantity}</strong>
        </article>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>项目</th><th>订单数</th><th>产品数量</th><th>销售额</th></tr></thead>
          <tbody>
            ${grouped.map((item) => `
              <tr>
                <td>${item.projectName}</td>
                <td>${item.count}</td>
                <td>${item.quantity}</td>
                <td>${item.amountText}</td>
              </tr>
            `).join('') || '<tr><td colspan="4">当前筛选下暂无订单</td></tr>'}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderResourceAnalytics() {
  const mapPins = [
    { customerName: 'Nova Retail', left: '48%', top: '31%' },
    { customerName: 'Siam Pay', left: '70%', top: '48%' },
    { customerName: 'Andes Market', left: '30%', top: '72%' },
  ];
  const regions = [...new Set(customers.map((customer) => customer.region))];

  analyticsContent.innerHTML = `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>资源分配情况</h2>
          <p>拖拽地图查看全球客户分布，悬浮客户点查看销售与技术支持信息</p>
        </div>
      </div>
      <div id="resource-map-viewport" class="resource-map-viewport">
        <div id="resource-map-canvas" class="resource-map-canvas" style="transform: translate(${mapOffset.x}px, ${mapOffset.y}px);">
          <div class="world-shape"></div>
          ${mapPins.map((pin) => {
            const customer = customerByName(pin.customerName);
            return `
              <button
                class="map-pin"
                style="left:${pin.left}; top:${pin.top};"
                title="${customer.name}｜销售：${taskPersonLabel(customer.salesOwners)}｜技术支持：${taskPersonLabel(customer.supportOwners)}"
              >
                ${customer.shortName}
              </button>
            `;
          }).join('')}
        </div>
      </div>
      <div class="region-grid">
        ${regions.map((region) => {
          const summary = regionSummary(region);
          return `
            <article class="region-card">
              <h3>${region}</h3>
              <p>销售 ${summary.salesCount} 人 · 技术支持 ${summary.supportCount} 人</p>
              <span>已售项目：${summary.soldProjects.join('、') || '-'}</span>
            </article>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function activeTasksForCustomerAndSupport(customerName, supportName) {
  return tasks.filter((task) => task.customerName === customerName
    && taskAssigneeNames(task).includes(supportName)
    && taskStatusSemantic(task.status) === '普通');
}

function renderSupportAnalytics() {
  const customer = customerByName(selectedSupportCustomer) || customers[0];
  const projectLinks = projects
    .flatMap((project) => project.projectCustomers
      .filter((projectCustomer) => projectCustomer.customerName === customer.name)
      .map((projectCustomer) => ({
        projectName: project.externalName,
        status: projectCustomer.projectStatus,
        orderedQuantity: orders
          .filter((order) => order.customerName === customer.name && order.projectName === project.externalName)
          .reduce((sum, order) => sum + Number(order.quantity), 0),
      })));
  const customerOrders = orders.filter((order) => order.customerName === customer.name);

  analyticsContent.innerHTML = `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>技术支持情况</h2>
          <p>查看某客户当前由谁负责、有哪些进行中任务和卡点任务</p>
        </div>
      </div>
      <div class="analytics-filter-grid support-filter-grid">
        <div class="form-field">
          <label>客户</label>
          <select id="support-customer-filter" class="select-input">
            ${customers.map((item) => `<option ${customer.name === item.name ? 'selected' : ''}>${item.name}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="support-tree">
        <article class="support-root" title="地区：${customer.region}｜订单数量：${customerOrders.length}｜合作项目：${projectLinks.map((item) => item.projectName).join('、') || '-'}｜项目下单数量：${projectLinks.map((item) => `${item.projectName} ${item.orderedQuantity}`).join('、') || '-'}｜客户状态：${customer.status}">
          <strong>${customer.name}</strong>
          <span>${customer.region} · ${customerOrders.length} 个订单 · ${projectLinks.length} 个合作项目</span>
        </article>
        <div class="support-branches">
          ${customer.supportOwners.map((supportName) => {
            const supportTasks = activeTasksForCustomerAndSupport(customer.name, supportName);
            const categoryGroups = [
              { label: '需求', tasks: supportTasks.filter((task) => task.category === '需求'), tone: 'progress' },
              { label: 'Bug', tasks: supportTasks.filter((task) => task.category === 'Bug'), tone: 'invalid' },
              { label: '其他', tasks: supportTasks.filter((task) => task.category === '其他' || task.category === '技术支持'), tone: 'pending' },
              { label: '卡点', tasks: supportTasks.filter((task) => task.source === '卡点求助'), tone: 'done' },
            ];
            return `
              <article class="support-branch">
                <h3>${supportName}</h3>
                <div class="support-task-stats">
                  ${categoryGroups.map((group) => `
                    <button
                      class="support-stat ${group.tone}"
                      title="${group.tasks.map((task) => `${task.id} ${task.title}`).join('｜') || '暂无任务'}"
                      data-action="${group.tasks[0] ? 'open-support-task-modal' : ''}"
                      data-task-id="${group.tasks[0]?.id || ''}"
                    >
                      ${group.label} ${group.tasks.length}
                    </button>
                  `).join('')}
                </div>
              </article>
            `;
          }).join('') || '<p class="empty-note">该客户暂未配置技术支持负责人</p>'}
        </div>
      </div>
    </section>
    ${supportTaskModalId ? renderSupportTaskModal() : ''}
  `;
}

function renderSupportTaskModal() {
  const task = tasks.find((item) => item.id === supportTaskModalId);
  if (!task) return '';
  return `
    <div class="modal-backdrop">
      <section class="modal-card">
        <div class="panel-head">
          <div>
            <h2>${task.id} · ${task.title}</h2>
            <p>${task.project} / ${task.stage}</p>
          </div>
        </div>
        <div class="detail-facts">
          <div><span>分类</span><strong>${task.category}</strong></div>
          <div><span>状态</span><strong>${task.status}</strong></div>
          <div><span>执行者</span><strong>${taskPersonLabel(taskAssigneeNames(task), '待分配')}</strong></div>
          <div><span>参与者</span><strong>${taskPersonLabel(task.participants)}</strong></div>
          <div><span>任务描述</span><strong>${task.description || '-'}</strong></div>
        </div>
        <div class="customer-form-actions">
          <button class="ghost-btn" data-action="open-task-detail" data-task-id="${task.id}" data-return-view="analytics">进入任务详情</button>
          <button class="primary-btn" data-action="close-support-task-modal">关闭</button>
        </div>
      </section>
    </div>
  `;
}

function renderAnalytics() {
  document.querySelectorAll('[data-analytics-tab]').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.analyticsTab === analyticsTab);
  });
  if (analyticsTab === 'orders') renderOrderAnalytics();
  if (analyticsTab === 'resources') renderResourceAnalytics();
  if (analyticsTab === 'support') renderSupportAnalytics();
}

function templateBadgeClass(status) {
  if (status === '启用') return 'done';
  if (status === '草稿') return 'progress';
  return 'pending';
}

function enabledTemplateEntries() {
  return templates
    .map((template, index) => ({ template, index }))
    .filter(({ template }) => template.status === '启用');
}

function firstEnabledTemplateIndex() {
  return enabledTemplateEntries()[0]?.index ?? 0;
}

function normalizeSelectedTemplateIndex() {
  if (templates[selectedTemplateIndex]?.status === '启用') return;
  selectedTemplateIndex = firstEnabledTemplateIndex();
}

function filteredTemplateEntries() {
  const keyword = templateSearchKeyword.trim().toLowerCase();
  return templates
    .map((template, index) => ({ template, index }))
    .filter(({ template }) => {
      const matchesKeyword = !keyword || `${template.name} ${template.scope}`.toLowerCase().includes(keyword);
      const matchesStatus = templateStatusKeyword === '全部状态' || template.status === templateStatusKeyword;
      return matchesKeyword && matchesStatus;
    });
}

function uniqueTemplateCopyName(name) {
  const base = `${name} 副本`;
  if (!templates.some((template) => template.name === base)) return base;
  let suffix = 2;
  while (templates.some((template) => template.name === `${base} ${suffix}`)) suffix += 1;
  return `${base} ${suffix}`;
}

function captureTemplateDraftStages() {
  templateDraftStages = [...document.querySelectorAll('[data-template-stage-name]')].map((input) => input.value);
}

function captureTemplateFormDraft() {
  captureTemplateDraftStages();
  const nameInput = document.getElementById('template-name');
  const scopeInput = document.getElementById('template-scope');
  const statusInput = document.getElementById('template-status');
  if (nameInput && scopeInput && statusInput) {
    templateDraftMeta = {
      name: nameInput.value,
      scope: scopeInput.value,
      status: statusInput.value,
    };
  }
}

function renderTemplateStageRows() {
  return `
    <div class="template-stage-editor">
      ${templateDraftStages.map((stage, index) => `
        <div class="template-stage-row">
          <input class="text-input" data-template-stage-name="${index}" value="${stage}" placeholder="例如 硬件设计" />
          <div class="row-actions">
            <button class="ghost-btn" data-action="move-template-stage" data-template-stage-index="${index}" data-direction="up" ${index === 0 ? 'disabled' : ''}>上移</button>
            <button class="ghost-btn" data-action="move-template-stage" data-template-stage-index="${index}" data-direction="down" ${index === templateDraftStages.length - 1 ? 'disabled' : ''}>下移</button>
            <button class="muted-btn" data-action="delete-template-stage" data-template-stage-index="${index}" ${templateDraftStages.length === 1 ? 'disabled' : ''}>删除</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderTemplateForm() {
  if (!templateFormOpen) return '';
  const editingTemplate = templateEditIndex === null ? null : templates[templateEditIndex];
  const formTitle = editingTemplate ? '编辑模板' : '新建模板';
  const cannotDisableLastEnabledTemplate = editingTemplate?.status === '启用' && enabledTemplateEntries().length <= 1;

  return `
    <div class="customer-form template-form">
      <div class="section-intro">
        <h3>${formTitle}</h3>
        <p>项目创建时只可选择“启用”模板；已生成项目不会随着模板修改而被回写。</p>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label>模板名称</label>
          <input id="template-name" class="text-input" value="${templateDraftMeta.name}" placeholder="例如 标准 POS 产品流程" />
        </div>
        <div class="form-field">
          <label>适用范围</label>
          <input id="template-scope" class="text-input" value="${templateDraftMeta.scope}" placeholder="例如 通用 / 海外项目" />
        </div>
        <div class="form-field">
          <label>模板状态</label>
          <select id="template-status" class="select-input">
            ${['启用', '草稿', '停用'].map((status) => `<option ${templateDraftMeta.status === status ? 'selected' : ''} ${cannotDisableLastEnabledTemplate && status !== '启用' ? 'disabled' : ''}>${status}</option>`).join('')}
          </select>
        </div>
      </div>
      ${cannotDisableLastEnabledTemplate ? '<p class="field-hint">系统至少需要保留 1 个启用模板，当前模板暂不能改成草稿或停用。</p>' : ''}
      <div class="template-stage-head">
        <div>
          <h4>阶段配置</h4>
          <p>可新增、改名、排序或删除阶段。</p>
        </div>
        <button class="ghost-btn" data-action="add-template-stage">新增阶段</button>
      </div>
      ${renderTemplateStageRows()}
      <div class="customer-form-actions">
        <button class="muted-btn" data-action="cancel-template-form">取消</button>
        <button class="primary-btn" data-action="save-template">保存模板</button>
      </div>
    </div>
  `;
}

function renderTemplates() {
  normalizeSelectedTemplateIndex();
  const rows = filteredTemplateEntries();
  templateList.innerHTML = `
    ${renderTemplateForm()}
    ${rows.map(({ template, index }) => `
      <article class="template-card">
        <div class="detail-head">
          <div>
            <h3>${template.name}</h3>
            <p>${template.scope} · ${template.stages.length} 个阶段 · 最近更新 ${template.updatedAt}</p>
          </div>
          <span class="badge ${templateBadgeClass(template.status)}">${template.status}</span>
        </div>
        <div class="template-flow">
          ${template.stages.map((stage) => `<span>${stage}</span>`).join('')}
        </div>
        <div class="row-actions">
          <button class="ghost-btn" data-action="copy-template" data-template-index="${index}">复制模板</button>
          <button class="ghost-btn" data-action="edit-template" data-template-index="${index}">编辑模板</button>
          <button class="muted-btn" data-action="toggle-template-status" data-template-index="${index}" ${template.status === '启用' && enabledTemplateEntries().length <= 1 ? 'disabled' : ''}>${template.status === '启用' ? '停用' : '启用'}</button>
          <button class="muted-btn" data-action="delete-template" data-template-index="${index}" ${template.status === '启用' ? 'disabled' : ''}>删除</button>
        </div>
      </article>
    `).join('') || '<p class="empty-note">暂无匹配流程模板</p>'}
  `;
}

function resourceRowsForTab(tab) {
  if (tab === 'customers') return customers;
  if (tab === 'customer-statuses') return customerProjectStatusOptions;
  if (tab === 'task-statuses') return taskStatusOptions;
  if (tab === 'permissions') return systemPermissionCatalog();
  return resourceData[tab];
}

function joinValues(values, fallback = '-') {
  return values.length ? values.join(' / ') : fallback;
}

function departmentMemberCount(departmentName) {
  return resourceData.users.filter((user) => user.departments.includes(departmentName)).length;
}

function projectDepartmentUsageCount(departmentName) {
  return projects.reduce((count, project) => {
    const memberUsage = project.members.filter((member) => userByAccount(member.userAccount)?.departments.includes(departmentName)).length;
    const stageUsage = project.stages.filter((stage) => stage.assignees.some((assignee) => assignee.type === 'department' && assignee.name === departmentName)).length;
    return count + memberUsage + stageUsage;
  }, 0);
}

function canDeleteDepartment(department) {
  const hasMembers = departmentMemberCount(department.name) > 0;
  const hasChildren = resourceData.departments.some((item) => item.parent === department.name);
  const usedByProjects = projectDepartmentUsageCount(department.name) > 0;
  return !hasMembers && !hasChildren && !usedByProjects;
}

function roleAssignedUserCount(roleName) {
  return resourceData.users.filter((user) => user.globalRoles.includes(roleName)).length;
}

function projectRoleUsageCount(roleName) {
  return projects.reduce((count, project) => count + project.members.filter((member) => member.role === roleName).length, 0);
}

function canDeleteRole(role) {
  return roleAssignedUserCount(role.name) === 0 && projectRoleUsageCount(role.name) === 0;
}

function permissionRoleNames(permissionKey) {
  return resourceData.roles
    .filter((role) => role.permissions.includes(permissionKey))
    .map((role) => role.name);
}

function permissionDirectUserNames(permissionKey) {
  return resourceData.users
    .filter((user) => user.directPermissions.includes(permissionKey))
    .map((user) => user.name);
}

function customerProjectUsageCount(customerName) {
  return projects.reduce((count, project) => count + project.projectCustomers.filter((customer) => customer.customerName === customerName).length, 0);
}

function canDeleteCustomer(customer) {
  return customerProjectUsageCount(customer.name) === 0
    && !orders.some((order) => order.customerName === customer.name);
}

function customerStatusUsageCount(statusName) {
  return projects.reduce((count, project) => count + project.projectCustomers.filter((customer) => customer.projectStatus === statusName).length, 0);
}

function canDeleteCustomerStatus(option) {
  return customerStatusUsageCount(option.name) === 0;
}

function taskStatusUsageCount(statusName) {
  return tasks.filter((task) => task.status === statusName).length;
}

function canDeleteTaskStatus(status) {
  return taskStatusUsageCount(status.name) === 0
    && !taskStatusTransitions.some((transition) => transition.from === status.name || transition.to === status.name);
}

function globalRoleOptions() {
  return resourceData.roles.filter((role) => role.type === '全局角色');
}

function renderCheckboxOptions(items, selectedItems, dataAttribute) {
  return `
    <div class="checkbox-grid">
      ${items.map((item) => `
        <label class="checkbox-option">
          <input type="checkbox" ${dataAttribute} value="${item.key || item.name}" ${selectedItems.includes(item.key || item.name) ? 'checked' : ''} />
          <span>${item.name}</span>
        </label>
      `).join('')}
    </div>
  `;
}

function selectedCheckboxValues(selector) {
  return [...document.querySelectorAll(selector)]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
}

function renameUserReferences(previousName, nextName) {
  if (previousName === nextName) return;
  customers.forEach((customer) => {
    customer.salesOwners = (customer.salesOwners || []).map((owner) => owner === previousName ? nextName : owner);
    customer.supportOwners = (customer.supportOwners || []).map((owner) => owner === previousName ? nextName : owner);
  });
  projects.forEach((project) => {
    project.projectCustomers.forEach((customer) => {
      customer.requirements.filter((requirement) => requirement.creator === previousName).forEach((requirement) => {
        requirement.creator = nextName;
      });
    });
    project.stages.forEach((stage) => {
      stage.messages?.filter((message) => message.author === previousName).forEach((message) => {
        message.author = nextName;
      });
    });
  });
  tasks.forEach((task) => {
    if (task.assignee === previousName) task.assignee = nextName;
    if (task.creator === previousName) task.creator = nextName;
    task.assignees = taskAssigneeNames(task).map((assignee) => assignee === previousName ? nextName : assignee);
    task.participants = (task.participants || []).map((participant) => participant === previousName ? nextName : participant);
    task.attachments?.filter((file) => file.uploader === previousName).forEach((file) => {
      file.uploader = nextName;
    });
    task.comments?.filter((comment) => comment.author === previousName).forEach((comment) => {
      comment.author = nextName;
    });
  });
}

function renameUserAccountReferences(previousAccount, nextAccount) {
  if (previousAccount === nextAccount) return;
  projects.forEach((project) => {
    if (project.managerAccount === previousAccount) project.managerAccount = nextAccount;
    project.members
      .filter((member) => member.userAccount === previousAccount)
      .forEach((member) => {
        member.userAccount = nextAccount;
      });
    project.stages.forEach((stage) => {
      stage.assignees
        .filter((assignee) => assignee.type === 'user' && assignee.account === previousAccount)
        .forEach((assignee) => {
          assignee.account = nextAccount;
        });
    });
  });
}

function renameDepartmentReferences(previousName, nextName) {
  if (previousName === nextName) return;
  resourceData.users.forEach((user) => {
    user.departments = user.departments.map((department) => department === previousName ? nextName : department);
  });
  resourceData.departments.filter((department) => department.parent === previousName).forEach((department) => {
    department.parent = nextName;
  });
  projects.forEach((project) => {
    project.stages.forEach((stage) => {
      stage.assignees
        .filter((assignee) => assignee.type === 'department' && assignee.name === previousName)
        .forEach((assignee) => {
          assignee.name = nextName;
        });
    });
  });
}

function renameRoleReferences(previousName, nextName) {
  if (previousName === nextName) return;
  resourceData.users.forEach((user) => {
    user.globalRoles = user.globalRoles.map((role) => role === previousName ? nextName : role);
  });
  projects.forEach((project) => {
    project.members.filter((member) => member.role === previousName).forEach((member) => {
      member.role = nextName;
    });
  });
}

function renameCustomerReferences(previousName, nextName) {
  if (previousName === nextName) return;
  projects.forEach((project) => {
    project.projectCustomers.filter((customer) => customer.customerName === previousName).forEach((customer) => {
      customer.customerName = nextName;
    });
  });
  orders.filter((order) => order.customerName === previousName).forEach((order) => {
    order.customerName = nextName;
  });
  tasks.filter((task) => task.customerName === previousName).forEach((task) => {
    task.customerName = nextName;
  });
}

function resourceSearchText(item, tab) {
  if (tab === 'users') {
    return [
      item.name,
      item.account,
      ...item.departments,
      ...item.globalRoles,
      ...item.directPermissions.map(permissionDisplayName),
      item.status,
    ].join(' ').toLowerCase();
  }
  if (tab === 'departments') {
    return [item.name, item.parent, `${departmentMemberCount(item.name)} 人`].join(' ').toLowerCase();
  }
  if (tab === 'roles') {
    return [item.name, item.type, ...item.permissions.map(permissionDisplayName), item.status].join(' ').toLowerCase();
  }
  if (tab === 'permissions') {
    return [
      item.name,
      item.type,
      item.target,
      item.location,
      ...permissionRoleNames(item.key),
      ...permissionDirectUserNames(item.key),
    ].join(' ').toLowerCase();
  }
  if (tab === 'customers') {
    return [
      item.name,
      item.shortName,
      item.region,
      ...(item.salesOwners || []),
      ...(item.supportOwners || []),
      item.status,
    ].join(' ').toLowerCase();
  }
  if (tab === 'task-statuses') {
    return [item.name, item.semantic, item.active ? '启用' : '停用'].join(' ').toLowerCase();
  }
  return Object.values(item).join(' ').toLowerCase();
}

function filteredResourceRows(tab) {
  const keyword = resourceSearchKeyword.trim().toLowerCase();
  return resourceRowsForTab(tab)
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => {
      const matchesKeyword = !keyword || resourceSearchText(item, tab).includes(keyword);
      const matchesPermissionType = tab !== 'permissions' || permissionTypeFilter === '全部类型' || item.type === permissionTypeFilter;
      return matchesKeyword && matchesPermissionType;
    });
}

function resourceTitleMeta(tab) {
  const titleMap = {
    users: ['用户管理', '维护用户、所属部门、全局角色和用户直授权限'],
    departments: ['部门管理', '维护组织结构；成员数由用户列表自动统计'],
    roles: ['角色管理', '在角色中统一配置权限，再由角色赋予用户或项目成员'],
    permissions: ['权限管理', '系统根据真实菜单和按钮自动生成，只读展示并按类型筛选'],
    customers: ['客户管理', '维护客户基础资料、负责销售和负责技术支持；客户录入与维护权限通过角色或用户直授控制'],
    'customer-statuses': ['客户状态配置', '维护项目下客户状态枚举；仅有“客户状态配置”权限的人可操作'],
    'task-statuses': ['任务状态配置', '维护全局任务状态及允许流转关系；任务详情按配置展示可流转状态'],
  };
  return titleMap[tab];
}

function renderResourceForm() {
  const editingItem = resourceEditIndex === null ? null : resourceRowsForTab(selectedResourceTab)[resourceEditIndex];
  const formTitle = editingItem ? '编辑' : '新增';

  if (selectedResourceTab === 'users') {
    return `
      <div class="customer-form">
        <div class="form-grid">
          <div class="form-field">
            <label>姓名</label>
            <input id="resource-user-name" class="text-input" value="${editingItem?.name || ''}" placeholder="例如 张敏" />
          </div>
          <div class="form-field">
            <label>账号</label>
            <input id="resource-user-account" class="text-input" value="${editingItem?.account || ''}" placeholder="例如 zhangmin" />
          </div>
          <div class="form-field full">
            <label>所属部门</label>
            ${renderCheckboxOptions(resourceData.departments, editingItem?.departments || [], 'data-user-department')}
          </div>
          <div class="form-field full">
            <label>全局角色</label>
            ${renderCheckboxOptions(globalRoleOptions(), editingItem?.globalRoles || [], 'data-user-global-role')}
            <small class="field-hint">项目内角色仍在具体项目成员中配置，不在这里做全局绑定。</small>
          </div>
          <div class="form-field full">
            <label>用户直授权限</label>
            ${renderCheckboxOptions(systemPermissionCatalog(), editingItem?.directPermissions || [], 'data-user-direct-permission')}
            <small class="field-hint">用于少量例外场景；通用权限优先通过角色统一授权。</small>
          </div>
          <div class="form-field">
            <label>状态</label>
            <select id="resource-user-status" class="select-input">
              ${['启用', '停用'].map((status) => `<option ${editingItem?.status === status ? 'selected' : ''}>${status}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="customer-form-actions">
          <button class="muted-btn" data-action="cancel-resource-form">取消</button>
          <button class="primary-btn" data-action="save-resource">${formTitle}用户</button>
        </div>
      </div>
    `;
  }

  if (selectedResourceTab === 'departments') {
    const availableParents = resourceData.departments.filter((department) => department.name !== editingItem?.name);
    return `
      <div class="customer-form">
        <div class="form-grid">
          <div class="form-field">
            <label>部门名称</label>
            <input id="resource-department-name" class="text-input" value="${editingItem?.name || ''}" placeholder="例如 产品部" />
          </div>
          <div class="form-field">
            <label>上级部门</label>
            <select id="resource-department-parent" class="select-input">
              <option ${!editingItem || editingItem.parent === '-' ? 'selected' : ''}>-</option>
              ${availableParents.map((department) => `<option ${editingItem?.parent === department.name ? 'selected' : ''}>${department.name}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="customer-form-actions">
          <button class="muted-btn" data-action="cancel-resource-form">取消</button>
          <button class="primary-btn" data-action="save-resource">${formTitle}部门</button>
        </div>
      </div>
    `;
  }

  if (selectedResourceTab === 'roles') {
    return `
      <div class="customer-form">
        <div class="form-grid">
          <div class="form-field">
            <label>角色名称</label>
            <input id="resource-role-name" class="text-input" value="${editingItem?.name || ''}" placeholder="例如 软件项目经理" />
          </div>
          <div class="form-field">
            <label>角色类型</label>
            <select id="resource-role-type" class="select-input">
              ${['全局角色', '项目内角色'].map((type) => `<option ${editingItem?.type === type ? 'selected' : ''}>${type}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>状态</label>
            <select id="resource-role-status" class="select-input">
              ${['启用', '停用'].map((status) => `<option ${editingItem?.status === status ? 'selected' : ''}>${status}</option>`).join('')}
            </select>
          </div>
          <div class="form-field full">
            <label>角色权限</label>
            ${renderCheckboxOptions(systemPermissionCatalog(), editingItem?.permissions || [], 'data-role-permission')}
          </div>
        </div>
        <div class="customer-form-actions">
          <button class="muted-btn" data-action="cancel-resource-form">取消</button>
          <button class="primary-btn" data-action="save-resource">${formTitle}角色</button>
        </div>
      </div>
    `;
  }

  if (selectedResourceTab === 'customers') {
    return `
      <div class="customer-form">
        <div class="form-grid">
          <div class="form-field">
            <label>客户名称</label>
            <input id="customer-name" class="text-input" value="${editingItem?.name || ''}" placeholder="例如 Nova Retail" />
          </div>
          <div class="form-field">
            <label>客户简称</label>
            <input id="customer-short-name" class="text-input" value="${editingItem?.shortName || ''}" placeholder="例如 Nova" />
          </div>
          <div class="form-field">
            <label>国家 / 区域</label>
            <input id="customer-region" class="text-input" value="${editingItem?.region || ''}" placeholder="例如 德国" />
          </div>
          <div class="form-field full">
            <label>负责销售</label>
            ${renderCheckboxOptions(salesUsers(), editingItem?.salesOwners || [], 'data-customer-sales-owner')}
          </div>
          <div class="form-field full">
            <label>负责技术支持</label>
            ${renderCheckboxOptions(supportUsers(), editingItem?.supportOwners || [], 'data-customer-support-owner')}
          </div>
          <div class="form-field">
            <label>客户状态</label>
            <select id="customer-status" class="select-input">
              ${['潜在客户', '合作中', '已停用'].map((status) => `<option ${editingItem?.status === status ? 'selected' : ''}>${status}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="customer-form-actions">
          <button class="muted-btn" data-action="cancel-resource-form">取消</button>
          <button class="primary-btn" data-action="save-resource">${formTitle}客户</button>
        </div>
      </div>
    `;
  }

  if (selectedResourceTab === 'task-statuses') {
    return `
      <div class="customer-form">
        <div class="form-grid">
          <div class="form-field">
            <label>状态名称</label>
            <input id="task-status-name" class="text-input" value="${editingItem?.name || ''}" placeholder="例如 待复核" />
          </div>
          <div class="form-field">
            <label>状态语义</label>
            <select id="task-status-semantic" class="select-input">
              ${['普通', '完成', '拒绝'].map((semantic) => `<option ${editingItem?.semantic === semantic ? 'selected' : ''}>${semantic}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>是否启用</label>
            <select id="task-status-active" class="select-input">
              <option ${editingItem?.active !== false ? 'selected' : ''}>启用</option>
              <option ${editingItem?.active === false ? 'selected' : ''}>停用</option>
            </select>
          </div>
        </div>
        <p class="field-hint">“完成 / 拒绝”语义用于关联需求自动回写，避免只依赖固定中文状态名。</p>
        <div class="customer-form-actions">
          <button class="muted-btn" data-action="cancel-resource-form">取消</button>
          <button class="primary-btn" data-action="save-resource">${formTitle}状态</button>
        </div>
      </div>
    `;
  }

  return `
    <div class="customer-form">
      <div class="form-grid">
        <div class="form-field">
          <label>状态名称</label>
          <input id="customer-status-option-name" class="text-input" value="${editingItem?.name || ''}" placeholder="例如 小批量试单" />
        </div>
        <div class="form-field">
          <label>是否启用</label>
          <select id="customer-status-option-active" class="select-input">
            <option ${editingItem?.active !== false ? 'selected' : ''}>启用</option>
            <option ${editingItem?.active === false ? 'selected' : ''}>停用</option>
          </select>
        </div>
      </div>
      <div class="customer-form-actions">
        <button class="muted-btn" data-action="cancel-resource-form">取消</button>
        <button class="primary-btn" data-action="save-resource">${formTitle}状态</button>
      </div>
    </div>
  `;
}

function renderResourceTable() {
  const rows = filteredResourceRows(selectedResourceTab);

  if (selectedResourceTab === 'users') {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>姓名</th><th>账号</th><th>所属部门</th><th>全局角色</th><th>用户直授权限</th><th>状态</th><th></th></tr></thead>
          <tbody>
            ${rows.map(({ item, index }) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.account}</td>
                <td>${joinValues(item.departments)}</td>
                <td>${joinValues(item.globalRoles)}</td>
                <td>${joinValues(item.directPermissions.map(permissionDisplayName))}</td>
                <td><span class="badge ${item.status === '启用' ? 'done' : 'pending'}">${item.status}</span></td>
                <td class="row-actions">
                  <button class="ghost-btn" data-action="edit-resource" data-resource-index="${index}">编辑</button>
                  <button class="muted-btn" data-action="toggle-user-status" data-resource-index="${index}">${item.status === '启用' ? '停用' : '启用'}</button>
                </td>
              </tr>
            `).join('') || '<tr><td colspan="7">暂无匹配用户</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
  }

  if (selectedResourceTab === 'departments') {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>部门名称</th><th>上级部门</th><th>成员数</th><th></th></tr></thead>
          <tbody>
            ${rows.map(({ item, index }) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.parent}</td>
                <td>${departmentMemberCount(item.name)} 人</td>
                <td class="row-actions">
                  <button class="ghost-btn" data-action="edit-resource" data-resource-index="${index}">编辑</button>
                  <button class="danger-btn" data-action="delete-resource" data-resource-index="${index}" ${canDeleteDepartment(item) ? '' : 'disabled'}>${canDeleteDepartment(item) ? '删除' : '使用中'}</button>
                </td>
              </tr>
            `).join('') || '<tr><td colspan="4">暂无匹配部门</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
  }

  if (selectedResourceTab === 'roles') {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>角色名称</th><th>角色类型</th><th>已授权权限</th><th>引用人数</th><th>状态</th><th></th></tr></thead>
          <tbody>
            ${rows.map(({ item, index }) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${joinValues(item.permissions.map(permissionDisplayName))}</td>
                <td>${roleAssignedUserCount(item.name) + projectRoleUsageCount(item.name)} 人</td>
                <td><span class="badge ${item.status === '启用' ? 'done' : 'pending'}">${item.status}</span></td>
                <td class="row-actions">
                  <button class="ghost-btn" data-action="edit-resource" data-resource-index="${index}">编辑</button>
                  <button class="danger-btn" data-action="delete-resource" data-resource-index="${index}" ${canDeleteRole(item) ? '' : 'disabled'}>${canDeleteRole(item) ? '删除' : '使用中'}</button>
                </td>
              </tr>
            `).join('') || '<tr><td colspan="6">暂无匹配角色</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
  }

  if (selectedResourceTab === 'permissions') {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>权限名称</th><th>权限类型</th><th>对应菜单 / 按钮</th><th>所在位置</th><th>角色授权</th><th>直接授权用户</th></tr></thead>
          <tbody>
            ${rows.map(({ item }) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.target}</td>
                <td>${item.location}</td>
                <td>${joinValues(permissionRoleNames(item.key))}</td>
                <td>${joinValues(permissionDirectUserNames(item.key))}</td>
              </tr>
            `).join('') || '<tr><td colspan="6">暂无匹配权限</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
  }

  if (selectedResourceTab === 'customers') {
    return `
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>客户名称</th><th>客户简称</th><th>国家 / 区域</th><th>负责销售</th><th>负责技术支持</th><th>客户状态</th><th></th></tr>
          </thead>
          <tbody>
            ${rows.map(({ item, index }) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.shortName}</td>
                <td>${item.region}</td>
                <td>${taskPersonLabel(item.salesOwners)}</td>
                <td>${taskPersonLabel(item.supportOwners)}</td>
                <td><span class="badge ${item.status === '合作中' ? 'done' : item.status === '潜在客户' ? 'progress' : 'pending'}">${item.status}</span></td>
                <td class="row-actions">
                  <button class="ghost-btn" data-action="edit-resource" data-resource-index="${index}">编辑</button>
                  <button class="danger-btn" data-action="delete-resource" data-resource-index="${index}" ${canDeleteCustomer(item) ? '' : 'disabled'}>${canDeleteCustomer(item) ? '删除' : '使用中'}</button>
                </td>
              </tr>
            `).join('') || '<tr><td colspan="7">暂无匹配客户</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
  }

  if (selectedResourceTab === 'task-statuses') {
    return `
      <div class="task-status-layout">
        <div class="table-wrap">
          <table>
            <thead><tr><th>状态名称</th><th>状态语义</th><th>启用状态</th><th>任务引用数</th><th></th></tr></thead>
            <tbody>
              ${rows.map(({ item, index }) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.semantic}</td>
                  <td><span class="badge ${item.active ? 'done' : 'pending'}">${item.active ? '启用中' : '已停用'}</span></td>
                  <td>${taskStatusUsageCount(item.name)}</td>
                  <td class="row-actions">
                    <button class="ghost-btn" data-action="edit-resource" data-resource-index="${index}">编辑</button>
                    <button class="muted-btn" data-action="toggle-task-status-option" data-status-option-index="${index}">${item.active ? '停用' : '启用'}</button>
                    <button class="danger-btn" data-action="delete-resource" data-resource-index="${index}" ${canDeleteTaskStatus(item) ? '' : 'disabled'}>${canDeleteTaskStatus(item) ? '删除' : '使用中'}</button>
                  </td>
                </tr>
              `).join('') || '<tr><td colspan="5">暂无任务状态</td></tr>'}
            </tbody>
          </table>
        </div>
        <section class="sub-panel">
          <div class="panel-head compact-head">
            <div>
              <h3>允许流转关系</h3>
              <p>任务详情只展示当前状态允许前往的下一状态</p>
            </div>
            <button class="ghost-btn" data-action="toggle-task-transition-form">${taskTransitionFormOpen ? '收起' : '新增流转'}</button>
          </div>
          ${taskTransitionFormOpen ? `
            <div class="inline-form">
              <select id="task-transition-from" class="select-input">
                ${activeTaskStatusNames().map((status) => `<option>${status}</option>`).join('')}
              </select>
              <select id="task-transition-to" class="select-input">
                ${activeTaskStatusNames().map((status) => `<option>${status}</option>`).join('')}
              </select>
              <button class="primary-btn" data-action="save-task-transition">保存流转</button>
            </div>
          ` : ''}
          <div class="transition-list">
            ${taskStatusTransitions.map((transition, index) => `
              <div class="transition-row">
                <span>${transition.from}</span>
                <strong>→</strong>
                <span>${transition.to}</span>
                <button class="muted-btn" data-action="delete-task-transition" data-transition-index="${index}">删除</button>
              </div>
            `).join('') || '<p class="empty-note">暂无流转关系</p>'}
          </div>
        </section>
      </div>
    `;
  }

  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>状态名称</th><th>状态</th><th></th></tr></thead>
        <tbody>
          ${rows.map(({ item, index }) => `
            <tr>
              <td>${item.name}</td>
              <td><span class="badge ${item.active ? 'done' : 'pending'}">${item.active ? '启用中' : '已停用'}</span></td>
              <td class="row-actions">
                <button class="ghost-btn" data-action="edit-resource" data-resource-index="${index}">编辑</button>
                <button class="muted-btn" data-action="toggle-customer-status-option" data-status-option-index="${index}">${item.active ? '停用' : '启用'}</button>
                <button class="danger-btn" data-action="delete-resource" data-resource-index="${index}" ${canDeleteCustomerStatus(item) ? '' : 'disabled'}>${canDeleteCustomerStatus(item) ? '删除' : '使用中'}</button>
              </td>
            </tr>
          `).join('') || '<tr><td colspan="3">暂无匹配状态</td></tr>'}
        </tbody>
      </table>
    </div>
  `;
}

function renderResourceContent() {
  const [title, subtitle] = resourceTitleMeta(selectedResourceTab);
  const isPermissionView = selectedResourceTab === 'permissions';

  resourceContent.innerHTML = `
    <div class="panel-head">
      <div>
        <h2>${title}</h2>
        <p>${subtitle}</p>
      </div>
      ${isPermissionView ? '' : `<button class="primary-btn" data-action="open-resource-create">${resourceFormOpen && resourceEditIndex === null ? '收起新增' : '新增'}</button>`}
    </div>
    <div class="resource-toolbar">
      <input id="resource-search" type="search" value="${resourceSearchKeyword}" placeholder="${isPermissionView ? '搜索权限名称 / 菜单 / 按钮 / 页面' : '搜索当前资源'}" />
      ${isPermissionView ? `
        <select id="permission-type-filter" class="select-input compact-filter">
          ${['全部类型', '菜单权限', '按钮权限'].map((type) => `<option ${permissionTypeFilter === type ? 'selected' : ''}>${type}</option>`).join('')}
        </select>
      ` : ''}
    </div>
    ${resourceFormOpen && !isPermissionView ? renderResourceForm() : ''}
    <div id="resource-table-area">
      ${renderResourceTable()}
    </div>
  `;
}

function createProjectWizardDraft() {
  return {
    externalName: '',
    internalName: '',
    modelName: '',
    managerAccount: 'wangwei',
    status: '进行中',
    salesability: '不可销售',
    unsellableReason: '仍处于设计或测试阶段',
    description: '',
    members: [
      { userAccount: 'wangwei', role: '硬件项目经理' },
      { userAccount: 'lina', role: '软件项目经理' },
      { userAccount: 'chenchen', role: '技术支持' },
    ],
    stageAssignments: {},
  };
}

function cloneAssignees(assignees) {
  return assignees.map((assignee) => ({ ...assignee }));
}

function defaultAssigneesForStage(stageName) {
  const ownerMap = {
    提出想法: [{ type: 'department', name: '销售部' }, { type: 'department', name: '产品部' }],
    讨论可行性: [{ type: 'department', name: '产品部' }],
    核算成本: [{ type: 'department', name: '运营部' }],
    硬件设计: [{ type: 'department', name: '硬件部' }],
    软件适配: [{ type: 'department', name: '软件部' }],
    测试生产: [{ type: 'department', name: '测试部' }, { type: 'department', name: '车间' }],
    试用: [{ type: 'department', name: '技术支持部' }],
    客户推广: [{ type: 'department', name: '销售部' }, { type: 'department', name: '技术支持部' }],
    客户调试: [{ type: 'department', name: '技术支持部' }],
    客户下单: [{ type: 'department', name: '销售部' }],
  };
  return cloneAssignees(ownerMap[stageName] || []);
}

function stageAssigneesFromDraft(stageName) {
  return cloneAssignees(projectWizardDraft.stageAssignments[stageName] || defaultAssigneesForStage(stageName));
}

function renderProjectMemberRows(selectedMembers, memberDataAttr, roleDataAttr, managerAccount) {
  return `
    <div class="selection-list">
      ${resourceData.users.map((user) => {
        const selectedMember = selectedMembers.find((member) => member.userAccount === user.account);
        const isManager = user.account === managerAccount;
        const visibleMember = selectedMember || (isManager ? { userAccount: user.account, role: defaultProjectMemberRole() } : null);
        return `
          <div class="selection-row project-member-row">
            <div>
              <label class="checkbox-option">
                <input type="checkbox" ${memberDataAttr} value="${user.account}" ${visibleMember ? 'checked' : ''} ${isManager ? 'disabled' : ''} />
                <span>${user.name}</span>
              </label>
              ${isManager ? '<span class="inline-note">项目负责人自动入组</span>' : ''}
              <p>${joinValues(user.departments)}</p>
            </div>
            <select class="select-input" ${roleDataAttr}="${user.account}" ${visibleMember ? '' : 'disabled'}>
              ${projectRoleOptions().map((role) => `<option ${visibleMember?.role === role.name ? 'selected' : ''}>${role.name}</option>`).join('')}
            </select>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderStageAssigneeSelector(stage, stageIndex, assignees, context) {
  const selectedUsers = assignees.filter((assignee) => assignee.type === 'user').map((assignee) => assignee.account);
  const selectedDepartments = assignees.filter((assignee) => assignee.type === 'department').map((assignee) => assignee.name);

  return `
    <article class="stage-assignment-card">
      <div>
        <h3>${stage.name}</h3>
        <p>已选择：${stageOwnerLabel({ assignees })}</p>
      </div>
      <div class="assignment-group">
        <strong>负责用户</strong>
        <div class="checkbox-grid">
          ${resourceData.users.map((user) => `
            <label class="checkbox-option">
              <input type="checkbox" data-${context}-stage-user="${stageIndex}" value="${user.account}" ${selectedUsers.includes(user.account) ? 'checked' : ''} />
              <span>${user.name}</span>
            </label>
          `).join('')}
        </div>
      </div>
      <div class="assignment-group">
        <strong>负责部门</strong>
        <div class="checkbox-grid">
          ${resourceData.departments.map((department) => `
            <label class="checkbox-option">
              <input type="checkbox" data-${context}-stage-department="${stageIndex}" value="${department.name}" ${selectedDepartments.includes(department.name) ? 'checked' : ''} />
              <span>${department.name}</span>
            </label>
          `).join('')}
        </div>
      </div>
    </article>
  `;
}

function collectProjectMembers(memberSelector, roleAttribute) {
  return [...document.querySelectorAll(memberSelector)]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => ({
      userAccount: checkbox.value,
      role: document.querySelector(`[${roleAttribute}="${checkbox.value}"]`).value,
    }));
}

function collectStageAssignees(context, stageIndex) {
  const users = [...document.querySelectorAll(`[data-${context}-stage-user="${stageIndex}"]`)]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => ({ type: 'user', account: checkbox.value }));
  const departments = [...document.querySelectorAll(`[data-${context}-stage-department="${stageIndex}"]`)]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => ({ type: 'department', name: checkbox.value }));
  return [...users, ...departments];
}

function captureWizardStepOne() {
  if (wizardStep !== 1) return;
  projectWizardDraft.externalName = document.getElementById('wizard-project-external-name').value.trim();
  projectWizardDraft.internalName = document.getElementById('wizard-project-internal-name').value.trim();
  projectWizardDraft.modelName = document.getElementById('wizard-project-model-name').value.trim();
  projectWizardDraft.managerAccount = document.getElementById('wizard-project-manager').value;
  projectWizardDraft.status = document.getElementById('wizard-project-status').value;
  projectWizardDraft.salesability = document.getElementById('wizard-project-salesability').value;
  projectWizardDraft.unsellableReason = document.getElementById('wizard-project-unsellable-reason').value;
  projectWizardDraft.description = document.getElementById('wizard-project-description').value.trim();
  projectWizardDraft.members = ensureManagerMembership(projectWizardDraft.members, projectWizardDraft.managerAccount);
}

function captureWizardStepThree() {
  if (wizardStep !== 3) return;
  projectWizardDraft.members = ensureManagerMembership(
    collectProjectMembers('[data-project-member-user]', 'data-project-member-role'),
    projectWizardDraft.managerAccount,
  );
}

function captureWizardStepFour() {
  if (wizardStep !== 4) return;
  templates[selectedTemplateIndex].stages.forEach((stageName, index) => {
    projectWizardDraft.stageAssignments[stageName] = collectStageAssignees('wizard', index);
  });
}

function createProjectFromWizard() {
  const template = templates[selectedTemplateIndex];
  const externalName = projectWizardDraft.externalName || '未命名项目';

  const project = {
    id: nextProjectId(externalName),
    externalName,
    internalName: projectWizardDraft.internalName || '-',
    modelName: projectWizardDraft.modelName || '-',
    managerAccount: projectWizardDraft.managerAccount,
    status: projectWizardDraft.status,
    archived: false,
    salesability: projectWizardDraft.salesability,
    unsellableReason: projectWizardDraft.salesability === '可销售' ? '' : projectWizardDraft.unsellableReason,
    description: projectWizardDraft.description || '暂无项目描述。',
    members: ensureManagerMembership(projectWizardDraft.members, projectWizardDraft.managerAccount),
    stages: template.stages.map((name) => ({
      name,
      assignees: cloneAssignees(projectWizardDraft.stageAssignments[name] || defaultAssigneesForStage(name)),
      status: '未开始',
    })),
    projectCustomers: [],
    projectMaterials: [],
  };

  projects.unshift(project);
  selectedProjectId = project.id;
  renderDashboard();
  renderProjectTable(projectSearch.value);
  renderTaskManagement();
  return project;
}

function renderWizard() {
  if (!projectWizardDraft) projectWizardDraft = createProjectWizardDraft();
  normalizeSelectedTemplateIndex();
  document.querySelectorAll('.wizard-step').forEach((step) => {
    step.classList.toggle('active', Number(step.dataset.step) === wizardStep);
  });

  if (wizardStep === 1) {
    wizardContent.innerHTML = `
      <div class="form-grid">
        <div class="form-field">
          <label>对外名称</label>
          <input id="wizard-project-external-name" class="text-input" value="${projectWizardDraft.externalName}" placeholder="例如 P8 dual" />
        </div>
        <div class="form-field">
          <label>内部名称</label>
          <input id="wizard-project-internal-name" class="text-input" value="${projectWizardDraft.internalName}" placeholder="例如 R2351" />
        </div>
        <div class="form-field">
          <label>Model 名称</label>
          <input id="wizard-project-model-name" class="text-input" value="${projectWizardDraft.modelName}" placeholder="例如 K1352" />
        </div>
        <div class="form-field">
          <label>项目负责人</label>
          <select id="wizard-project-manager" class="select-input">
            ${resourceData.users.map((user) => `<option value="${user.account}" ${projectWizardDraft.managerAccount === user.account ? 'selected' : ''}>${user.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>项目状态</label>
          <select id="wizard-project-status" class="select-input">
            ${['进行中', '已完成'].map((status) => `<option ${projectWizardDraft.status === status ? 'selected' : ''}>${status}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>销售状态</label>
          <select id="wizard-project-salesability" class="select-input">
            ${['可销售', '不可销售'].map((status) => `<option ${projectWizardDraft.salesability === status ? 'selected' : ''}>${status}</option>`).join('')}
          </select>
        </div>
        <div class="form-field full">
          <label>不可销售原因</label>
          <select id="wizard-project-unsellable-reason" class="select-input">
            ${['仍处于设计或测试阶段', '产品过老，不再继续推广', '被遗弃的老项目'].map((reason) => `<option ${projectWizardDraft.unsellableReason === reason ? 'selected' : ''}>${reason}</option>`).join('')}
          </select>
        </div>
        <div class="form-field full">
          <label>项目描述</label>
          <textarea id="wizard-project-description" rows="4" placeholder="补充项目说明">${projectWizardDraft.description}</textarea>
        </div>
      </div>
    `;
  }

  if (wizardStep === 2) {
    const enabledTemplates = enabledTemplateEntries();
    wizardContent.innerHTML = `
      <div class="selection-list">
        ${enabledTemplates.map(({ template, index }) => `
          <div class="selection-row">
            <div>
              <strong>${template.name}</strong>
              <p>${template.stages.join(' → ')}</p>
            </div>
            <button class="${index === selectedTemplateIndex ? 'primary-btn' : 'ghost-btn'}" data-action="select-template" data-template-index="${index}">
              ${index === selectedTemplateIndex ? '已选择' : '选择模板'}
            </button>
          </div>
        `).join('') || '<p class="empty-note">当前暂无可用于建项目的启用模板。</p>'}
      </div>
    `;
  }

  if (wizardStep === 3) {
    wizardContent.innerHTML = `
      <div class="section-intro">
        <h3>选择项目成员</h3>
        <p>项目成员引用真实用户，并在当前项目内分配项目角色；项目负责人会自动进入成员列表。</p>
      </div>
      ${renderProjectMemberRows(projectWizardDraft.members, 'data-project-member-user', 'data-project-member-role', projectWizardDraft.managerAccount)}
    `;
  }

  if (wizardStep === 4) {
    wizardContent.innerHTML = `
      <div class="section-intro">
        <h3>配置阶段负责人</h3>
        <p>每个阶段可同时指定负责用户与负责部门，支持并行协作。</p>
      </div>
      <div class="stage-assignment-list">
        ${templates[selectedTemplateIndex].stages.map((stageName, index) => renderStageAssigneeSelector(
          { name: stageName },
          index,
          stageAssigneesFromDraft(stageName),
          'wizard',
        )).join('')}
      </div>
    `;
  }

  wizardContent.insertAdjacentHTML('beforeend', `
    <div class="wizard-actions">
      <button class="muted-btn" data-action="wizard-prev" ${wizardStep === 1 ? 'disabled' : ''}>上一步</button>
      <button class="primary-btn" data-action="wizard-next">${wizardStep === 4 ? '创建项目' : '下一步'}</button>
    </div>
  `);
}


document.addEventListener('click', (event) => {
  const navTarget = event.target.closest('[data-view]');
  if (navTarget) {
    const view = navTarget.dataset.view;
    if (view === 'project-detail') {
      renderProjectDetail();
      showView('project-detail');
      return;
    }
    if (view === 'orders') renderOrderManagement();
    if (view === 'analytics') renderAnalytics();
    showView(view);
  }

  const projectButton = event.target.closest('[data-project-id]:not([data-action])');
  if (projectButton) {
    selectedProjectId = projectButton.dataset.projectId;
    renderProjectDetail();
    showView('project-detail');
  }

  const action = event.target.dataset.action;
  if (action === 'logout') {
    appShell.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    userDropdown.classList.remove('open');
    loginPassword.value = '';
    loginError.textContent = '';
  }
  if (action === 'toggle-task-form') {
    if (!taskFormOpen) resetTaskFormState();
    taskFormOpen = !taskFormOpen;
    renderTaskManagement();
  }
  if (action === 'toggle-order-form') {
    orderFormOpen = !(orderFormOpen && orderEditIndex === null);
    orderEditIndex = null;
    renderOrderManagement();
  }
  if (action === 'cancel-order-form') {
    orderFormOpen = false;
    orderEditIndex = null;
    renderOrderManagement();
  }
  if (action === 'edit-order') {
    orderFormOpen = true;
    orderEditIndex = Number(event.target.dataset.orderIndex);
    renderOrderManagement();
  }
  if (action === 'delete-order') {
    orders.splice(Number(event.target.dataset.orderIndex), 1);
    orderFormOpen = false;
    orderEditIndex = null;
    renderOrderManagement();
    renderAnalytics();
  }
  if (action === 'save-order') {
    const quantity = Number(document.getElementById('order-quantity').value);
    const unitPrice = Number(document.getElementById('order-unit-price').value);
    const nextOrder = {
      orderDate: document.getElementById('order-date').value,
      customerName: document.getElementById('order-customer').value,
      projectName: document.getElementById('order-project').value,
      quantity,
      specification: document.getElementById('order-specification').value.trim(),
      expectedShipDate: document.getElementById('order-expected-ship-date').value,
      plannedShipDate: document.getElementById('order-planned-ship-date').value,
      softwareVersion: document.getElementById('order-software-version').value.trim(),
      currency: document.getElementById('order-currency').value,
      unitPrice,
      amount: quantity * unitPrice,
    };
    if (orderEditIndex === null) {
      orders.unshift({
        id: nextOrderId(),
        ...nextOrder,
        creator: currentUser,
        histories: [],
      });
      orderFormOpen = false;
      renderOrderManagement();
      renderAnalytics();
    } else {
      const currentOrder = orders[orderEditIndex];
      const reason = document.getElementById('order-change-reason').value.trim();
      const changedFields = Object.entries(nextOrder)
        .filter(([field, value]) => currentOrder[field] !== value)
        .map(([field, value]) => `${orderFieldLabel(field)}：${currentOrder[field]} → ${value}`);
      if (reason && changedFields.length) {
        orders[orderEditIndex] = {
          ...currentOrder,
          ...nextOrder,
          histories: [
            {
              modifier: currentUser,
              modifiedAt: '2026-05-18 11:20',
              changes: changedFields.join('；'),
              reason,
            },
            ...currentOrder.histories,
          ],
        };
        orderFormOpen = false;
        orderEditIndex = null;
        renderOrderManagement();
        renderAnalytics();
      }
    }
  }
  if (action === 'open-order-history') {
    selectedOrderId = event.target.dataset.orderId;
    orderHistoryModalOpen = true;
    renderOrderManagement();
  }
  if (action === 'close-order-history') {
    orderHistoryModalOpen = false;
    selectedOrderId = null;
    renderOrderManagement();
  }
  if (action === 'save-task') {
    const title = document.getElementById('task-title').value.trim();
    if (title) {
      const expectedCompletionAt = document.getElementById('task-expected-completion-at').value.trim() || '-';
      tasks.unshift({
        id: nextTaskId(),
        title,
        description: document.getElementById('task-description').value.trim(),
        project: document.getElementById('task-project').value,
        stage: document.getElementById('task-stage').value,
        category: document.getElementById('task-category').value,
        status: activeTaskStatusNames()[0],
        priority: document.getElementById('task-priority').value,
        creator: currentUser,
        assignees: collectPeopleInputValue('task-assignees'),
        participants: collectPeopleInputValue('task-participants'),
        expectedCompletionAt,
        dueDate: expectedCompletionAt,
        source: taskFormState.source,
        customerName: '',
        attachments: [],
        comments: [],
      });
      taskFormOpen = false;
      resetTaskFormState();
      renderTaskManagement();
    }
  }
  if (action === 'create-task-from-stage') {
    stageTaskFormOpen = true;
    renderStageDetail();
  }
  if (action === 'close-stage-task-modal') {
    stageTaskFormOpen = false;
    renderStageDetail();
  }
  if (action === 'save-stage-task') {
    const project = projects.find((item) => item.id === selectedProjectId);
    const stage = project.stages[selectedStageIndex];
    const title = document.getElementById('stage-task-title').value.trim();
    if (title) {
      const expectedCompletionAt = document.getElementById('stage-task-expected-completion-at').value.trim() || '-';
      tasks.unshift({
        id: nextTaskId(),
        title,
        description: document.getElementById('stage-task-description').value.trim(),
        project: project.externalName,
        stage: stage.name,
        category: document.getElementById('stage-task-category').value,
        status: activeTaskStatusNames()[0],
        priority: document.getElementById('stage-task-priority').value,
        creator: currentUser,
        assignees: collectPeopleInputValue('stage-task-assignees'),
        participants: collectPeopleInputValue('stage-task-participants'),
        expectedCompletionAt,
        dueDate: expectedCompletionAt,
        source: '阶段详情',
        customerName: '',
        attachments: [],
        comments: [],
      });
      stageTaskFormOpen = false;
      renderTaskManagement();
      renderStageDetail();
    }
  }
  if (action === 'open-task-detail') {
    selectedTaskId = event.target.dataset.taskId;
    taskDetailReturnView = event.target.dataset.returnView || 'tasks';
    renderTaskDetail();
    showView('task-detail');
  }
  if (action === 'back-from-task-detail') {
    if (taskDetailReturnView === 'requirements') renderCustomerRequirements();
    if (taskDetailReturnView === 'tasks') renderTaskManagement();
    if (taskDetailReturnView === 'analytics') renderAnalytics();
    showView(taskDetailReturnView);
  }
  if (action === 'open-linked-requirement') {
    const linked = findRequirementById(event.target.dataset.requirementId);
    if (linked) {
      selectedProjectId = linked.project.id;
      selectedCustomerIndex = linked.customerIndex;
      requirementFormOpen = false;
      renderCustomerRequirements();
      showView('requirements');
    }
  }
  if (action === 'save-task-detail') {
    const task = tasks.find((item) => item.id === selectedTaskId);
    const expectedCompletionAt = document.getElementById('task-detail-expected-completion-at').value.trim() || '-';
    task.description = document.getElementById('task-detail-description').value.trim();
    task.priority = document.getElementById('task-detail-priority').value;
    task.assignees = collectPeopleInputValue('task-detail-assignees');
    task.participants = collectPeopleInputValue('task-detail-participants');
    task.expectedCompletionAt = expectedCompletionAt;
    task.dueDate = expectedCompletionAt;
    renderTaskDetail();
    renderTaskManagement();
  }
  if (action === 'publish-task-comment') {
    const task = tasks.find((item) => item.id === selectedTaskId);
    const text = document.getElementById('task-comment-text').value.trim();
    const attachments = [...document.getElementById('task-comment-files').files].map((file) => ({
      name: file.name,
      type: fileTypeLabel(file),
    }));

    if (text || attachments.length) {
      task.comments.unshift({
        author: currentUser,
        time: '2026-05-18 10:30',
        text,
        attachments,
      });
      renderTaskDetail();
    }
  }
  if (action === 'open-blocker-help-modal') {
    blockerHelpFormOpen = true;
    renderStageDetail();
  }
  if (action === 'open-member-modal') {
    memberModalOpen = true;
    renderProjectDetail();
  }
  if (action === 'close-member-modal') {
    memberModalOpen = false;
    renderProjectDetail();
  }
  if (action === 'save-project-members-modal') {
    const project = projects.find((item) => item.id === selectedProjectId);
    project.members = ensureManagerMembership(
      collectProjectMembers('[data-member-modal-user]', 'data-member-modal-role'),
      project.managerAccount,
    );
    memberModalOpen = false;
    renderProjectDetail();
  }
  if (action === 'close-blocker-help-modal') {
    blockerHelpFormOpen = false;
    renderStageDetail();
  }
  if (action === 'save-blocker-help-task') {
    const project = projects.find((item) => item.id === selectedProjectId);
    const stage = project.stages[selectedStageIndex];
    const title = document.getElementById('blocker-task-title').value.trim();
    const description = document.getElementById('blocker-task-description').value.trim();

    if (title && description) {
      const expectedCompletionAt = document.getElementById('blocker-task-due-date').value.trim() || '-';
      tasks.unshift({
        id: nextTaskId(),
        title,
        description,
        project: project.externalName,
        stage: stage.name,
        category: document.getElementById('blocker-task-category').value,
        status: activeTaskStatusNames()[0],
        priority: document.getElementById('blocker-task-priority').value,
        creator: currentUser,
        assignees: stageResponsibleUserNames(stage).length ? stageResponsibleUserNames(stage) : [stagePrimaryOwner(stage)],
        participants: [projectManagerName(project)],
        expectedCompletionAt,
        dueDate: expectedCompletionAt,
        source: '卡点求助',
        customerName: '',
        attachments: [],
        comments: [],
      });
      blockerHelpFormOpen = false;
      renderTaskManagement();
      showView('tasks');
    }
  }
  if (action === 'open-create') {
    wizardStep = 1;
    selectedTemplateIndex = firstEnabledTemplateIndex();
    projectWizardDraft = createProjectWizardDraft();
    renderWizard();
    showView('create-project');
  }
  if (action === 'select-template') {
    selectedTemplateIndex = Number(event.target.dataset.templateIndex);
    renderWizard();
  }
  if (action === 'open-template-create') {
    templateFormOpen = true;
    templateEditIndex = null;
    templateDraftStages = [''];
    templateDraftMeta = { name: '', scope: '', status: '草稿' };
    renderTemplates();
  }
  if (action === 'cancel-template-form') {
    templateFormOpen = false;
    templateEditIndex = null;
    templateDraftStages = [];
    templateDraftMeta = { name: '', scope: '', status: '草稿' };
    renderTemplates();
  }
  if (action === 'edit-template') {
    templateFormOpen = true;
    templateEditIndex = Number(event.target.dataset.templateIndex);
    templateDraftStages = [...templates[templateEditIndex].stages];
    templateDraftMeta = {
      name: templates[templateEditIndex].name,
      scope: templates[templateEditIndex].scope,
      status: templates[templateEditIndex].status,
    };
    renderTemplates();
  }
  if (action === 'copy-template') {
    const template = templates[Number(event.target.dataset.templateIndex)];
    templates.unshift({
      name: uniqueTemplateCopyName(template.name),
      scope: template.scope,
      status: '草稿',
      updatedAt: prototypeToday,
      stages: [...template.stages],
    });
    renderTemplates();
  }
  if (action === 'toggle-template-status') {
    const templateIndex = Number(event.target.dataset.templateIndex);
    const template = templates[templateIndex];
    if (template.status === '启用' && enabledTemplateEntries().length <= 1) return;
    template.status = template.status === '启用' ? '停用' : '启用';
    template.updatedAt = prototypeToday;
    renderTemplates();
  }
  if (action === 'delete-template') {
    const templateIndex = Number(event.target.dataset.templateIndex);
    if (templates[templateIndex].status === '启用') return;
    templates.splice(templateIndex, 1);
    if (templateEditIndex === templateIndex) {
      templateFormOpen = false;
      templateEditIndex = null;
      templateDraftStages = [];
      templateDraftMeta = { name: '', scope: '', status: '草稿' };
    } else if (templateEditIndex !== null && templateEditIndex > templateIndex) {
      templateEditIndex -= 1;
    }
    renderTemplates();
  }
  if (action === 'add-template-stage') {
    captureTemplateFormDraft();
    templateDraftStages.push('');
    renderTemplates();
  }
  if (action === 'delete-template-stage') {
    captureTemplateFormDraft();
    templateDraftStages.splice(Number(event.target.dataset.templateStageIndex), 1);
    if (!templateDraftStages.length) templateDraftStages = [''];
    renderTemplates();
  }
  if (action === 'move-template-stage') {
    captureTemplateFormDraft();
    const index = Number(event.target.dataset.templateStageIndex);
    const nextIndex = event.target.dataset.direction === 'up' ? index - 1 : index + 1;
    if (nextIndex >= 0 && nextIndex < templateDraftStages.length) {
      [templateDraftStages[index], templateDraftStages[nextIndex]] = [templateDraftStages[nextIndex], templateDraftStages[index]];
    }
    renderTemplates();
  }
  if (action === 'save-template') {
    captureTemplateFormDraft();
    const name = templateDraftMeta.name.trim();
    const scope = templateDraftMeta.scope.trim();
    const status = templateDraftMeta.status;
    const stages = templateDraftStages.map((stage) => stage.trim()).filter(Boolean);
    const previousTemplate = templateEditIndex === null ? null : templates[templateEditIndex];
    const wouldDisableLastEnabledTemplate = previousTemplate?.status === '启用' && status !== '启用' && enabledTemplateEntries().length <= 1;

    if (name && scope && stages.length && !wouldDisableLastEnabledTemplate) {
      const nextTemplate = {
        name,
        scope,
        status,
        updatedAt: prototypeToday,
        stages,
      };
      if (templateEditIndex === null) {
        templates.unshift(nextTemplate);
      } else {
        templates[templateEditIndex] = nextTemplate;
      }
      templateFormOpen = false;
      templateEditIndex = null;
      templateDraftStages = [];
      templateDraftMeta = { name: '', scope: '', status: '草稿' };
      renderTemplates();
    }
  }
  if (action === 'open-project-edit') {
    editingProjectId = event.target.dataset.projectId;
    renderProjectEdit();
    showView('project-edit');
  }
  if (action === 'save-project-edit') {
    const project = projects.find((item) => item.id === editingProjectId);
    const previousExternalName = project.externalName;
    project.externalName = document.getElementById('edit-project-external-name').value.trim() || project.externalName;
    project.internalName = document.getElementById('edit-project-internal-name').value.trim() || project.internalName;
    project.modelName = document.getElementById('edit-project-model-name').value.trim() || project.modelName;
    project.managerAccount = document.getElementById('edit-project-manager').value;
    project.status = document.getElementById('edit-project-status').value;
    project.salesability = document.getElementById('edit-project-salesability').value;
    project.unsellableReason = project.salesability === '可销售' ? '' : document.getElementById('edit-project-unsellable-reason').value;
    project.description = document.getElementById('edit-project-description').value.trim() || project.description;
    project.members = ensureManagerMembership(
      collectProjectMembers('[data-edit-member-user]', 'data-edit-member-role'),
      project.managerAccount,
    );
    project.stages.forEach((stage, index) => {
      stage.assignees = collectStageAssignees('edit', index);
    });
    if (previousExternalName !== project.externalName) {
      tasks.filter((task) => task.project === previousExternalName).forEach((task) => {
        task.project = project.externalName;
      });
      orders.filter((order) => order.projectName === previousExternalName).forEach((order) => {
        order.projectName = project.externalName;
      });
    }
    selectedProjectId = project.id;
    renderDashboard();
    renderProjectTable(projectSearch.value);
    renderTaskManagement();
    renderProjectDetail();
    showView('project-detail');
  }
  if (action === 'toggle-project-archive') {
    const project = projects.find((item) => item.id === event.target.dataset.projectId);
    project.archived = !project.archived;
    renderDashboard();
    renderProjectTable(projectSearch.value);
    if (selectedProjectId === project.id) renderProjectDetail();
  }
  if (action === 'wizard-prev' && wizardStep > 1) {
    if (wizardStep === 3) captureWizardStepThree();
    if (wizardStep === 4) captureWizardStepFour();
    wizardStep -= 1;
    renderWizard();
  }
  if (action === 'wizard-next') {
    if (wizardStep === 1) captureWizardStepOne();
    if (wizardStep === 3) captureWizardStepThree();
    if (wizardStep === 4) captureWizardStepFour();
    if (wizardStep < 4) {
      wizardStep += 1;
      renderWizard();
    } else {
      createProjectFromWizard();
      renderProjectDetail();
      showView('project-detail');
    }
  }
  if (action === 'open-customers') {
    projectCustomerFormOpen = false;
    renderProjectCustomers();
    showView('customers');
  }
  if (action === 'open-materials') {
    renderProjectMaterials();
    showView('materials');
  }
  if (action === 'open-customer-requirements') {
    selectedCustomerIndex = Number(event.target.dataset.customerIndex);
    requirementFormOpen = false;
    renderCustomerRequirements();
    showView('requirements');
  }
  if (action === 'open-requirement-overview') {
    renderRequirementOverview();
    showView('requirement-overview');
  }
  if (action === 'open-stage-detail') {
    selectedStageIndex = Number(event.target.dataset.stageDetailIndex);
    renderStageDetail();
    showView('stage-detail');
  }
  if (action === 'toggle-project-customer-form') {
    projectCustomerFormOpen = !projectCustomerFormOpen;
    renderProjectCustomers();
  }
  if (action === 'save-project-customer') {
    const customerName = document.getElementById('project-customer-name').value;
    const projectStatus = document.getElementById('project-customer-status').value;
    const customer = customers.find((item) => item.name === customerName);
    const project = projects.find((item) => item.id === selectedProjectId);

    if (customer) {
      project.projectCustomers.push({
        customerName: customer.name,
        region: customer.region,
        projectStatus,
        requirements: [],
      });
      projectCustomerFormOpen = false;
      renderProjectCustomers();
      renderProjectDetail();
    }
  }
  if (action === 'open-resource-create') {
    if (selectedResourceTab === 'permissions') return;
    resourceFormOpen = !(resourceFormOpen && resourceEditIndex === null);
    resourceEditIndex = null;
    renderResourceContent();
  }
  if (action === 'cancel-resource-form') {
    resourceFormOpen = false;
    resourceEditIndex = null;
    renderResourceContent();
  }
  if (action === 'edit-resource') {
    resourceFormOpen = true;
    resourceEditIndex = Number(event.target.dataset.resourceIndex);
    renderResourceContent();
  }
  if (action === 'delete-resource') {
    const rows = resourceRowsForTab(selectedResourceTab);
    const resourceIndex = Number(event.target.dataset.resourceIndex);
    const resource = rows[resourceIndex];
    const canDelete = selectedResourceTab === 'departments' ? canDeleteDepartment(resource)
      : selectedResourceTab === 'roles' ? canDeleteRole(resource)
      : selectedResourceTab === 'customers' ? canDeleteCustomer(resource)
      : selectedResourceTab === 'customer-statuses' ? canDeleteCustomerStatus(resource)
      : selectedResourceTab === 'task-statuses' ? canDeleteTaskStatus(resource)
      : true;
    if (!canDelete) return;
    rows.splice(resourceIndex, 1);
    resourceFormOpen = false;
    resourceEditIndex = null;
    renderResourceContent();
  }
  if (action === 'toggle-user-status') {
    const user = resourceData.users[Number(event.target.dataset.resourceIndex)];
    user.status = user.status === '启用' ? '停用' : '启用';
    renderResourceContent();
  }
  if (action === 'save-resource') {
    let nextItem = null;

    if (selectedResourceTab === 'users') {
      const name = document.getElementById('resource-user-name').value.trim();
      const account = document.getElementById('resource-user-account').value.trim();
      const departments = selectedCheckboxValues('[data-user-department]');
      if (name && account && departments.length) {
        nextItem = {
          name,
          account,
          departments,
          globalRoles: selectedCheckboxValues('[data-user-global-role]'),
          directPermissions: selectedCheckboxValues('[data-user-direct-permission]'),
          status: document.getElementById('resource-user-status').value,
        };
      }
    }

    if (selectedResourceTab === 'departments') {
      const name = document.getElementById('resource-department-name').value.trim();
      if (name) {
        nextItem = {
          name,
          parent: document.getElementById('resource-department-parent').value,
        };
      }
    }

    if (selectedResourceTab === 'roles') {
      const name = document.getElementById('resource-role-name').value.trim();
      if (name) {
        nextItem = {
          name,
          type: document.getElementById('resource-role-type').value,
          permissions: selectedCheckboxValues('[data-role-permission]'),
          status: document.getElementById('resource-role-status').value,
        };
      }
    }

    if (selectedResourceTab === 'customers') {
      const name = document.getElementById('customer-name').value.trim();
      const region = document.getElementById('customer-region').value.trim();
      if (name && region) {
        nextItem = {
          name,
          shortName: document.getElementById('customer-short-name').value.trim() || '-',
          region,
          salesOwners: selectedCheckboxValues('[data-customer-sales-owner]'),
          supportOwners: selectedCheckboxValues('[data-customer-support-owner]'),
          status: document.getElementById('customer-status').value,
        };
      }
    }

    if (selectedResourceTab === 'customer-statuses') {
      const name = document.getElementById('customer-status-option-name').value.trim();
      if (name) {
        nextItem = {
          name,
          active: document.getElementById('customer-status-option-active').value === '启用',
        };
      }
    }

    if (selectedResourceTab === 'task-statuses') {
      const name = document.getElementById('task-status-name').value.trim();
      if (name) {
        nextItem = {
          name,
          semantic: document.getElementById('task-status-semantic').value,
          active: document.getElementById('task-status-active').value === '启用',
        };
      }
    }

    if (nextItem) {
      const rows = resourceRowsForTab(selectedResourceTab);
      const previousItem = resourceEditIndex === null ? null : rows[resourceEditIndex];
      if (resourceEditIndex === null) {
        rows.unshift(nextItem);
      } else {
        rows[resourceEditIndex] = nextItem;
        if (selectedResourceTab === 'users') {
          renameUserReferences(previousItem.name, nextItem.name);
          renameUserAccountReferences(previousItem.account, nextItem.account);
        }
        if (selectedResourceTab === 'departments') renameDepartmentReferences(previousItem.name, nextItem.name);
        if (selectedResourceTab === 'roles') {
          renameRoleReferences(previousItem.name, nextItem.name);
          if (previousItem.type === '全局角色' && nextItem.type !== '全局角色') {
            resourceData.users.forEach((user) => {
              user.globalRoles = user.globalRoles.filter((role) => role !== nextItem.name);
            });
          }
        }
        if (selectedResourceTab === 'customers') renameCustomerReferences(previousItem.name, nextItem.name);
        if (selectedResourceTab === 'task-statuses' && previousItem.name !== nextItem.name) {
          tasks.filter((task) => task.status === previousItem.name).forEach((task) => {
            task.status = nextItem.name;
          });
          taskStatusTransitions
            .filter((transition) => transition.from === previousItem.name)
            .forEach((transition) => {
              transition.from = nextItem.name;
            });
          taskStatusTransitions
            .filter((transition) => transition.to === previousItem.name)
            .forEach((transition) => {
              transition.to = nextItem.name;
            });
        }
      }
      resourceFormOpen = false;
      resourceEditIndex = null;
      renderResourceContent();
    }
  }
  if (action === 'toggle-customer-status-option') {
    const index = Number(event.target.dataset.statusOptionIndex);
    customerProjectStatusOptions[index].active = !customerProjectStatusOptions[index].active;
    renderResourceContent();
  }
  if (action === 'toggle-task-status-option') {
    const index = Number(event.target.dataset.statusOptionIndex);
    taskStatusOptions[index].active = !taskStatusOptions[index].active;
    renderResourceContent();
  }
  if (action === 'toggle-task-transition-form') {
    taskTransitionFormOpen = !taskTransitionFormOpen;
    renderResourceContent();
  }
  if (action === 'save-task-transition') {
    const from = document.getElementById('task-transition-from').value;
    const to = document.getElementById('task-transition-to').value;
    if (from !== to && !taskStatusTransitions.some((transition) => transition.from === from && transition.to === to)) {
      taskStatusTransitions.push({ from, to });
    }
    taskTransitionFormOpen = false;
    renderResourceContent();
  }
  if (action === 'delete-task-transition') {
    taskStatusTransitions.splice(Number(event.target.dataset.transitionIndex), 1);
    renderResourceContent();
  }
  if (action === 'publish-stage-file') {
    const project = projects.find((item) => item.id === selectedProjectId);
    const stage = project.stages[selectedStageIndex];
    const fileName = event.target.dataset.fileName;
    const alreadyPublished = project.projectMaterials.some((material) => material.name === fileName);

    if (!alreadyPublished) {
      project.projectMaterials.unshift({
        name: fileName,
        sourceStage: stage.name,
        shareTarget: '项目资料区',
        publishedAt: '2026-05-15 15:40',
      });
    }
    renderStageDetail();
  }
  if (action === 'publish-stage-message') {
    const project = projects.find((item) => item.id === selectedProjectId);
    const stage = project.stages[selectedStageIndex];
    const textValue = document.getElementById('stage-message-text').value.trim();
    const attachments = [...document.getElementById('stage-message-files').files].map((file) => ({
      name: file.name,
      type: file.type.startsWith('image/') ? '图片' : file.type.startsWith('video/') ? '视频' : '文件',
    }));

    if (textValue || attachments.length) {
      stage.messages.push({
        author: '李娜',
        time: '2026-05-15 15:30',
        text: textValue || '补充附件',
        attachments,
      });
      renderStageDetail();
    }
  }
  if (action === 'toggle-requirement-form') {
    requirementFormOpen = !requirementFormOpen;
    renderCustomerRequirements();
  }
  if (action === 'save-requirement') {
    const project = projects.find((item) => item.id === selectedProjectId);
    const customer = project.projectCustomers[selectedCustomerIndex];
    const title = document.getElementById('requirement-title').value.trim();
    const userStory = document.getElementById('requirement-user-story').value.trim();
    const value = document.getElementById('requirement-value').value.trim();
    const acceptance = document.getElementById('requirement-acceptance').value.trim();
    const createLinkedTask = document.getElementById('requirement-create-task').checked;

    if (title && userStory && value && acceptance) {
      const requirementId = nextRequirementId();
      const linkedTaskId = createLinkedTask ? nextTaskId() : '';
      customer.requirements.unshift({
        id: requirementId,
        title,
        userStory,
        value,
        acceptance,
        priority: document.getElementById('requirement-priority').value,
        status: createLinkedTask ? '实现中' : '待评估',
        proposer: customer.customerName,
        creator: currentUser,
        date: '2026-05-15',
        taskId: linkedTaskId,
      });
      if (createLinkedTask) {
        tasks.unshift({
          id: linkedTaskId,
          title: `实现需求：${title}`,
          description: `${customer.customerName} 提出需求：${userStory}`,
          project: project.externalName,
          stage: '客户需求',
          category: '需求',
          status: activeTaskStatusNames()[0],
          priority: document.getElementById('requirement-priority').value,
          creator: currentUser,
          assignees: [currentUser],
          participants: [],
          expectedCompletionAt: '2026-05-30',
          dueDate: '2026-05-30',
          source: '客户需求',
          linkedRequirementId: requirementId,
          customerName: customer.customerName,
          attachments: [],
          comments: [],
        });
        renderTaskManagement();
      }
      requirementFormOpen = false;
      renderCustomerRequirements();
    }
  }
  if (action === 'void-requirement') {
    const project = projects.find((item) => item.id === selectedProjectId);
    const customer = project.projectCustomers[selectedCustomerIndex];
    customer.requirements[Number(event.target.dataset.requirementIndex)].status = '已作废';
    renderCustomerRequirements();
  }
  if (action === 'delete-requirement') {
    const project = projects.find((item) => item.id === selectedProjectId);
    const customer = project.projectCustomers[selectedCustomerIndex];
    customer.requirements.splice(Number(event.target.dataset.requirementIndex), 1);
    renderCustomerRequirements();
  }
  const stepButton = event.target.closest('[data-step]');
  if (stepButton) {
    if (wizardStep === 1 && Number(stepButton.dataset.step) > 1) captureWizardStepOne();
    if (wizardStep === 3 && Number(stepButton.dataset.step) !== 3) captureWizardStepThree();
    if (wizardStep === 4 && Number(stepButton.dataset.step) !== 4) captureWizardStepFour();
    wizardStep = Number(stepButton.dataset.step);
    renderWizard();
  }

  const tab = event.target.closest('[data-tab]');
  if (tab) {
    selectedResourceTab = tab.dataset.tab;
    resourceFormOpen = false;
    resourceEditIndex = null;
    resourceSearchKeyword = '';
    permissionTypeFilter = '全部类型';
    document.querySelectorAll('.tab').forEach((item) => item.classList.toggle('active', item.dataset.tab === selectedResourceTab));
    renderResourceContent();
  }

  const analyticsTabButton = event.target.closest('[data-analytics-tab]');
  if (analyticsTabButton) {
    analyticsTab = analyticsTabButton.dataset.analyticsTab;
    supportTaskModalId = null;
    renderAnalytics();
  }

  if (action === 'open-support-task-modal') {
    supportTaskModalId = event.target.dataset.taskId;
    renderSupportAnalytics();
  }
  if (action === 'close-support-task-modal') {
    supportTaskModalId = null;
    renderSupportAnalytics();
  }
});


document.addEventListener('change', (event) => {
  if (event.target.matches('[data-project-member-user]')) {
    document.querySelector(`[data-project-member-role="${event.target.value}"]`).disabled = !event.target.checked;
  }

  if (event.target.matches('[data-edit-member-user]')) {
    document.querySelector(`[data-edit-member-role="${event.target.value}"]`).disabled = !event.target.checked;
  }

  if (event.target.matches('[data-member-modal-user]')) {
    document.querySelector(`[data-member-modal-role="${event.target.value}"]`).disabled = !event.target.checked;
  }

  const stageSelect = event.target.closest('[data-stage-index]');
  if (stageSelect) {
    const project = projects.find((item) => item.id === selectedProjectId);
    project.stages[Number(stageSelect.dataset.stageIndex)].status = stageSelect.value;
    renderProjectDetail();
    renderProjectTable(projectSearch.value);
    renderDashboard();
  }

  const projectCustomerSelect = event.target.closest('[data-project-customer-index]');
  if (projectCustomerSelect) {
    const project = projects.find((item) => item.id === selectedProjectId);
    project.projectCustomers[Number(projectCustomerSelect.dataset.projectCustomerIndex)].projectStatus = projectCustomerSelect.value;
    renderProjectCustomers();
  }

  if (event.target.id === 'stage-file-input') {
    const project = projects.find((item) => item.id === selectedProjectId);
    const stage = project.stages[selectedStageIndex];
    [...event.target.files].forEach((file) => {
      stage.files.unshift({
        name: file.name,
        type: file.type.startsWith('image/') ? '图片' : file.type.startsWith('video/') ? '视频' : '文件',
        size: '新上传',
        uploader: '李娜',
        time: '2026-05-15 15:30',
      });
    });
    renderStageDetail();
  }

  if (event.target.id === 'task-file-input') {
    const task = tasks.find((item) => item.id === selectedTaskId);
    [...event.target.files].forEach((file) => {
      task.attachments.unshift({
        name: file.name,
        type: fileTypeLabel(file),
        size: '新上传',
        uploader: currentUser,
        time: '2026-05-18 10:30',
      });
    });
    renderTaskDetail();
  }

  if (event.target.id === 'task-detail-status') {
    const task = tasks.find((item) => item.id === selectedTaskId);
    task.status = event.target.value;
    syncRequirementStatusFromTask(task);
    renderTaskDetail();
    renderTaskManagement();
  }
});

document.addEventListener('input', (event) => {
  if (event.target.id === 'task-keyword') {
    renderTaskManagement();
  }
  if (event.target.id === 'order-keyword') {
    renderOrderManagement();
  }
  if (event.target.id === 'template-search') {
    if (templateFormOpen) captureTemplateFormDraft();
    templateSearchKeyword = event.target.value;
    renderTemplates();
  }
  if (event.target.id === 'resource-search') {
    resourceSearchKeyword = event.target.value;
    document.getElementById('resource-table-area').innerHTML = renderResourceTable();
  }
});

document.addEventListener('change', (event) => {
  if (['task-project-filter', 'task-status-filter', 'task-priority-filter', 'task-assignee-filter', 'task-category-filter'].includes(event.target.id)) {
    renderTaskManagement();
  }
  if (event.target.id === 'analytics-period') {
    analyticsOrderPeriod = event.target.value;
    renderOrderAnalytics();
  }
  if (event.target.id === 'analytics-year') {
    analyticsYear = event.target.value;
    renderOrderAnalytics();
  }
  if (event.target.id === 'analytics-quarter') {
    analyticsQuarter = event.target.value;
    renderOrderAnalytics();
  }
  if (event.target.id === 'analytics-month') {
    analyticsMonth = event.target.value;
    renderOrderAnalytics();
  }
  if (event.target.matches('[data-analytics-project]')) {
    analyticsProjectFilter = selectedCheckboxValues('[data-analytics-project]');
    renderOrderAnalytics();
  }
  if (event.target.id === 'support-customer-filter') {
    selectedSupportCustomer = event.target.value;
    supportTaskModalId = null;
    renderSupportAnalytics();
  }
  if (event.target.id === 'template-status-filter') {
    if (templateFormOpen) captureTemplateFormDraft();
    templateStatusKeyword = event.target.value;
    renderTemplates();
  }
  if (event.target.id === 'permission-type-filter') {
    permissionTypeFilter = event.target.value;
    document.getElementById('resource-table-area').innerHTML = renderResourceTable();
  }
});

languageToggle.addEventListener('click', () => {
  languageToggle.textContent = languageToggle.textContent.includes('中文') ? 'EN / 中文' : '中文 / EN';
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (loginAccount.value.trim() === 'zhangmin' && loginPassword.value === '123456') {
    loginScreen.classList.add('hidden');
    appShell.classList.remove('hidden');
    loginError.textContent = '';
  } else {
    loginError.textContent = '账号或密码不正确';
  }
});

userMenuTrigger.addEventListener('click', () => {
  userDropdown.classList.toggle('open');
});

loginPassword.addEventListener('focus', () => {
  loginScreen.classList.add('cover-eyes');
});

loginPassword.addEventListener('blur', () => {
  loginScreen.classList.remove('cover-eyes');
});

loginScreen.addEventListener('mousemove', (event) => {
  if (loginScreen.classList.contains('cover-eyes')) return;
  document.querySelectorAll('.watcher').forEach((watcher) => {
    const rect = watcher.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    watcher.style.setProperty('--eye-x', `${Math.cos(angle) * 4}px`);
    watcher.style.setProperty('--eye-y', `${Math.sin(angle) * 4}px`);
  });
});

document.addEventListener('mousedown', (event) => {
  const viewport = event.target.closest('#resource-map-viewport');
  if (viewport) {
    mapDragState = { startX: event.clientX, startY: event.clientY, originX: mapOffset.x, originY: mapOffset.y };
  }
});

document.addEventListener('mousemove', (event) => {
  if (!mapDragState) return;
  mapOffset = {
    x: mapDragState.originX + event.clientX - mapDragState.startX,
    y: mapDragState.originY + event.clientY - mapDragState.startY,
  };
  const mapCanvas = document.getElementById('resource-map-canvas');
  if (mapCanvas) mapCanvas.style.transform = `translate(${mapOffset.x}px, ${mapOffset.y}px)`;
});

document.addEventListener('mouseup', () => {
  mapDragState = null;
});

projectSearch.addEventListener('input', (event) => {
  renderProjectTable(event.target.value);
});

salesabilityFilter.addEventListener('change', () => {
  renderProjectTable(projectSearch.value);
});

archiveFilter.addEventListener('change', () => {
  renderProjectTable(projectSearch.value);
});

ensureStageCollaborationData();
ensureTaskCollaborationData();
renderDashboard();
renderTaskManagement();
renderOrderManagement();
renderAnalytics();
renderProjectTable();
renderTemplates();
renderResourceContent();
renderWizard();
