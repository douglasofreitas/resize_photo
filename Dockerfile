FROM node:7.7.3

ENV HOME=/home/root
COPY . $HOME/application

WORKDIR $HOME/application
RUN npm cache clean 
RUN cd $HOME/application && npm install --silent --progress=false

CMD ["/bin/bash"]
CMD ["npm", "start"]
