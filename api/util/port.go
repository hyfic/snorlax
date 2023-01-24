package util

import (
	"fmt"
)

func GetPort() int32 {
	var port int32 = 8000

	fmt.Print("Enter port where server should run [default 8000]: ")
	fmt.Scanln(&port)

	return port
}
