#Requires AutoHotkey v2.0
#SingleInstance Force

EN := "qwertyuiop[]asdfghjkl;'zxcvbnm,./"
HE := "/'קראטוןםפ][שדגכעיחלךף,זסבהנמצתץ."

^!h:: {
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