const Alerts = props => {
    const {mensaje,tipo} = props;

    const estiloAlerta = {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "1.2rem",
      };

    return(
        <>
        <div className={`alert alert-${tipo}`} role="alert" style={estiloAlerta}>
        {mensaje}
        </div>
        </>
    )

}

export default Alerts;