 
import { Link } from 'react-router-dom';
import { RenderSwitch } from '../components/RenderSwitch';
import { Icon, type IconName } from '../components/Icon';

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

type SidebarMenuItem = SidebarMenuGroup | SidebarMenuLink

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

export const MenuItem: React.FC<{ items: SidebarMenuItem[]; title: string }> = ({ items, title }) => {
  return (
    <div>
      <h2 className="mb-4 text-xs uppercase text-gray-400">{title}</h2>
      <ul className="flex flex-col gap-2">
        {items.map((nav) => {
          const isGroup = 'subItems' in nav;
          
          return (
            <li key={nav.name}>
              <RenderSwitch
                condition={isGroup}
                whenTrue={
                  <div className="flex flex-row items-center cursor-pointer justify-start gap-1">
                    <span><Icon name={nav.icon} /></span>
                    <span>{nav.name}</span>
                    <Icon name="ChevronDown" className="ml-auto w-5 h-5 text-gray-400" />
                  </div>
                }
                whenFalse={
                  isGroup ? (
                  <Link to={(nav as unknown as SidebarMenuLink).path} className="flex flex-row items-center justify-start gap-1">
                    <span><Icon name={nav.icon} /></span>
                    <span>{nav.name}</span>
                  </Link>) : null
                }
              />
              <div className="overflow-hidden mt-2 ml-9">
                <ul>
                  {isGroup && (nav as SidebarMenuGroup).subItems.map((sub) => (
                    <li key={sub.name} className="relative flex items-center rounded-lg py-1 text-theme-sm">
                      <Link to={sub.path}>{sub.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const AppSidebar: React.FC = () => {
  return (
    <aside
      className={'fixed flex flex-col top-0 px-5 left-0 bg-white text-gray-900 h-screen border-r border-gray-200'}
    >
      <div className="py-2 flex justify-center">
        <Link to="/">
          <img
            className="dark:hidden"
            src="/src/icons/alert.svg"
            alt="Logo"
            width={150}
            height={40}
          />
          <img
            className="hidden dark:block"
            src="/src/icons/alert.svg"
            alt="Logo"
            width={150}
            height={40}
          />
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <MenuItem title="Menu" items={mockNavItems} />
            <MenuItem title="Other" items={mockOthersItems} />
          </div>
        </nav>
      </div>
    </aside>
  );
};
