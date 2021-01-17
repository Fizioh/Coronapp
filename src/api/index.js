import axios from 'acios';

const url = "https://covid19.mathdro.id/api";

export fetchData = async () => {
    try {
            const response = await axios.get(url);
            
            return response;
    } catch(error) {

    }
}