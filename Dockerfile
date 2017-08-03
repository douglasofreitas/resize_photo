FROM node:7.7.3

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927 \
  && echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.2 main" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list \
  && apt-get update \
  && apt-get install -y mongodb-org --no-install-recommends \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# RUN useradd --user-group --create-home --shell /bin/false app
RUN service mongod start

ENV HOME=/home/root

COPY package.json $HOME/library/
# RUN chown -R app:app $HOME/*

USER root
WORKDIR $HOME/library
RUN npm cache clean && npm install --silent --progress=false

# USER root
COPY . $HOME/library
# RUN chown -R app:app $HOME/*
# USER app

# CMD ["npm", "start"]
