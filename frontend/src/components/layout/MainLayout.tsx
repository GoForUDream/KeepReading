/**
 * WHAT: Main application layout wrapper
 * WHY: Consistent layout across all pages
 * HOW: Wraps pages with Header, Content, and Footer
 */

import { Layout } from 'antd';
import { Header } from './Header';
import { Footer } from './Footer';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};
