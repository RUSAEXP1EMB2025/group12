class DistanceCalculator {
    /*
    2座標間の距離を計算するメソッド
    lat1, lon1: 最初の座標の緯度と経度
    lat2, lon2: 2番目の座標の緯度と経度
    戻り値: 2座標間の距離（メートル単位）
    */
    
    // static calculateDistance(lat1, lon1, lat2, lon2) {
    // /**
    //  * 度をラジアンに変換する
    //  * @param {number} degrees - 度
    //  * @returns {number} ラジアン
    //  */
    //     const toRadians = (degrees) => degrees * (Math.PI / 180);

    //     const R = 6371e3; // 地球の半径（メートル）
    //     const radLat1 = toRadians(lat1);
    //     const radLat2 = toRadians(lat2);
    //     const deltaLatRad = toRadians(lat2 - lat1);
    //     const deltaLonRad = toRadians(lon2 - lon1);

    //     const a = Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
    //             Math.cos(radLat1) * Math.cos(radLat2) *
    //             Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2);
        
    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    //     const distance = R * c; // 距離（メートル）
    //     return distance/1000;
    // }
    
    static calculateDistance(lat1, lon1, lat2, lon2) {
        const toRadians = degrees => degrees * (Math.PI / 180);
        const baseDistance = 111.111111;

        const deltaLat = Math.abs(lat1 - lat2);
        const deltaLon = Math.abs(lon1 - lon2);
        const avgLatRad = toRadians((lat1 + lat2) / 2);

        const side1 = deltaLat * baseDistance;
        const side2 = deltaLon * baseDistance * Math.cos(avgLatRad);

        const distance = Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2));
        return distance*1000;
    }
}