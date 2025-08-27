<<<<<<< HEAD
=======
<<<<<<< HEAD
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import IndustryHeader from "@/components/industry/IndustryHeader";
import { MessageCenter } from "@/components/industry/dashboard/MessageCenter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, MessageSquare, Send, Plus, Phone, Video, Archive, Star, MoreHorizontal, Paperclip, Mail } from "lucide-react";
import { toast } from "sonner";
>>>>>>> 9b0ce35 (Initial commit)


import React from 'react';
import { Helmet } from 'react-helmet';
import { MessageSquare } from 'lucide-react';
import IndustryHeader from '@/components/industry/IndustryHeader';
import { MessagesProvider, useMessages } from '@/components/industry/messages/MessagesContext';

import { ConversationList } from '@/components/industry/messages/ConversationList';
import { ChatWindow } from '@/components/industry/messages/ChatWindow';
import { ChatHeader } from '@/components/industry/messages/ChatHeader'; 
import { messageThreads } from '@/data/MockMessages';
// The inner component that has access to the context
const MessagesLayout = () => {
  const { selectedConversation } = useMessages();

  return (
    // MODIFICATION: Use flex-1 to take up remaining space and overflow-hidden to prevent this container from scrolling
    <div className="flex-1 flex overflow-hidden"> 
      <ConversationList />
      
      <div className="flex-1 flex flex-col bg-white">
        {selectedConversation ? (
          
          <>
            <ChatHeader /> {/* Render the header here */}
            <ChatWindow /> {/* The rest of the window (tabs, messages, input) goes here */}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose from the list to start messaging.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
<<<<<<< HEAD
=======
export default IndustryMessages;
=======


import React from 'react';
import { Helmet } from 'react-helmet';
import { MessageSquare } from 'lucide-react';
import IndustryHeader from '@/components/industry/IndustryHeader';
import { MessagesProvider, useMessages } from '@/components/industry/messages/MessagesContext';

import { ConversationList } from '@/components/industry/messages/ConversationList';
import { ChatWindow } from '@/components/industry/messages/ChatWindow';
import { ChatHeader } from '@/components/industry/messages/ChatHeader'; 
import { messageThreads } from '@/data/MockMessages';
// The inner component that has access to the context
const MessagesLayout = () => {
  const { selectedConversation } = useMessages();

  return (
    // MODIFICATION: Use flex-1 to take up remaining space and overflow-hidden to prevent this container from scrolling
    <div className="flex-1 flex overflow-hidden"> 
      <ConversationList />
      
      <div className="flex-1 flex flex-col bg-white">
        {selectedConversation ? (
          
          <>
            <ChatHeader /> {/* Render the header here */}
            <ChatWindow /> {/* The rest of the window (tabs, messages, input) goes here */}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose from the list to start messaging.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
>>>>>>> 9b0ce35 (Initial commit)


// The main page export
const IndustryMessages = () => {
  return (
    <MessagesProvider>
      {/* MODIFICATION: Use h-screen and flex-col to create a full-height container */}
      <div className="h-screen flex flex-col bg-gray-50">
        <Helmet>
          <title>Messages | Diligence.ai</title>
        </Helmet>
        <IndustryHeader />
        <MessagesLayout />
      </div>
    </MessagesProvider>
  );
};

export default IndustryMessages;



<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
