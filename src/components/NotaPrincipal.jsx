
const NotaPrincipal = ({note}) =>{

    return(
        <div className="nota-principal">
        <h4>{note.tittle}</h4>
        <label>{note.category}</label>
        <p>{note.content}</p>
        </div>
    )
}

export default NotaPrincipal