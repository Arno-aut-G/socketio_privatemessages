import './Chat.css'
import { useState, useEffect } from 'react'
import socket from '../socket'
import User from './User'
import MessagePanel from './MessagePanel'

const Chat = ({ username }) => {
    const [selectedUser, setSelectedUser] = useState(null)
    const [users, setUsers] = useState([])


    const dynamProperties = (user) => {
        user.connected = true;
        user.messages = [];
        user.hasNewMessages = false;
    }

    const updateUsers = (user) => { //this probably not working properly
        setUsers(users.map(userObject =>
            userObject.userID === user.userID
                ? user
                : userObject))
    }


    useEffect(() => {


        socket.on("users", (users) => {
            //add properties to the user objects
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
            //add new users to the users state (for own connection)
            let newUsersArray = users
            newUsersArray.forEach((user) => {
                if (user.self) {
                    user.connected = true;
                }
            });
            setUsers(newUsersArray)
        });

        socket.on("disconnect", () => {
            //set disconnected user status for the users state (for own connection)
            let disconnUsersArray = users
            disconnUsersArray.forEach((user) => {
                if (user.self) {
                    user.connected = false;
                }
            });
            setUsers(disconnUsersArray)
        });

        socket.on("user connected", (user) => {
            // supply properties to incoming users and add them to the users state
            dynamProperties(user);
            setUsers(prevState => ([...prevState, user]))
        });

        socket.on("user disconnected", (id) => {
            //set disconnected user status for the users state
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
            console.log(from)
            for (let i = 0; i < mesUsers.length; i++) {
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
    }, [selectedUser, users])

    console.log(users)
    console.log(selectedUser)
    console.log(socket)



    return (
        <>
            <div className="left-panel">
                {users.map((user) =>
                    <User key={user.userID} user={user} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                )}
            </div>
            <div className="right-panel">
                {selectedUser ? <MessagePanel user={selectedUser} updateUsers={updateUsers} /> : <p>No messages</p>}
            </div>
        </>

    )
}

export default Chat