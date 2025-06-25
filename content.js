function cleanAddressBlock(container) {
  const rawLines = Array.from(container.querySelectorAll('span'))
    .map(el => el.textContent.trim())
    .filter(line =>
      line.length > 0 &&
      line.toLowerCase() !== 'france' &&
      line !== ','
    );

  const lines = [];
  for (let i = 0; i < rawLines.length; i++) {
    const current = rawLines[i];
    const next = rawLines[i + 1];

    // Si ligne actuelle est un code postal (5 chiffres) et suivante existe, fusionne
    if (/^\d{5}$/.test(current) && next) {
      lines.push(`${current} ${next}`);
      i++; // skip la ville déjà ajoutée
    } else {
      lines.push(current);
    }
  }

  return lines.join('\n');
}



function getPhoneNumber() {
  const phone = Array.from(document.querySelectorAll('span'))
    .map(el => el.textContent.trim())
    .find(text => /^((\+33\s?|0)[1-9](\s?\d{2}){4})$/.test(text.replace(/\s/g, '')));
  return phone || '';
}


function createCopyButton(textToCopy) {
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.gap = '8px';
  wrapper.style.padding = '6px 10px';
  wrapper.style.border = '1px solid #ccc';
  wrapper.style.borderRadius = '6px';
  wrapper.style.background = '#f9f9f9';
  wrapper.style.width = 'fit-content';
  wrapper.style.marginBottom = '10px';
  wrapper.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';

  const icon = document.createElement('img');
  icon.src = chrome.runtime.getURL('icons/copy.svg');
  icon.alt = 'Copier';
  icon.style.width = '20px';
  icon.style.height = '20px';
  icon.style.cursor = 'pointer';

  const label = document.createElement('span');
  label.innerText = 'Copier l’adresse';
  label.style.fontSize = '14px';
  label.style.cursor = 'pointer';

  wrapper.onclick = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        icon.src = chrome.runtime.getURL('icons/check.svg');
        label.innerText = 'Adresse copiée';
        setTimeout(() => {
          icon.src = chrome.runtime.getURL('icons/copy.svg');
          label.innerText = 'Copier l’adresse';
        }, 1500);
      })
      .catch(() => alert("Erreur lors de la copie."));
  };

  wrapper.appendChild(icon);
  wrapper.appendChild(label);
  return wrapper;
}

function injectCopyButton() {
  const container = document.querySelector('[data-test-id="shipping-section-buyer-address"]');
  if (!container || container.dataset.copierAdded) return;

  container.dataset.copierAdded = 'true';

  const cleanText = cleanAddressBlock(container);
  const phone = getPhoneNumber();
  const finalText = phone ? `${cleanText}\n${phone}` : cleanText;

  const copyButton = createCopyButton(finalText);
  container.parentElement.insertBefore(copyButton, container);
}

// Observer pour attendre que le DOM charge l'adresse
const observer = new MutationObserver(() => {
  injectCopyButton();
});
observer.observe(document.body, { childList: true, subtree: true });
