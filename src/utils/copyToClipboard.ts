export default function copyToClipboard(text: string) {
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);

  input.select();
  input.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(input.value).then(() => {
    document.body.removeChild(input);
  });
}