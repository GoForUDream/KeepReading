/**
 * WHAT: User profile page
 * WHY: Allow users to view and edit their account information
 * HOW: Displays user avatar, name, and editable form fields
 */

import {
  Card,
  Avatar,
  Typography,
  Form,
  Input,
  Button,
  Row,
  Col,
  Modal,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  HomeOutlined,
  PhoneOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUpdateProfileMutation } from "@/generated/graphql";

const { Title, Text } = Typography;

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateProfileMutation, { loading }] = useUpdateProfileMutation();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Text>Please log in to view your profile.</Text>
      </div>
    );
  }

  const handleSave = (values: {
    fullName: string;
    email: string;
    phone?: string;
    address1?: string;
    address2?: string;
  }) => {
    updateProfileMutation({
      variables: {
        input: {
          fullName: values.fullName,
          phone: values.phone || null,
          address1: values.address1 || null,
          address2: values.address2 || null,
        },
      },
      onCompleted: (data) => {
        if (data.updateProfile) {
          updateUser(data.updateProfile);
          message.success("Profile updated successfully!");
          setIsEditing(false);
        }
      },
      onError: (error) => {
        message.error(error.message || "Failed to update profile");
      },
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className="bg-gray-100 flex items-center justify-center -m-6 p-6 overflow-hidden"
      style={{ height: "calc(100vh - 64px - 70px - 48px)" }}
    >
      <div className="w-full max-w-7xl">
        <Title level={2} className="mb-6">
          My Account
        </Title>

        <Card className="bg-white rounded-xl border border-gray-200">
          <Row gutter={[32, 0]}>
            {/* Left Side: Avatar and Name */}
            <Col xs={24} md={8}>
              <div className="flex flex-col items-center text-center py-8 px-6">
                <Avatar
                  size={120}
                  icon={<UserOutlined />}
                  className="bg-blue-500 mb-6"
                />
                <Title level={3} className="!m-0 !mb-2">
                  {user.fullName}
                </Title>
                <Text type="secondary" className="text-base">
                  {user.role}
                </Text>
                <div className="mt-6 w-full">
                  <Text type="secondary" className="text-sm">
                    Member since
                  </Text>
                  <br />
                  <Text strong className="text-base">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>
                </div>
                <div className="mt-8">
                  <Button
                    danger
                    type="primary"
                    size="large"
                    icon={<LogoutOutlined />}
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </Col>

            {/* Right Side: User Information Form */}
            <Col xs={24} md={16}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <Title level={4} className="!m-0">
                    Personal Information
                  </Title>
                  {!isEditing ? (
                    <Button type="primary" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setIsEditing(false)}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => form.submit()}
                        loading={loading}
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>

                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{
                    fullName: user.fullName,
                    email: user.email,
                    address1: user.address1 || "",
                    address2: user.address2 || "",
                    phone: user.phone || "",
                  }}
                  onFinish={handleSave}
                  disabled={!isEditing}
                >
                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      size="large"
                      placeholder="John Doe"
                      className={
                        isEditing
                          ? "bg-white"
                          : "bg-transparent border-gray-200"
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      size="large"
                      placeholder="your@email.com"
                      className={
                        isEditing
                          ? "bg-white"
                          : "bg-transparent border-gray-200"
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Phone Number" name="phone">
                    <Input
                      prefix={<PhoneOutlined />}
                      size="large"
                      placeholder="+1 (555) 000-0000"
                      className={
                        isEditing
                          ? "bg-white"
                          : "bg-transparent border-gray-200"
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Address Line 1" name="address1">
                    <Input
                      prefix={<HomeOutlined />}
                      size="large"
                      placeholder="123 Main Street"
                      className={
                        isEditing
                          ? "bg-white"
                          : "bg-transparent border-gray-200"
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Address Line 2" name="address2">
                    <Input
                      prefix={<HomeOutlined />}
                      size="large"
                      placeholder="Apartment, suite, etc. (optional)"
                      className={
                        isEditing
                          ? "bg-white"
                          : "bg-transparent border-gray-200"
                      }
                    />
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </Card>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Sign Out"
        open={isLogoutModalOpen}
        onOk={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
        okText="Yes, Sign Out"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
        centered
      >
        <p>Are you sure you want to sign out?</p>
      </Modal>
    </div>
  );
};

export default Profile;
