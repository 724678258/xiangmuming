import { useEffect,useState } from "react"
import { getChannelsAPI } from "../../src/apis/acticle"


function useChannel() {

    const [channelList, setChannelList] = useState([])

    useEffect(() => {
        const getChannelList = async () => {
            const res = await getChannelsAPI()
            setChannelList(res.data.channels)
        }
        getChannelList()
    }, [])
    return {
        channelList
    }
}

export { useChannel } 