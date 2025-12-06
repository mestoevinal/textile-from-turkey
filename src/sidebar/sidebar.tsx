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

interface MenuItemComponentProps {
  item: SidebarMenuItem;
  onNavigate?: () => void;
}

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({ item, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isGroup = 'subItems' in item;

  if (isGroup) {
    const isAnySubItemActive = item.subItems.some(sub => sub.path === location.pathname);
    
    return (
      <li>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex flex-row items-center cursor-pointer justify-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
            isOpen || isAnySubItemActive 
              ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm' 
              : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
            isOpen || isAnySubItemActive 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30' 
              : 'bg-gray-100'
          }`}>
            <Icon 
              name={item.icon} 
              size="sm" 
              className={`flex-shrink-0 ${isOpen || isAnySubItemActive ? 'text-white' : 'text-gray-600'}`} 
            />
          </div>
          <span className="text-sm font-semibold flex-1">{item.name}</span>
          <Icon 
            name="ChevronDown" 
            size="sm"
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${
              isOpen || isAnySubItemActive ? 'text-blue-600' : 'text-gray-400'
            }`} 
          />
        </div>
        <div className={`ml-11 mt-1 space-y-0.5 overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {item.subItems.map((sub) => {
            const isActive = sub.path === location.pathname;
            return (
              <Link 
                key={sub.name}
                to={sub.path}
                onClick={onNavigate}
                className={`block px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md shadow-blue-500/30' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:pl-4'
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
        onClick={onNavigate}
        className={`flex flex-row items-center justify-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
          isActive 
            ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm' 
            : 'hover:bg-gray-50 text-gray-700'
        }`}
      >
        <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30' 
            : 'bg-gray-100'
        }`}>
          <Icon 
            name={item.icon} 
            size="sm" 
            className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-600'}`} 
          />
        </div>
        <span className="text-sm font-semibold">{item.name}</span>
      </Link>
    </li>
  );
};

interface MenuItemProps {
  items: SidebarMenuItem[];
  title: string;
  onNavigate?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ items, title, onNavigate }) => {
  return (
    <div>
      <h2 className="mb-3 px-3 text-xs font-bold uppercase text-gray-400 tracking-wider">
        {title}
      </h2>
      <ul className="flex flex-col gap-1">
        {items.map((nav) => (
          <MenuItemComponent key={nav.name} item={nav} onNavigate={onNavigate} />
        ))}
      </ul>
    </div>
  );
};

export const AppSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Кнопка-гамбургер для мобильных */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
      >
        <div className="flex flex-col gap-1.5">
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-200 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-200 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-200 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      {/* Оверлей для мобильных */}
      {isOpen && (
        <div 
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-200"
        />
      )}

      {/* Сайдбар */}
      <aside className={`
        fixed flex flex-col top-0 px-4 left-0 bg-white text-gray-900 h-screen w-64 border-r border-gray-100 shadow-sm z-40
        transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Логотип */}
        <div className="py-6 flex justify-center border-b border-gray-100">
          <Link to="/" className="group" onClick={closeSidebar}>
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30 group-hover:shadow-xl group-hover:shadow-orange-500/40 transition-all duration-200 group-hover:scale-105">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
                <rect x="11" y="11" width="2" height="7" rx="1" fill="currentColor"/>
              </svg>
            </div>
          </Link>
        </div>

        {/* Навигация */}
        <div className="flex-1 flex flex-col overflow-y-auto py-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <nav className="space-y-8">
            <MenuItem title="Menu" items={mockNavItems} onNavigate={closeSidebar} />
            <MenuItem title="Other" items={mockOthersItems} onNavigate={closeSidebar} />
          </nav>
        </div>

        {/* Футер с аватаром */}
        <div className="py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md shadow-blue-500/30">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">User Name</p>
              <p className="text-xs text-gray-500 truncate">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};