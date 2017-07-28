import * as xhr from './xhr'

class mockXhr {
  constructor(){}
  onload(){}
  onerror(){}
  open(method, url, async){
    if(url === 'invalid'){
      throw new Error('Not acceptable')
    }
  }
  send(params){
    if(params === 'road to success'){
      this.status = 200
      this.response = 'Yeah, nailed it!'
      this.onload()
    }
    else if(params === 'road to success with bumps'){
      this.status = 403
      this.response = 'bad request'
      this.onload()
    }
    else if(params === 'road to perdition'){
      this.status = 404
      this.response ='not found'
      this.onerror()
    }
  }
}
describe('Xhr', () => {
  let xhrOrigin = window.XMLHttpRequest
  beforeAll(function() {
         jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
       })
     beforeEach(()=>{
       window.XMLHttpRequest = mockXhr
     })
   afterEach(()=> {
     window.XMLHttpRequest = xhrOrigin
       })
   it('should get the info successfully', (done) => {
     let options = {
       method:'GET',
       url:'earth/moon',
       params:'road to success'
     }
    return xhr.xhrPromise(options)
    .then((res)=>{
      expect(res.status).toEqual(200)
      done();
    })
  })
   it('should return bad request error', (done) => {
     let options = {
       method:'GET',
       url:'earth/moon',
       params:'road to success with bumps'
     }
    return xhr.xhrPromise(options)
    .catch((res)=>{
      expect(res.status).toEqual(403)
      done();
    })
  })
  it('should return error', (done) => {
    let options = {
      method:'GET',
      url:'earth/moon',
      params:'road to perdition'
    }
   return xhr.xhrPromise(options)
   .catch((err)=>{
     expect(err.status).toEqual(404)
     done();
   })
 })
 it('should not be acceptable', (done) => {
   let options = {
     method:'GET',
     url:'invalid'
   }
  return xhr.xhrPromise(options)
  .catch((err)=>{
    expect(err.status).toEqual(406)
    done();
    })
  })
})
