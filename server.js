// service.js
chrome.action.onClicked.addListener((tab) => {
  const url = tab.url;
  const title = tab.title.replace(/[\\/:*?"<>|]/g, "_"); // ファイル名に使えない文字を除去

  const shortcut = `[InternetShortcut]\nURL=${url}`;
  const blob = new Blob([shortcut], { type: 'text/plain' });
  const objectUrl = URL.createObjectURL(blob);

  chrome.downloads.download({
    url: objectUrl,
    filename: `LinkDownloads/${title}.url`,
    conflictAction: "uniquify",
    saveAs: false
  });
});
