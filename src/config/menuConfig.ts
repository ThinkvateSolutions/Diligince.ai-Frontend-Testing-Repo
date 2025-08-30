import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  BarChart3, 
  Settings,
  Briefcase,
  MessageSquare,
  Quote,
  Workflow,
  Plus,
  List,
  Archive,
  Users,
  User,
  SettingsIcon,
  LogOut,
  GitPullRequestDraftIcon
} from 'lucide-react';

interface MenuItem {
  icon: any;
  label: string;
  path: string;
  submenu?: {
    icon: any;
    label: string;
    path: string;
  }[];
}

interface MenuConfig {
  industry: MenuItem[];
  professional: MenuItem[];
  vendor: MenuItem[];
}

export const menuConfig: MenuConfig = {
  industry: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { 
      icon: FileText, 
      label: 'Requirements', 
      path: '/requirements',
      submenu: [
        { icon: GitPullRequestDraftIcon, label: 'Drafts', path: '/requirements/drafts' },
        { icon: Archive, label: 'Approvals', path: '/requirements/approvals' },
        { icon: List, label: 'Published', path: '/requirements/published' }
      ]
    },
    { icon: Quote, label: 'Quotations', path: '/quotations' },
    { icon: Workflow, label: 'Workflows', path: '/workflows' },
    { icon: MessageSquare, label: 'Chats', path: '/chats' },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      submenu: [
        { icon: Users, label: 'Company Profile', path: '/settings/company' },
        { icon: Users, label: 'Members', path: '/settings/members' },
        { icon: Quote, label: 'Payments', path: '/settings/payments' },
        { icon: Workflow , label: 'Approval Workflows', path: '/settings/approval-workflows' }
      ]
    },

  ],
  professional: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Briefcase, label: 'Opportunities', path: '/assignments' },
    { icon: MessageSquare, label: 'Requests', path: '/requests' },
    { icon: Users, label: 'My Proposals', path: '/proposals' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ],
  vendor: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { 
      icon: FileText, 
      label: 'Requirements', 
      path: '/quotations',
      submenu: [
        { icon: List, label: 'Available', path: '/quotations' },
        { icon: Quote, label: 'My Quotations', path: '/quotations/sent' }
      ]
    },
    { icon: MessageSquare, label: 'Chats', path: '/workflows' },
    { icon: Workflow, label: 'Projects', path: '/projects' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ]
};