package util

import (
	"net"
)

// LocalIP get the host machine local IP address
func LocalIP() ([]net.IP, error) {
	var ips []net.IP

	ifaces, err := net.Interfaces()

	if err != nil {
		return nil, err
	}

	for _, iface := range ifaces {
		addrs, err := iface.Addrs()

		if err != nil {
			continue
		}

		for _, addr := range addrs {
			var ip net.IP

			switch v := addr.(type) {
			case *net.IPNet:
				ip = v.IP
			case *net.IPAddr:
				ip = v.IP
			}

			if ip.IsPrivate() {
				ips = append(ips, ip)
			}
		}
	}

	return ips, nil
}
