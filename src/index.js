import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './Context/AuthContext';
import { ContactListContextProvider } from './Context/ContactListContext';
import { UserChatContextprovider } from './Context/UserChatContext';
import { ChatContactContextProvider } from './Context/ChatContacContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ContactListContextProvider>
      <ChatContactContextProvider>
        <UserChatContextprovider>
          <App />
        </UserChatContextprovider>
      </ChatContactContextProvider>
    </ContactListContextProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
