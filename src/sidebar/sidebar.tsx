/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import {
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  UserCircleIcon,
} from '../icons';

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
    icon: <PlugInIcon />,
    name: 'Authentication',
    subItems: [
      { name: 'Sign In', path: '/signin' },
      { name: 'Sign Up', path: '/signup' },
    ],
  },
];

export const MenuItem: React.FC<any> = ({ items }: any) => {
  return <ul className="flex flex-col gap-1">
      {items.map((nav: any) => (
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
}

export const AppSidebar: React.FC = () => {
  return (
    <aside
      className={'fixed flex flex-col top-0 px-5 left-0 bg-white dark:bg-gray-900 text-gray-900 h-screen border-r border-gray-200 w-[290px]'}
    >
      <div className="py-8 flex justify-center">
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
            <div>
              <h2 className="mb-4 text-xs uppercase leading-[20px] text-gray-400">
                Menu
              </h2>
              <MenuItem items={mockNavItems} />
            </div>
            <div>
              <h2 className="mb-4 text-xs uppercase leading-[20px] text-gray-400">
                Others
              </h2>
              <MenuItem items={mockOthersItems} />
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};
