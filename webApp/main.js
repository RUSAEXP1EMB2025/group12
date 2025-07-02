document.getElementById("search-coordinate").addEventListener("click", function(event) {
    event.preventDefault(); // フォームのデフォルトの送信を防ぐ
    showWaitingMessage(); // 位置情報取得中のメッセージを表示
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          // alert(`緯度: ${lat}\n経度: ${lon}`);
          showCordinate(lat, lon); // 取得した座標を表示

          const url = 'https://script.google.com/macros/s/AKfycby74za82LxtNIgYqE2wrBV2EtJcT_4PK0Z3tFVKv_tQqugKbEwUhFMDgycZdo40jv4y/exec';

          const form = new URLSearchParams();
          form.append("home_latitude", lat.toString());
          form.append("home_longitude", lon.toString());
          
          fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: form
          })
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.error(error));
          
          const audio = new Audio('register.mp3');
          audio.play().then(() => {
            alert("自宅情報を登録しました");
          });
        },
        (error) => {
          alert("位置情報の取得に失敗しました: " + error.message);
        }
      );
    } else {
      alert("このブラウザは位置情報に対応していません。");
    }
});

function showWaitingMessage() {
  const message = document.getElementById("coordinate-output");
  message.textContent = "位置情報を取得中...";
}

function showCordinate(lat, lon) {
  const message = document.getElementById("coordinate-output");
  message.textContent = `緯度: ${lat}, 経度: ${lon}`;
}