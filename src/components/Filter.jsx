import { GiCobweb } from "react-icons/gi"


const Filter = ({openModal, checkId}) =>{
//el css esta en index.css
    return(
        <div className={'filter-container'}>
            

            <button onClick={()=>{openModal(), checkId()}}>
            <GiCobweb className='icon-add'/>
                 Agregar Nota 
            </button>
        </div>
    )
}

export default Filter