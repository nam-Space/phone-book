import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const [users, setUsers] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		axios.get('http://localhost:3001/users')
			.then(res => {
				setUsers(res.data)
			})
	}, [])

	const handleAdd = () => {
		navigate('/management', {
			state: {
				action: 'add'
			}
		})
	}

	const handleEdit = id => {
		navigate('/management', {
			state: {
				id,
				action: 'edit'
			}
		})
	}

	const handleDelete = id => {
		const confirm = window.confirm("Are you sure to delete this user?")
		if (confirm) {
			axios.delete(`http://localhost:3001/users/${id}`)
				.then(res => {
					alert('Deleting successful!')
					const listUsers = users.filter(user => user.id !== id)
					setUsers(listUsers)
                    console.log(res)
				})
				.catch(res => {
					alert('Something error!')
                    console.log(res)
				})
		}
	}

  	return (
		<div className="wrapper">
			<div className="flex justify-between my-10">
				<h1>Contacts</h1>
				<button 
					className="bg-green-500 p-3 rounded-[6px] text-white"
					onClick={handleAdd}
				>
					Add Contact
				</button>
			</div>

			<table className="w-full">
				<thead>
					<tr className="bg-slate-100 hover:bg-cyan-100 h-[60px]">
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={index} className="bg-slate-300 hover:bg-green-300 h-[60px]">
							<td className="flex items-center justify-center h-[60px]">
								<img src={user.url_image} alt="" className="w-[46px] h-[46px] mr-[10px] object-cover"/>
								<span>{user.name}</span>
							</td>
							<td className="text-center h-full">
								{user.email}
							</td>
							<td className="text-center h-full">
								{user.phone}
							</td>
							<td className="text-center h-full">
								<button 
									className="mr-2 bg-indigo-600" 
									onClick={() => handleEdit(user.id)}
								>
									Edit
								</button>
								<button 
									className="bg-rose-600"
									onClick={() => handleDelete(user.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
  	);
};

export default Home;
