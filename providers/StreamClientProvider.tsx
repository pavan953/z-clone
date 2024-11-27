'use client';
import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import 'stream-chat-react/dist/css/v2/index.css';
import { useUser } from '@clerk/nextjs';

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!API_KEY) throw new Error('Stream API key is missing');

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};


export default StreamVideoProvider;

// import { ReactNode, useEffect, useState } from 'react';
// import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
// import { StreamChat } from 'stream-chat';
// import { Chat, Channel, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react';
// import 'stream-chat-react/dist/css/v2/index.css';
// import { useUser } from '@clerk/nextjs';

// import { tokenProvider } from '@/actions/stream.actions';
// import Loader from '@/components/Loader';

// const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

// const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
//   const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
//   const [chatClient, setChatClient] = useState<StreamChat | null>(null);
//   const [channel, setChannel] = useState<any | null>(null);
//   const { user, isLoaded } = useUser();

//   useEffect(() => {
//     if (!isLoaded || !user) return;
//     if (!API_KEY) throw new Error('Stream API key is missing');

//     const initializeClients = async () => {
//       try {
//         // Initialize the Stream Video client
//         const videoClientInstance = new StreamVideoClient({
//           apiKey: API_KEY,
//           user: {
//             id: user.id,
//             name: user.username || user.id,
//             image: user.imageUrl,
//           },
//           tokenProvider,
//         });
//         setVideoClient(videoClientInstance);

//         // Initialize the Stream Chat client
//         const chatClientInstance = StreamChat.getInstance(API_KEY);
//         const userToken = await tokenProvider(); // Await the token generation
//         await chatClientInstance.connectUser(
//           {
//             id: user.id,
//             name: user.username || user.id,
//             image: user.imageUrl,
//           },
//           userToken // Use the resolved token
//         );
//         setChatClient(chatClientInstance);

//         // Create or get a channel for chat
//         const channelInstance = chatClientInstance.channel('messaging', 'general', {
//           name: 'General Chat',
//           members: [user.id],
//         });
//         await channelInstance.watch();
//         setChannel(channelInstance);
//       } catch (error) {
//         console.error('Error initializing Stream clients:', error);
//       }
//     };

//     initializeClients();

//     // Cleanup function
//     return () => {
//       // videoClient does not have a disconnect method, so we will remove this line.
//       chatClient?.disconnectUser();
//     };
//   }, [user, isLoaded]);

//   if (!videoClient || !chatClient || !channel) return <Loader />;

//   return (
//     <StreamVideo client={videoClient}>
//       <Chat client={chatClient} theme="str-chat__theme-dark">
//         <Channel channel={channel}>
//           <div className="flex h-screen">
//             <div className="w-1/2 bg-gray-900">
//               {/* Video Content */}
//               {children}
//             </div>
//             <div className="w-1/2 bg-gray-800">
//               {/* Chat Components */}
//               <ChannelHeader />
//               <MessageList />
//               <MessageInput />
//             </div>
//           </div>
//         </Channel>
//       </Chat>
//     </StreamVideo>
//   );
// };

// export default StreamVideoProvider;