function LoginForm() {
    return (
    <div>
        <form onSubmit={submitContact}>
        <label>
            Username:
            <input type="text" name="username" defaultValue="declint"/>
        </label>

        <br/>
        <label>
            Password:
            <input type="password" name="password" />
        </label>

        <br/>
        <input type="submit" value="Submit" />
        </form>
    </div>
)
}

const submitContact = async (event) => {
event.preventDefault();
console.log(event.target.username.value)
//  alert("Ska vi skicka")
}
  

export default LoginForm
