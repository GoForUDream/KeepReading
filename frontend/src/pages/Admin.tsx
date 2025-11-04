/**
 * WHAT: Admin dashboard page
 * WHY: Provide admin users with management capabilities
 * HOW: Uses Ant Design Layout with sidebar navigation and dashboard components
 */

import { useState } from "react";
import {
  Layout,
  Menu,
  Card,
  Statistic,
  Table,
  Button,
  Typography,
  Space,
  Tag,
  Row,
  Col,
  Avatar,
} from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useBooksQuery, useUsersQuery, type User } from "@/generated/graphql";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

type MenuKey = "dashboard" | "books" | "users" | "orders" | "categories";

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>("dashboard");
  const { data: booksData } = useBooksQuery();
  const { data: usersData } = useUsersQuery();

  // Redirect if not admin
  if (user?.role !== "ADMIN") {
    navigate("/");
    return null;
  }

  const booksColumns = [
    {
      title: "Cover",
      dataIndex: "coverImage",
      key: "coverImage",
      render: (coverImage: string) => (
        <Avatar
          src={coverImage}
          icon={<BookOutlined />}
          shape="square"
          size={48}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number) => (
        <Tag color={stock > 10 ? "green" : stock > 0 ? "orange" : "red"}>
          {stock} units
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="text" icon={<EditOutlined />} size="small">
            Edit
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const usersColumns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          {fullName}
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "ADMIN" ? "red" : "default"}>{role}</Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: User) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} size="small">
            Edit
          </Button>
          {record.role !== "ADMIN" && (
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Delete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return (
          <div>
            <Title level={2}>Dashboard Overview</Title>
            <Text type="secondary" className="block mb-6">
              Welcome back, {user?.fullName}! Here's what's happening with your
              store.
            </Text>

            <Row gutter={[16, 16]} className="mb-6">
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Books"
                    value={booksData?.books.length || 0}
                    prefix={<BookOutlined />}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Users"
                    value={usersData?.users.length || 0}
                    prefix={<UserOutlined />}
                    valueStyle={{ color: "#1890ff" }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Orders"
                    value={0}
                    prefix={<ShoppingCartOutlined />}
                    valueStyle={{ color: "#cf1322" }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Revenue"
                    value={0}
                    prefix="$"
                    precision={2}
                    valueStyle={{ color: "#faad14" }}
                  />
                </Card>
              </Col>
            </Row>

            <Card title="Recent Activity" className="mb-6">
              <Text type="secondary">
                No recent activity to display. Orders and updates will appear
                here.
              </Text>
            </Card>
          </div>
        );

      case "books":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <Title level={2} className="!mb-1">
                  Books Management
                </Title>
                <Text type="secondary">
                  Manage your book inventory and details
                </Text>
              </div>
              <Button type="primary" icon={<PlusOutlined />} size="large">
                Add New Book
              </Button>
            </div>
            <Card>
              <Table
                columns={booksColumns}
                dataSource={booksData?.books}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </div>
        );

      case "users":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <Title level={2} className="!mb-1">
                  Users Management
                </Title>
                <Text type="secondary">Manage user accounts and permissions</Text>
              </div>
            </div>
            <Card>
              <Table
                columns={usersColumns}
                dataSource={usersData?.users}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </div>
        );

      case "orders":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <Title level={2} className="!mb-1">
                  Orders Management
                </Title>
                <Text type="secondary">View and manage customer orders</Text>
              </div>
            </div>
            <Card>
              <Text type="secondary">
                No orders yet. Orders will appear here once customers start
                making purchases.
              </Text>
            </Card>
          </div>
        );

      case "categories":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <Title level={2} className="!mb-1">
                  Categories Management
                </Title>
                <Text type="secondary">
                  Manage book categories and classifications
                </Text>
              </div>
              <Button type="primary" icon={<PlusOutlined />} size="large">
                Add New Category
              </Button>
            </div>
            <Card>
              <Text type="secondary">
                Categories management coming soon.
              </Text>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
      <Sider
        width={250}
        style={{
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        <div className="p-6">
          <Title level={4} className="!mb-1">
            Admin Panel
          </Title>
          <Text type="secondary" className="text-sm">
            {user?.fullName}
          </Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key as MenuKey)}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "books",
              icon: <BookOutlined />,
              label: "Books",
            },
            {
              key: "users",
              icon: <UserOutlined />,
              label: "Users",
            },
            {
              key: "orders",
              icon: <ShoppingCartOutlined />,
              label: "Orders",
            },
            {
              key: "categories",
              icon: <TagsOutlined />,
              label: "Categories",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Title level={3} className="!mb-0">
            Keep Reading - Admin Dashboard
          </Title>
          <Button onClick={() => navigate("/")}>Back to Store</Button>
        </Header>
        <Content style={{ padding: "24px", background: "#f5f5f5" }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
