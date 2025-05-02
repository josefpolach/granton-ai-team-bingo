# Team Bingo - Instrukce pro sestavení a spuštění

Tato aplikace je jednoduchá týmová hra "Bingo" s otázkami o vašich kolezích. Aplikace je navržena tak, aby běžela v Docker kontejneru a byla mírně ztížena možnost spuštění na běžném localhostu.

## Potřebné soubory

Pro sestavení aplikace budete potřebovat následující soubory:

1. `Dockerfile` - Instrukce pro sestavení Docker image
2. `App.js` - Hlavní React aplikace
3. `TeamBingo.jsx` - Komponenta s hrou Bingo
4. `tailwind.config.js` - Konfigurace Tailwind CSS
5. `index.css` - CSS s Tailwind importy
6. `nginx.conf` - Konfigurace Nginx serveru
7. `start-container.sh` - Startovací skript pro kontejner

## Postup sestavení

1. Vytvořte nový adresář a umístěte do něj všechny výše uvedené soubory.

2. Otevřte terminál a přejděte do vytvořeného adresáře.

3. Sestavte Docker image pomocí příkazu:
   ```
   docker build -t team-bingo .
   ```

4. Po úspěšném sestavení image můžete spustit kontejner:
   ```
   docker run -d -p 8000:8000 --name team-bingo-container team-bingo
   ```

5. Zjistěte IP adresu kontejneru:
   ```
   docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' team-bingo-container
   ```

6. Pro přístup k aplikaci otevřete prohlížeč a zadejte URL:
   ```
   http://[IP-ADRESA-KONTEJNERU]:8000
   ```

   Poznámka: Budete potřebovat také nastavit HTTP hlavičku `X-Team-Secret` s hodnotou `tajne-heslo-pro-tym-2025`.

## Distribuce pro tým

Pro distribuci aplikace členům týmu máte tyto možnosti:

1. **Distribuce Docker image:**
    - Uložte image do registru Docker (např. Docker Hub, GitHub Packages, atd.)
    - Poskytněte týmu příkaz pro stažení a spuštění image

2. **Distribuce zdrojových souborů:**
    - Zabalte všechny soubory do ZIP archivu
    - Poskytněte týmu instrukce pro sestavení a spuštění

3. **Vlastní řešení pro snazší přístup:**
    - Můžete vytvořit jednoduchý bash skript, který automaticky nastaví potřebné hlavičky a otevře aplikaci v prohlížeči

## Ochrana proti spuštění na localhostu

Tato aplikace obsahuje několik mechanismů, které ztěžují spuštění mimo Docker kontejner:

1. Nginx konfigurace, která omezuje přístup na IP adresu kontejneru
2. Požadavek na HTTP hlavičku s tajným klíčem
3. Vlastní port 8000 místo standardního 80
4. Dynamické nastavení konfigurace při startu kontejneru

Tyto mechanismy nejsou nepřekonatelné, ale vyžadují od uživatele pokročilejší znalosti pro obejití těchto omezení.

## Modifikace aplikace

Pokud chcete upravit otázky v aplikaci:

1. Otevřete soubor `TeamBingo.jsx`
2. Najděte pole `bingoItems` a upravte otázky podle potřeby
3. Znovu sestavte Docker image

## Tipy pro používání

- Aplikace začne odpočítávat čas po kliknutí na tlačítko START
- Tlačítko BINGO se aktivuje až po vyplnění všech políček
- Po kliknutí na BINGO se odpovědi uzamknou a zobrazí se doba dokončení