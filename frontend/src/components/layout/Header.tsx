/**
 * WHAT: Main application header with navigation
 * WHY: Reusable header component with branding and user actions
 * HOW: Uses Ant Design Layout.Header with clickable logo and action buttons
 */

import { Layout, Typography, Button, Badge } from 'antd';
import { BookOutlined, ShoppingCartOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <AntHeader className="flex items-center justify-between px-6">
      {/* Left side: Logo and Name - clickable to navigate home */}
      <div
        className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => navigate('/')}
        style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
      >
        <BookOutlined style={{ fontSize: '32px', color: 'white', display: 'flex' }} />
        <Title level={3} style={{ color: 'white', margin: 0, lineHeight: '32px' }}>
          Keep Reading
        </Title>
      </div>

      {/* Right side: Account and Cart */}
      <div className="flex items-center gap-3">
        {/* User Account or Login */}
        {user ? (
          <Button
            type="text"
            size="large"
            icon={<UserOutlined style={{ fontSize: '20px' }} />}
            className="text-white hover:!text-blue-300"
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={() => navigate('/profile')}
          >
            {user.fullName}
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            icon={<LoginOutlined style={{ fontSize: '20px' }} />}
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        )}

        {/* Cart */}
        <Button
          type="text"
          size="large"
          icon={
            <Badge count={0} showZero={false}>
              <ShoppingCartOutlined style={{ fontSize: '20px', color: 'white' }} />
            </Badge>
          }
          className="hover:!text-blue-300"
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={() => navigate('/cart')}
        />
      </div>
    </AntHeader>
  );
};
