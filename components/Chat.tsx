import React, { useEffect, useState } from "react";
import { StreamChat } from 'stream-chat';
import {
    Chat,
    MessageList,
    MessageInput,
    Thread,
    Channel as ChannelComponent,
    Window,
    ChannelHeader,
    LoadingIndicator
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const user = {
    id: 'john',
    name: 'John Doe',
    image: 'https://getstream.io/img/stream-io-logo-noclient.png'
};

export default function App() {
    const [client, setClient] = useState<StreamChat | null>(null);
    const [channel, setChannel] = useState<any | null>(null); // Changed Channel to any

    useEffect(() => {
        async function init() {
            const chatClient = StreamChat.getInstance(apikey);
            await chatClient.connectUser(user, chatClient.devToken(user.id));
            const channelInstance = chatClient.channel('messaging', 'general', {
                name: 'General',
                members: ['john', 'jane'] // Ensure both users are added to the channel
            });
            await channelInstance.watch();
            setClient(chatClient);
            setChannel(channelInstance);
        }
        init();

        return () => {
            if (client) {
                client.disconnectUser();
            }
        };
    }, [client]); // Added client as a dependency

    if (!client || !channel) {
        return <LoadingIndicator />;
    }

    return (
        <Chat client={client} theme="messaging light"> {/* Added Chat component */}
            <ChannelComponent channel={channel}>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </ChannelComponent>
        </Chat>
    );
}