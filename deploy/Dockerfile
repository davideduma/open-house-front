# Fase de construcción
FROM node:18.15.0 AS build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
RUN npm install -g @angular/cli
COPY ./ /app/
RUN ng build --configuration production

# Fase de producción
FROM nginx:1.17
COPY --from=build-stage /app/dist/cashify /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
