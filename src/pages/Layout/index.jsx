
import { useEffect } from "react"
import { request } from "../../utils"

const Layout =()=>{
    useEffect(()=>{
        request.get('/channels')
    },[])
    return(
        <div>这里是Layout</div>
    )
}

export default Layout