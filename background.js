const config = {
  WEBAPP_URL: "https://default.test/",
};

const getCookie = async (url, token) =>
  new Promise((result) => {
    chrome.cookies.get({ url: url, name: token }, (data) => {
      result(data);
    });
  });
const getUserByUsername = (userName) =>
    new Promise((result) => {
      userName
        ? (console.log("get username: ", userName),
          chrome.storage.sync.get([userName], (data) => {
            const user = data[userName]; // this opject has uid and username
            result(user);
          }))
        : result(void 0);
    }),
  setUser = (userId, userName) =>
    new Promise((result) => {
      console.log("set username: ", userName),
        chrome.storage.sync.get([userName], (data) => {
          const user = data[userName] || Object.create(null);
          user.uid = userId;
          user.username = userName;

          const newUser = {};
          newUser[userName] = user;
          chrome.storage.sync.set(newUser, () => {
            result(user);
          });
        });
    });
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => (
    getCookie(config.WEBAPP_URL, "token").then((sender) => {
      if ("GET_UID_BY_COMMNET_LINK" === request.action) {
        const sender = request.link;
        const userName = request.username;
        return void getUserByUsername(userName).then((request) => {
          request
            ? sendResponse({ uid: request.uid })
            : fetch(sender)
                .then((request) => request.text())
                .then((request) => {
                  const sender = /\userID":"(\d+)/.exec(request);
                  const userId = sender ? sender[1] : void 0;
                  setUser(userId, userName), sendResponse({ uid: userId });
                })
                .catch(() => {
                  sendResponse({ uid: void 0 });
                });
        });
      }

      if ("GET_UID_BY_USERNAME" === request.action) {
        const sender = request.username;
        return void getUserByUsername(sender).then((request) => {
          if (!request) {
            const request = new XMLHttpRequest();
            (request.onreadystatechange = () => {
              if (4 == request.readyState && 200 == request.status) {
                const user = /"userID":"(\d+)/.exec(request.responseText);
                const userId = user ? user[1] : void 0;
                setUser(userId, sender);
                sendResponse({ uid: userId });
              }
            }),
              request.open("GET", `https://www.facebook.com/${sender}`, !0),
              request.send();
          } else sendResponse({ uid: request.uid });
        });
      }
    }),
    !0
  )
);
