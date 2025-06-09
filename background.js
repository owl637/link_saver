chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-link-url",
    title: "このリンクのURLをショートカットファイルとして保存",
    contexts: ["link"]
  });

  chrome.contextMenus.create({
    id: "save-page-url",
    title: "このページのURLをショートカットファイルとして保存",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const url = info.linkUrl || info.pageUrl;
  let rawTitle = info.linkText || tab.title || "saved_link";

  if (typeof rawTitle !== "string") {
    rawTitle = "saved_link";
  }

  const safeTitle = rawTitle.replace(/[\\/:*?"<>|]/g, "_");

  const shortcut = `[InternetShortcut]\r\nURL=${url}`;
  const encoded = encodeURIComponent(shortcut);
  // ▼ MIMEを application/internet-shortcut に変更
  const dataUrl = `data:application/internet-shortcut;charset=utf-8,${encoded}`;

  chrome.downloads.download({
    url: dataUrl,
    filename: `OneDriveDownloads/${safeTitle}.url`,
    conflictAction: "uniquify",
    saveAs: false
  });
});
