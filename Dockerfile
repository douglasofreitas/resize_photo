FROM node:7.7.3

#RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927 \
#  && echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.2 main" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list \
#  && apt-get update \
#  && apt-get install -y mongodb-org --no-install-recommends \
#  && apt-get clean \
#  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

### CHANGE HERE YOUR USER ID TO DEVELOPMENT
ENV PERM_USER_ID 1234

### CREATE USER FOR DEVELOPMENT
#RUN echo "%sudo ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers && \
#    useradd -u ${PERM_USER_ID} -G users,www-data,sudo -d /app --shell /bin/bash -m app && \
#    echo "secret\nsecret" | passwd app

### SET DEFAULT USER TO DEVELOPMENT
#USER app
#WORKDIR /app

ENV HOME=/home/root

COPY package.json $HOME/application/
# RUN chown -R app:app $HOME/*

#USER root
WORKDIR $HOME/application
# RUN npm cache clean && npm install --silent --progress=false

#USER root
COPY . $HOME/application
#RUN chown -R app:app $HOME/*
#USER app

CMD ["/bin/bash"]
#CMD ["service", "mongod", "start"]
#CMD ["npm", "start"]
