export interface Feature {
  id: string;
  title: string;
  description: string;
}

export const featuresList: Feature[] = [
  {
    id: '1',
    title: 'AI-Powered Personalized Learning',
    description:
      'Leverage AI to create personalized learning paths, adapting content and assessments based on individual learning styles and performance analytics.',
  },
  {
    id: '2',
    title: 'Global Scalability & Multilingual Support',
    description:
      'Serve millions of users globally with seamless performance, offering multilingual content and support across various regions and devices.',
  },
  {
    id: '3',
    title: 'Advanced Analytics & Predictive Insights',
    description:
      'Utilize deep learning models to analyze learning behavior, offering predictive insights to optimize student outcomes and course effectiveness.',
  },
  {
    id: '4',
    title: 'Enterprise-Level Integrations & API Ecosystem',
    description:
      'Connect effortlessly with enterprise systems (ERP, CRM, HRMS) and extend functionality through a robust API ecosystem for custom integrations.',
  },
  {
    id: '5',
    title: 'Automated Compliance & Certification Management',
    description:
      'Automate compliance tracking, certification processes, and accreditation, ensuring all legal and industry standards are met.',
  },
  {
    id: '6',
    title: 'Blockchain-Powered Credentialing',
    description:
      'Issue secure, verifiable, and immutable digital certificates and credentials using blockchain technology, reducing fraud and enhancing trust.',
  },

];