
import {LayoutDashboard,CheckSquare,Users,Settings,LogOut,} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';



type AdminSidebarProps = {
    isSidebarOpen: boolean;
};

const userSidebar = ({ isSidebarOpen }:AdminSidebarProps) => {
    const location = useLocation(); 
    
    const sidebarItems = [
        { icon: LayoutDashboard, text: 'Dashboard',to:'Dashboard'  },
        { icon: CheckSquare, text: 'Tasks Overview',to:'tasks' },
        { icon: Settings, text: 'Settings',to:'settings' }
      ];
    

  return (
    <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-white shadow-lg
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 p-6 border-b">
           
            <span className="text-xl font-bold">TaskNest</span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
            {sidebarItems.map((item, index) => {
              const isActive = location.pathname === `/manager/${item.to}`;
              return (
                <li key={index}>
                  <Link
                    to={`/employee/${item.to}`}
                    className={`
                      flex items-center gap-4 px-4 py-3 rounded-lg
                      ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
                    `}
                  >
                    <item.icon size={20} />
                    <span>{item.text}</span>
                  </Link>
                </li>
              );
            })}

            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <button className="flex items-center gap-4 text-red-600 hover:bg-red-50 w-full px-4 py-3 rounded-lg">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
  )
}

export default userSidebar
