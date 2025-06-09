// api/webhook.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const events = req.body.events;

    for (const event of events) {
        if (event.type === 'message' && event.message.type === 'text') {
        const userId = event.source.userId;            // ユーザーID
        const text = event.message.text;               // 送られてきたテキスト
        const replyToken = event.replyToken;

        console.log(`ユーザーID: ${userId}`);
        console.log(`メッセージ内容: ${text}`);

        // 返信する
        await fetch('https://api.line.me/v2/bot/message/reply', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
            replyToken,
            messages: [
                {
                type: 'text',
                text: `あなたのメッセージ：「${text}」`,
                },
            ],
            }),
        });
        }
    }
    // テスト

    res.status(200).send('OK');
}
