import { Box, styled } from '@mui/material'
import { useState, useEffect, useContext, useRef } from 'react';
import Footer from './Footer'
import axios from 'axios';
import { toast } from 'react-toastify'
import SingleMessage from './SingleMessage';
import { io } from 'socket.io-client';
import { AccountContext } from '../../context/AccountProvider';

const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Component = styled(Box)`
    height: 83.5vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 2px 15px;
`;


const Messages = ({ person, account, conversation }) => {
    const [value, setValue] = useState('');
    const [incomingMessage, setIncomingMessage] = useState(null);
    const [message, setMessage] = useState([]);
    const scrollRef = useRef();

    const { socket, newMessageFlag, setNewMessageFlag } = useContext(AccountContext);

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            })
        })
    }, []);

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
            setMessage((prev) => [...prev, incomingMessage]);

    }, [incomingMessage, conversation]);

    const sendText = async (e) => {
        const code = e.which;
        if (code === 13) {
            let message = {
                senderId: account._id,
                recieverId: person._id,
                conversationId: conversation._id,
                type: 'text',
                text: value
            }

            socket.current.emit('sendMessage', message);

            try {
                const result = await axios.post(`http://localhost:8000/api/v3/feed/newmessage`, message);
                console.log(result.data);
                setValue('');
                setNewMessageFlag(prev => !prev);
            } catch (err) {
                toast.error(err);
            }
        }
    }

    useEffect(() => {
        const getMessageDetails = async () => {
            try {
                const result = await axios.get(`http://localhost:8000/api/v3/feed/getmessage/${conversation._id}`);
                setMessage(result.data.messages);
            } catch (err) {
                toast.error(err.message);
            }
        }
        conversation._id && getMessageDetails();
    }, [person._id, conversation._id, newMessageFlag]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: 'smooth' })
    }, [message])
    return (
        <Wrapper>
            <Component>
                {
                    message && message.map((mess, key) => (
                        <Container ref={scrollRef}>
                            <SingleMessage mess={mess} key={key} />
                        </Container>
                    ))
                }
            </Component>
            <Footer
                sendText={sendText}
                value={value}
                setValue={setValue}
            />
        </Wrapper>
    )
}

export default Messages
