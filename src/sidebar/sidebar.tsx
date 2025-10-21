/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from '../icons';
import { SidebarWidget } from './widget';

const mockNavItems = [
  {
    icon: <GridIcon />,
    name: 'Dashboard',
    subItems: [{ name: 'Ecommerce', path: '/' }],
  },
  {
    icon: <CalenderIcon />,
    name: 'Calendar',
    path: '/calendar',
  },
  {
    icon: <UserCircleIcon />,
    name: 'User Profile',
    path: '/profile',
  },
  {
    name: 'Forms',
    icon: <ListIcon />,
    subItems: [{ name: 'Form Elements', path: '/form-elements' }],
  },
  {
    name: 'Tables',
    icon: <TableIcon />,
    subItems: [{ name: 'Basic Tables', path: '/basic-tables' }],
  },
  {
    name: 'Pages',
    icon: <PageIcon />,
    subItems: [
      { name: 'Blank Page', path: '/blank' },
      { name: '404 Error', path: '/error-404' },
    ],
  },
];

const mockOthersItems = [
  {
    icon: <PieChartIcon />,
    name: 'Charts',
    subItems: [
      { name: 'Line Chart', path: '/line-chart' },
      { name: 'Bar Chart', path: '/bar-chart' },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: 'UI Elements',
    subItems: [
      { name: 'Alerts', path: '/alerts' },
      { name: 'Avatar', path: '/avatars' },
      { name: 'Badge', path: '/badge' },
      { name: 'Buttons', path: '/buttons' },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: 'Authentication',
    subItems: [
      { name: 'Sign In', path: '/signin' },
      { name: 'Sign Up', path: '/signup' },
    ],
  },
];

export const AppSidebar: React.FC = () => {
  const renderMenuItems = (items: any[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <div className="menu-item group cursor-pointer justify-start">
              <span className="menu-item-icon-size">{nav.icon}</span>
              <span className="menu-item-text">{nav.name}</span>
              <ChevronDownIcon className="ml-auto w-5 h-5 text-gray-400" />
            </div>
          ) : (
            nav.path && (
              <Link to={nav.path} className="menu-item group justify-start">
                <span className="menu-item-icon-size">{nav.icon}</span>
                <span className="menu-item-text">{nav.name}</span>
              </Link>
            )
          )}
          {nav.subItems && (
            <div className="overflow-hidden mt-2 ml-9">
              <ul className="space-y-1">
                {nav.subItems.map((sub: any) => (
                  <li key={sub.name}>
                    <Link to={sub.path} className="menu-dropdown-item">
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={'fixed flex flex-col top-0 px-5 left-0 bg-white dark:bg-gray-900 text-gray-900 h-screen border-r border-gray-200 w-[290px]'}
    >
      <div className="py-8 flex justify-start">
        <Link to="/">
          <img
            className="dark:hidden"
            src="/images/logo/logo.svg"
            alt="Logo"
            width={150}
            height={40}
          />
          <img
            className="hidden dark:block"
            src="/images/logo/logo-dark.svg"
            alt="Logo"
            width={150}
            height={40}
          />
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="mb-4 text-xs uppercase leading-[20px] text-gray-400">
                Menu
              </h2>
              {renderMenuItems(mockNavItems)}
            </div>
            <div>
              <h2 className="mb-4 text-xs uppercase leading-[20px] text-gray-400">
                Others
              </h2>
              {renderMenuItems(mockOthersItems)}
            </div>
          </div>
        </nav>
        <SidebarWidget />
      </div>
    </aside>
  );
};
