import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Input, Layout, Row, Select } from 'antd';

const { Header, Content, Sider } = Layout;
const { Option } = Select;

const categories = [
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Beauty' },
  { id: 4, name: 'Home' },
  { id: 5, name: 'Toys' },
  { id: 6, name: 'Sports' },
];

const ProductListPage = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Card>
        <h3>Filter By</h3>
        <Checkbox.Group className='flex flex-col items-stretch'>
          {categories.map((category) => (
            <Checkbox key={category.id} value={category.id}>
              {category.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Card>
      <Layout>
        <Header style={{ backgroundColor: '#ffffff', padding: '0 24px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <h2>Product List</h2>
            </Col>
            <Col>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search products..."
                style={{ width: 300 }}
              />
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: '24px' }}>
          <Row gutter={[24, 24]}>
            {[...Array(10)].map((_, index) => (
              <Col key={index} span={8}>
                <Card
                  cover={<img src="https://via.placeholder.com/400x300" alt="product" />}
                  hoverable
                >
                  <h3 style={{ marginBottom: '8px' }}>Product Name</h3>
                  <p style={{ marginBottom: '16px' }}>Product Description</p>
                  <Button type="primary" block>Add to Cart</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductListPage;
