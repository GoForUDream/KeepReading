import { Layout, Menu, Typography } from 'antd';
import { BookOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Router>
      <Layout className="min-h-screen">
        <Header className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOutlined className="text-white text-2xl mr-3" />
            <Title level={3} className="!text-white !mb-0">
              Keep Reading
            </Title>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            className="flex-1 ml-10"
            items={[
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
              {
                key: 'account',
                icon: <UserOutlined />,
                label: 'Account',
              },
            ]}
          />
        </Header>
        <Content className="p-6">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
            </Routes>
          </div>
        </Content>
        <Footer className="text-center">
          Keep Reading © 2024 - Your Professional Bookstore
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
