export const RemoteServiceLs = async ({api, key}, cid = null) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + key);
  let url = api + '/pins'
  if (cid) url = url + '?cid=' + cid

  const result = await fetch(url, {
    method: 'GET',
    headers: myHeaders,
  })
  return await result.json()
}

export const RemoteServiceAdd = async ({api, key}, {cid, name}) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + key);

  const result = await fetch(api + '/pins', {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ cid, name })
  })
  return await result.json()
}

export const RemoteServiceRm = async ({api, key}, {cid}) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + key);

  const result = await RemoteServiceLs({api, key}, {cid})
  
  if (result.count > 0) {
    for (const obj of result.results) {
      await fetch(api + '/pins/' + obj.requestId, {
        method: 'DELETE',
        headers: myHeaders
      })
    }
  }
}
