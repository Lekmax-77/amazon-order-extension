# 📦 Amazon Address & Order Tools (Chrome Extension)

Cette extension Chrome ajoute deux fonctionnalités utiles sur Amazon Seller Central :

1. **Copier l'adresse du client et son numéro de téléphone** dans un seul clic (même si le numéro est au format `+33`).
2. **Afficher les produits commandés** (en supprimant les 4 derniers caractères du SKU) avec leurs **quantités**.

---

## 🔧 Installation manuelle

1. Télécharger ou cloner ce dépôt :

   ```bash
   git clone https://github.com/tonpseudo/amazon-order-extension.git
   ```

2. Aller sur `chrome://extensions` dans votre navigateur.

3. Activer **"Mode développeur"** (coin supérieur droit).

4. Cliquer sur **"Charger l’extension non empaquetée"**.

5. Sélectionner le dossier de l’extension.

---

## 🧪 Fonctionnalités

### ✅ Copier l’adresse + téléphone

- Un bouton apparaît automatiquement dans la section adresse sur la fiche commande Amazon Seller Central.
- Le numéro au format `+33` est reconnu.

### ✅ Liste des produits commandés

- Depuis la popup de l’extension (icône dans la barre Chrome), cliquer sur "📦 Voir les produits commandés".
- Le SKU est affiché sans les 4 derniers caractères (ex: `PDF-007-045` → `PDF-007`).
- La quantité est affichée à droite (ex: `PDF-007 — 2`).

---

## 📁 Fichiers

- `manifest.json` — déclaration de l’extension
- `content.js` — script injecté pour gérer le bouton de copie
- `popup.html` / `popup.js` — interface pour la liste des commandes
- `icons/` — icônes affichées

---

## ✅ Compatibilité

- ✅ Google Chrome (version 89+)
- ✅ Amazon Seller Central (FR et US)

---

## 📜 Licence

[MIT](LICENSE)
