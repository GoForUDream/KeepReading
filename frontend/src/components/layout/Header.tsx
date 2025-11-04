/**
 * WHAT: Main application header with navigation
 * WHY: Reusable header component with responsive menu
 * HOW: Uses Ant Design Layout.Header and Menu components
 */

import { Layout, Menu, Typography, Button } from 'antd';
import { BookOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: 'books',
      icon: <BookOutlined />,
      label: <Link to="/books">Books</Link>,
    },
    {
      key: 'cart',
      icon: <ShoppingCartOutlined />,
      label: 'Cart',
    },
  ];

  return (
    <AntHeader className="flex items-center justify-between">
      <div className="flex items-center">
        <BookOutlined className="text-white text-2xl mr-3" />
        <Title level={3} className="!text-white !mb-0">
          Keep Reading
        </Title>
      </div>

      <div className="flex items-center gap-4">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          className="flex-1"
          items={menuItems}
        />

        {user ? (
          <div className="flex items-center gap-3">
            <Button
              type="text"
              icon={<UserOutlined />}
              className="text-white hover:!text-blue-300"
              onClick={() => navigate('/profile')}
            >
              {user.fullName}
            </Button>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              className="text-white hover:!text-red-300"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        )}
      </div>
    </AntHeader>
  );
};
