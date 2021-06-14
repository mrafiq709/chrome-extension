/*! jQuery v3.5.1 | (c) JS Foundation and other contributors | jquery.org/license */

const UID_REGEXES = [
  { re: /\?id=(\d+)/, idGroup: 1 },
  {
    re: /(?:https?\:\/\/(?:www\.)?facebook\.com)?\/groups\/\d+\/user\/(\d+)/,
    idGroup: 1,
  },
  {
    re: /(?:https?\:\/\/(?:www\.)?facebook\.com)?\/messages\/t\/(\d+)\//,
    idGroup: 1,
  },
];

const getUidByUrl = (url) => {
  for (const uid of UID_REGEXES) {
    if (uid.re.test(url)) {
      const userId = uid.re.exec(url);
      return userId[uid.idGroup];
    }
  }
};

const getUsernameByUrl = (url) => {
  const userName =
    /https?\:\/\/(?:www\.)?facebook\.com\/(\d+|[A-Za-z0-9\.]+)\/?/.exec(url);
  return userName ? userName[1] : void 0;
};

const delay = (url) =>
  new Promise((b) => {
    setTimeout(b, url);
  });

// Phone Number: Profile Page
$(document).on(
  "mouseenter",
  ".d6urw2fd .cddn0xzi .hpfvmrgz .rj1gh0hx.o4feeg3o",
  (url) => {
    $(url.currentTarget);
    if (!$(".mhxlubs3").closest(".ipjc6fyt").parent().find(".fn-scan").length) {
      const url = document.location.href;
      let userId = getUidByUrl(url);
      const userName = $(".mhxlubs3").first().text();
      if (!userId) {
        const userName = getUsernameByUrl(url);
        return void chrome.runtime.sendMessage(
          { action: "GET_UID_BY_USERNAME", username: userName },
          (url) => {
            (userId = url.uid),
              $(".mhxlubs3")
                .closest(".ipjc6fyt")
                .after(
                  `<div class="fn-btn fn-scan" data-value="Phone Number" uid="${userId}" name="${userName}"><img /></div>`
                );
          }
        );
      }
      $(".mhxlubs3")
        .closest(".ipjc6fyt")
        .after(
          `<div class="fn-btn fn-scan" data-value="Tìm số ok" uid="${userId}" name="${userName}" source="profile"><img /></div>`
        );
    }
  }
);

// Phone Number: Comment
$(document).on(
  "mouseenter",
  'div[role="article"].ecm0bbzt .stjgntxs',
  async (url) => {
    const divComment = $(url.currentTarget);
    if (!divComment.find(".fn-scan").length) {
      const linkAnchorComment = divComment.find("a[href]").first(),
        divCommentText = divComment.find(".e5nlhep0").get(0),
        permalinkLinkComment = divComment
          .find("._6coi a[href]")
          .first()
          .attr("href");

      if (linkAnchorComment.length) {
        // START click Button Inside Comment
        const btnInsideComment = $(divCommentText).find(
          'div[role="button"].lrazzd5p'
        );
        btnInsideComment.length &&
          (btnInsideComment.get(0).click(), await delay(1e3));
        //END click Button Inside Comment

        const hrefLinkAnchorComment = linkAnchorComment.attr("href"),
          userNameFromLink = linkAnchorComment.text(),
          textDivComment = divCommentText ? divCommentText.innerText : "";

        let userId = getUidByUrl(hrefLinkAnchorComment);

        if (!userId) {
          // START Get uid from background script
          const userName = getUsernameByUrl(hrefLinkAnchorComment);
          return void chrome.runtime.sendMessage(
            {
              action: "GET_UID_BY_COMMNET_LINK",
              username: userName,
              link: hrefLinkAnchorComment,
            },
            (url) => {
              userId = url.uid;
              const classes = userId
                ? "fn-btn fn-scan"
                : "fn-btn fn-scan fn-empty";
              divComment.find(".fn-scan").length ||
                divComment
                  .find(".sf5mxxl7")
                  .first()
                  .append(
                    `<div class="${classes}" data-value="Phone Number" uid="${userId}" name="${userNameFromLink}" source="comment" comment="${textDivComment}" permalink="${permalinkLinkComment}"><img /></div>`
                  );
            }
          );
          // END Get uid from background script
        }
        divComment.find(".fn-scan").length ||
          divComment
            .find(".sf5mxxl7")
            .first()
            .append(
              `<div class="fn-btn fn-scan" data-value="Phone Number" uid="${userId}" name="${userNameFromLink}" source="comment" comment="${textDivComment}" permalink="${permalinkLinkComment}"><img /></div>`
            );
      }
    }
  }
);

// Click Action
$(document).on("click", ".fn-scan", async (url) => {
  try {
    var div = $(url.currentTarget);
    let data = {};
    console.log("src: " + div.attr("source"));
    if (div.attr("source") === "comment") {
      // Click action for comment
      data = {
        uid: div.attr("uid"),
        name: div.attr("name"),
        text: div.attr("comment"),
        link: div.attr("permalink"),
      };
    } else if (div.attr("source") === "like") {
      // Click action for like
      data = {
        uid: div.attr("uid"),
        name: div.attr("name"),
      };
    } else if (div.attr("source") === "share") {
      // click action for share
      data = {
        uid: div.attr("uid"),
        name: div.attr("name"),
      };
    }

    console.log(data);
  } catch (url) {
    console.log("error: " + url);
  }
});

// Phone Number: Like
$(document).on("mouseenter", ".gc7gaz0o .q5bimw55 .ue3kfks5", (a) => {
  console.log(a + " => mouseenter", ".gc7gaz0o .q5bimw55 .ue3kfks5");
  const b = $(a.currentTarget);
  if (!b.find(".fn-scan").length) {
    const a = b.find(".knvmm38d a[href]").first();
    if (a.length) {
      const c = a.attr("href"),
        d = a.text();
      let e = getUidByUrl(c);
      if (!e) {
        const a = getUsernameByUrl(c);
        return void chrome.runtime.sendMessage(
          { action: "GET_UID_BY_COMMNET_LINK", username: a, link: c },
          (a) => {
            (e = a.uid),
              b.find(".fn-scan").length ||
                b
                  .find(".pybr56ya")
                  .first()
                  .after(
                    `<div class="fn-btn fn-scan" data-value="Phone Number" uid="${e}" name="${d}" source="like"><img /></div>`
                  );
          }
        );
      }
      b.find(".fn-scan").length ||
        b
          .find(".pybr56ya")
          .first()
          .after(
            `<div class="fn-btn fn-scan" data-value="Phone Number" uid="${e}" name="${d}" source="like"><img /></div>`
          );
    }
  }
});

// Phone Number: Scan all comments
$(document).on("mouseenter", ".stjgntxs.monazrh9 .s1tcr66n", (a) => {
  const b = $(a.currentTarget);
  b.find(".new-fn-scan-comments").length ||
    b
      .find(">:first-child")
      .after(
        `<div class="fn-btn new-fn-scan-comments" data-value="Scan all Comments"><img /></div>`
      );
});

setInterval(() => {
  $(".stjgntxs.monazrh9 .s1tcr66n").each((a, b) => {
    const c = $(b);
    c.find(".new-qf-scan-comments").length ||
      c
        .find(">:first-child")
        .after(
          `<div class="qf-btn new-qf-scan-comments" data-value="Quét hết Comment"><img /></div>`
        );
  });
}, 1500);

// Phone NumberL Scan All Like
$(document).on("mouseenter", ".gc7gaz0o .q5bimw55", (a) => {
  const b = $(a.currentTarget),
    c = b.closest(".gc7gaz0o");
  c.find(".new-fn-scan-likes").length ||
    c
      .find(".cypi58rs")
      .after(
        `<div style="text-align: center;"><div class="fn-btn new-fn-scan-likes" data-value="Scan All Like"><img /></div></div>`
      );
});

setInterval(() => {
  $(".gc7gaz0o .q5bimw55").each((a, b) => {
    const c = $(b),
      d = c.closest(".gc7gaz0o");
    d.find(".new-qf-scan-likes").length ||
      d
        .find(".cypi58rs")
        .after(
          `<div style="text-align: center;"><div class="qf-btn new-qf-scan-likes" data-value="Scan All Like"><img /></div></div>`
        );
  });
}, 1500);

// Phone Nuber: News feed's user profile profile
$(document).on("mouseenter", ".ll8tlv6m .aahdfvyu", (a) => {
  const b = $(a.currentTarget);
  if (!b.find(".fn-scan").length) {
    const a = b.find("a[href]").first(),
      c = b
        .closest('div[data-testid="Keycommand_wrapper"]')
        .find(".ihqw7lf3")
        .first();
    if (a.length) {
      const d = a.attr("href"),
        e = a.text(),
        f = c.length ? c.text() : "";
      let g = getUidByUrl(d);
      if (!g) {
        const a = getUsernameByUrl(d);
        return void chrome.runtime.sendMessage(
          { action: "GET_UID_BY_COMMNET_LINK", username: a, link: d },
          (a) => {
            g = a.uid;
            const c = g ? "fn-btn fn-scan" : "fn-btn fn-scan fn-empty";
            b.find(".fn-scan").length ||
              b.append(
                `<div class="${c} ml-7" data-value="Phone Number" uid="${g}" name="${e}" comment="${f}" source="share"><img /></div>`
              );
          }
        );
      }
      b.find(".fn-scan").length ||
        b.append(
          `<div class="fn-btn fn-scan ml-7" data-value="Phone Number" uid="${g}" name="${e}" comment="${f}" source="share"><img /></div>`
        );
    }
  }
});
