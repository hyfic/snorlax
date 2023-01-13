package model

import (
	"database/sql"
	"github.com/hyfic/snorlax/api/util"
	_ "github.com/mattn/go-sqlite3"
	"log"
)

const file string = "data.db"

func initDatabase() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", file)

	statement, err := db.Prepare("CREATE TABLE IF NOT EXISTS Core (password TEXT)")
	statement.Exec()

	if err != nil {
		log.Fatal("[-] Failed to create table Core")
	}

	return db, err
}

func AddPassword(password string) {
	db, err := initDatabase()

	if err != nil {
		log.Fatal("[-] Failed to init database")
	}

	password, err = util.HashPassword(password)

	if err != nil {
		log.Fatal("[-] Failed to hash password")
	}

	_, err = db.Exec(`INSERT INTO Core (password) Values(?)`, password)

	if err != nil {
		log.Fatal("[-] Failed to insert into database")
	}
}

func GetPassword() string {
	db, err := initDatabase()

	if err != nil {
		log.Fatal("[-] Failed to init database")
	}

	rows, err := db.Query("SELECT * FROM Core")

	var password string

	for rows.Next() {
		rows.Scan(&password)
	}

	return password
}
