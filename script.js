const URL_SHEETDB_ANDA = 'https://docs.google.com/spreadsheets/d/110xun5xmYbN0AJsDUd15NrmYcMsgBcPuZnMID4PlAno/edit#gid=0';

const form = document.getElementById('formPendaftaran');
const btnKirim = document.getElementById('btnKirim');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  btnKirim.disabled = true;
  btnKirim.textContent = 'Mengirim...';

  const formData = {
    data: [
      {
        nama: document.getElementById('nama').value,
        email: document.getElementById('email').value,
        alasan: document.getElementById('alasan').value
      }
    ]
  };

  try {
    const response = await fetch(URL_SHEETDB_ANDA, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
      alert('Pendaftaran Berhasil! Data Anda telah tersimpan.');
      form.reset();
    } else {
      alert('Gagal mengirim data. Silakan coba lagi.');
      console.error('Error dari SheetDB:', result);
    }
  } catch (error) {
    console.error('Error Jaringan:', error);
    alert('Terjadi kesalahan koneksi.');
  } finally {
    btnKirim.disabled = false;
    btnKirim.textContent = 'Kirim Pendaftaran';
  }
});
