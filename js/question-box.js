(() => {
  'use strict';
  const form = document.getElementById('question-form');
  if (!form) return;
  const message = form.elements.namedItem('message');
  const button = form.querySelector('button[type="submit"]');
  const label = button.querySelector('[data-submit-label]');
  const result = document.getElementById('question-result');
  let sending = false;

  message.addEventListener('input', () => message.setCustomValidity(''));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    if (!message.value.trim()) {
      message.setCustomValidity('请先写下你的问题。');
      message.reportValidity();
      return;
    }
    if (!form.reportValidity()) return;
    const payload = Object.fromEntries(new FormData(form));
    payload.message = message.value.trim();
    sending = true;
    button.disabled = true;
    message.readOnly = true;
    form.setAttribute('aria-busy', 'true');
    label.textContent = 'Sending';
    result.textContent = '正在发送……';
    result.removeAttribute('data-error');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      const data = await response.json();
      if (!response.ok || data.success !== true) throw new Error('Submission failed');
      form.reset();
      result.textContent = '海浪听到了您的讯息。';
    } catch (error) {
      result.dataset.error = 'true';
      result.textContent = error.name === 'AbortError'
        ? '等待超时，尚未确认送达。内容已保留，请稍后再试。'
        : '未能确认送达，内容已保留。请检查网络后再试。';
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      message.readOnly = false;
      form.removeAttribute('aria-busy');
      label.textContent = 'Send';
    }
  });
})();
