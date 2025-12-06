import React from 'react';
import { Modal, Button, Divider } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { useResponsive } from '../../shared/hooks/useResponsive';

/**
 * WelcomeModal - Welcome modal for first-time users
 */
function WelcomeModal({ isVisible, onClose }) {
  const { isMobile } = useResponsive();

  const handleOk = () => {
    onClose();
  };

  return (
    <Modal
      title={
        <div className="modal-title-container">
          <span>Currency Converter</span>
        </div>
      }
      open={isVisible}
      onOk={handleOk}
      onCancel={onClose}
      centered
      width={isMobile ? '95%' : 700}
      okText="Get Started"
      cancelText="Close"
      styles={{
        content: {
          background: 'rgba(16, 20, 36, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 128, 0, 0.2)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        },
        header: {
          background: 'transparent',
          borderBottom: '1px solid rgba(255, 128, 0, 0.2)',
          paddingBottom: '16px',
        },
        body: {
          padding: '24px',
          maxHeight: '70vh',
          overflowY: 'auto',
        },
        footer: {
          background: 'transparent',
          borderTop: '1px solid rgba(255, 128, 0, 0.2)',
          paddingTop: '16px',
        }
      }}
      footer={[
        <Button 
          key="github" 
          icon={<GithubOutlined />} 
          onClick={() => window.open('https://github.com/emrekocadere/currency-converter', '_blank')}
          className="modal-footer-button-secondary"
        >
          View on GitHub
        </Button>,
        <Button 
          key="close" 
          onClick={onClose}
          className="modal-footer-button-secondary"
        >
          Close
        </Button>,
        <Button 
          key="start" 
          type="primary" 
          onClick={handleOk}
          className="modal-footer-button-primary"
        >
          Get Started
        </Button>
      ]}
    >
      <div className="modal-content-wrapper">
        <p className="modal-intro-text">
          A modern, full-stack currency converter application built with enterprise-grade architecture and cutting-edge technologies.
        </p>
        
        <Divider 
          orientation="left" 
          style={{ 
            borderColor: 'rgba(255, 128, 0, 0.2)',
            color: '#e8eaed',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Architecture
        </Divider>
        
        <div className="modal-section-wrapper-arch">
          <div className="modal-badge-container">
            <span className="modal-badge modal-badge-arch-1">
              N-Tier Architecture
            </span>
            <span className="modal-badge modal-badge-arch-2">
              Repository Pattern
            </span>
            <span className="modal-badge modal-badge-arch-3">
              Dependency Injection
            </span>
            <span className="modal-badge modal-badge-arch-4">
              Service Layer Pattern
            </span>
          </div>
          <p className="modal-section-description">
            Enterprise-grade N-Tier architecture with clean separation of concerns, dependency injection, and proven design patterns for scalability.
          </p>
        </div>

        <Divider 
          orientation="left"
          style={{ 
            borderColor: 'rgba(255, 128, 0, 0.2)',
            color: '#e8eaed',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Frontend Stack
        </Divider>
        
        <div className="modal-section-wrapper-frontend">
          <div className="modal-badge-container">
            <span className="modal-badge modal-badge-frontend-1">
              React 18.3
            </span>
            <span className="modal-badge modal-badge-frontend-2">
              Ant Design 5.26
            </span>
            <span className="modal-badge modal-badge-frontend-3">
              MUI X-Charts
            </span>
            <span className="modal-badge modal-badge-frontend-4">
              Framer Motion
            </span>
            <span className="modal-badge modal-badge-frontend-5">
              Axios
            </span>
            <span className="modal-badge modal-badge-frontend-6">
              React Responsive
            </span>
          </div>
          <p className="modal-section-description">
            Modern React ecosystem with component-based architecture, responsive design, smooth animations, and efficient data visualization.
          </p>
        </div>

        <Divider 
          orientation="left"
          style={{ 
            borderColor: 'rgba(255, 128, 0, 0.2)',
            color: '#e8eaed',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Backend Stack
        </Divider>
        
        <div className="modal-section-wrapper-backend">
          <div className="modal-badge-container">
            <span className="modal-badge modal-badge-backend-1">
              .NET 8.0 Web API
            </span>
            <span className="modal-badge modal-badge-backend-2">
              Entity Framework Core 8
            </span>
            <span className="modal-badge modal-badge-backend-3">
              SQL Server
            </span>
            <span className="modal-badge modal-badge-backend-4">
              Quartz.NET
            </span>
            <span className="modal-badge modal-badge-backend-5">
              Serilog + Seq
            </span>
            <span className="modal-badge modal-badge-backend-6">
              Swagger/OpenAPI
            </span>
          </div>
          <p className="modal-section-description">
            High-performance .NET backend with EF Core ORM, scheduled background jobs, distributed tracing, structured logging, and comprehensive API documentation.
          </p>
        </div>

        <Divider 
          orientation="left"
          style={{ 
            borderColor: 'rgba(255, 128, 0, 0.2)',
            color: '#e8eaed',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Key Features
        </Divider>
        
        <div className={`modal-features-grid ${isMobile ? 'modal-features-grid-mobile' : 'modal-features-grid-desktop'}`}>
          <div className="modal-feature-card">
            Real-time Conversion
          </div>
          <div className="modal-feature-card">
            Historical Rate Charts
          </div>
          <div className="modal-feature-card">
            150+ Currency Support
          </div>
          <div className="modal-feature-card">
            Financial News Feed
          </div>
          <div className="modal-feature-card">
            Responsive Design
          </div>
          <div className="modal-feature-card">
            Modern UI/UX
          </div>
          <div className="modal-feature-card">
            RESTful API
          </div>
          <div className="modal-feature-card">
            Enterprise Scalability
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default WelcomeModal;
