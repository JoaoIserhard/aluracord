import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import React from 'react';
import appConfig from '../config.json';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwNDI3NSwiZXhwIjoxOTU4ODgwMjc1fQ.3FMPkKznhZmcFjdW0rwVEhTYc63jqkzrMnX9iS3FTh4';
const SUPABASE_URL = 'https://errkjmfdbwhvplybiwix.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


function updateMessages(addMessage) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (response) => {
            addMessage(response.new);
        })
        .subscribe();
}

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

    function handleNovaMensagem(newMessage) {
        const message = {
            de: userLoggedIn,
            texto: newMessage,
        };

        supabaseClient.from('mensagens').insert([message]).then(({ data }) => {
            console.log(data);
        })
        setMessage('');
    }

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
                <Header />
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
                    <MessageList mensagens={messageList} />
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
                                        handleNovaMensagem(message);
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
                                handleNovaMensagem(message);
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
                                handleNovaMensagem(`:sticker:${sticker}`)
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${message.de}.png`}
                            />
                            <Text tag="strong">
                                {message.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {message.texto.startsWith(':sticker:') ?
                            <Image src={message.texto.replace(':sticker:', '')} /> : message.texto}
                    </Text>
                );
            })}
        </Box>
    )
}