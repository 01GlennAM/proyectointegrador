import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDemoAuth } from "../context/DemoAuthContext.jsx";
import { DEMO_ACCOUNT } from "../services/demoAuth.js";
import usePageTitle from "../hooks/usePageTitle.js";
import "./Acceso.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Acceso() {
  usePageTitle("Acceso de demostración");
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const { signIn, register } = useDemoAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const returnTo = location.state?.returnTo === "/resumen" ? "/resumen" : "/resumen";

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Completa el correo electrónico y la contraseña.");
      return;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }
    if (isRegistering) {
      if (!confirmation) {
        setError("Confirma tu contraseña para continuar.");
        return;
      }
      if (password !== confirmation) {
        setError("Las contraseñas no coinciden.");
        return;
      }
      register(email);
      navigate(returnTo, { replace: true });
      return;
    }

    if (!signIn(email, password)) {
      setError("Los datos no coinciden con la cuenta de demostración.");
      return;
    }
    navigate(returnTo, { replace: true });
  }

  function fillDemoAccount() {
    setEmail(DEMO_ACCOUNT.email);
    setPassword(DEMO_ACCOUNT.password);
    setError("");
  }

  return (
    <section className="auth-page">
      <div className="commerce-heading">
        <p className="commerce-eyebrow">Compra de demostración</p>
        <h1>{isRegistering ? "Crear cuenta" : "Iniciar sesión"}</h1>
      </div>

      <div className="auth-card">
        <p className="demo-notice">
          Esta autenticación es solo una demostración local. No se conecta a un servidor
          ni guarda las cuentas de forma persistente.
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="auth-email">Correo electrónico</label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="auth-password">Contraseña</label>
          <input
            id="auth-password"
            type="password"
            autoComplete={isRegistering ? "new-password" : "current-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {isRegistering && (
            <>
              <label htmlFor="auth-confirmation">Confirmar contraseña</label>
              <input
                id="auth-confirmation"
                type="password"
                autoComplete="new-password"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                required
              />
            </>
          )}

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="commerce-button auth-submit" type="submit">
            {isRegistering ? "Crear cuenta de demostración" : "Iniciar sesión"}
          </button>
        </form>

        <button
          className="auth-mode-toggle"
          type="button"
          onClick={() => {
            setIsRegistering((current) => !current);
            setError("");
          }}
        >
          {isRegistering ? "Ya tengo una cuenta: iniciar sesión" : "Crear una cuenta"}
        </button>

        {!isRegistering && (
          <aside className="demo-credentials">
            <h2>Cuenta de demostración</h2>
            <p>Correo: <code>{DEMO_ACCOUNT.email}</code></p>
            <p>Contraseña: <code>{DEMO_ACCOUNT.password}</code></p>
            <button type="button" onClick={fillDemoAccount}>Usar esta cuenta</button>
            <small>Estas credenciales ficticias son visibles en el código y no son seguras para producción.</small>
          </aside>
        )}

        <div className="auth-links">
          <Link to="/carrito">Volver al carrito</Link>
          <Link to="/productos">Seguir comprando</Link>
        </div>
      </div>
    </section>
  );
}
