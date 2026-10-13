function fixSelection() {
  const EN = "qwertyuiop[]asdfghjkl;'zxcvbnm,./";
  const HE = "/'קראטוןםפ][שדגכעיחלךף,זסבהנמצתץ.";
  const toHe = {}, toEn = {};
  for (let i = 0; i < EN.length; i++) {
    toHe[EN[i]] = HE[i];
    toEn[HE[i]] = EN[i];
  }
  const convert = t => {
    const map = /[א-ת]/.test(t) ? toEn : toHe;
    return [...t].map(c => map[c] || c).join("");
  };

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