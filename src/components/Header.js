import React from 'react'
import styled from "styled-components"
import { Avatar } from "@mui/material"
import { AccessTime, Search, HelpOutline } from '@mui/icons-material'
import { auth } from '../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from "../features/userSlice"
import { signOut } from 'firebase/auth'

const Header = () => {
    const user = useSelector(selectUser)
    return (
        <HeaderContainer>
            {/* Header Left */}
            <HeaderLeft>
                <HeaderAvatar
                    onClick={() => signOut(auth)}
                    src={user?.photoURL}
                    alt={user?.displayName}
                />
                <AccessTime />
            </HeaderLeft>
            {/* Header Search */}
            <HeaderSearch>
                <Search />
                <input placeholder={`Search ${user?.displayName}`} />
            </HeaderSearch>
            {/* Header Right */}
            <HeaderRight>
                <HelpOutline />
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header;
const HeaderContainer = styled.div`
display: flex;
position: fixed;
width: 100%;
align-items: center;
justify-content: space-between;
background-color: var(--slack-color);
color:white;
padding:10px 0
`
const HeaderLeft = styled.div`
flex:0.3;
display: flex ;
align-items: center;
margin-left: 20px;

>.MuiSvgIcon-root{
    margin-right: 30px;
    margin-left: auto;
}
`
const HeaderAvatar = styled(Avatar)`
cursor: pointer;
:hover{
    opacity:0.8
}
`

const HeaderSearch = styled.div`
flex:0.4;
opacity:1;
border-radius: 6px;
text-align: center;
border-color: #421f44;
display: flex;
padding:0 50px;
color:gray;
border: 1px solid gray;
>input{
    background-color:transparent;
    border:none;
    text-align: center;
    min-width:30vw;
    outline:0;
    color:white
}
`
const HeaderRight = styled.div`
flex:0.3;
display: flex;
align-items: flex-end;
>.MuiSvgIcon-root{
    margin-left:auto;
    margin-right: 20px;
}
`