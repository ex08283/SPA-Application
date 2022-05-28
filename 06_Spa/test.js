const data = { username: 'example' };

let response = await fetch("http://localhost:3000/api/consoles", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    body: JSON.stringify(data)
})

