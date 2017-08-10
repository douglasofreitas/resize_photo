FROM node:7.7.3

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json $HOME/library/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/library
RUN npm cache clean && npm install --silent --progress=false

USER root
COPY . $HOME/library
RUN chown -R app:app $HOME/*
USER app

CMD ["/bin/bash"]
