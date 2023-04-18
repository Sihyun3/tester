import { useRef, useState, useEffect } from 'react';
import * as StompJs from '@stomp/stompjs';
import axios from 'axios';

function Message() {
    const userid = 1;
    const roomIdx = 1;

    const [chat, setChat] = useState('');
    const [message, setMessage] = useState([]);
    const client = useRef({});
    const [user1, setUser1] = useState();
    const [user2, setUser2] = useState();
    const [channelId2, setChannelId2] = useState();

    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: () => {
                console.log('success');
            },
        });
        client.current.activate();
    };

    const disconnect = () => {
        client.current.deactivate();
    };

    const handleChange = (event) => { // 채팅 입력 시 state에 값 설정
        setChat(event.target.value);
    };

    const handleSubmit = (event, chat) => { // 보내기 버튼 눌렀을 때 publish
        event.preventDefault();
        publish(chat);
    };

    useEffect(() => {
        connect();
    }, []);

    const publish = () => {
        if (!client.current.connected) return;
        client.current.publish({
            destination: '/pub/hello',
            body: JSON.stringify({
                roomIdx: roomIdx,
                data: chat,
                channelId: channelId2,
                writer: user1
            }),
        });
        let b = { roomIdx: roomIdx, data: chat, channelId: channelId2, writer: user1 }
        setMessage([...message, b])

    };

    const asd = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8080/hi/${roomIdx}`)
            .then(response => {
                setMessage(response.data.messagelist);
                if (userid == response.data.chatting.user1) {
                    setChannelId2(response.data.chatting.user2channelIdx)
                    setUser1(response.data.chatting.user1)
                    setUser2(response.data.chatting.user2)
                    abc(response.data.chatting.user1ChannelIdx);
                } else if (userid == response.data.chatting.user2) {
                    setChannelId2(response.data.chatting.user1ChannelIdx)
                    setUser2(response.data.chatting.user1)
                    setUser1(response.data.chatting.user2)
                    abc(response.data.chatting.user2channelIdx);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    const [a, setA] = useState({});
    useEffect(() => {
        setMessage([...message, a])
    }, [a])

    function abc(a) {
        console.log(a);
        client.current.subscribe('/sub/channel/' + a, (body) => {
            const json_body = JSON.parse(body.body);
            setA({ roomIdx: json_body.writer, data: json_body.data, channelId: json_body.channelId, writer: json_body.writer });

        })
    }

    const test = () => {
        // let a = {roomIdx: roomIdx,data: chat,channelId: channelId2,writer: user1}
        // console.log([...message , a])
        console.log(channelId2);
    }

    return (
        <>
            <button onClick={asd}> 1번 클라이언트 </button>
            {
                message.map((n) => (
                    <div key={n.messageIdx}>{n.data}</div>
                ))
            }
            <input type={'text'} name={'chatInput'} onChange={handleChange} value={chat} />
            <button type={'submit'} onClick={handleSubmit} value={'의견 보내기'} >보내기</button>
            <button onClick={test} >테스트 </button>
        </>
    );

}
export default Message;