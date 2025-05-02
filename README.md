# Týmové Bingo

Jednoduchá webová aplikace pro týmové bingo s 4x4 herní deskou stylizovanou pomocí Tailwind CSS.

## Funkce

- Po kliknutí na tlačítko START se zobrazí karty s textem a spustí se časovač
- Uživatel vyplní všechna pole
- Po vyplnění všech polí se aktivuje tlačítko BINGO
- Po kliknutí na tlačítko BINGO se hra ukončí a zobrazí se dosažený čas

## Spuštění s Docker

### Metoda 1: S použitím docker-compose

```bash
docker-compose up -d
```

Aplikace bude dostupná na http://localhost:8080

### Metoda 2: Ruční build a spuštění Docker kontejneru

```bash
# Build Docker image
docker build -t tymove-bingo .

# Spuštění kontejneru
docker run -d -p 8080:80 tymove-bingo
```

### Řešení problémů s buildem

Pokud se setkáte s chybami týkajícími se Babel verzí, zkuste:

```bash
# Vyčistit cache dockeru
docker builder prune -f

# Nebo build s --no-cache parametrem
docker build --no-cache -t tymove-bingo .
```

Pokud problém přetrvává, můžete vytvořit image pro private registry takto:

```bash
# Build a označení pro váš private registry
docker build -t vas-registry.example.com/tymove-bingo:latest .

# Push do vašeho private registry
docker push vas-registry.example.com/tymove-bingo:latest
```

Aplikace bude dostupná na http://localhost:8080

## Vývoj

### Příprava vývojového prostředí

```bash
# Instalace závislostí
npm install

# Spuštění vývojového serveru
npm start
```

Vývojový server bude dostupný na http://localhost:3000

### Build aplikace

```bash
npm run build
```

Zkompilované soubory budou v adresáři `build/`.