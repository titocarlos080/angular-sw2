# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y el package-lock.json al contenedor
COPY package.json package-lock.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código fuente de la aplicación
COPY . .

# Construye la aplicación Angular
RUN npm run build --prod

# Etapa 2: Servir la aplicación con un servidor HTTP
FROM nginx:alpine

# Copia los archivos construidos desde la etapa anterior
COPY --from=build /app/dist/sw-parcial2 /usr/share/nginx/html

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
