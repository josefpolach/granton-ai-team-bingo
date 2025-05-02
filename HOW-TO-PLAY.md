# Návod na spuštění Týmového Binga

Ahoj týme! Připravili jsme pro vás zábavnou hru Týmové Bingo. Následujte tento návod pro stažení a spuštění aplikace.

## Příprava prostředí

Před spuštěním je potřeba mít nainstalované:
1. [Azure CLI](https://docs.microsoft.com/cs-cz/cli/azure/install-azure-cli)
2. [Docker](https://www.docker.com/get-started)

## Postup spuštění

### 1. Přihlášení do Azure

Otevřete terminál/příkazový řádek a spusťte:

```bash
az login
```

Tím se otevře prohlížeč, ve kterém se přihlásíte pomocí vašich Azure přihlašovacích údajů.

Po přihlášení zvolte správnou subscription:

Vyberem pomoci zobrazenych cislic nebo prikazem:
```bash
az account set --subscription "Granton Clients COMMON"
```

### 2. Přihlášení do Azure Container Registry

Nyní se přihlaste do Azure Container Registry:

```bash
az acr login --name acrclientscommon.azurecr.io
```

### 3. Stažení kontejneru

Stáhněte kontejner podle vašeho typu procesoru:

#### Pro zařízení s ARM procesorem (např. Apple M1/M2/M3):

```bash
docker pull acrclientscommon.azurecr.io/granton-ai-team-bingo-arm:v1
```

#### Pro zařízení s Intel/AMD (x86) procesorem:

```bash
docker pull acrclientscommon.azurecr.io/granton-ai-team-bingo-x86:v1
```

### 4. Spuštění kontejneru

Spusťte kontejner na portu 8080 (můžete změnit na jiný port, pokud 8080 již používáte):

#### Pro ARM procesory:

```bash
to byste měli vedet
```

#### Pro x86 procesory:

```bash
to byste měli vedet
```

Jen se musite namapovat na port, ktery je otevreny v containeru a to je 80.

### 5. Otevření aplikace

Otevřete váš webový prohlížeč a přejděte na adresu:

```
http://localhost:[vami-zvoleny-port]
```

## Jak hrát Týmové Bingo

1. Klikněte na tlačítko **START** pro zahájení hry
2. Spustí se časovač a zobrazí se 16 bingovských kartiček
3. Vyplňte všechna pole jmény kolegů z týmu
4. Po vyplnění všech políček se aktivuje tlačítko **BINGO**
5. Klikněte na **BINGO** pro ukončení hry
6. Zaznamenejte si svůj čas a datum/čas dokončení
7. Sdílejte svůj výsledek s týmem!

## Řešení problémů

Pokud narazíte na problém:

- **Container se nestáhne**: Ujistěte se, že jste přihlášeni v Azure a Azure Container Registry
- **Docker hlásí chybu architektury**: Ujistěte se, že stahujete správnou verzi pro váš procesor (ARM nebo x86)
- **Web nejde otevřít**: Zkontrolujte, že docker container běží pomocí `docker ps` a že na portu 8080 neběží jiná aplikace

Hodně štěstí a užijte si hru!