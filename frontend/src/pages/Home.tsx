import { Typography, Card, Row, Col, Button } from 'antd';
import { BookOutlined, RocketOutlined, SafetyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

function Home() {
  return (
    <div>
      <div className="text-center mb-12 py-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
        <Title level={1} className="!text-white !mb-4">
          Welcome to Keep Reading
        </Title>
        <Paragraph className="!text-white text-lg mb-6">
          Your professional online bookstore with a vast collection of books
        </Paragraph>
        <Link to="/books">
          <Button type="primary" size="large" icon={<BookOutlined />}>
            Browse Books
          </Button>
        </Link>
      </div>

      <Title level={2} className="text-center mb-8">
        Why Choose Keep Reading?
      </Title>

      <Row gutter={[24, 24]} className="mb-12">
        <Col xs={24} md={8}>
          <Card className="text-center h-full">
            <BookOutlined className="text-5xl text-blue-500 mb-4" />
            <Title level={4}>Vast Collection</Title>
            <Paragraph>
              Access thousands of books across various genres and categories
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="text-center h-full">
            <RocketOutlined className="text-5xl text-purple-500 mb-4" />
            <Title level={4}>Fast Delivery</Title>
            <Paragraph>
              Get your books delivered quickly to your doorstep
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="text-center h-full">
            <SafetyOutlined className="text-5xl text-green-500 mb-4" />
            <Title level={4}>Secure Payment</Title>
            <Paragraph>
              Shop with confidence using our secure payment system
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
