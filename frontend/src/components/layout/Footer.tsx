/**
 * WHAT: Main application footer
 * WHY: Reusable footer component
 * HOW: Uses Ant Design Layout.Footer
 */

import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

export const Footer = () => {
  return (
    <AntFooter className="text-center">
      Keep Reading © 2024 - Your Professional Bookstore
    </AntFooter>
  );
};
