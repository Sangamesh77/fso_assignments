const LoginForm = (props) => {
    const {onSubmit, username, setUsername, password, setPassword} = props
    return(
        <form onSubmit={onSubmit}>
            <h2>log in to application</h2>
            <div>
                username
                <input
                  type='text'
                  name='Username'
                  value={username}
                  onChange={target => setUsername(target.target.value)}
                />
            </div>
            <div>
                password
                <input
                  type='password'
                  name='Password'
                  value={password}
                  onChange={target => setPassword(target.target.value)}
                />
            </div>
            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginForm