# Build stage
FROM node:16-alpine as build

WORKDIR /app

# Nejprve zkopírujeme pouze package.json a package-lock.json a nainstalujeme závislosti
# Toto umožní lepší využití Docker cache
COPY package*.json ./
RUN npm install

# Poté zkopírujeme zbytek souborů
COPY . .

# Opravíme chybu s Babel - zaručíme správnou verzi
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Sestavíme aplikaci
RUN npm run build

# Produkční stage
FROM nginx:stable-alpine

# Zkopírujeme build ze stavebního stage do nginx
COPY --from=build /app/build /usr/share/nginx/html

# Nakonfigurujeme nginx tak, aby všechny požadavky směřoval na index.html (pro SPA routing)
RUN echo '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Redirecting...</title><script>window.location.href = "/";</script></head><body></body></html>' > /usr/share/nginx/html/404.html

# Vystavíme port 80
EXPOSE 80

# Spustíme nginx
CMD ["nginx", "-g", "daemon off;"]