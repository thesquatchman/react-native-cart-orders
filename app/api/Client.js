export default class Client {
  constructor(token) {
    this.baseUrl = 'http://localhost:3000/'
    this.defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'json'
    },
    this.authHeaders = {
        'x-access-token': `${token}`,
        'Content-Type': 'application/json',
        'Accept': 'json'
    }
    
  }

  postLogin = (body) => this.postWithoutAuth(this.baseUrl + 'authenticate', body)//returns a jwt
  getOrders = () => this.fetchWithAuth(this.baseUrl + 'api/orders')//returns array of items
  updateOrder = (id,body) => this.putWithAuth(this.baseUrl + 'api/orders/' + id, body)//returns array of items
  
  fetchWithAuth = (url) => (
    fetch(url, {
      headers: this.authHeaders
    }).then((response) => response.json())
  )

  postWithoutAuth = (url,body) => (
      fetch(url, {  
        method: 'POST',
        headers: this.defaultHeaders,
        body: JSON.stringify(body)
      }).then((response) => response.json())
  )

  postWithAuth = (url,body) => (
      fetch(url, {  
        method: 'POST',
        headers: this.authHeaders,
        body: JSON.stringify(body)
      }).then((response) => response.json())
  )

  putWithAuth = (url,body) => (
      fetch(url, {  
        method: 'PUT',
        headers: this.authHeaders,
        body: JSON.stringify(body)
      }).then((response) => response.json())
  )

  deleteWithAuth = (url) => (
      fetch(url, {  
        method: 'DELETE',
        headers: this.authHeaders,
      }).then((response) => response.json())
  )

}
