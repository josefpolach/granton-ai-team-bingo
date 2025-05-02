#!/bin/sh

# Získáme IP adresu kontejneru
CONTAINER_IP=$(hostname -i)

# Upravíme nginx konfiguraci s aktuální IP adresou
sed -i "s/listen 8000;/listen 8000;\n    server_name $CONTAINER_IP;/" /etc/nginx/conf.d/default.conf

echo "====================================================="
echo "Team Bingo aplikace je spuštěna!"
echo "Pro přístup k aplikaci použijte adresu: http://$CONTAINER_IP:8000"
echo "Tajný klíč pro přístup: $TEAM_SECRET_KEY"
echo "====================================================="

# Spustíme nginx
exec nginx -g 'daemon off;'