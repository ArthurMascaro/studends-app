import { useEffect, useState } from "react"

const Index = () => {

	const [name, setName] = useState("");
	const [users, setUsers] = useState(null);
	const [loading, setLoading] = useState(true)

	const handleOnClick = () => {
		window.main.send("hi");
		console.log("uepa");
	}

	useEffect(() => {
		window.main.send("get-users");
	}, [])

	return (
		<div>
			<button onClick={handleOnClick}>Clica aqui</button>
			{
				loading ? 
					<div>
						<h1>Oi</h1>
					</div>
				:
					<div>
						<ul>
							{
								users.forEach((user) => {
									return (
										<li>{user.name}</li>
									)
								})
							}
						</ul>
					</div>
			}
		</div>
	)
}

export default Index;