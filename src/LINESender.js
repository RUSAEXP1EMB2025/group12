class LINESender {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    /*
    LINE Messaging APIを使いてメッセージを送信するメソッド
    to - 送信先のユーザーID
    content - 送信するメッセージの内容
    */
    sendMassage(content) {
        const USER_LINE_ID = Config.USER_LINE_ID; /* 送り先のユーザID */
        // https://developers.line.biz/ja/reference/messaging-api/を参照してください
        const url = 'https://api.line.me/v2/bot/message/push';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`
        };

        const payload = JSON.stringify({
            to: USER_LINE_ID,
            messages: [{
                type: 'text',
                text: content
            }]
        });

        const options = {
            method: 'POST',
            headers: headers,
            payload: payload
        };

        try {
            const response = UrlFetchApp.fetch(url, options);
            const responseCode = response.getResponseCode();
            
            if (responseCode >= 200 && responseCode < 300) {
                return JSON.parse(response.getContentText());
            } else {
                throw new Error(`LINE API error: ${responseCode} - ${response.getContentText()}`);
            }
        } catch (error) {
            console.error('Error sending message to LINE:', error);
            throw error;
        }
    }
}