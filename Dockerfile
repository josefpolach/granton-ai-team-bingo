# Dockerfile pro Team Bingo aplikaci

# Použijeme oficiální Node.js image jako základ
FROM node:18-alpine AS builder

# Nastavíme pracovní adresář
WORKDIR /app

# Vytvoříme novou React aplikaci
RUN npx create-react-app team-bingo

# Přesuneme se do adresáře aplikace
WORKDIR /app/team-bingo

# Nainstalujeme Tailwind CSS a další závislosti
RUN npm install tailwindcss postcss autoprefixer

# Inicializace Tailwind CSS
RUN npx tailwindcss init -p

# Zkopírujeme tailwind konfiguraci
COPY ./tailwind.config.js ./tailwind.config.js

# Zkopírujeme hlavní komponentu do src adresáře
COPY ./TeamBingo.jsx ./src/TeamBingo.jsx

# Upravíme App.js, aby používal naši TeamBingo komponentu
COPY ./App.js ./src/App.js

# Upravíme index.css pro Tailwind
COPY ./index.css ./src/index.css

# Sestavíme aplikaci
RUN npm run build

# Použijeme nginx pro hostování sestavené aplikace
FROM nginx:alpine

# Zkopírujeme sestavenou aplikaci do nginx
COPY --from=builder /app/team-bingo/build /usr/share/nginx/html

# Nakonfigurujeme nginx, aby aplikace běžela pouze na specifické IP adrese
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Proměnná prostředí pro omezení přístupu
ENV TEAM_SECRET_KEY="tajne-heslo-pro-tym-2025"

# Vystavíme port 8000 místo standardního 80
EXPOSE 8000

# Přidáme vlastní startup skript
COPY ./start-container.sh /start-container.sh
RUN chmod +x /start-container.sh

# Spustíme vlastní startup skript
CMD ["/start-container.sh"]