
const Header = () =>{

const fechaActual = () =>{
    const fecha = new Date()
    const dia = fecha.getDate()
    const mes = fecha.getMonth() + 1

    const formatoDia = dia < 10 ? '0' + dia : dia
    const formatoMes = mes <10 ? '0' + mes : mes

    return formatoDia +' / '+ formatoMes 
}
    
const obtenerFecha = fechaActual()

    return(
        <header className="headerComp">
        
            <h2>Bienvenido, hoy es:  {obtenerFecha}</h2>
            <img className="logo-img" src="../../img/spider-logo.png" alt="logo" />
        </header>
    )
}
export default Header