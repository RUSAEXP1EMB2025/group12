document.getElementById("search-coordinate").addEventListener("click", function(event) {
    event.preventDefault(); // フォームのデフォルトの送信を防ぐ
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          alert(`緯度: ${lat}\n経度: ${lon}`);
        },
        (error) => {
          alert("位置情報の取得に失敗しました: " + error.message);
        }
      );
    } else {
      alert("このブラウザは位置情報に対応していません。");
    }
});