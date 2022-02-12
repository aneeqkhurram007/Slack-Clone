import { InfoOutlined, StarBorderOutlined } from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectRoomId } from '../features/appSlice'
import ChatInput from './ChatInput'
import { doc, getDoc, getDocs, query, collection, orderBy } from "firebase/firestore"
import { db } from "../firebase"
import Message from './Message'

const Chat = () => {
    const roomId = useSelector(selectRoomId)
    const [roomDetails, setRoomDetails] = useState({})
    const [roomMessages, setRoomMessages] = useState([])
    const chatRef = useRef(null)
    const [updateMessage, setMessage] = useState("")
    useEffect(() => {
        if (roomId) {
            (async function () {
                const roomDetails = await getDoc(doc(db, "rooms", roomId))
                setRoomDetails(roomDetails.data());
                const messageRef = collection(doc(db, "rooms", roomId), "messages")
                const roomMessages = await getDocs(query(messageRef, orderBy("timestamp", "asc")))
                setRoomMessages(roomMessages.docs)
                chatRef?.current?.scrollIntoView({ behvior: "smooth" })
            })()
        }
    }, [roomId])
    const messageUpdate = message => {
        setMessage(message)
    }

    return (
        <ChatContainer>
            {
                roomDetails?.name && (
                    <>
                        <Header>

                            <HeaderLeft>
                                <h4><strong>#{roomDetails?.name}</strong></h4>
                                <StarBorderOutlined />
                            </HeaderLeft>
                            <HeaderRight>
                                <p>
                                    <InfoOutlined /> Details
                                </p>
                            </HeaderRight>
                        </Header>
                        <ChatMessages>
                            {/* List out the messages */}
                            {roomMessages?.map(doc => {
                                const { message, timestamp, user, userImage } = doc.data()
                                return <Message key={doc.id}
                                    message={message}
                                    timestamp={timestamp}
                                    user={user}
                                    userImage={userImage}
                                    updateMessage={updateMessage}
                                />
                            })}
                            <ChatBottom ref={chatRef} />
                        </ChatMessages>
                        <ChatInput messageUpdate={messageUpdate} channelId={roomId} channelName={roomDetails?.name} chatRef={chatRef} />

                    </>

                )
            }

        </ChatContainer>
    )
}

export default Chat
const ChatContainer = styled.div`
flex:0.7;
flex-grow: 1;
overflow-y: scroll;
margin-top: 60px;
`
const Header = styled.div`
display:flex;
justify-content: space-between;
padding: 20px;
border-bottom: 1px solid lightgray;
`
const HeaderLeft = styled.div`
display:flex;
align-items: center;
>h4{
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
}
>h4 >.MuiSvgIcon-root{
    margin-left: 10px;
    font-size:18px;
}
`
const HeaderRight = styled.div`
>p{
    display: flex;
    align-items: center;
    font-size:14px;
}
>p >.MuiSvgIcon-root{
    margin-right: 5px !important;
    font-size: 16px;
}
`
const ChatMessages = styled.div``
const ChatBottom = styled.div`
`