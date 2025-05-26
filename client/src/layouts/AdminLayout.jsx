import React from 'react'
import { Outlet } from 'react-router-dom'
// Local Component
import DrawerLayout from '../components/Admin/DrawerLayout'
// Mui Components
import DashboardIcon from '@mui/icons-material/Dashboard';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const navItems = [
  { text: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> },
  { text: 'Languages', path: '/admin/languages', icon: <LanguageIcon /> },
  { text: 'Seasons', path: '/admin/seasons', icon: <CalendarMonthIcon /> },
  { text: 'Lessons', path: '/admin/lessons', icon: <MenuBookIcon /> },
  { text: 'Questions', path: '/admin/questions', icon: <QuizIcon /> },
  { text: 'Users', path: '/admin/users', icon: <PeopleIcon /> },
  { text: 'Admins', path: '/admin/admins', icon: <AdminPanelSettingsIcon /> }
];

export default function AdminLayout(props) {
  return (
    <DrawerLayout
      window={props.window}
      title="Admin Dashboard"
      navigationItems={navItems}
    >
        <Outlet />
    </DrawerLayout>
  )
}

