// init & addEventListener(click & selector)
// qmt.yjbctv.com:8081/news/doc/showDoc.do?docMaster.id=106054&_dc=1585289565610
// Cookie = "JSESSIONID=8CAF6F0BC2D9C699CCE524C3DFB60798";
var Steps = {};
var Req = {};
var Res = {};
var Store = {
  objectId: " ",
  username: " ",
  email: " ",
  createdAt: " ",
  sessionToken: " "
};
const apiurl = "http://qmt.yjbctv.com:8081/news";
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
Req.baseHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
});
Req.loginHeaders = new Headers({
  //'Accept': 'application/json',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Connection': 'keep-alive',
  //'Location': `$(apiurl)/templates/render.jsp`
});
Req.postHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
});
//Req.currentMeHeaders = Req.baseHeaders;
// Req.currentMeOpt = {
//   method: 'GET',
//   headers: Req.currentMeHeaders,
//   credentials: 'include', // send cookies even for a cross-origin call
//   //redirect: 'follow',
//   mode: 'cors'
// };
var name, pass;
// Req.currentMeData = new Request(`${apiurl}/users/me`, Req.currentMeOpt);

document.querySelector('#login').addEventListener('click', function (e) {
  //document.querySelector('#login').addEventListener('click', e => {
  console.log('1. you did a click!');
  e.preventDefault();
  login.init();
})
//login.init = function() {


login.init = function () {
  name = document.querySelector('#name').value;
  pass = document.querySelector('#pass').value;
  console.log(`2. ${name}, ${pass}`,"name=" + typeof name,"pass=" + typeof pass);
  const login = {};
  //login.reqData = new Request(`${apiurl}/login?username=${name}&password=${pass}`, login.fetchOpt);
  // login.reqBody = {
  //   loginId: name,
  //   password: pass
  // };
  login.reqBody = `loginId=${name}&password=${pass}`;
  login.fetchOpt = {
    //SameSite: None,
    method: 'GET',
    headers: Req.loginHeaders,
    credentials: 'same-origin',
    //credentials: 'include', // send cookies even for a cross-origin call
    //redirect: 'follow',
    mode: 'no-cors',
    //body: login.reqBody
    //body: JSON.stringify(login.reqBody)
  };
  login.reqData = new Request(`${apiurl}/login.do?${login.reqBody}`, login.fetchOpt);
  login.init = fetch(login.reqData)
  .then(resLogin => {
    console.log('3. The login.init are fetched: -> ' + resLogin, typeof resLogin);
    return resLogin.text();
  });
  login.detailAndToken = login.init.then(resLoginDnT => {
    console.log('4. The resLoginDnT are fetched: -> ', resLoginDnT, 'resLoginDnT=' + typeof resLoginDnT);
    //var token = resLoginDnT.sessionToken;
    //body.write
    //document.open();
    document.body.innerHTML = '<div style="display:block;">' + resLoginDnT + '</div>';
    //document.write(resLoginDnT);
    //document.close();
    //console.log(`5. ${token}`,'token=' + typeof token);
    //sessionStorage.setItem('Token', token);
    // Req.currentMeHeaders = Req.baseHeaders;
    const mathTodayDate = new Date();
    function formatDate(date) {
      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
      if (month.length < 2)
      month = '0' + month;
      if (day.length < 2)
      day = '0' + day;
      return [year, month, day].join('-');
    }
    var toDate = formatDate(mathTodayDate);
    Req.currentMeHeaders = new Headers({
      //'Accept': 'application/json',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Connection': 'keep-alive',
    });

    Req.currentMeOpt = {
      method: 'GET',
      headers: Req.currentMeHeaders,
      credentials: 'include', // send cookies even for a cross-origin call
      //redirect: 'follow',
      mode: 'no-cors'
    };
    //http://qmt.yjbctv.com:8081/news/notice/findNotReceiveMessageNumber.do?_dc=1585293464575
    //Req.currentMeHeaders.append('X-Parse-Session-Token', token);
    // qmt.yjbctv.com:8081/news/coldoc/queryCommon.do?iscommand=true&xml=true&searchParameter~%20~%20~createdDate~%20~_h__s_~and~5~3~yyyy-MM-dd~%20~coldocsearch=2020-03-27&searchParameter~%20~%20~updatedDate~%20~_l__s_~and~5~4~yyyy-MM-dd%20HH:mm:ss~%20~coldocsearch=2020-03-27%2023:59:59&posStart=0&count=20
    // Req.currentMeData = new Request(`${apiurl}/notice/findNotReceiveMessageNumber.do`, Req.currentMeOpt);
    Req.currentMeData = new Request(`${apiurl}/coldoc/queryCommon.do?iscommand=true&xml=true&searchParameter~%20~%20~createdDate~%20~_h__s_~and~5~3~yyyy-MM-dd~%20~coldocsearch=${toDate}&searchParameter~%20~%20~updatedDate~%20~_l__s_~and~5~4~yyyy-MM-dd%20HH:mm:ss~%20~coldocsearch=${toDate}%2023:59:59&posStart=0&count=20`, Req.currentMeOpt);
    //var t = Req.currentMeHeaders.get('X-Parse-Session-Token');
    //console.log(`5.1 ${t}`);
    return fetch(Req.currentMeData);
  });
  login.detailAndToken = login.detailAndToken
  .then(resCurrentUserD => {
    console.log('6. The resCurrentUserD are fetched: -> ', resCurrentUserD);
    return resCurrentUserD.text();
  });
  login.currentMe = login.detailAndToken
  .then(resCurrentMe => {
    console.log('7. The resLayoutCurrentMe1 are fetched: -> ', resCurrentMe);

    var filter01_img = resCurrentMe.replace(/\<cell\>?\.+.\images?/g, '<cell><img src="' + apiurl + '/images');

    var filter02_img = filter01_img.replace(/\.gif+\<\/cell\>?/g, '.gif"></cell>');
    var filter01_td = filter02_img.replace(/\<cell\>/g, '<td>');
    var filter02_td = filter01_td.replace(/\<\/cell\>/g, '</td>');
    var filter03_tr = filter02_td.replace(/\<rows?/g, '<tr');
    var filter04_tr = filter03_tr.replace(/\<\/rows?/g, '</tr');
//console.log(filter01_img);
    // \gif?+\<\/cell\>?
    var content = filter04_tr;
    console.log(content);
    document.body.innerHTML += '<table><tbody style="overflow: auto;">' + content + '</tbody></table>';
    //return content;
  });
  login.currentMe
  .then(resLayoutJson => {
    console.log('8. The resLayoutCurrentMe2 are fetched: -> ' + resLayoutJson); // just an amount of companies
    //document.getElementById('sectionLogin').setAttribute("class", "unactive");
    //document.getElementById('sectionLoginDetail').removeAttribute("class", "unactive");
    //document.getElementById('sectionPost').removeAttribute("class", "unactive");
    //document.getElementById('objectId').innerHTML += "username: " + resLayoutJson.username + "<p>";
    //document.getElementById('objectId').innerHTML += "email: " + resLayoutJson.email + "<p>";
    //var cnTime = new Date(resLayoutJson.createdAt).toLocaleDateString('zh-Hans', options);
    //document.getElementById('objectId').innerHTML += "createdAt: " + cnTime + "<p>";
    document.querySelector('#contentPost').addEventListener('click', event => {
      const testText = "aaaabbbbxxxx";
      console.log(`9. ${testText}`);
      submitPost();
      event.preventDefault();
    });
    function submitPost() {
      //e.preventDefault();
      // console.log("this is testText promise: -> " + testText);
      var payload = {
        "score": 1337,
        "playerName": "Sean Plott",
        "cheatMode": false
      };

      //var data = new FormData();
      //data.append("json", JSON.stringify(payload));
      Req.postHeaders = Req.baseHeaders;
      var token = sessionStorage.getItem('Token');
      console.log(`10. ${token}`);
      //Req.postHeaders.append('X-Parse-Session-Token', token);
      var t = Req.postHeaders.get('X-Parse-Session-Token');
      console.log(`10.1 ${t}`);
      // create request object
      const request = new Request(`${apiurl}/classes/GameScore`, {
        method: 'POST',
        headers: Req.postHeaders,
        //credentials: 'include', // send cookies even for a cross-origin call
        //redirect: 'follow',
        mode: 'cors',
        body: JSON.stringify(payload)
      });
      // pass request object to `fetch()`
      fetch(request)
      .then(function(request) {
        if (request.ok) {
          return request.json();
          console.log(request)
        } else {
          return Promise.reject({
            status: request.status,
            statusText: request.statusText
          });
        }
      }).then(request => request.json)
      .then(request => console.log(request))
      .catch(err => console.log(err));

    }
  });
}

// get selector value

// promise fetch

// get session

// sessionStorge.set
