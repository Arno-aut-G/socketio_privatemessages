import './Chat.css'
import { useState, useEffect } from 'react'
import socket from '../socket'
import User from './User'
import MessagePanel from './MessagePanel'

const Chat = () => {
    const [selectedUser, setSelectedUser] = useState(null)
    const [users, setUsers] = useState([])


    const dynamProperties = (user) => {
        user.connected = true;
        user.messages = [];
        user.hasNewMessages = false;
    };

    useEffect(() => {

        //this block will go when i have user initialization via username
        const username = 'Number1'
        socket.auth = { username }
        socket.connect()

        socket.on("users", (users) => {
            users.forEach((user) => {
                user.self = user.userID === socket.id;
                dynamProperties(user);
            });
            // put the current user first, and sort by username
            users = users.sort((a, b) => {
                if (a.self) return -1;
                if (b.self) return 1;
                if (a.username < b.username) return -1;
                return a.username > b.username ? 1 : 0;
            });
            console.log(users)
            setUsers(users)
        });

        socket.on("connect", () => {
            let newUsersArray = users
            newUsersArray.forEach((user) => {
                if (user.self) {
                    user.connected = true;
                }
            });
            setUsers(newUsersArray)
        });

        socket.on("disconnect", () => {
            let disconnUsersArray = users
            disconnUsersArray.forEach((user) => {
                if (user.self) {
                    user.connected = false;
                }
            });
            setUsers(disconnUsersArray)
        });

        socket.on("user connected", (user) => {
            dynamProperties(user);
            setUsers(prevState => ([...prevState, user]))
        });

        socket.on("user disconnected", (id) => {
            let disconnUsers = users
            for (let i = 0; i < disconnUsers.length; i++) {
                const user = disconnUsers[i];
                if (user.userID === id) {
                    user.connected = false;
                    break;
                }
            }
            setUsers(disconnUsers)
        });

        socket.on("private message", ({ content, from }) => {
            let mesUsers = users
            for (let i = 0; i < mesUser.length; i++) {
                const user = mesUsers[i];
                if (user.userID === from) {
                    user.messages.push({
                        content,
                        fromSelf: false,
                    });
                    if (user !== selectedUser) {
                        user.hasNewMessages = true;
                    }
                    break;
                }
            }
            setUsers(mesUsers)
        });

        return () => {
            socket.off("connect")
            socket.off("disconnect")
            socket.off("users")
            socket.off("user connected")
            socket.off("user disconnected")
            socket.off("private message")
        }
    }, [])

    //event methods (clicking, messaging go here)


    console.log(users)


    return (
        // <>
        //     <h1>I really don't know</h1>
        // </>

        <>
            <div className="left-panel">
                {users.map((user) =>
                    <User key={user.userID} user={user} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                )}
                {/* <user
                    v-for="user in users"
                :key="user.userID"
                :user="user"
                :selected="selectedUser === user"
                @select="onSelectUser(user)"
            /> */}
            </div>
            <div className="right-panel">
                {selectedUser ? <MessagePanel user={selectedUser} /> : <p>Messages</p>}
                {/* <message-panel
                v-if="selectedUser"
            :user="selectedUser"
            @input="onMessage"
            class="right-panel"
            /> */}
            </div>
        </>

    )
}

export default Chat