FROM node:7.7.3

ENV HOME=/home/root

COPY package.json $HOME/application/

WORKDIR $HOME/application
RUN npm cache clean && npm install --silent --progress=false
COPY . $HOME/application

CMD ["/bin/bash"]
CMD ["npm", "start"]
