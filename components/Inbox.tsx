import React from 'react';
import { ChatConversation } from '../types';
import InboxIcon from './icons/InboxIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface InboxProps {
  chats: ChatConversation[];
  onViewChat: (chatId: number) => void;
}

const Inbox: React.FC<InboxProps> = ({ chats, onViewChat }) => {
  return (
    <div className="bg-white min-h-screen">
      <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-40 border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <h1 className="text-xl font-bold text-slate-800">Buzón</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 pb-36">
        {chats.length > 0 ? (
          <ul className="divide-y divide-slate-200">
            {chats.map(chat => {
              const lastMessage = chat.messages[chat.messages.length - 1];
              const unreadMessages = chat.messages.filter(m => m.sender === 'other' && !m.read).length > 0;

              return (
                <li key={chat.id}>
                  <button 
                    onClick={() => onViewChat(chat.id)}
                    className="w-full flex items-center py-4 space-x-4 hover:bg-slate-50 transition-colors rounded-lg px-2 -mx-2"
                  >
                    <div className="relative flex-shrink-0">
                      <img 
                        src={chat.provider.photoUrl} 
                        alt={chat.provider.name} 
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      {unreadMessages && (
                        <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-teal-500 border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-grow text-left overflow-hidden">
                      <div className="flex justify-between items-center">
                        <h3 className={`font-semibold truncate ${unreadMessages ? 'text-slate-800' : 'text-slate-700'}`}>
                          {chat.provider.name}
                        </h3>
                        <p className={`text-xs flex-shrink-0 ml-2 ${unreadMessages ? 'text-teal-500 font-semibold' : 'text-slate-400'}`}>
                          {lastMessage?.timestamp || ''}
                        </p>
                      </div>
                      <p className={`text-sm truncate ${unreadMessages ? 'text-slate-600' : 'text-slate-500'}`}>
                        {lastMessage ? (
                          <>
                            {lastMessage.sender === 'me' && 'Tú: '}
                            {lastMessage.text}
                          </>
                        ) : (
                          <span className="italic">No hay mensajes todavía.</span>
                        )}
                      </p>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center py-20">
            <InboxIcon className="w-16 h-16 mx-auto text-slate-300" />
            <h2 className="mt-4 text-xl font-semibold text-slate-700">Tu buzón está vacío</h2>
            <p className="mt-2 text-slate-500">Cuando contactes con un cuidador, verás tus mensajes aquí.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Inbox;