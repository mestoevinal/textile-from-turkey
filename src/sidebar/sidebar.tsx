import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Icon, type IconName } from '../components/Icon/Icon';

type SidebarMenuGroup = { 
  icon: IconName; 
  name: string; 
  subItems: { name: string; path: string }[];
}

type SidebarMenuLink = { 
  icon: IconName; 
  name: string; 
  path: string;
}

type SidebarMenuItem = SidebarMenuGroup | SidebarMenuLink;

const mockNavItems: SidebarMenuItem[] = [
  { 
    icon: 'Grid', 
    name: 'Dashboard', 
    subItems: [{ name: 'Ecommerce', path: '/' }],
  }, 
  { 
    icon: 'Calendar', 
    name: 'Calendar', 
    path: '/calendar',
  },
  { 
    icon: 'UserCircle', 
    name: 'User Profile', 
    path: '/profile',
  },
  { 
    name: 'Pages', 
    icon: 'Page', 
    subItems: [ 
      { name: 'Blank Page', path: '/blank' }, 
      { name: '404 Error', path: '/error-404' },
    ],
  },
];

const mockOthersItems: SidebarMenuItem[] = [ 
  { 
    icon: 'PieChart', 
    name: 'Charts', 
    subItems: [ 
      { name: 'Line Chart', path: '/line-chart' }, 
      { name: 'Bar Chart', path: '/bar-chart' }, 
    ],
  },
  { 
    icon: 'PlugIn', 
    name: 'Authentication', 
    subItems: [ 
      { name: 'Sign In', path: '/signin' }, 
      { name: 'Sign Up', path: '/signup' },
    ],
  },
];

const MenuItemComponent: React.FC<{ item: SidebarMenuItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isGroup = 'subItems' in item;

  if (isGroup) {
    const isAnySubItemActive = item.subItems.some(sub => sub.path === location.pathname);
    
    return (
      <li>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex flex-row items-center cursor-pointer justify-start gap-3 px-3 py-2 rounded-lg transition-colors ${
            isOpen || isAnySubItemActive 
              ? 'bg-blue-50 text-blue-600' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <Icon 
            name={item.icon} 
            size="sm" 
            className={`flex-shrink-0 ${isOpen || isAnySubItemActive ? 'text-blue-600' : 'text-gray-600'}`} 
          />
          <span className="text-sm font-medium">{item.name}</span>
          <Icon 
            name="ChevronDown" 
            size="sm"
            className={`ml-auto transition-transform ${isOpen ? 'rotate-180' : ''} ${
              isOpen || isAnySubItemActive ? 'text-blue-600' : 'text-gray-400'
            }`} 
          />
        </div>
        <div className={`ml-8 mt-1 space-y-1 ${isOpen ? 'block' : 'hidden'}`}>
          {item.subItems.map((sub) => {
            const isActive = sub.path === location.pathname;
            return (
              <Link 
                key={sub.name}
                to={sub.path}
                className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {sub.name}
              </Link>
            );
          })}
        </div>
      </li>
    );
  }

  const isActive = item.path === location.pathname;

  return (
    <li>
      <Link 
        to={item.path} 
        className={`flex flex-row items-center justify-start gap-3 px-3 py-2 rounded-lg transition-colors ${
          isActive 
            ? 'bg-blue-50 text-blue-600' 
            : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <Icon 
          name={item.icon} 
          size="sm" 
          className={`flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} 
        />
        <span className="text-sm font-medium">{item.name}</span>
      </Link>
    </li>
  );
};

export const MenuItem: React.FC<{ items: SidebarMenuItem[]; title: string }> = ({ items, title }) => {
  return (
    <div>
      <h2 className="mb-3 px-3 text-xs font-semibold uppercase text-gray-400 tracking-wider">
        {title}
      </h2>
      <ul className="flex flex-col gap-1">
        {items.map((nav) => (
          <MenuItemComponent key={nav.name} item={nav} />
        ))}
      </ul>
    </div>
  );
};

export const AppSidebar: React.FC = () => {
  return (
    <aside className="fixed flex flex-col top-0 px-4 left-0 bg-white text-gray-900 h-screen w-64 border-r border-gray-200 shadow-sm">
      <div className="py-5 flex justify-center border-b border-gray-100">
        <Link to="/">
          <img 
            className="dark:hidden" 
            src="/src/icons/alert.svg" 
            alt="Logo" 
            width={120} 
            height={32} 
          />
          <img 
            className="hidden dark:block" 
            src="/src/icons/alert.svg" 
            alt="Logo" 
            width={120} 
            height={32} 
          />
        </Link>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto py-4">
        <nav className="space-y-6">
          <MenuItem title="Menu" items={mockNavItems} />
          <MenuItem title="Other" items={mockOthersItems} />
        </nav>
      </div>
    </aside>
  );
};