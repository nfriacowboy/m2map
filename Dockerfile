FROM node:18 as angular-built
LABEL authors="nfriacowboy"
RUN npm i -g @angular/cli
RUN npm i -g rimraf
EXPOSE 4200
CMD ["/bin/sh", "-c", "bash"]
