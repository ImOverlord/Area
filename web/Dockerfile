FROM teracy/angular-cli:latest

EXPOSE 8081

WORKDIR /app

COPY . .

RUN npm ci

CMD ng serve --port 8081 --proxy-config proxy.conf.json