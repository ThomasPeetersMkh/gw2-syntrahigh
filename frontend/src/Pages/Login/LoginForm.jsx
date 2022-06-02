const LoginForm = ({
  handleSubmit,
  setEmail,
  setPassword,
  email,
  password,
}) => {
  return (
    <form className="login_form" onSubmit={handleSubmit}>
      <div className="login_form__email">
        <input
          className="login_form__input"
          id="login-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="login_form__password">
        <input
          className="login_form__input"
          id="login-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="login_form__button button" type="submit">
        Aanmelden
      </button>
    </form>
  );
};

export default LoginForm;
