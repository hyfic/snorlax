package logger

import (
	"fmt"
	"time"
)

var colorReset = "\033[0m"
var colorRed = "\033[31m"
var colorGreen = "\033[32m"
var colorYellow = "\033[33m"
var colorBlue = "\033[34m"
var colorCyan = "\033[36m"

func Success(message string) {
	fmt.Println(string(colorGreen) + message + string(colorReset))
}

func Info(message string) {
	fmt.Println(string(colorBlue) + message + string(colorReset))
}

func RouteLog(ip string, method string, message string, isError bool) {
	ipColor := colorBlue
	textColor := colorReset
	if isError {
		ipColor = colorRed
		textColor = colorRed
	}

	fmt.Println(getTime(), string(ipColor)+"["+ip+"]", getMethod(method), string(textColor)+message, string(colorReset))
}

func getTime() string {
	return time.Now().Format("02/01/2006 15:04 ")
}

func getMethod(method string) string {
	color := colorReset

	switch method {
	case "GET":
		color = colorGreen
	case "POST":
		color = colorYellow
	case "PUT":
		color = colorCyan
	case "DELETE":
		color = colorRed
	}

	return string(color) + "[" + method + "]"
}
