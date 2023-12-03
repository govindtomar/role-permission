import Dashboard from '../pages/Dashboard';
//User
import AddUser from '../pages/User/AddUser'
import User from '../pages/User/User'
import EditUser from '../pages/User/EditUser'
//Role
import AddRole from '../pages/RolePermission/Role/AddRole'
import Role from '../pages/RolePermission/Role/Role'
import EditRole from 'src/pages/RolePermission/Role/EditRole';
//Permission
import AddPermission from '../pages/RolePermission/Permission/AddPermission'
import Permission from '../pages/RolePermission/Permission/Permission'
import EditPermission from 'src/pages/RolePermission/Permission/EditPermission';
//Permission Module
import PermissionModule from '../pages/RolePermission/PermissionModule/PermissionModule'
import AddPermissionModule from '../pages/RolePermission/PermissionModule/AddPermissionModule'
import EditPermissionModule from '../pages/RolePermission/PermissionModule/EditPermissionModule'
//Role Permission
import RolePermission from 'src/pages/RolePermission/RolePermission';
//Service
import AddService from '../pages/Service/AddService'
import Service from '../pages/Service/Service'
import EditService from '../pages/Service/EditService'


const BackendPrivateRoutes = [
    {
        path: 'user/add',
        element: <AddUser />,
    },
    {
        path: 'user',
        element: <User />,
    },
    {
        path: 'user/:id/edit', 
        element: <EditUser />
    },
    {
        path: 'dashboard',
        element: <Dashboard />
    },
    {
        path: 'role/add',
        element: <AddRole />,
    },
    {
        path: 'role',
        element: <Role />,
    },
    {
        path: 'role/:id/edit', 
        element: <EditRole />
    },
    {
        path: 'role-permission/:slug', 
        element: <RolePermission />
    },
    {
        path: 'permission/add/:id',
        element: <AddPermission />,
    },
    {
        path: 'permission/:id',
        element: <Permission />,
    },
    {
        path: 'permission/:id/edit/:pid', 
        element: <EditPermission />
    },
    {
        path: 'service/add', 
        element: <AddService />
    },
    {
        path: 'service', 
        element: <Service />
    },
    {
        path: 'service/:id/edit', 
        element: <EditService />
    },
    {
        path: 'permission-module',
        element: <PermissionModule />,
    },
    {
        path: 'permission-module/add',
        element: <AddPermissionModule />,
    },
    {
        path: 'permission-module/:id/edit',
        element: <EditPermissionModule />,
    },
]


export default BackendPrivateRoutes;