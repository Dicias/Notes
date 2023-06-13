
const NotasAct = ({tittle, content, category, remove}) =>{
    return(
        <div className="notasA" onClick={remove}>
            <h4>{tittle}</h4>
            <label> {category}
            <p>{content}
            </p>
            </label>
        </div>
    )
}

export default NotasAct

