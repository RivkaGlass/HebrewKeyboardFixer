#Requires AutoHotkey v2.0

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
    out := ""
    Loop Parse text {
        ch := A_LoopField
        pos := InStr(EN, ch, true)
        if !pos
            pos := InStr(EN, StrLower(ch), true)
        out .= pos ? SubStr(HE, pos, 1) : ch
    }
    A_Clipboard := out
    Send "^v"
    Sleep 200
    A_Clipboard := old
}