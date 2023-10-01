import React from 'react';
import { Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <header className="app-header">
        {/* Insert your header content, like a title, logo, etc. */}
        Planetary Resources Finder
      </header>

      <Container>
        {children}
      </Container>

      <footer className="app-footer">
        {/* Insert your footer content here */}
        © 2023 Planetary Explorer Co.
      </footer>

      {/* Example of some global styles. Customize as needed. */}
      <style jsx global>{`
        body {
          background-color: #000;
          color: #FFF;
          font-family: Arial, sans-serif;
        }

        .app-header, .app-footer {
          text-align: center;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

export default Layout;
