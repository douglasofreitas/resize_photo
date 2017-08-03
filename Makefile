.PHONY: build run

build:
	docker build -t douglasofreitas/resize_photo .	

run:
	docker run -it -p 8081:8081 douglasofreitas/resize_photo /bin/bash

