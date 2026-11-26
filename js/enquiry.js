// ── ENQUIRY FORM → email to info@ (via Web3Forms) ────────────
// Works on every page: any <form data-enquiry> is handled here.
//
// SETUP (one time): go to https://web3forms.com, enter
// info@bharatdarshanamtravels.com, and paste the access key you get by
// email below. This key is meant to be public (it can only send mail
// to info@), so it is safe in this file.
const WEB3FORMS_KEY = 'TODO_PASTE_WEB3FORMS_ACCESS_KEY';
const WHATSAPP_NUMBER = '919511333174';

document.querySelectorAll('form[data-enquiry]').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const get = n => (form.elements[n] ? form.elements[n].value.trim() : '');
    const data = {
      name: get('name'), phone: get('phone'), email: get('email'),
      trip: get('trip'), message: get('message')
    };

    if (!data.name || !data.phone || !data.email || !data.trip) {
      return showMsg(form, '❗ Please fill in all required fields.', 'error');
    }
    const digits = data.phone.replace(/[\s+\-]/g, '');
    if (!/^\d{10,15}$/.test(digits)) {
      return showMsg(form, '❗ Please enter a valid phone number.', 'error');
    }

    const waText = `Hello Gajendra Singh! 🙏\n\n*Name:* ${data.name}\n*Phone:* ${data.phone}\n*Email:* ${data.email}\n*Trip:* ${data.trip}\n*Message:* ${data.message || '-'}`;
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

    // Key not set yet → fall back to WhatsApp so no enquiry is lost.
    if (WEB3FORMS_KEY.startsWith('TODO')) {
      window.open(waLink, '_blank');
      return showMsg(form, '✅ Opening WhatsApp to send your enquiry…', 'success');
    }

    const btn = form.querySelector('[type=submit]');
    if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New enquiry: ${data.trip} – ${data.name}`,
          from_name: 'Bharat Darshanam website',
          botcheck: get('botcheck'),
          page: location.pathname,
          ...data
        })
      });
      const out = await res.json();
      if (!out.success) throw new Error(out.message);
      form.reset();
      showMsg(form, '✅ Thank you! We got your enquiry and will reply soon.', 'success', waLink);
    } catch (err) {
      showMsg(form, '❗ Could not send right now. Please send it on WhatsApp instead.', 'error', waLink);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; }
    }
  });
});

function showMsg(form, text, type, waLink) {
  let msg = form.querySelector('.form-msg');
  if (!msg) {
    msg = document.createElement('p');
    msg.className = 'form-msg';
    msg.setAttribute('role', 'status');
    form.appendChild(msg);
  }
  msg.className = 'form-msg ' + type;
  msg.textContent = text;
  if (waLink) {
    const a = document.createElement('a');
    a.href = waLink; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = ' Chat on WhatsApp →';
    msg.appendChild(a);
  }
}
