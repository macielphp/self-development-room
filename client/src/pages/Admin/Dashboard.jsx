import React from 'react'
// Local Component
import DrawerLayout from '../../components/Admin/DrawerLayout'
// Mui Components
import { Typography, Card, CardContent } from '@mui/material';
// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const navItems = [
  { text: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> },
  { text: 'Languages', path: '/admin/languages', icon: <LanguageIcon /> },
  { text: 'Seasons', path: '/admin/seasons', icon: <CalendarMonthIcon /> },
  { text: 'Lessons', path: '/admin/lessons', icon: <MenuBookIcon /> },
  { text: 'Questions', path: '/admin/questions', icon: <QuizIcon /> },
  { text: 'Alternatives', path: '/admin/alternatives', icon: <CheckCircleIcon /> },
  { text: 'Users', path: '/admin/users', icon: <PeopleIcon /> },
  { text: 'Admins', path: '/admin/admins', icon: <AdminPanelSettingsIcon /> }
];

export default function Dashboard(props) {
  return (
    <DrawerLayout
      window={props.window}
      title="Admin Dashboard"
      navigationItems={navItems}>
          <Typography variant="h4" gutterBottom>
        Welcome to Admin Dashboard
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body1">
            Use the menu to navigate between modules and manage your content.
          </Typography>
        </CardContent>
      </Card>
      {/* Outros cards ou componentes de overview podem vir aqui */}
    </DrawerLayout>
  )
}

