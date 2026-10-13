#Requires AutoHotkey v2.0
#SingleInstance Force

; Hebrew Keyboard Fixer
; Select text typed with the wrong keyboard layout and press Ctrl+Q.
; To change the shortcut, edit the line that starts with ^q
; ^ = Ctrl   ! = Alt   + = Shift   # = Windows key

EN := "qwertyuiop[]asdfghjkl;'zxcvbnm,./"
HE := "/'קראטוןםפ][שדגכעיחלךף,זסבהנמצתץ."

^q:: {
    old := A_Clipboard
    A_Clipboard := ""
    Send "^c"
    if !ClipWait(1) {
        A_Clipboard := old
        return
    }
    text := A_Clipboard
    hebrewToEnglish := RegExMatch(text, "[א-ת]")
    src := hebrewToEnglish ? HE : EN
    dst := hebrewToEnglish ? EN : HE
    out := ""
    Loop Parse text {
        pos := InStr(src, A_LoopField, true)
        out .= pos ? SubStr(dst, pos, 1) : A_LoopField
    }
    A_Clipboard := out
    Send "^v"
    Sleep 200
    A_Clipboard := old
}