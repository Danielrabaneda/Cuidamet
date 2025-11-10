import { ChatConversation } from '../types';
import { MOCK_PROVIDERS } from './mockData';

export const MOCK_CHATS: ChatConversation[] = [
  {
    id: 1,
    provider: MOCK_PROVIDERS.find(p => p.id === 1)!, // Ana García
    messages: [
      {
        id: 1,
        text: 'Hola Ana, estaría interesado en tus servicios para mi madre. ¿Estarías disponible por las mañanas?',
        sender: 'me',
        timestamp: '10:30',
        read: true,
      },
      {
        id: 2,
        text: '¡Hola! Sí, tengo disponibilidad. ¿Quieres que hablemos por teléfono para más detalles?',
        sender: 'other',
        timestamp: '10:35',
        read: true,
      },
      {
        id: 3,
        text: 'Perfecto, te llamo en un rato. ¡Gracias!',
        sender: 'me',
        timestamp: '10:36',
        read: true,
      },
    ],
  },
  {
    id: 2,
    provider: MOCK_PROVIDERS.find(p => p.id === 3)!, // Laura Fernandez
    messages: [
      {
        id: 4,
        text: 'Hola Laura, necesito que alguien pasee a mi perro Tobby esta semana. ¿Podrías?',
        sender: 'me',
        timestamp: 'Ayer',
        read: true,
      },
      {
        id: 5,
        text: '¡Claro! Me encantaría conocer a Tobby. ¿Qué días y horas necesitas?',
        sender: 'other',
        timestamp: 'Ayer',
        read: false,
      },
    ],
  },
  {
    id: 3,
    provider: MOCK_PROVIDERS.find(p => p.id === 5)!, // Sofia Lopez
    messages: [
       {
        id: 6,
        text: '¡Hola Sofía! Vi tu perfil y parece que eres perfecta para cuidar de mis dos hijos. ¿Podemos concertar una entrevista?',
        sender: 'other',
        timestamp: 'Hace 2 días',
        read: false,
      },
    ],
  },
];
