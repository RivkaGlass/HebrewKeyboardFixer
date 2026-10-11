function fixSelection() {
  const EN = "qwertyuiop[]asdfghjkl;'zxcvbnm,./";
  const HE = "/'קראטוןםפ][שדגכעיחלךף,זסבהנמצתץ.";
  const map = {};
  for (let i = 0; i < EN.length; i++) {
    map[EN[i]] = HE[i];
    map[EN[i].toUpperCase()] = HE[i];
  }
  const convert = t => [...t].map(c => map[c] || c).join("");

  const el = document.activeElement;
  if (el && (el.tagName === "TEXTAREA" || el.tagName === "INPUT")) {
    const s = el.selectionStart, e = el.selectionEnd;
    if (s !== e) {
      el.setRangeText(convert(el.value.slice(s, e)), s, e, "select");
      el.dispatchEvent(new Event("input", { bubbles: true }));
    }
  } else {
    const sel = window.getSelection();
    if (sel.rangeCount && !sel.isCollapsed) {
      const range = sel.getRangeAt(0);
      const txt = convert(sel.toString());
      range.deleteContents();
      range.insertNode(document.createTextNode(txt));
    }
  }
}

chrome.commands.onCommand.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: fixSelection
    });
  });
});