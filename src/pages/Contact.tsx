import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../ui/Button/Button';
import { useToast } from '../ui/Toast/Toast';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.surface};
`;

const Content = styled.main`
  flex: 1;
  max-width: 600px;
  margin: 0 auto;
  padding: 80px 24px;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.typography.heading};
  font-size: 48px;
  margin-bottom: 24px;
  color: ${props => props.theme.colors.onSurface};
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${props => props.theme.colors.onSurfaceVariant};
  margin-bottom: 48px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.colors.onSurface};
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1.5px solid ${props => props.theme.colors.border};
  background-color: white;
  font-size: 16px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 4px ${props => props.theme.colors.primary}15;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1.5px solid ${props => props.theme.colors.border};
  background-color: white;
  font-size: 16px;
  min-height: 150px;
  resize: vertical;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 4px ${props => props.theme.colors.primary}15;
  }
`;

const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { showToast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        showToast(`Thanks for reaching out, ${name}! We'll get back to you soon.`, { type: 'success' });
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <PageWrapper>
            <Navbar />
            <Content>
                <Title>Contact Us</Title>
                <Subtitle>Have a question or feedback? We'd love to hear from you. Drop us a message below.</Subtitle>
                
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input 
                            type="text" 
                            placeholder="Your name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input 
                            type="email" 
                            placeholder="your@email.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Message</Label>
                        <TextArea 
                            placeholder="How can we help?" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <Button type="submit" variant="primary" style={{ marginTop: '12px' }}>
                        Send Message
                    </Button>
                </Form>
            </Content>
            <Footer />
        </PageWrapper>
    );
};

export default Contact;
