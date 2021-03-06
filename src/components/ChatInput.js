import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { Button } from "@mui/material"
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const ChatInput = ({ channelName, channelId, chatRef, messageUpdate }) => {

    const user = useSelector(selectUser)
    const [input, setInput] = useState("")
    const sendMessage = async e => {
        e.preventDefault();
        if (!channelId) {
            return false;
        }
        await addDoc(collection(doc(collection(db, "rooms"), channelId), "messages"), {
            message: input,
            timestamp: serverTimestamp(),
            user: user?.displayName,
            userImage: user?.photoURL
        })
        messageUpdate(input)
        chatRef.current.scrollIntoView({
            behavior: "smooth"
        });
        setInput("")
    }



    return (
        <ChatInputContainer>
            <form>
                <input value={input} onChange={e => setInput(e.target.value)}
                    placeholder={`Message #${channelName}`} />
                <Button hidden type="submit" onClick={sendMessage}>
                    SEND
                </Button>
            </form>

        </ChatInputContainer>
    )
}

export default ChatInput
const ChatInputContainer = styled.div`

border-radius:20px;
>form{
    position:relative;
    display:flex;
    justify-content:center;
}
>form >input{
    position: fixed;
    bottom:30px;
    width:60%;
    border:1px solid gray;
    border-radius:3px;
    padding:20px;
    outline:none;    
}
>form >button{
    display: none !important;
}
`