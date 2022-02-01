import { Box, TextField, Button } from '@skynexui/components';
import { useRouter } from 'next/router';
import React from 'react';
import appConfig from '../config.json';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'
import { ChatHeader } from '../src/components/ChatHeader';
import { MessageList } from '../src/components/MessageList'
import { updateMessages } from '../src/service/updateMessages'
import { supabaseClient } from '../src/helpers/supabaseClient';
import { sendMessage } from '../src/service/sendMessage';


export default function ChatPage() {
    const router = useRouter();
    const userLoggedIn = router.query.username;
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('created_at', { ascending: false })
            .then(({ data }) => {
                setMessageList(data);
            });

        const subscription = updateMessages((newMessage) => {
            setMessageList((currentList) => {
                return [
                    newMessage,
                    ...currentList,
                ]
            }
            )
        })
        return () => {
            subscription.unsubscribe();
        }
    }, []);



    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary['000'],
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <ChatHeader/>
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList messages={messageList} />
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px'
                        }}>
                        <Box
                            as="form"
                            styleSheet={{
                                display: 'flex',
                                flex: 20,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <TextField
                                value={message}
                                onChange={(event) => {
                                    const valor = event.target.value;
                                    setMessage(valor);
                                }}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        sendMessage({
                                            newMessage: message,
                                            setMessage: setMessage,
                                            userLoggedIn: userLoggedIn,
                                        });
                                    }
                                }}
                                placeholder="Insira sua message aqui..."
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    color: appConfig.theme.colors.neutrals[200],
                                    justifyContent: 'center'
                                }}
                            />
                        </Box>
                        <Button
                            iconName="paperPlane"
                            rounded='full'
                            size='md'
                            onClick={(event) => {
                                event.preventDefault();
                                sendMessage({
                                    newMessage: message,
                                    setMessage: setMessage,
                                    userLoggedIn: userLoggedIn,
                                });
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.primary["000"],
                                mainColor: appConfig.theme.colors.primary['005'],
                                mainColorLight: appConfig.theme.colors.primary['010'],
                                mainColorStrong: appConfig.theme.colors.primary['010'],
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                sendMessage({
                                    newMessage: `:sticker:${sticker}`,
                                    setMessage: setMessage,
                                    userLoggedIn: userLoggedIn,
                                })
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}