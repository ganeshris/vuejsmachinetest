import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/report",
      component: () => import("../views/Report.vue"),
    },
    {
      path: "/setup",
      component: () => import("../views/Setup.vue"),
    },
    {
      path: "/",
      component: () => import("../components/Login/LoginComponent.vue"),
    },
    {
      path: "/createacc",
      component: () => import("../components/Login/CreateAccount.vue"),
    },
    {
      path: "/forgetPassword",
      component: () => import("../components/Login/ResetPassword.vue"),
    },
    {
      path: "/usermaintenance",
      component: () => import("../views/setupTools/UserMaintenance.vue"),
    },
    {
      path: "/userGroupmaintenance",
      component: () => import("../views/setupTools/UserGroupMaintenance.vue"),
    },
    {
      path: "/menumaintenance",
      component: () => import("../views/setupTools/MenuMaintance.vue"),
    },
    {
      path: "/menuaccesscontrol",
      component: () => import("../views/setupTools/MenuAccessControl.vue"),
    },
    // {
    //   path: "/systemparameter",
    //   component: () => import("../views/setupTools/SystemParameter.vue"),
    // },
    {
      path: "/accesstype",
      component: () => import("../views/setupTools/AccessType.vue"),
    },
    {
      path: "/documentsequence",
      component: () => import("../views/setupTools/DocumentSequence.vue"),
    },
    // {
    //   path: "/reports",
    //   component: () => import("../views/setupTools/Reports.vue"),
    // },
    {
      path: "/dashboardescription",
      component: () => import("../views/setupTools/DashboardDescription.vue"),
    },
    // {
    //   path: "/reportbuildersql",
    //   component: () => import("../views/reportbuilder/ReportBuilderSQL.vue"),
    // },
    // {
    //   path: "/reportbuilderurl",
    //   component: () => import("../views/reportbuilder/ReportBuilderURL.vue"),
    // },


 // buildercomponents
{
  path: "/Formatest",
  component: () => import("../components/BuilderComponents/basicp1/Formatest/Formatest.vue"),
},
 
 {
  path: "/datfolder",
  component: () => import("../components/BuilderComponents/Test/DataTable.vue"),
},
 
  ],
});
export default router;