import { useQuery } from '@apollo/client';
import { Card, Row, Col, Typography, Spin, Alert, Button, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { GET_BOOKS } from '../graphql/queries';

const { Title, Paragraph, Text } = Typography;

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  isbn: string;
  coverImage: string;
  category: string;
  stock: number;
  published: string;
}

function Books() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Loading books..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error Loading Books"
        description={error.message}
        type="error"
        showIcon
      />
    );
  }

  const books: Book[] = data?.books || [];

  return (
    <div>
      <Title level={2} className="mb-6">
        Our Book Collection
      </Title>

      {books.length === 0 ? (
        <Alert
          message="No Books Available"
          description="Check back later for new arrivals!"
          type="info"
          showIcon
        />
      ) : (
        <Row gutter={[24, 24]}>
          {books.map((book) => (
            <Col xs={24} sm={12} md={8} lg={6} key={book.id}>
              <Card
                hoverable
                cover={
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    {book.coverImage ? (
                      <img
                        alt={book.title}
                        src={book.coverImage}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Text type="secondary">No Cover Image</Text>
                    )}
                  </div>
                }
                className="h-full flex flex-col"
              >
                <div className="flex-1">
                  <Title level={5} className="!mb-2" ellipsis={{ rows: 2 }}>
                    {book.title}
                  </Title>
                  <Text type="secondary" className="block mb-2">
                    by {book.author}
                  </Text>
                  <Tag color="blue" className="mb-2">
                    {book.category}
                  </Tag>
                  <Paragraph
                    ellipsis={{ rows: 3 }}
                    className="text-sm text-gray-600 mb-2"
                  >
                    {book.description || 'No description available'}
                  </Paragraph>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center mb-3">
                    <Text strong className="text-lg text-blue-600">
                      ${book.price.toFixed(2)}
                    </Text>
                    <Text type={book.stock > 0 ? 'success' : 'danger'}>
                      {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
                    </Text>
                  </div>
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    block
                    disabled={book.stock === 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Books;
