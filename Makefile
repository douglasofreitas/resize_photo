.PHONY: build run

run:
	docker-compose run --rm -p 8081:8081 -p 9000:9000 dev

in:
	docker exec -i -t $(shell docker-compose ps | grep run | cut -d" " -f 1) /bin/bash
	
stop:
	docker-compose stop

clean:
	docker-compose down