// extensible api. abstracting some of the logic away from using fetch or any other library for data fetching.
// not super useful with only a get method


const body = {
    method:'GET',
    mode:'cors',
    headers: {}
}

export const httpGet = async (url) => {
    let data = await fetch(url, body)
    return await data.json()
}