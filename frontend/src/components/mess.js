import React, { useState, useEffect } from "react"
import io from "socket.io-client"
 import Authorize from '../authorize'
 import moment from 'moment'
let socket;

function Messenger({ username, profilePicture }) {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [users, setusers] = useState([]);
	const [receiver, setrec] = useState();
	const [change, setchange] = useState();

	const ENDPOINT = "localhost:5000";
	const room="a";

	useEffect(() => {
		socket = io(ENDPOINT)
		socket.emit('join',{username:username ,room:room},(error)=>{
		if(error){
			console.log(error)
		}})
	}, [username]) 
	
	useEffect(() => {
		socket.on("messages", message => {
		setMessages([...messages, message]);
		});
		socket.on("user_connected", user => {
		setusers([...users, user]);
		});
		return () => {
		socket.emit("disconnect");
		socket.off();
		};
	}, [messages, users]);

	useEffect(() => {
		fetch('/').then(res => res).then(chat => (chat))
	}, [])

	const sendMessage = e => {
		e.preventDefault();
		if (message) {
		socket.emit("sendMessage",{username:username ,message:message});
		}
		setMessage("");
	};

	const onselect = a => {
		setrec(a);
	};
	
	return (
		<div className="container">
			<Authorize/>
			<div className="row">
				<div className="col-md-3">
				{users.map((i,index) => (
					<div
					className="card mb-3 mt-3"
					style={{ maxWidth: "540px" }}
					onClick={() => onselect(i)}
					key={index}
					>
					<div className="row no-gutters">
						<div className="col-md-4">
						<img alt="Profile Picture" className="p-2" src={profilePicture} style={{ border: "50%", height: "100%", width: "100%" }}
						/>
						</div>
						<div className="col-md-8">
						<div className="card-body">
							<h5 className="card-title">{i}</h5>
						</div>
						</div>
					</div>
					</div>
				))}
				</div>
				<div className="col-md-9">

				{messages
					? messages.map((i, ind) => {
			return     <div className={`alert alert-secondary my-3 w-50 ${i.user===username?"ml-auto":""}`} key={ind}><p className=""> {i.user}:<span className="mx-2">{i.text}</span>
					</p><p className="text-right"><small>
				{ moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
					</small></p></div>
					})
					: ""}
				<div className="fixed-bottom mb-3 mr-5 ml-5">
					<label htmlFor=""></label>
					<input
					size="80"
					type="text"
					className="form-control"
					onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
					name="text"
					onChange={e => setMessage(e.target.value)}
					required
					/>
				</div>
				</div>
			</div>
		</div>
	)
}

export default Messenger;